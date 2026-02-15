import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Project } from '../../core/domain/project';
import { ProjectRepository } from '../../core/repositories/project.repository';
import { ProjectService } from '../../core/services/project.service';
import { mapErrorToHttp } from '../utils/errorMapper';

const projectService = new ProjectService(new ProjectRepository());

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

function parseCreateBody(body: unknown): { name: string; color: string } {
  const raw = body as Record<string, unknown> | null;
  const name = typeof raw?.name === 'string' ? raw.name.trim() : '';
  const color =
    typeof raw?.color === 'string' && raw.color.trim().length > 0
      ? raw.color
      : '#3b82f6';
  return { name, color };
}

function parseUpdateBody(body: unknown): { name?: string; color?: string } {
  const raw = body as Record<string, unknown> | null;
  if (!raw || typeof raw !== 'object') return {};
  const data: { name?: string; color?: string } = {};
  if (typeof raw.name === 'string') data.name = raw.name.trim();
  if (typeof raw.color === 'string') data.color = raw.color;
  return data;
}

/** Thin API-layer helpers that route handlers can call. */

export async function handleListProjects(
  _req: NextRequest,
): Promise<NextResponse<ApiResponse<Project[]>>> {
  try {
    const projects = await projectService.getProjects();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function handleGetProject(
  _req: NextRequest,
  id: string,
): Promise<NextResponse<ApiResponse<Project>>> {
  try {
    const project = await projectService.getProject(id);
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function handleCreateProject(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<Project>>> {
  try {
    const body = await req.json().catch(() => ({}));
    const input = parseCreateBody(body);
    const project = await projectService.createProject(input);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function handleUpdateProject(
  req: NextRequest,
  id: string,
): Promise<NextResponse<ApiResponse<Project>>> {
  try {
    const body = await req.json().catch(() => ({}));
    const data = parseUpdateBody(body);
    const project = await projectService.updateProject(id, data);
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function handleDeleteProject(
  _req: NextRequest,
  id: string,
): Promise<NextResponse<ApiResponse<void>>> {
  try {
    await projectService.deleteProject(id);
    return NextResponse.json({ success: true, data: undefined });
  } catch (error) {
    return errorResponse(error);
  }
}
