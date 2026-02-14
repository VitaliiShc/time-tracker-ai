import { apiRequest } from './apiClient';
import type { TimeEntry } from '../core/domain/timeEntry';

const BASE = '/api/time-entries';

/**
 * Fetches all time entries from the API.
 * @returns Promise resolving to the list of time entries
 */
export async function getTimeEntries(): Promise<TimeEntry[]> {
  return apiRequest<TimeEntry[]>(BASE);
}

/**
 * Fetches a single time entry by id.
 * @param id - Time entry id
 * @returns Promise resolving to the time entry
 */
export async function getTimeEntry(id: string): Promise<TimeEntry> {
  return apiRequest<TimeEntry>(`${BASE}/${id}`);
}

/**
 * Starts a new timer with the given description and project.
 * @param input - Description and project id
 * @returns Promise resolving to the created time entry
 */
export async function startTimer(input: {
  description: string;
  projectId: string;
}): Promise<TimeEntry> {
  return apiRequest<TimeEntry>(BASE, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

/**
 * Stops an active timer by id.
 * @param id - Time entry id to stop
 * @returns Promise resolving to the updated time entry
 */
export async function stopTimer(id: string): Promise<TimeEntry> {
  return apiRequest<TimeEntry>(`${BASE}/${id}/stop`, { method: 'POST' });
}

/**
 * Updates an existing time entry. Only provided fields are sent.
 * Maps domain fields (notes, startedAt, endedAt) to API fields (description, startTime, endTime).
 *
 * @param id - Time entry id
 * @param data - Partial time entry fields to update
 * @returns Promise resolving to the updated time entry
 */
export async function updateTimeEntry(
  id: string,
  data: Partial<TimeEntry>
): Promise<TimeEntry> {
  const body: Record<string, unknown> = {};
  if (data.notes !== undefined) body.description = data.notes;
  if (data.startedAt !== undefined) body.startTime = data.startedAt;
  if (data.endedAt !== undefined) body.endTime = data.endedAt;

  return apiRequest<TimeEntry>(`${BASE}/${id}`, {
    method: 'PATCH',
    body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
  });
}

/**
 * Deletes a time entry by id.
 * @param id - Time entry id to delete
 */
export async function deleteTimeEntry(id: string): Promise<void> {
  await apiRequest<void>(`${BASE}/${id}`, { method: 'DELETE' });
}
