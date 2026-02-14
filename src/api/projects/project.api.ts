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

/** Thin API-layer helpers that route handlers can call. */

export async function handleListProjects(
  _req: NextRequest
): Promise<NextResponse<ApiResponse<Project[]>>> {
  try {
    const projects = await projectService.getProjects();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    const { status, body } = mapErrorToHttp(error);
    return NextResponse.json(
      { success: false, error: body.error, ...(body.code && { code: body.code }) },
      { status }
    );
  }
}

export async function handleCreateProject(
  _req: NextRequest
): Promise<NextResponse<ApiResponse<Project>>> {
  try {
    // TODO: Parse body, validate, and delegate to service.
    const project = await projectService.createProject({
      name: 'placeholder',
      color: '#000000',
    });
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    const { status, body } = mapErrorToHttp(error);
    return NextResponse.json(
      { success: false, error: body.error, ...(body.code && { code: body.code }) },
      { status }
    );
  }
}
