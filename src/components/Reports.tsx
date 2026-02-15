'use client';

import { useMemo, useState } from 'react';
import { useTimeEntries } from '../hooks/useTimeEntries';
import { useProjects } from '../hooks/useProjects';
import { filterTimeEntriesByPeriod } from '../core/utils/filterTimeEntriesByPeriod';
import { groupTimeEntriesByProject } from '../core/utils/groupTimeEntriesByProject';

type Period = 'day' | 'week' | 'month';

/**
 * Reporting view that displays grouped time entries for a selected period (day, week, or month).
 * Read-only; supports CSV export via backend route.
 */
export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('day');
  const { timeEntries, isLoading: entriesLoading, error: entriesError } =
    useTimeEntries();
  const { projects, isLoading: projectsLoading, error: projectsError } =
    useProjects();

  const { filteredEntries, grouped, grandTotalMinutes } = useMemo(() => {
    const filtered = filterTimeEntriesByPeriod(timeEntries, selectedPeriod);
    const groups = groupTimeEntriesByProject(filtered, projects);
    const total = groups.reduce((sum, group) => sum + group.totalMinutes, 0);
    return {
      filteredEntries: filtered,
      grouped: groups,
      grandTotalMinutes: total,
    };
  }, [timeEntries, projects, selectedPeriod]);

  const isLoading = entriesLoading || projectsLoading;
  const error = entriesError ?? projectsError ?? null;

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

  const exportCsvUrl = `/api/reports/export?period=${selectedPeriod}`;

  if (filteredEntries.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1"
            role="group"
            aria-label="Select period"
          >
            {(['day', 'week', 'month'] as const).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setSelectedPeriod(period)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  selectedPeriod === period
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-gray-700">
              {formatDuration(grandTotalMinutes)}
            </span>
            <a
              href={exportCsvUrl}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              aria-label={`Export report for ${selectedPeriod} as CSV`}
            >
              Export CSV
            </a>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-gray-500">
          No entries for selected period
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1"
          role="group"
          aria-label="Select period"
        >
          {(['day', 'week', 'month'] as const).map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setSelectedPeriod(period)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                selectedPeriod === period
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-gray-700">
            {formatDuration(grandTotalMinutes)}
          </span>
          <a
            href={exportCsvUrl}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            aria-label={`Export report for ${selectedPeriod} as CSV`}
          >
            Export CSV
          </a>
        </div>
      </div>
      <div className="space-y-4">
        {grouped.map((group) => (
          <section
            key={group.projectId}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: group.projectColor ?? '#9ca3af' }}
                aria-hidden
              />
              <span className="font-medium text-gray-900">{group.projectName}</span>
              <span className="ml-auto text-sm text-gray-500">
                {formatDuration(group.totalMinutes)}
              </span>
              <span className="text-sm text-gray-400">
                {group.entries.length} {group.entries.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function formatDuration(minutes: number): string {
  const whole = Math.floor(minutes);
  const hours = Math.floor(whole / 60);
  const mins = whole % 60;
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${pad(hours)}:${pad(mins)}`;
}
