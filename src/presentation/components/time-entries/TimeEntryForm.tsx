'use client';

export interface TimeEntryFormProps {
  onSubmit?: () => void;
}

// Purely presentational shell for a time entry form.
export function TimeEntryForm({ onSubmit }: TimeEntryFormProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-md border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Task</label>
        <input
          type="text"
          className="rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="What are you working on?"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Start</label>
          <input
            type="datetime-local"
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">End</label>
          <input
            type="datetime-local"
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
      >
        Start Tracking
      </button>
    </form>
  );
}

