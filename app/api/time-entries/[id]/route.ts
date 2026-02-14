import type { NextRequest } from 'next/server';
import {
  handleDeleteEntry,
  handleGetEntry,
  handleUpdateEntry,
} from '../../../../src/api/time-entries/timeEntry.api';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  return handleGetEntry(req, id);
}

export async function PATCH(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  return handleUpdateEntry(req, id);
}

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  return handleDeleteEntry(req, id);
}
