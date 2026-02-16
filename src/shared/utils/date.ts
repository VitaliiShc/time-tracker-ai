// Shared date utilities for time tracking.

export function toIsoString(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

export function diffInMinutes(start: Date, end: Date): number {
  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / 1000 / 60);
}
