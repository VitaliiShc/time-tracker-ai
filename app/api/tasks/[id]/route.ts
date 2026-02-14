import type { NextRequest } from 'next/server';
import {
  handleDeleteTask,
  handleGetTask,
  handleUpdateTask,
} from '../../../../src/api/tasks/task.api';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  return handleGetTask(req, id);
}

export async function PATCH(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  return handleUpdateTask(req, id);
}

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  return handleDeleteTask(req, id);
}
