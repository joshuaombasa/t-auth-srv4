abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    // Set the prototype explicitly for proper `instanceof` checks
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture the stack trace (helps in debugging)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  abstract serializeError(): { message: string; field?: string }[];
}

export { CustomError };
