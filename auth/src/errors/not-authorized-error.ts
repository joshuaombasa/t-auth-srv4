import { CustomError } from './custom-error';

class NotAuthorizedError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export { NotAuthorizedError };
