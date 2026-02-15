import type { NextRequest } from 'next/server';
import {
  handleDeleteProject,
  handleGetProject,
  handleUpdateProject,
} from '@/api/projects/project.api';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return handleGetProject(req, id);
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return handleUpdateProject(req, id);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return handleDeleteProject(req, id);
}
