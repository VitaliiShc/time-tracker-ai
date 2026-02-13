import { prisma } from '../db/prismaClient';
import type { Project } from '@prisma/client';

export interface CreateProjectData {
  name: string;
  color: string;
}

export interface UpdateProjectData {
  name?: string;
  color?: string;
}

export class ProjectRepository {
  /**
   * Get all projects
   */
  async getAll(): Promise<Project[]> {
    return prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get a project by ID
   */
  async getById(id: string): Promise<Project | null> {
    return prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Create a new project
   */
  async create(data: CreateProjectData): Promise<Project> {
    return prisma.project.create({
      data: {
        name: data.name,
        color: data.color,
      },
    });
  }

  /**
   * Update an existing project
   */
  async update(id: string, data: UpdateProjectData): Promise<Project> {
    return prisma.project.update({
      where: {
        id,
      },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.color !== undefined && { color: data.color }),
      },
    });
  }

  /**
   * Delete a project
   */
  async delete(id: string): Promise<void> {
    await prisma.project.delete({
      where: {
        id,
      },
    });
  }
}
