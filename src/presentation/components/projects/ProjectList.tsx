'use client';

import type { Project } from '../../../core/domain/project';

export interface ProjectListProps {
  projects: Project[];
}

// Presentation-only component; no data fetching or business logic.
export function ProjectList({ projects }: ProjectListProps) {
  if (!projects.length) {
    return (
      <div className="rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        No projects yet. Create your first project to start tracking time.
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {projects.map((project) => (
        <li
          key={project.id}
          className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm"
        >
          <span className="font-medium text-gray-900">{project.name}</span>
        </li>
      ))}
    </ul>
  );
}

