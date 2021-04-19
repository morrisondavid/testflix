import isFunction from './isFunction';

describe('isFunction()', () => {
  test('returns true for functions', () => {
    const dummyFunction = () => null;

    const result = isFunction(dummyFunction);

    expect(result).toEqual(true);
  });

  test('returns false for dates', () => {
    const result = isFunction(new Date());

    expect(result).toEqual(false);
  });

  test('returns false for arrays', () => {
    const result = isFunction([]);

    expect(result).toEqual(false);
  });

  test('returns false for objects', () => {
    const result = isFunction({});

    expect(result).toEqual(false);
  });
});
