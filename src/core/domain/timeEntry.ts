// Core domain model for TimeEntry

export interface TimeEntry {
  id: string;
  projectId: string;
  taskNameId?: string;
  startedAt: Date;
  endedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

