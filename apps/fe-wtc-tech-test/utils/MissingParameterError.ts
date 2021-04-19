import { ErrorMessages } from '../constants';

export default class MissingParameterError extends Error {
  constructor(parameterName?: string) {
    super();
    this.message = ErrorMessages.REQUIRED_PARAMETER;
    if (parameterName) {
      this.message += `: '${parameterName}'`;
    }
  }
}
