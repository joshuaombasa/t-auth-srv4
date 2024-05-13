abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(public message: string) {
    super();

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeError(): { message: string; field?: string }[];
}

export { CustomError };
