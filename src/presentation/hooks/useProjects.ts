import { useEffect, useState } from 'react';
import type { Project } from '../../core/domain/project';

// Simple placeholder hook for consuming the projects API.
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // TODO: Replace with real fetch once API is implemented.
    (async () => {
      if (!isMounted) return;
      setProjects([]);
      setLoading(false);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, loading };
}

