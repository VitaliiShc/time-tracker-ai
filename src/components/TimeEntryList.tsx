'use client';

import { useMemo, useState } from 'react';
import { useTimeEntries } from '../hooks/useTimeEntries';
import { useProjects } from '../hooks/useProjects';
import { filterTimeEntriesByPeriod } from '../core/utils/filterTimeEntriesByPeriod';
import { groupTimeEntriesByProject } from '../core/utils/groupTimeEntriesByProject';
import type { TimeEntry } from '../core/domain/timeEntry';

/**
 * List of today's time entries grouped by project.
 * Supports inline editing and deletion.
 */
export function TimeEntryList() {
  const { timeEntries, isLoading, error, updateTimeEntry, deleteTimeEntry } =
    useTimeEntries();
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
              <TimeEntryRow
                key={entry.id}
                entry={entry}
                onUpdate={updateTimeEntry}
                onDelete={deleteTimeEntry}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function parseDurationInput(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/^(\d+):(\d{2})$/);
  if (!match) return null;
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  if (minutes >= 60 || hours < 0 || minutes < 0) return null;
  return hours * 60 + minutes;
}

type TimeEntryRowProps = {
  entry: TimeEntry;
  onUpdate: (id: string, data: Partial<TimeEntry>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

function TimeEntryRow({ entry, onUpdate, onDelete }: TimeEntryRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDuration, setEditedDuration] = useState('');
  const [durationError, setDurationError] = useState<string | null>(null);

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

  const isActive = endDate == null;
  const durationMinutes =
    endDate != null
      ? Math.max(0, (endDate.getTime() - startDate.getTime()) / (60 * 1000))
      : Math.max(0, (Date.now() - startDate.getTime()) / (60 * 1000));

  function handleEditClick() {
    setEditedDescription(description);
    setEditedDuration(formatDuration(durationMinutes));
    setDurationError(null);
    setIsEditing(true);
  }

  function handleCancelClick() {
    setIsEditing(false);
    setEditedDescription('');
    setEditedDuration('');
    setDurationError(null);
  }

  async function handleSaveClick() {
    setDurationError(null);
    const parsedMinutes = parseDurationInput(editedDuration);
    if (parsedMinutes === null) {
      setDurationError('Invalid format. Use HH:MM');
      return;
    }
    const newEndedAt = new Date(
      startDate.getTime() + parsedMinutes * 60 * 1000,
    );
    const updates: Partial<TimeEntry> = { endedAt: newEndedAt };
    if (editedDescription.trim() !== description) {
      updates.notes = editedDescription.trim() || undefined;
    }
    await onUpdate(entry.id, updates);
    setIsEditing(false);
    setEditedDescription('');
    setEditedDuration('');
  }

  async function handleDeleteClick() {
    if (!window.confirm('Delete this entry?')) return;
    await onDelete(entry.id);
  }

  if (isEditing) {
    return (
      <li className="flex flex-wrap items-center gap-2 rounded border border-gray-200 bg-gray-50 p-2 text-sm">
        <input
          type="text"
          value={editedDescription}
          onChange={(event) => setEditedDescription(event.target.value)}
          className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-1 text-gray-800"
          placeholder="Description"
          aria-label="Edit description"
        />
        <span className="shrink-0 text-gray-500">{formatTime(startDate)}</span>
        <input
          type="text"
          value={editedDuration}
          onChange={(event) => {
            setEditedDuration(event.target.value);
            setDurationError(null);
          }}
          className="w-16 shrink-0 rounded border border-gray-300 px-2 py-1 text-center"
          placeholder="HH:MM"
          aria-label="Edit duration (HH:MM)"
          aria-invalid={!!durationError}
        />
        {durationError && (
          <span className="w-full text-xs text-red-600" role="alert">
            {durationError}
          </span>
        )}
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={handleSaveClick}
            className="rounded bg-blue-600 px-2 py-1 text-white hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

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
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={handleEditClick}
          disabled={isActive}
          className="rounded border border-gray-300 bg-white px-2 py-1 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          title={isActive ? 'Cannot edit active entry' : 'Edit entry'}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          className="rounded border border-red-300 bg-white px-2 py-1 text-red-700 hover:bg-red-50"
          title="Delete entry"
        >
          Delete
        </button>
      </div>
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
