import type { Project } from '../domain/project';
import type { ProjectRepository } from '../repositories/project.repository';

export interface CreateProjectInput {
  name: string;
  description?: string;
}

export class ProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}

  // Application-level orchestration will be added later.

  async listProjects(): Promise<Project[]> {
    return this.projectRepo.list();
  }

  async createProject(input: CreateProjectInput): Promise<Project> {
    return this.projectRepo.create(input);
  }

  async archiveProject(id: string): Promise<Project> {
    return this.projectRepo.archive(id);
  }
}

