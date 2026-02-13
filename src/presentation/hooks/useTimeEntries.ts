import { useEffect, useState } from 'react';
import type { TimeEntry } from '../../core/domain/timeEntry';

// Placeholder hook for consuming time entry data.
export function useTimeEntries(projectId: string | null) {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectId) {
      setEntries([]);
      return;
    }

    let isMounted = true;
    setLoading(true);

    // TODO: Replace with real fetch once API is implemented.
    (async () => {
      if (!isMounted) return;
      setEntries([]);
      setLoading(false);
    })();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  return { entries, loading };
}

