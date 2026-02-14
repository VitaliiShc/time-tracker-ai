import type { TaskName } from '../domain/task';
import type { TaskRepository } from '../repositories/task.repository';

/** Input for creating a new task name */
export interface CreateTaskInput {
  name: string;
  description?: string;
}

/** Input for updating an existing task name */
export interface UpdateTaskInput {
  name?: string;
  description?: string;
}

/** Thrown when a task name is not found by id */
export class TaskNotFoundError extends Error {
  constructor(id: string) {
    super(`Task not found: ${id}`);
    this.name = 'TaskNotFoundError';
  }
}

/** Thrown when task name validation fails (e.g. empty name or duplicate name) */
export class TaskValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TaskValidationError';
  }
}

/**
 * Application service for TaskName entity.
 * Encapsulates business rules and delegates persistence to the repository.
 */
export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  /**
   * Returns all task names.
   * @returns List of all task names
   */
  async getTasks(): Promise<TaskName[]> {
    return this.taskRepo.getAll();
  }

  /**
   * Returns a single task name by id.
   * @param id - Task name id (UUID)
   * @returns The task name
   * @throws {TaskNotFoundError} When no task exists with the given id
   */
  async getTask(id: string): Promise<TaskName> {
    const task = await this.taskRepo.getById(id);
    if (task === null) {
      throw new TaskNotFoundError(id);
    }
    return task;
  }

  /**
   * Creates a new task name. Name must be non-empty and unique.
   * @param input - Name and optional description
   * @returns The created task name
   * @throws {TaskValidationError} When name is empty or a task with the same name already exists
   */
  async createTask(input: CreateTaskInput): Promise<TaskName> {
    const name = input.name.trim();
    if (name.length === 0) {
      throw new TaskValidationError('Task name cannot be empty.');
    }
    const existing = await this.taskRepo.getByName(name);
    if (existing !== null) {
      throw new TaskValidationError(`A task with the name "${name}" already exists.`);
    }
    return this.taskRepo.create({ name, description: input.description });
  }

  /**
   * Updates an existing task name. Only provided fields are updated.
   * @param id - Task name id (UUID)
   * @param input - Fields to update (name and/or description)
   * @returns The updated task name
   * @throws {TaskNotFoundError} When no task exists with the given id
   * @throws {TaskValidationError} When provided name is empty or duplicate
   */
  async updateTask(id: string, input: UpdateTaskInput): Promise<TaskName> {
    await this.getTask(id);

    const updateData: UpdateTaskInput = {};
    if (input.name !== undefined) {
      const name = input.name.trim();
      if (name.length === 0) {
        throw new TaskValidationError('Task name cannot be empty.');
      }
      const existing = await this.taskRepo.getByName(name);
      if (existing !== null && existing.id !== id) {
        throw new TaskValidationError(`A task with the name "${name}" already exists.`);
      }
      updateData.name = name;
    }
    if (input.description !== undefined) {
      updateData.description = input.description;
    }

    if (Object.keys(updateData).length === 0) {
      return this.getTask(id);
    }

    return this.taskRepo.update(id, updateData);
  }

  /**
   * Deletes a task name by id.
   * @param id - Task name id (UUID)
   * @throws {TaskNotFoundError} When no task exists with the given id
   */
  async deleteTask(id: string): Promise<void> {
    await this.getTask(id);
    await this.taskRepo.delete(id);
  }
}
