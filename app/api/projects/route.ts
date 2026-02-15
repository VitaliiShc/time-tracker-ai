import type { NextRequest } from 'next/server';
import {
  handleCreateProject,
  handleListProjects,
} from '../../../src/api/projects/project.api';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  return handleListProjects(req);
}

export async function POST(req: NextRequest) {
  return handleCreateProject(req);
}
