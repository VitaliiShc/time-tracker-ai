import type { TimeEntry as PrismaTimeEntry } from '@prisma/client';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { TimeEntry } from '../../../../src/core/domain/timeEntry';
import { ProjectRepository } from '../../../../src/core/repositories/project.repository';
import { TimeEntryRepository } from '../../../../src/core/repositories/timeEntry.repository';
import { ProjectService } from '../../../../src/core/services/project.service';
import { TimeEntryService } from '../../../../src/core/services/timeEntry.service';
import { filterTimeEntriesByPeriod } from '../../../../src/core/utils/filterTimeEntriesByPeriod';
import type { Period } from '../../../../src/core/utils/filterTimeEntriesByPeriod';
import { groupTimeEntriesByProject } from '../../../../src/core/utils/groupTimeEntriesByProject';
import { mapErrorToHttp } from '../../../../src/api/utils/errorMapper';

export const runtime = 'nodejs';

const timeEntryService = new TimeEntryService(
  new TimeEntryRepository(),
  new ProjectRepository(),
);
const projectService = new ProjectService(new ProjectRepository());

const MS_PER_MINUTE = 60 * 1000;

function prismaToDomainEntry(entry: PrismaTimeEntry): TimeEntry {
  return {
    id: entry.id,
    projectId: entry.projectId,
    startedAt: entry.startTime,
    endedAt: entry.endTime ?? undefined,
    notes: entry.description,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  };
}

function formatDurationMinutes(start: Date, end: Date | undefined): string {
  if (end == null) return '00:00';
  const startMs =
    start instanceof Date ? start.getTime() : new Date(start).getTime();
  const endMs = end instanceof Date ? end.getTime() : new Date(end).getTime();
  const minutes = Math.max(0, Math.floor((endMs - startMs) / MS_PER_MINUTE));
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(mins)}`;
}

function formatDateTime(d: Date): string {
  const date = d instanceof Date ? d : new Date(d);
  return date.toISOString();
}

/**
 * Escapes a CSV field: wraps in double quotes if it contains comma, quote, or newline;
 * doubles any internal double quotes.
 */
function escapeCsvField(value: string): string {
  const s = String(value ?? '');
  if (/[,"\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

/**
 * GET /api/reports/export?period=day|week|month
 * Returns CSV of time entries for the given period (one row per entry).
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const periodParam = searchParams.get('period') ?? 'day';
    const period: Period =
      periodParam === 'week' || periodParam === 'month' ? periodParam : 'day';

    const [rawEntries, projects] = await Promise.all([
      timeEntryService.getEntries(),
      projectService.getProjects(),
    ]);

    const domainEntries: TimeEntry[] = rawEntries.map(prismaToDomainEntry);
    const filtered = filterTimeEntriesByPeriod(domainEntries, period);
    const groups = groupTimeEntriesByProject(filtered, projects);

    const header = 'Project, Task, Start, End, Duration (HH:MM)';
    const rows: string[] = [header];

    for (const group of groups) {
      for (const entry of group.entries) {
        const start = entry.startedAt;
        const end = entry.endedAt;
        const task = entry.notes ?? '';
        const startStr = formatDateTime(start);
        const endStr = end != null ? formatDateTime(end) : '';
        const duration = formatDurationMinutes(start, end ?? undefined);
        rows.push(
          [
            escapeCsvField(group.projectName),
            escapeCsvField(task),
            escapeCsvField(startStr),
            escapeCsvField(endStr),
            escapeCsvField(duration),
          ].join(','),
        );
      }
    }

    const csv = rows.join('\r\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="report-${period}.csv"`,
      },
    });
  } catch (error) {
    const { status, body } = mapErrorToHttp(error);
    return NextResponse.json(
      {
        success: false,
        error: body.error,
        ...(body.code && { code: body.code }),
      },
      { status },
    );
  }
}
