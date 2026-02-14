/**
 * Domain type for TaskName entity.
 * Represents a named task (e.g. for autocomplete or time entry labels).
 */
export interface TaskName {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
