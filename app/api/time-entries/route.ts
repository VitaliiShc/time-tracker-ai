import type { NextRequest } from 'next/server';
import {
  handleGetEntries,
  handleStartTimer,
} from '../../../src/api/time-entries/timeEntry.api';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  return handleGetEntries(req);
}

export async function POST(req: NextRequest) {
  return handleStartTimer(req);
}
