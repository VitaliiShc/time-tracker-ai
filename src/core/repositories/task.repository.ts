import { prisma } from '../db/prismaClient';
import type { TaskName } from '../domain/task';
import type { TaskName as PrismaTaskName } from '@prisma/client';

/** Maps Prisma TaskName to domain TaskName (null description -> undefined). */
function toDomain(row: PrismaTaskName): TaskName {
  return {
    id: row.id,
    name: row.name,
    ...(row.description != null && { description: row.description }),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Repository for TaskName entity.
 * Data access only; no business logic. Uses PrismaClient singleton.
 */
export class TaskRepository {
  /**
   * Returns all task names, ordered by creation date (newest first).
   * @returns All task names
   */
  async getAll(): Promise<TaskName[]> {
    const rows = await prisma.taskName.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(toDomain);
  }

  /**
   * Returns a task name by id.
   * @param id - UUID of the task name
   * @returns The task name or null if not found
   */
  async getById(id: string): Promise<TaskName | null> {
    const row = await prisma.taskName.findUnique({
      where: { id },
    });
    return row ? toDomain(row) : null;
  }

  /**
   * Returns a task name by exact name match (case-sensitive).
   * @param name - Task name string
   * @returns The task name or null if not found
   */
  async getByName(name: string): Promise<TaskName | null> {
    const row = await prisma.taskName.findFirst({
      where: { name },
    });
    return row ? toDomain(row) : null;
  }

  /**
   * Creates a new task name.
   * @param input - name and optional description
   * @returns The created task name
   */
  async create(input: {
    name: string;
    description?: string;
  }): Promise<TaskName> {
    const row = await prisma.taskName.create({
      data: {
        name: input.name,
        ...(input.description !== undefined && { description: input.description }),
      },
    });
    return toDomain(row);
  }

  /**
   * Updates an existing task name by id.
   * @param id - UUID of the task name
   * @param input - Optional name and/or description to update
   * @returns The updated task name
   */
  async update(
    id: string,
    input: { name?: string; description?: string }
  ): Promise<TaskName> {
    const row = await prisma.taskName.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.description !== undefined && { description: input.description }),
      },
    });
    return toDomain(row);
  }

  /**
   * Deletes a task name by id.
   * @param id - UUID of the task name
   */
  async delete(id: string): Promise<void> {
    await prisma.taskName.delete({
      where: { id },
    });
  }
}
