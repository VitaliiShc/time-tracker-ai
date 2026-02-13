import type { NextRequest } from 'next/server';
import { PrismaTimeEntryRepository } from '../../core/repositories/timeEntry.repository';
import { TimeEntryService } from '../../core/services/timeEntry.service';

const timeEntryService = new TimeEntryService(new PrismaTimeEntryRepository());

export async function handleListTimeEntries(_req: NextRequest) {
  // TODO: Extract projectId from query and delegate to service.
  return timeEntryService.listByProject('placeholder-project-id');
}

export async function handleCreateTimeEntry(_req: NextRequest) {
  // TODO: Parse body and delegate to service.
  return timeEntryService.createTimeEntry({
    projectId: 'placeholder-project-id',
    startedAt: new Date(),
  });
}

