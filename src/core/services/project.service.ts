import type { Project } from '../domain/project';
import type { ProjectRepository } from '../repositories/project.repository';

/** Input for creating a new project */
export interface CreateProjectInput {
  name: string;
  color: string;
}

/** Input for updating an existing project */
export interface UpdateProjectInput {
  name?: string;
  color?: string;
}

/** Thrown when a project is not found by id */
export class ProjectNotFoundError extends Error {
  constructor(id: string) {
    super(`Project not found: ${id}`);
    this.name = 'ProjectNotFoundError';
  }
}

/** Thrown when project validation fails (e.g. empty name or duplicate name) */
export class ProjectValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectValidationError';
  }
}

/**
 * Application service for Project entity.
 * Encapsulates business logic and delegates persistence to the repository.
 */
export class ProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}

  /**
   * Returns all projects, ordered by creation date (newest first).
   * @returns List of all projects
   */
  async getProjects(): Promise<Project[]> {
    return this.projectRepo.getAll() as Promise<Project[]>;
  }

  /**
   * Returns a single project by id.
   * @param id - Project id
   * @returns The project
   * @throws {ProjectNotFoundError} When no project exists with the given id
   */
  async getProject(id: string): Promise<Project> {
    const project = await this.projectRepo.getById(id);
    if (project === null) {
      throw new ProjectNotFoundError(id);
    }
    return project as Project;
  }

  /**
   * Creates a new project after validating name and ensuring no duplicate name.
   * @param data - Name and color for the new project
   * @returns The created project
   * @throws {ProjectValidationError} When name is empty or a project with the same name already exists
   */
  async createProject(data: CreateProjectInput): Promise<Project> {
    const name = data.name.trim();
    if (name.length === 0) {
      throw new ProjectValidationError('Project name cannot be empty.');
    }
    const existing = await this.projectRepo.getByName(name);
    if (existing !== null) {
      throw new ProjectValidationError(
        `A project with the name "${name}" already exists.`,
      );
    }
    return this.projectRepo.create({
      name,
      color: data.color,
    }) as Promise<Project>;
  }

  /**
   * Updates an existing project. Only provided fields are updated.
   * @param id - Project id
   * @param data - Fields to update (name and/or color)
   * @returns The updated project
   * @throws {ProjectNotFoundError} When no project exists with the given id
   * @throws {ProjectValidationError} When provided name is empty
   */
  async updateProject(id: string, data: UpdateProjectInput): Promise<Project> {
    await this.getProject(id);

    const updateData: UpdateProjectInput = {};
    if (data.name !== undefined) {
      const name = data.name.trim();
      if (name.length === 0) {
        throw new ProjectValidationError('Project name cannot be empty.');
      }
      updateData.name = name;
    }
    if (data.color !== undefined) {
      updateData.color = data.color;
    }

    if (Object.keys(updateData).length === 0) {
      return this.getProject(id);
    }

    return this.projectRepo.update(id, updateData) as Promise<Project>;
  }

  /**
   * Deletes a project by id.
   * @param id - Project id
   * @throws {ProjectNotFoundError} When no project exists with the given id
   */
  async deleteProject(id: string): Promise<void> {
    await this.getProject(id);
    await this.projectRepo.delete(id);
  }
}
