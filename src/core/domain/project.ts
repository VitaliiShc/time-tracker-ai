// Core domain model for Project

export interface Project {
  id: string;
  name: string;
  description?: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

