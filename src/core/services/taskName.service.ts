import type { TaskName } from '../domain/taskName';
import type { TaskNameRepository } from '../repositories/taskName.repository';

export class TaskNameService {
  constructor(private readonly taskNameRepo: TaskNameRepository) {}

  async search(query?: string): Promise<TaskName[]> {
    return this.taskNameRepo.list(query);
  }

  async recordUsage(name: string): Promise<TaskName> {
    return this.taskNameRepo.upsertByName(name);
  }
}

