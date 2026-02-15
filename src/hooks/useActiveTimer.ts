'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TimeEntry } from '../core/domain/timeEntry';
import {
  getTimeEntries,
  startTimer as serviceStartTimer,
  stopTimer as serviceStopTimer,
} from '../services/timeEntryService';

/**
 * Finds the single active time entry (no endedAt) from a list.
 * Relies on backend rule: at most one active entry.
 */
function findActiveEntry(entries: TimeEntry[]): TimeEntry | null {
  const active = entries.find((entry) => entry.endedAt == null);
  return active ?? null;
}

/**
 * Orchestrates state for the currently active time entry.
 * Uses timeEntryService only; no UI or period/grouping logic.
 */
export function useActiveTimer() {
  const [activeEntry, setActiveEntry] = useState<TimeEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const entries = await getTimeEntries();
      setActiveEntry(findActiveEntry(entries));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const startTimer = useCallback(
    async (description: string, projectId: string) => {
      setError(null);
      try {
        const entry = await serviceStartTimer({ description, projectId });
        setActiveEntry(entry);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      }
    },
    [],
  );

  const stopTimer = useCallback(async () => {
    if (activeEntry == null) return;
    setError(null);
    try {
      await serviceStopTimer(activeEntry.id);
      setActiveEntry(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  }, [activeEntry]);

  return {
    activeEntry,
    isLoading,
    error,
    startTimer,
    stopTimer,
    refresh,
  };
}
