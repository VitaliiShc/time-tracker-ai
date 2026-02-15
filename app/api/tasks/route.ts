import type { NextRequest } from 'next/server';
import {
  handleCreateTask,
  handleGetTasks,
} from '../../../src/api/tasks/task.api';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  return handleGetTasks(req);
}

export async function POST(req: NextRequest) {
  return handleCreateTask(req);
}
