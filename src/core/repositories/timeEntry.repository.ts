import type { TimeEntry } from '../domain/timeEntry';

export interface TimeEntryRepository {
  getById(id: string): Promise<TimeEntry | null>;
  listByProject(projectId: string): Promise<TimeEntry[]>;
  create(input: Omit<TimeEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<TimeEntry>;
}

// Placeholder implementation; actual Prisma logic will be added later.
export class PrismaTimeEntryRepository implements TimeEntryRepository {
  async getById(_id: string): Promise<TimeEntry | null> {
    return null;
  }

  async listByProject(_projectId: string): Promise<TimeEntry[]> {
    return [];
  }

  async create(input: Omit<TimeEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<TimeEntry> {
    const now = new Date();
    return {
      id: 'placeholder',
      createdAt: now,
      updatedAt: now,
      ...input,
    };
  }
}

