import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { handleCreateProject, handleListProjects } from '../../../src/api/projects/project.api';

export async function GET(req: NextRequest) {
  const projects = await handleListProjects(req);
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const project = await handleCreateProject(req);
  return NextResponse.json(project, { status: 201 });
}

