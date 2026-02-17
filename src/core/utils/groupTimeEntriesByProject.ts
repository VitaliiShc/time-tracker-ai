import type { TimeEntry } from '../domain/timeEntry';
import type { Project } from '../domain/project';

export type GroupedTimeEntries = {
  projectId: string;
  projectName: string;
  projectColor?: string;
  entries: TimeEntry[];
  totalMinutes: number;
};

const MS_PER_MINUTE = 60 * 1000;

function getEntryDurationMinutes(entry: TimeEntry): number {
  if (entry.endTime == null || entry.startTime == null) {
    return 0;
  }
  const start =
    entry.startTime instanceof Date
      ? entry.startTime.getTime()
      : new Date(entry.startTime).getTime();
  const end =
    entry.endTime instanceof Date
      ? entry.endTime.getTime()
      : new Date(entry.endTime).getTime();
  return Math.max(0, (end - start) / MS_PER_MINUTE);
}

/**
 * Groups time entries by project and computes total duration per project.
 * Result groups are sorted by totalMinutes descending. Entries with null/undefined projectId are skipped.
 */
export function groupTimeEntriesByProject(
  entries: TimeEntry[],
  projects: Project[],
): GroupedTimeEntries[] {
  if (entries.length === 0) {
    return [];
  }

  const projectById = new Map(projects.map((project) => [project.id, project]));

  const groupMap = new Map<
    string,
    { entries: TimeEntry[]; totalMinutes: number }
  >();

  for (const entry of entries) {
    if (entry.projectId == null || entry.projectId === '') {
      continue;
    }

    const durationMinutes = getEntryDurationMinutes(entry);

    const existing = groupMap.get(entry.projectId);
    if (existing) {
      existing.entries.push(entry);
      existing.totalMinutes += durationMinutes;
    } else {
      groupMap.set(entry.projectId, {
        entries: [entry],
        totalMinutes: durationMinutes,
      });
    }
  }

  const result: GroupedTimeEntries[] = [];

  for (const [projectId, { entries: groupEntries, totalMinutes }] of groupMap) {
    const project = projectById.get(projectId);
    result.push({
      projectId,
      projectName: project?.name ?? 'Unknown Project',
      projectColor: project?.color,
      entries: groupEntries,
      totalMinutes,
    });
  }

  result.sort((groupA, groupB) => groupB.totalMinutes - groupA.totalMinutes);

  return result;
}
