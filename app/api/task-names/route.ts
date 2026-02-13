import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  handleRecordTaskNameUsage,
  handleSearchTaskNames,
} from '../../../src/api/task-names/taskName.api';

export async function GET(req: NextRequest) {
  const taskNames = await handleSearchTaskNames(req);
  return NextResponse.json(taskNames);
}

export async function POST(req: NextRequest) {
  const taskName = await handleRecordTaskNameUsage(req);
  return NextResponse.json(taskName, { status: 201 });
}

