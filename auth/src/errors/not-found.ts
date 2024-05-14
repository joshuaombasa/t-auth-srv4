import { CustomError } from './custom-error';

class NotFoundError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export { NotFoundError };
