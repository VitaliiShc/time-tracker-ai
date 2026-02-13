import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  handleCreateTimeEntry,
  handleListTimeEntries,
} from '../../../src/api/time-entries/timeEntry.api';

export async function GET(req: NextRequest) {
  const entries = await handleListTimeEntries(req);
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  const entry = await handleCreateTimeEntry(req);
  return NextResponse.json(entry, { status: 201 });
}

