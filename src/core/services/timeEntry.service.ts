import type { TimeEntry } from '@prisma/client';
import type { ProjectRepository } from '../repositories/project.repository';
import type { TimeEntryRepository } from '../repositories/timeEntry.repository';

/** Thrown when a time entry is not found by id */
export class TimeEntryNotFoundError extends Error {
  constructor(id: string) {
    super(`Time entry not found: ${id}`);
    this.name = 'TimeEntryNotFoundError';
  }
}

/** Thrown when an operation is not allowed because an active timer already exists */
export class ActiveTimerExistsError extends Error {
  constructor() {
    super('An active timer is already running. Stop it before starting a new one.');
    this.name = 'ActiveTimerExistsError';
  }
}

/** Thrown when time entry validation fails (e.g. empty description) */
export class TimeEntryValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeEntryValidationError';
  }
}

/** Input for starting a new timer */
export interface StartTimerInput {
  description: string;
  projectId: string;
}

/** Input for updating an existing time entry */
export interface UpdateTimeEntryInput {
  description?: string;
  startTime?: Date;
  endTime?: Date;
}

/**
 * Computes duration in seconds between two dates.
 * @param start - Start time
 * @param end - End time
 * @returns Duration in seconds (non-negative integer)
 */
function durationInSeconds(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime();
  return Math.max(0, Math.floor(ms / 1000));
}

/**
 * Application service for TimeEntry entity.
 * Encapsulates business logic for time tracking and delegates persistence to repositories.
 */
export class TimeEntryService {
  constructor(
    private readonly timeEntryRepo: TimeEntryRepository,
    private readonly projectRepo: ProjectRepository
  ) {}

  /**
   * Returns all time entries, ordered by start time (newest first).
   * @returns List of all time entries
   */
  async getEntries(): Promise<TimeEntry[]> {
    return this.timeEntryRepo.getAll();
  }

  /**
   * Returns a single time entry by id.
   * @param id - Time entry id
   * @returns The time entry
   * @throws {TimeEntryNotFoundError} When no time entry exists with the given id
   */
  async getEntry(id: string): Promise<TimeEntry> {
    const entry = await this.timeEntryRepo.getById(id);
    if (entry === null) {
      throw new TimeEntryNotFoundError(id);
    }
    return entry;
  }

  /**
   * Starts a new timer. Only one active timer (entry with null endTime) is allowed at a time.
   * @param data - Description and project id for the new entry
   * @returns The created time entry (active timer)
   * @throws {ActiveTimerExistsError} When an active timer already exists
   * @throws {TimeEntryValidationError} When description is empty after trim
   * @throws {TimeEntryValidationError} When project does not exist
   */
  async startTimer(data: StartTimerInput): Promise<TimeEntry> {
    const active = await this.timeEntryRepo.getActiveEntry();
    if (active !== null) {
      throw new ActiveTimerExistsError();
    }

    const description = data.description.trim();
    if (description.length === 0) {
      throw new TimeEntryValidationError('Description cannot be empty.');
    }

    const project = await this.projectRepo.getById(data.projectId);
    if (project === null) {
      throw new TimeEntryValidationError('Project not found.');
    }

    const startTime = new Date();
    return this.timeEntryRepo.create({
      description,
      projectId: data.projectId,
      startTime,
      endTime: undefined,
      duration: 0,
    });
  }

  /**
   * Stops an active timer by setting endTime and computing duration.
   * @param id - Time entry id to stop
   * @returns The updated time entry
   * @throws {TimeEntryNotFoundError} When no time entry exists with the given id
   * @throws {TimeEntryValidationError} When the entry is already stopped (has endTime)
   */
  async stopTimer(id: string): Promise<TimeEntry> {
    const entry = await this.timeEntryRepo.getById(id);
    if (entry === null) {
      throw new TimeEntryNotFoundError(id);
    }
    if (entry.endTime !== null) {
      throw new TimeEntryValidationError('This time entry is already stopped.');
    }

    const endTime = new Date();
    const duration = durationInSeconds(entry.startTime, endTime);

    return this.timeEntryRepo.update(id, {
      endTime,
      duration,
    });
  }

  /**
   * Updates an existing time entry. Recalculates duration if startTime or endTime change.
   * @param id - Time entry id
   * @param data - Fields to update (description, startTime, endTime)
   * @returns The updated time entry
   * @throws {TimeEntryNotFoundError} When no time entry exists with the given id
   */
  async updateEntry(
    id: string,
    data: UpdateTimeEntryInput
  ): Promise<TimeEntry> {
    const entry = await this.timeEntryRepo.getById(id);
    if (entry === null) {
      throw new TimeEntryNotFoundError(id);
    }

    const updateData: {
      description?: string;
      startTime?: Date;
      endTime?: Date;
      duration?: number;
    } = {};

    if (data.description !== undefined) {
      const trimmed = data.description.trim();
      updateData.description = trimmed;
    }
    if (data.startTime !== undefined) {
      updateData.startTime = data.startTime;
    }
    if (data.endTime !== undefined) {
      updateData.endTime = data.endTime;
    }

    const needsDurationRecalc =
      data.startTime !== undefined || data.endTime !== undefined;
    if (needsDurationRecalc) {
      const start = data.startTime ?? entry.startTime;
      const end = data.endTime ?? entry.endTime;
      if (end !== null) {
        updateData.duration = durationInSeconds(start, end);
      }
    }

    if (Object.keys(updateData).length === 0) {
      return entry;
    }

    return this.timeEntryRepo.update(id, updateData);
  }

  /**
   * Deletes a time entry by id.
   * @param id - Time entry id
   * @throws {TimeEntryNotFoundError} When no time entry exists with the given id
   */
  async deleteEntry(id: string): Promise<void> {
    const entry = await this.timeEntryRepo.getById(id);
    if (entry === null) {
      throw new TimeEntryNotFoundError(id);
    }
    await this.timeEntryRepo.delete(id);
  }
}
