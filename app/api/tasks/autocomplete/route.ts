import type { NextRequest } from 'next/server';
import { handleGetTasksAutocomplete } from '../../../../src/api/tasks/task.api';

export async function GET(req: NextRequest) {
  return handleGetTasksAutocomplete(req);
}
