import type { NextRequest } from 'next/server';
import { PrismaProjectRepository } from '../../core/repositories/project.repository';
import { ProjectService } from '../../core/services/project.service';

const projectService = new ProjectService(new PrismaProjectRepository());

// Thin API-layer helpers that route handlers can call.

export async function handleListProjects(_req: NextRequest) {
  // TODO: Add pagination, auth, etc.
  const projects = await projectService.listProjects();
  return projects;
}

export async function handleCreateProject(_req: NextRequest) {
  // TODO: Parse body, validate, and delegate to service.
  const project = await projectService.createProject({
    name: 'placeholder',
    description: 'To be implemented',
  });
  return project;
}

