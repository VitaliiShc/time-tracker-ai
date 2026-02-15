import { Reports } from '@/components/Reports';

export default function ReportsPage() {
  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
      <Reports />
    </main>
  );
}
