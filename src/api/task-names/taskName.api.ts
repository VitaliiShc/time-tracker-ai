import type { NextRequest } from 'next/server';
import { PrismaTaskNameRepository } from '../../core/repositories/taskName.repository';
import { TaskNameService } from '../../core/services/taskName.service';

const taskNameService = new TaskNameService(new PrismaTaskNameRepository());

export async function handleSearchTaskNames(_req: NextRequest) {
  // TODO: Extract query param and delegate to service.
  return taskNameService.search();
}

export async function handleRecordTaskNameUsage(_req: NextRequest) {
  // TODO: Parse body and delegate to service.
  return taskNameService.recordUsage('placeholder-task-name');
}

