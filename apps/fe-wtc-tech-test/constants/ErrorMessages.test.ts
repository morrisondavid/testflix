import { ErrorMessages } from '.';

let testedValues = 0;

describe('ErrorMessages', () => {
  test('values are correct', () => {
    expect(ErrorMessages.REDUCER_ACTION_HANDLERS_MISSING).toEqual(
      'Cannot create reducer. No action handlers could be found'
    );
    testedValues++;

    expect(ErrorMessages.REQUIRED_PARAMETER).toEqual(
      'The parameter is required'
    );
    testedValues++;

    expect(ErrorMessages.INVALID_RATING).toEqual('Invalid movie rating');
    testedValues++;
  });

  test('all values tested', () => {
    //Ensure all values are tested
    expect(testedValues).toEqual(Object.keys(ErrorMessages).length);
  });
});
