import { CustomError } from './custom-error';

class NotAuthorizedError extends CustomError {
  readonly statusCode = 401;

  constructor(message = 'Not authorized') {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export { NotAuthorizedError };
