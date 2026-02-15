'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Project } from '@/core/domain/project';
import { useProjects } from '@/hooks/useProjects';

type EditState = {
  projectId: string;
  name: string;
  color?: string;
};

export default function ProjectsPage() {
  const projectsState = useProjects();
  const {
    projects = [],
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
    reload,
  } = projectsState;

  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState<string>('#3b82f6'); // default blue
  const [editState, setEditState] = useState<EditState | null>(null);

  const sortedProjects = useMemo(() => {
    const safeProjects = Array.isArray(projects) ? projects : [];
    return [...safeProjects].sort((left, right) =>
      left.name.localeCompare(right.name),
    );
  }, [projects]);

  const handleCreate = useCallback(async () => {
    const trimmedName = newName.trim();
    if (!trimmedName) return;

    await createProject({
      name: trimmedName,
      color: newColor || undefined,
    });

    setNewName('');
  }, [createProject, newColor, newName]);

  const handleStartEdit = useCallback((project: Project) => {
    setEditState({
      projectId: project.id,
      name: project.name,
      color: project.color ?? '#3b82f6',
    });
  }, []);

  const handleCancelEdit = useCallback(() => setEditState(null), []);

  const handleSaveEdit = useCallback(async () => {
    if (!editState) return;

    const trimmedName = editState.name.trim();
    if (!trimmedName) return;

    await updateProject(editState.projectId, {
      name: trimmedName,
      color: editState.color || undefined,
    });

    setEditState(null);
  }, [editState, updateProject]);

  const handleDelete = useCallback(
    async (projectId: string) => {
      const confirmed = window.confirm('Delete this project?');
      if (!confirmed) return;
      await deleteProject(projectId);
    },
    [deleteProject],
  );

  return (
    <main className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
        <button
          type="button"
          onClick={() => reload()}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">Add project</h2>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="project-name"
              className="text-xs font-medium text-gray-600"
            >
              Name
            </label>
            <input
              id="project-name"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="e.g. Client A"
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="project-color"
              className="text-xs font-medium text-gray-600"
            >
              Color
            </label>
            <input
              id="project-color"
              type="color"
              value={newColor}
              onChange={(event) => setNewColor(event.target.value)}
              className="h-9 w-14 cursor-pointer rounded border border-gray-300 bg-white p-1"
              aria-label="Project color"
            />
          </div>

          <button
            type="button"
            onClick={handleCreate}
            disabled={newName.trim().length === 0}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add Project
          </button>
        </div>

        {error != null && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </section>

      <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Project list</h2>
          {isLoading && <span className="text-xs text-gray-500">Loading…</span>}
        </div>

        {!isLoading && sortedProjects.length === 0 && (
          <p className="mt-3 text-sm text-gray-600">No projects yet.</p>
        )}

        {sortedProjects.length > 0 && (
          <ul className="mt-3 divide-y divide-gray-100">
            {sortedProjects.map((project) => {
              const isEditing = editState?.projectId === project.id;

              return (
                <li
                  key={project.id}
                  className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: project.color ?? '#9ca3af' }}
                      aria-hidden="true"
                    />
                    {!isEditing ? (
                      <span className="text-sm font-medium text-gray-900">
                        {project.name}
                      </span>
                    ) : (
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input
                          value={editState.name}
                          onChange={(event) =>
                            setEditState({
                              ...editState,
                              name: event.target.value,
                            })
                          }
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-72"
                          aria-label="Edit project name"
                        />
                        <input
                          type="color"
                          value={editState.color ?? '#3b82f6'}
                          onChange={(event) =>
                            setEditState({
                              ...editState,
                              color: event.target.value,
                            })
                          }
                          className="h-9 w-14 cursor-pointer rounded border border-gray-300 bg-white p-1"
                          aria-label="Edit project color"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {!isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleStartEdit(project)}
                          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id)}
                          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={handleSaveEdit}
                          disabled={editState.name.trim().length === 0}
                          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
