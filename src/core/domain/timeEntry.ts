// Core domain model for TimeEntry

export interface TimeEntry {
  id: string;
  projectId: string;
  taskNameId?: string;

  description: string; // task name
  startTime: Date;
  endTime?: Date;

  duration?: number; // seconds (derived on backend)

  createdAt: Date;
  updatedAt: Date;
}
