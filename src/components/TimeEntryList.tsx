'use client';

import { useMemo } from 'react';
import { useTimeEntries } from '../hooks/useTimeEntries';
import { useProjects } from '../hooks/useProjects';
import { filterTimeEntriesByPeriod } from '../core/utils/filterTimeEntriesByPeriod';
import { groupTimeEntriesByProject } from '../core/utils/groupTimeEntriesByProject';
import type { TimeEntry } from '../core/domain/timeEntry';

/**
 * Read-only list of today's time entries grouped by project.
 * Uses useTimeEntries, useProjects, filterTimeEntriesByPeriod, and groupTimeEntriesByProject.
 */
export function TimeEntryList() {
  const { timeEntries, isLoading, error } = useTimeEntries();
  const { projects } = useProjects();

  const grouped = useMemo(() => {
    const filtered = filterTimeEntriesByPeriod(timeEntries, 'day');
    return groupTimeEntriesByProject(filtered, projects);
  }, [timeEntries, projects]);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-gray-500">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-center text-red-700">
        {error}
      </div>
    );
  }

  if (grouped.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-gray-500">
        No entries today
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {grouped.map((group) => (
        <section
          key={group.projectId}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: group.projectColor ?? '#9ca3af' }}
              aria-hidden
            />
            <span className="font-medium text-gray-900">{group.projectName}</span>
            <span className="ml-auto text-sm text-gray-500">
              {formatDuration(group.totalMinutes)}
            </span>
          </div>
          <ul className="space-y-2">
            {group.entries.map((entry) => (
              <TimeEntryRow key={entry.id} entry={entry} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function TimeEntryRow({ entry }: { entry: TimeEntry }) {
  const description =
    entry.notes ??
    (entry as TimeEntry & { description?: string }).description ??
    '—';

  const startDate =
    entry.startedAt instanceof Date
      ? entry.startedAt
      : new Date(entry.startedAt as string);
  const endDate =
    entry.endedAt != null
      ? entry.endedAt instanceof Date
        ? entry.endedAt
        : new Date(entry.endedAt as string)
      : null;

  const durationMinutes =
    endDate != null
      ? Math.max(0, (endDate.getTime() - startDate.getTime()) / (60 * 1000))
      : Math.max(0, (Date.now() - startDate.getTime()) / (60 * 1000));

  return (
    <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
      <span className="min-w-0 flex-1 text-gray-800">{description}</span>
      <span className="shrink-0 text-gray-500">{formatTime(startDate)}</span>
      <span className="shrink-0 text-gray-500">
        {endDate != null ? formatTime(endDate) : '—'}
      </span>
      <span className="shrink-0 font-medium text-gray-700">
        {formatDuration(durationMinutes)}
      </span>
    </li>
  );
}

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}`;
}

function formatDuration(minutes: number): string {
  const whole = Math.floor(minutes);
  const hours = Math.floor(whole / 60);
  const mins = whole % 60;
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${pad(hours)}:${pad(mins)}`;
}
