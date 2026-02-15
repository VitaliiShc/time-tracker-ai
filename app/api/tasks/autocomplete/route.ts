import type { NextRequest } from 'next/server';
import { handleGetTasksAutocomplete } from '../../../../src/api/tasks/task.api';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  return handleGetTasksAutocomplete(req);
}
