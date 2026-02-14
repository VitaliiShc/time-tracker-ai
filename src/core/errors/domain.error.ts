/**
 * Base class for domain-specific errors in the application.
 *
 * Use DomainError (or its subclasses) for business logic violations, validation
 * failures, and other domain-level error conditions. The machine-readable `code`
 * enables programmatic error handling and i18n.
 *
 * @example
 * ```ts
 * throw new DomainError('User not found', 'USER_NOT_FOUND');
 *
 * // Extend for specific domain errors
 * class UserNotFoundError extends DomainError {
 *   constructor(userId: string) {
 *     super(`User with id "${userId}" not found`, 'USER_NOT_FOUND');
 *   }
 * }
 * ```
 */
export class DomainError extends Error {
  /**
   * Machine-readable error code for programmatic handling and i18n.
   * Use UPPER_SNAKE_CASE (e.g. 'USER_NOT_FOUND', 'VALIDATION_FAILED').
   */
  readonly code: string;

  /**
   * Creates a DomainError.
   *
   * @param message - Human-readable error message
   * @param code - Machine-readable error code
   */
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = 'DomainError';

    // Maintains correct stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Required for proper instanceof checks when targeting ES5/transpiled code
    Object.setPrototypeOf(this, DomainError.prototype);
  }

  /**
   * Returns a plain object suitable for logging or API responses.
   */
  toJSON(): { name: string; message: string; code: string } {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
    };
  }
}
