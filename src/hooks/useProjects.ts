'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Project } from '../core/domain/project';
import * as projectService from '../services/projectService';

/**
 * Manages projects state and CRUD operations via projectService.
 * Fetches projects on mount and exposes reload and mutation helpers.
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const list = await projectService.getProjects();
      setProjects(list);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const reload = useCallback(() => loadProjects(), [loadProjects]);

  const createProject = useCallback(
    async (input: { name: string; color: string }) => {
      setError(null);
      try {
        await projectService.createProject(input);
        await loadProjects();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      }
    },
    [loadProjects],
  );

  const updateProject = useCallback(
    async (id: string, data: Partial<Pick<Project, 'name' | 'color'>>) => {
      setError(null);
      try {
        await projectService.updateProject(id, data);
        await loadProjects();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      }
    },
    [loadProjects],
  );

  const deleteProject = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await projectService.deleteProject(id);
        await loadProjects();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      }
    },
    [loadProjects],
  );

  return {
    projects,
    isLoading,
    error,
    reload,
    createProject,
    updateProject,
    deleteProject,
  };
}
