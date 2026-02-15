import { apiRequest } from './apiClient';
import type { Project } from '../core/domain/project';

const BASE = '/api/projects';

/**
 * Fetches all projects from the API.
 * @returns Promise resolving to the list of projects
 */
export async function getProjects(): Promise<Project[]> {
  return apiRequest<Project[]>(BASE);
}

/**
 * Creates a new project.
 * @param data - Name and color for the new project
 * @returns Promise resolving to the created project
 */
export async function createProject(data: {
  name: string;
  color?: string;
}): Promise<Project> {
  return apiRequest<Project>(BASE, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Updates an existing project by id. Only provided fields are sent.
 * @param id - Project id
 * @param data - Fields to update (name and/or color)
 * @returns Promise resolving to the updated project
 */
export async function updateProject(
  id: string,
  data: Partial<Pick<Project, 'name' | 'color'>>,
): Promise<Project> {
  return apiRequest<Project>(`${BASE}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * Deletes a project by id.
 * @param id - Project id to delete
 */
export async function deleteProject(id: string): Promise<void> {
  await apiRequest<void>(`${BASE}/${id}`, { method: 'DELETE' });
}
