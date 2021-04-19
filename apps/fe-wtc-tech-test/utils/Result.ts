interface IResult<T> {
  success: boolean;
  errors: string[];
  code: number;
  value;
}

class ResultWrapper<T> implements IResult<T> {
  constructor(
    public value: T,
    public success: boolean = false,
    public errors: string[] = [],
    public code: number = 200
  ) {
    this.success = success;
    this.errors = errors;
    this.code = code;
    this.value = value;
  }
}

const Result = {
  Error: (errorMessages: string[] | string, code?: number) => {
    let errors: string[] = [];
    if (!Array.isArray(errorMessages)) {
      errors.push(errorMessages);
    } else {
      errors = errorMessages;
    }

    return new ResultWrapper(undefined, false, errors, code || 500);
  },
  Success: (value) => new ResultWrapper(value, true),
};

export default Result;
