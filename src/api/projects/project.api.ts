import type { NextRequest } from 'next/server';
import { ProjectRepository } from '../../core/repositories/project.repository';
import { ProjectService } from '../../core/services/project.service';

const projectService = new ProjectService(new ProjectRepository());

// Thin API-layer helpers that route handlers can call.

export async function handleListProjects(_req: NextRequest) {
  // TODO: Add pagination, auth, etc.
  const projects = await projectService.getProjects();
  return projects;
}

export async function handleCreateProject(_req: NextRequest) {
  // TODO: Parse body, validate, and delegate to service.
  const project = await projectService.createProject({
    name: 'placeholder',
    color: '#000000',
  });
  return project;
}

