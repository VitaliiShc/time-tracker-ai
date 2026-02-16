import type { TimeEntry } from '@prisma/client';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ProjectRepository } from '../../core/repositories/project.repository';
import { TimeEntryRepository } from '../../core/repositories/timeEntry.repository';
import type {
  StartTimerInput,
  UpdateTimeEntryInput,
} from '../../core/services/timeEntry.service';
import { TimeEntryService } from '../../core/services/timeEntry.service';
import { mapErrorToHttp } from '../utils/errorMapper';

const timeEntryService = new TimeEntryService(
  new TimeEntryRepository(),
  new ProjectRepository(),
);

/** Standard success response envelope */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/** Standard error response envelope */
export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/** Helper to return error response using mapErrorToHttp (no internal details leaked). */
function errorResponse(error: unknown): NextResponse<ApiErrorResponse> {
  const { status, body } = mapErrorToHttp(error);
  return NextResponse.json(
    {
      success: false,
      error: body.error,
      ...(body.code && { code: body.code }),
    },
    { status },
  );
}

export async function handleGetEntries(
  _req: NextRequest,
): Promise<NextResponse<ApiResponse<TimeEntry[]>>> {
  try {
    const entries = await timeEntryService.getEntries();
    return NextResponse.json({ success: true, data: entries });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function handleGetEntry(
  _req: NextRequest,
  id: string,
): Promise<NextResponse<ApiResponse<TimeEntry>>> {
  try {
    const entry = await timeEntryService.getEntry(id);
    return NextResponse.json({ success: true, data: entry });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function handleStartTimer(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<TimeEntry>>> {
  try {
    const body = await req.json();
    const input: StartTimerInput = {
      description: body?.description ?? '',
      projectId: body?.projectId ?? '',
    };
    const entry = await timeEntryService.startTimer(input);
    return NextResponse.json({ success: true, data: entry });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function handleStopTimer(
  _req: NextRequest,
  id: string,
): Promise<NextResponse<ApiResponse<TimeEntry>>> {
  try {
    const entry = await timeEntryService.stopTimer(id);
    return NextResponse.json({ success: true, data: entry });
  } catch (error) {
    return errorResponse(error);
  }
}

function parseUpdateBody(body: unknown): UpdateTimeEntryInput {
  const raw = body as Record<string, unknown> | null;
  if (!raw || typeof raw !== 'object') return {};
  const data: UpdateTimeEntryInput = {};
  if (typeof raw.description === 'string') data.description = raw.description;
  if (raw.startTime != null) data.startTime = new Date(raw.startTime as string);
  if (raw.endTime != null) data.endTime = new Date(raw.endTime as string);
  return data;
}

export async function handleUpdateEntry(
  req: NextRequest,
  id: string,
): Promise<NextResponse<ApiResponse<TimeEntry>>> {
  try {
    const body = await req.json().catch(() => ({}));
    const data = parseUpdateBody(body);
    const entry = await timeEntryService.updateEntry(id, data);
    return NextResponse.json({ success: true, data: entry });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function handleDeleteEntry(
  _req: NextRequest,
  id: string,
): Promise<NextResponse<ApiResponse<void>>> {
  try {
    await timeEntryService.deleteEntry(id);
    return NextResponse.json({ success: true, data: undefined });
  } catch (error) {
    return errorResponse(error);
  }
}
