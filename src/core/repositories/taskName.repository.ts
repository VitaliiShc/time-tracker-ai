import type { TaskName } from '../domain/taskName';

export interface TaskNameRepository {
  list(query?: string): Promise<TaskName[]>;
  upsertByName(name: string): Promise<TaskName>;
}

// Placeholder implementation; actual Prisma logic will be added later.
export class PrismaTaskNameRepository implements TaskNameRepository {
  async list(_query?: string): Promise<TaskName[]> {
    return [];
  }

  async upsertByName(name: string): Promise<TaskName> {
    const now = new Date();
    return {
      id: 'placeholder',
      name,
      createdAt: now,
      updatedAt: now,
    };
  }
}

