'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TimeEntry } from '../core/domain/timeEntry';
import {
  getTimeEntries,
  updateTimeEntry as serviceUpdateTimeEntry,
  deleteTimeEntry as serviceDeleteTimeEntry,
} from '../services/timeEntryService';

/**
 * Manages time entries state and CRUD orchestration via timeEntryService.
 * Fetches all entries on mount and exposes reload, update, and delete helpers.
 */
export function useTimeEntries() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTimeEntries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const list = await getTimeEntries();
      setTimeEntries(list);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTimeEntries();
  }, [loadTimeEntries]);

  const reload = useCallback(() => loadTimeEntries(), [loadTimeEntries]);

  const updateTimeEntry = useCallback(
    async (id: string, data: Partial<TimeEntry>) => {
      setError(null);
      try {
        await serviceUpdateTimeEntry(id, data);
        await loadTimeEntries();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      }
    },
    [loadTimeEntries],
  );

  const deleteTimeEntry = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await serviceDeleteTimeEntry(id);
        await loadTimeEntries();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      }
    },
    [loadTimeEntries],
  );

  return {
    timeEntries,
    isLoading,
    error,
    reload,
    updateTimeEntry,
    deleteTimeEntry,
  };
}
