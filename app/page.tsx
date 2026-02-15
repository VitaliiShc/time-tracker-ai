import { Timer } from '@/components/Timer';
import { TimeEntryList } from '@/components/TimeEntryList';

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Timer />
      <TimeEntryList />
    </main>
  );
}
