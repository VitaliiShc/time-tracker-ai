import { DomainError } from '@/core/errors/domain.error';
import {
  ProjectNotFoundError,
  ProjectValidationError,
} from '@/core/services/project.service';
import {
  ActiveTimerExistsError,
  TimeEntryNotFoundError,
  TimeEntryValidationError,
} from '@/core/services/timeEntry.service';

/** Shape of the HTTP error response body */
export interface HttpErrorResponseBody {
  error: string;
  code?: string;
}

/** Result returned by mapErrorToHttp for use in any HTTP framework */
export interface MappedHttpError {
  status: number;
  body: HttpErrorResponseBody;
}

/**
 * Maps application and domain errors to HTTP status codes and response bodies.
 *
 * Use this utility in API route handlers or middleware to produce consistent
 * error responses without framework coupling. The returned object can be
 * passed to NextResponse.json(), Express res.status().json(), or similar.
 *
 * @param error - The caught error (unknown type for catch clauses)
 * @returns Object with `status` and `body` suitable for HTTP responses
 *
 * @example
 * ```ts
 * try {
 *   await projectService.getById(id);
 * } catch (err) {
 *   const { status, body } = mapErrorToHttp(err);
 *   return NextResponse.json(body, { status });
 * }
 * ```
 */
export function mapErrorToHttp(error: unknown): MappedHttpError {
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred';

  if (error instanceof ProjectNotFoundError) {
    return {
      status: 404,
      body: { error: message, code: 'PROJECT_NOT_FOUND' },
    };
  }

  if (error instanceof TimeEntryNotFoundError) {
    return {
      status: 404,
      body: { error: message, code: 'TIME_ENTRY_NOT_FOUND' },
    };
  }

  if (error instanceof ActiveTimerExistsError) {
    return {
      status: 409,
      body: { error: message, code: 'ACTIVE_TIMER_EXISTS' },
    };
  }

  if (error instanceof ProjectValidationError) {
    return {
      status: 400,
      body: { error: message, code: 'PROJECT_VALIDATION_ERROR' },
    };
  }

  if (error instanceof TimeEntryValidationError) {
    return {
      status: 400,
      body: { error: message, code: 'TIME_ENTRY_VALIDATION_ERROR' },
    };
  }

  if (error instanceof DomainError) {
    return {
      status: 400,
      body: { error: message, code: error.code },
    };
  }

  return {
    status: 500,
    body: {
      error: 'An unexpected error occurred',
      code: 'INTERNAL_SERVER_ERROR',
    },
  };
}
