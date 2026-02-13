import type { Project } from '../domain/project';

export interface ProjectRepository {
  getById(id: string): Promise<Project | null>;
  list(): Promise<Project[]>;
  create(input: Pick<Project, 'name' | 'description'>): Promise<Project>;
  archive(id: string): Promise<Project>;
}

// Placeholder implementation; actual Prisma logic will be added later.
export class PrismaProjectRepository implements ProjectRepository {
  async getById(_id: string): Promise<Project | null> {
    return null;
  }

  async list(): Promise<Project[]> {
    return [];
  }

  async create(input: Pick<Project, 'name' | 'description'>): Promise<Project> {
    const now = new Date();
    return {
      id: 'placeholder',
      isArchived: false,
      createdAt: now,
      updatedAt: now,
      ...input,
    };
  }

  async archive(id: string): Promise<Project> {
    const now = new Date();
    return {
      id,
      name: 'placeholder',
      description: undefined,
      isArchived: true,
      createdAt: now,
      updatedAt: now,
    };
  }
}

