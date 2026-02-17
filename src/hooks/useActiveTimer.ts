'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TimeEntry } from '../core/domain/timeEntry';
import {
  getTimeEntries,
  startTimer as serviceStartTimer,
  stopTimer as serviceStopTimer,
} from '../services/timeEntryService';
import { emitTimeEntriesChanged } from '../shared/utils/events';

/**
 * Finds the single active time entry (no endTime) from a list.
 * Relies on backend rule: at most one active entry.
 */
function findActiveEntry(entries: TimeEntry[]): TimeEntry | null {
  const active = entries.find((entry) => entry.endTime == null);
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
        emitTimeEntriesChanged();
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
      emitTimeEntriesChanged();
      await refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);

      // crude but effective: your apiClient likely throws Error(message)
      const looksLikeNotFound =
        message.toLowerCase().includes('not found') || message.includes('404');

      if (looksLikeNotFound) {
        // Active entry no longer exists — reconcile state
        setActiveEntry(null);
        await refresh();
        setError('Active entry no longer exists (it may have been deleted).');
        return;
      }

      setError(message);
    }
  }, [activeEntry, refresh]);

  return {
    activeEntry,
    isLoading,
    error,
    startTimer,
    stopTimer,
    refresh,
  };
}
