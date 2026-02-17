import { apiRequest } from './apiClient';
import type { TimeEntry } from '../core/domain/timeEntry';

const BASE = '/api/time-entries';

type ApiTimeEntry = {
  id: string;
  projectId: string;
  taskNameId?: string | null;

  description: string;
  startTime: string;
  endTime: string | null;

  duration: number; // seconds

  createdAt: string;
  updatedAt: string;
};

function toDate(value: string | null | undefined): Date {
  // If something is wrong, this will create Invalid Date,
  // but at least it's explicit and consistent.
  return new Date(value ?? '');
}

function mapApiTimeEntryToDomain(apiEntry: ApiTimeEntry): TimeEntry {
  return {
    id: apiEntry.id,
    projectId: apiEntry.projectId,
    taskNameId: apiEntry.taskNameId ?? undefined,

    description: apiEntry.description,
    startTime: new Date(apiEntry.startTime),
    endTime: apiEntry.endTime ? new Date(apiEntry.endTime) : undefined,

    duration: apiEntry.duration,

    createdAt: new Date(apiEntry.createdAt),
    updatedAt: new Date(apiEntry.updatedAt),
  };
}

function mapApiTimeEntriesToDomain(apiEntries: ApiTimeEntry[]): TimeEntry[] {
  return apiEntries.map(mapApiTimeEntryToDomain);
}

/**
 * Fetches all time entries from the API.
 */
export async function getTimeEntries(): Promise<TimeEntry[]> {
  const apiEntries = await apiRequest<ApiTimeEntry[]>(BASE);
  return mapApiTimeEntriesToDomain(apiEntries);
}

/**
 * Fetches a single time entry by id.
 */
export async function getTimeEntry(id: string): Promise<TimeEntry> {
  const apiEntry = await apiRequest<ApiTimeEntry>(`${BASE}/${id}`);
  return mapApiTimeEntryToDomain(apiEntry);
}

export async function startTimer(input: {
  description: string;
  projectId: string;
}): Promise<TimeEntry> {
  const apiEntry = await apiRequest<ApiTimeEntry>(BASE, {
    method: 'POST',
    body: JSON.stringify({
      description: input.description,
      projectId: input.projectId,
    }),
  });

  return mapApiTimeEntryToDomain(apiEntry);
}

/**
 * Stops an active timer by id.
 */
export async function stopTimer(id: string): Promise<TimeEntry> {
  const apiEntry = await apiRequest<ApiTimeEntry>(`${BASE}/${id}/stop`, {
    method: 'POST',
  });

  return mapApiTimeEntryToDomain(apiEntry);
}

export async function updateTimeEntry(
  id: string,
  data: Partial<TimeEntry>,
): Promise<TimeEntry> {
  const body: Record<string, unknown> = {};

  if (data.description !== undefined) body.description = data.description;
  if (data.startTime !== undefined)
    body.startTime = data.startTime.toISOString();
  if (data.endTime !== undefined)
    body.endTime = data.endTime ? data.endTime.toISOString() : null;

  const apiEntry = await apiRequest<ApiTimeEntry>(`${BASE}/${id}`, {
    method: 'PATCH',
    body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
  });

  return mapApiTimeEntryToDomain(apiEntry);
}

/**
 * Deletes a time entry by id.
 */
export async function deleteTimeEntry(id: string): Promise<void> {
  await apiRequest<void>(`${BASE}/${id}`, { method: 'DELETE' });
}
