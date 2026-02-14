import { apiRequest } from './apiClient';
import type { TaskName } from '../core/domain/task';

const BASE = '/api/tasks';

/**
 * Fetches all task names from the API.
 * @returns Promise resolving to the list of task names
 */
export async function getTasks(): Promise<TaskName[]> {
  return apiRequest<TaskName[]>(BASE);
}

/**
 * Fetches task names matching the query for autocomplete.
 * @param query - Search string (e.g. for autocomplete)
 * @returns Promise resolving to matching task names
 */
export async function getTasksAutocomplete(query: string): Promise<TaskName[]> {
  const params = new URLSearchParams({ query });
  return apiRequest<TaskName[]>(`${BASE}/autocomplete?${params.toString()}`);
}

/**
 * Creates a new task name.
 * @param data - At least name; description optional
 * @returns Promise resolving to the created task name
 */
export async function createTask(data: {
  name: string;
  description?: string;
}): Promise<TaskName> {
  return apiRequest<TaskName>(BASE, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Updates an existing task name by id.
 * @param id - Task name id
 * @param data - Fields to update (name and/or description)
 * @returns Promise resolving to the updated task name
 */
export async function updateTask(
  id: string,
  data: Partial<Pick<TaskName, 'name' | 'description'>>
): Promise<TaskName> {
  return apiRequest<TaskName>(`${BASE}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * Deletes a task name by id.
 * @param id - Task name id to delete
 */
export async function deleteTask(id: string): Promise<void> {
  await apiRequest<void>(`${BASE}/${id}`, { method: 'DELETE' });
}
