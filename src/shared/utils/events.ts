export const TIME_ENTRIES_CHANGED_EVENT = 'time-entries:changed';

export function emitTimeEntriesChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(TIME_ENTRIES_CHANGED_EVENT));
}

export function onTimeEntriesChanged(handler: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const listener = () => handler();
  window.addEventListener(TIME_ENTRIES_CHANGED_EVENT, listener);

  return () => window.removeEventListener(TIME_ENTRIES_CHANGED_EVENT, listener);
}
