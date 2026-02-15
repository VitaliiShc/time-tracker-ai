import type { NextRequest } from 'next/server';
import { handleStopTimer } from '../../../../../src/api/time-entries/timeEntry.api';

type RouteContext = { params: Promise<{ id: string }> };

export const runtime = 'nodejs';

export async function POST(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return handleStopTimer(req, id);
}
