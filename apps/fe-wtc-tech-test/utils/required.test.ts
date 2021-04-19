import required from './required';

const errorMessage = 'The parameter is required';
describe('required()', () => {
  test('throws error if parameter not supplied', () => {
    const func = () => {
      required(undefined, undefined);
    };

    expect(func).toThrowError(errorMessage);
  });

  test('throws error if parameter is null or undefined', () => {
    const funcNull = () => {
      required(null);
    };

    const funcUndef = () => {
      required(undefined);
    };

    expect(funcNull).toThrowError(errorMessage);
    expect(funcUndef).toThrowError(errorMessage);
  });

  test('does not throw error if parameter is a false boolean', () => {
    const func = () => {
      required(false);
    };

    expect(func).not.toThrowError();
  });
});
