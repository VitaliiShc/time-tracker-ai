'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { TaskName } from '../core/domain/task';
import { getTasksAutocomplete } from '../services/taskService';

const DEBOUNCE_MS = 200;

/**
 * Fetches task name suggestions for autocomplete. Debounces requests as the query changes.
 */
export function useTasksAutocomplete(query: string) {
  const [suggestions, setSuggestions] = useState<TaskName[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await getTasksAutocomplete(searchQuery.trim());
      setSuggestions(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(query);
      debounceRef.current = null;
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSuggestions]);

  return { suggestions, isLoading, error };
}
