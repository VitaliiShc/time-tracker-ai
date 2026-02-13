import type { TimeEntry } from '../domain/timeEntry';
import type { TimeEntryRepository } from '../repositories/timeEntry.repository';

export interface CreateTimeEntryInput {
  projectId: string;
  taskNameId?: string;
  startedAt: Date;
  endedAt?: Date;
  notes?: string;
}

export class TimeEntryService {
  constructor(private readonly timeEntryRepo: TimeEntryRepository) {}

  async listByProject(projectId: string): Promise<TimeEntry[]> {
    return this.timeEntryRepo.listByProject(projectId);
  }

  async createTimeEntry(input: CreateTimeEntryInput): Promise<TimeEntry> {
    return this.timeEntryRepo.create({
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 'placeholder',
    } as TimeEntry);
  }
}

