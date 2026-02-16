import { apiRequest } from './apiClient';
import type { TimeEntry } from '../core/domain/timeEntry';

const BASE = '/api/time-entries';

/**
 * Backend returns Prisma TimeEntry-like payload (description/startTime/endTime/etc).
 * Frontend domain expects Date fields (startedAt/endedAt/etc) and notes.
 */
type ApiTimeEntry = {
  id: string;
  projectId: string;
  taskNameId?: string | null;

  description?: string | null;

  startTime?: string | null;
  endTime?: string | null;

  startedAt?: string | null;
  endedAt?: string | null;

  createdAt: string;
  updatedAt: string;

  // may exist on backend, but domain doesn't require it here
  duration?: number | null;
};

function toDate(value: string | null | undefined): Date {
  // If something is wrong, this will create Invalid Date,
  // but at least it's explicit and consistent.
  return new Date(value ?? '');
}

function mapApiTimeEntryToDomain(apiEntry: ApiTimeEntry): TimeEntry {
  const startedAtRaw = apiEntry.startedAt ?? apiEntry.startTime;
  const endedAtRaw = apiEntry.endedAt ?? apiEntry.endTime;

  return {
    id: apiEntry.id,
    projectId: apiEntry.projectId,
    taskNameId: apiEntry.taskNameId ?? undefined,

    notes: apiEntry.description ?? undefined,

    startedAt: toDate(startedAtRaw),
    endedAt: endedAtRaw ? toDate(endedAtRaw) : undefined,

    createdAt: toDate(apiEntry.createdAt),
    updatedAt: toDate(apiEntry.updatedAt),
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

/**
 * Starts a new timer with the given notes and project.
 * We keep UI variable name "description" if you want,
 * but domain-wise this is notes.
 */
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

/**
 * Updates an existing time entry.
 * Maps domain fields (notes, startedAt, endedAt) to API fields (description, startTime, endTime).
 */
export async function updateTimeEntry(
  id: string,
  data: Partial<TimeEntry>,
): Promise<TimeEntry> {
  const body: Record<string, unknown> = {};

  if (data.notes !== undefined) body.description = data.notes;
  if (data.startedAt !== undefined)
    body.startTime = data.startedAt.toISOString();
  if (data.endedAt !== undefined)
    body.endTime = data.endedAt ? data.endedAt.toISOString() : null;

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
