import MissingParameterError from './MissingParameterError';

describe('MissingParameterError', () => {
  test('default error message is correct', () => {
    const error = new MissingParameterError();
    expect(error.message).toEqual('The parameter is required');
  });

  test('parameter name is appended to error message', () => {
    const error = new MissingParameterError('test');
    expect(error.message).toEqual("The parameter is required: 'test'");
  });
});
