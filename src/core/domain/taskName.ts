// Core domain model for TaskName (simple string entity for autocomplete)

export interface TaskName {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

