import type { TimeEntry } from '../domain/timeEntry';

export type Period = 'day' | 'week' | 'month';

/**
 * Normalizes startedAt to a Date in local time; returns null if missing or invalid.
 */
function parseStartedAt(entry: TimeEntry): Date | null {
  const value = entry.startedAt;
  if (value == null) return null;
  const date = value instanceof Date ? value : new Date(value as string);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

/**
 * Returns Monday 00:00:00 in local time for the week containing the given date (ISO week).
 */
function getWeekMonday(date: Date): Date {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayOfWeek = copy.getDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  copy.setDate(copy.getDate() - daysFromMonday);
  return copy;
}

function sameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function sameWeek(left: Date, right: Date): boolean {
  const mondayLeft = getWeekMonday(left);
  const mondayRight = getWeekMonday(right);
  return mondayLeft.getTime() === mondayRight.getTime();
}

function sameMonth(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth()
  );
}

/**
 * Filters time entries to those whose startedAt falls within the given period (day, week, or month)
 * relative to a reference date. Uses local time; does not mutate the input array.
 *
 * @param entries - Time entries to filter
 * @param period - "day" | "week" | "month"
 * @param referenceDate - Reference date (defaults to now)
 * @returns New array of entries in the period; entries with invalid startedAt are excluded
 */
export function filterTimeEntriesByPeriod(
  entries: TimeEntry[],
  period: Period,
  referenceDate: Date = new Date()
): TimeEntry[] {
  if (entries.length === 0) return [];

  const ref = referenceDate instanceof Date ? referenceDate : new Date(referenceDate);

  const predicate = (entry: TimeEntry): boolean => {
    const startedAt = parseStartedAt(entry);
    if (startedAt === null) return false;
    switch (period) {
      case 'day':
        return sameDay(startedAt, ref);
      case 'week':
        return sameWeek(startedAt, ref);
      case 'month':
        return sameMonth(startedAt, ref);
      default:
        return false;
    }
  };

  return entries.filter(predicate);
}
