import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { TaskName } from '../../core/domain/task';
import { TaskRepository } from '../../core/repositories/task.repository';
import type { CreateTaskInput, UpdateTaskInput } from '../../core/services/task.service';
import { TaskService } from '../../core/services/task.service';
import { mapErrorToHttp } from '../utils/errorMapper';

const taskService = new TaskService(new TaskRepository());

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
    { status }
  );
}

function parseCreateBody(body: unknown): CreateTaskInput {
  const raw = body as Record<string, unknown> | null;
  if (!raw || typeof raw !== 'object') {
    return { name: '' };
  }
  return {
    name: typeof raw.name === 'string' ? raw.name : '',
    description: typeof raw.description === 'string' ? raw.description : undefined,
  };
}

function parseUpdateBody(body: unknown): UpdateTaskInput {
  const raw = body as Record<string, unknown> | null;
  if (!raw || typeof raw !== 'object') return {};
  const data: UpdateTaskInput = {};
  if (typeof raw.name === 'string') data.name = raw.name;
  if (typeof raw.description === 'string') data.description = raw.description;
  return data;
}

/** GET /api/tasks – list all task names */
export async function handleGetTasks(
  _req: NextRequest
): Promise<NextResponse<ApiResponse<TaskName[]>>> {
  try {
    const tasks = await taskService.getTasks();
    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    return errorResponse(error);
  }
}

/** GET /api/tasks/[id] – get one task name by id */
export async function handleGetTask(
  _req: NextRequest,
  id: string
): Promise<NextResponse<ApiResponse<TaskName>>> {
  try {
    const task = await taskService.getTask(id);
    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    return errorResponse(error);
  }
}

/** POST /api/tasks – create a task name */
export async function handleCreateTask(
  req: NextRequest
): Promise<NextResponse<ApiResponse<TaskName>>> {
  try {
    const body = await req.json().catch(() => ({}));
    const input = parseCreateBody(body);
    const task = await taskService.createTask(input);
    return NextResponse.json({ success: true, data: task }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

/** PATCH /api/tasks/[id] – update a task name */
export async function handleUpdateTask(
  req: NextRequest,
  id: string
): Promise<NextResponse<ApiResponse<TaskName>>> {
  try {
    const body = await req.json().catch(() => ({}));
    const input = parseUpdateBody(body);
    const task = await taskService.updateTask(id, input);
    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    return errorResponse(error);
  }
}

/** DELETE /api/tasks/[id] – delete a task name */
export async function handleDeleteTask(
  _req: NextRequest,
  id: string
): Promise<NextResponse<ApiResponse<void>>> {
  try {
    await taskService.deleteTask(id);
    return NextResponse.json({ success: true, data: undefined });
  } catch (error) {
    return errorResponse(error);
  }
}
