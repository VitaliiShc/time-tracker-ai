'use client';

import { useState, useEffect, useCallback } from 'react';
import { useActiveTimer } from '../hooks/useActiveTimer';
import { useProjects } from '../hooks/useProjects';
import { useTasksAutocomplete } from '../hooks/useTasksAutocomplete';

/** Main timer UI: shows active timer or form to start one; uses hooks for data and actions. */
export function Timer() {
  const {
    activeEntry,
    error: timerError,
    startTimer,
    stopTimer,
  } = useActiveTimer();
  // const { projects } = useProjects();
  const {
    projects: projectsList = [],
    isLoading: projectsLoading,
    error: projectsError,
  } = useProjects();

  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const { suggestions, isLoading: suggestionsLoading } =
    useTasksAutocomplete(description);

  const startDate = activeEntry?.startedAt
    ? new Date(activeEntry.startedAt).getTime()
    : 0;

  useEffect(() => {
    if (!activeEntry || startDate <= 0) return;
    const tick = () =>
      setElapsedSeconds(Math.floor((Date.now() - startDate) / 1000));
    tick();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [activeEntry, startDate]);

  const handleSelectSuggestion = useCallback((name: string) => {
    setDescription(name);
  }, []);

  const handleStart = useCallback(() => {
    if (!description.trim() || !projectId) return;
    startTimer(description.trim(), projectId);
  }, [description, projectId, startTimer]);

  const projectName =
    activeEntry != null
      ? (projectsList.find((project) => project.id === activeEntry.projectId)
          ?.name ?? '—')
      : '';

  const taskDisplay =
    activeEntry?.notes ??
    (activeEntry as { description?: string } | null)?.description ??
    '—';
  const startTimeDisplay =
    activeEntry != null
      ? new Date(activeEntry.startedAt).toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '';

  const canStart =
    description.trim().length > 0 &&
    projectId.length > 0 &&
    activeEntry == null;

  if (activeEntry != null) {
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const secs = elapsedSeconds % 60;
    const elapsedDisplay = [hours, minutes, secs]
      .map((part) => String(part).padStart(2, '0'))
      .join(':');

    return (
      <div className="flex flex-col gap-3 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
        {timerError != null && (
          <p className="text-sm text-red-600" role="alert">
            {timerError}
          </p>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-600">Task</span>
          <p className="text-sm text-gray-900">{taskDisplay}</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-600">Project</span>
          <p className="text-sm text-gray-900">{projectName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-600">Start time</span>
          <p className="text-sm text-gray-900">{startTimeDisplay}</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-600">Elapsed</span>
          <p className="font-mono text-sm text-gray-900">{elapsedDisplay}</p>
        </div>
        <button
          type="button"
          onClick={() => stopTimer()}
          className="mt-2 inline-flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-700"
        >
          Stop
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      {timerError != null && (
        <p className="text-sm text-red-600" role="alert">
          {timerError}
        </p>
      )}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="timer-task"
          className="text-xs font-medium text-gray-600"
        >
          Task
        </label>
        <div className="relative">
          <input
            id="timer-task"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What are you working on?"
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          {suggestions.length > 0 && (
            <ul
              className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-sm"
              role="listbox"
            >
              {suggestions.map((task) => (
                <li
                  key={task.id}
                  role="option"
                  aria-selected={false}
                  onMouseDown={() => handleSelectSuggestion(task.name)}
                  className="cursor-pointer px-2 py-1.5 text-sm text-gray-900 hover:bg-gray-100"
                >
                  {task.name}
                </li>
              ))}
            </ul>
          )}
          {suggestionsLoading && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              …
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="timer-project"
          className="text-xs font-medium text-gray-600"
        >
          Project
        </label>

        {projectsError != null && (
          <p className="text-xs text-red-600" role="alert">
            {projectsError}
          </p>
        )}
        {projectsLoading && (
          <p className="text-xs text-gray-500">Loading projects…</p>
        )}

        <select
          id="timer-project"
          value={projectId}
          onChange={(event) => setProjectId(event.target.value)}
          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Select project</option>
          {projectsList.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleStart}
        disabled={!canStart}
        className="mt-2 inline-flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Start
      </button>
    </div>
  );
}
