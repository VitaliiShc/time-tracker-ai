import { prisma } from '../db/prismaClient';
import type { TimeEntry } from '@prisma/client';

export interface CreateTimeEntryData {
  description: string;
  projectId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

export interface UpdateTimeEntryData {
  description?: string;
  projectId?: string;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
}

export class TimeEntryRepository {
  /**
   * Get all time entries ordered by startTime descending
   */
  async getAll(): Promise<TimeEntry[]> {
    return prisma.timeEntry.findMany({
      orderBy: {
        startTime: 'desc',
      },
    });
  }

  /**
   * Get a time entry by ID
   */
  async getById(id: string): Promise<TimeEntry | null> {
    return prisma.timeEntry.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Create a new time entry
   */
  async create(data: CreateTimeEntryData): Promise<TimeEntry> {
    return prisma.timeEntry.create({
      data: {
        description: data.description,
        projectId: data.projectId,
        startTime: data.startTime,
        endTime: data.endTime,
        duration: data.duration,
      },
    });
  }

  /**
   * Update an existing time entry
   */
  async update(id: string, data: UpdateTimeEntryData): Promise<TimeEntry> {
    return prisma.timeEntry.update({
      where: {
        id,
      },
      data: {
        ...(data.description !== undefined && { description: data.description }),
        ...(data.projectId !== undefined && { projectId: data.projectId }),
        ...(data.startTime !== undefined && { startTime: data.startTime }),
        ...(data.endTime !== undefined && { endTime: data.endTime }),
        ...(data.duration !== undefined && { duration: data.duration }),
      },
    });
  }

  /**
   * Delete a time entry
   */
  async delete(id: string): Promise<void> {
    await prisma.timeEntry.delete({
      where: {
        id,
      },
    });
  }
}
