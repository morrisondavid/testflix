import { IActionHandlers, IAction, IActionHandler } from '../state/types';
import isFunction from '../utils/isFunction';
import { ErrorMessages } from '../constants';

export default function createReducer<T>(
  initialstate: T,
  actionhandlers: IActionHandlers
): IActionHandler<T> {
  let hasFunctions = false;
  for (const key in actionhandlers) {
    if (Object.prototype.hasOwnProperty.call(actionhandlers, key)) {
      if (isFunction(actionhandlers[key])) {
        hasFunctions = true;
        break;
      }
    }
  }

  if (Object.keys(actionhandlers).length === 0 || !hasFunctions) {
    throw new Error(ErrorMessages.REDUCER_ACTION_HANDLERS_MISSING);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (state = initialstate, action: IAction<any>) {
    const type = action.type;
    const handler = actionhandlers[type];

    return handler ? handler(state, action) : state;
  };
}
