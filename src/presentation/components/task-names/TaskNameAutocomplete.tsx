'use client';

export interface TaskNameAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
}

// UI-only autocomplete shell; wiring to data will be added later.
export function TaskNameAutocomplete({ value, onChange }: TaskNameAutocompleteProps) {
  return (
    <input
      type="text"
      className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      placeholder="Task name"
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
    />
  );
}

