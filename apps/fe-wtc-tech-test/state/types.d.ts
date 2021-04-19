export interface IAction<T> {
  type: string;
  data?: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IActionCreator = (dispatch: (action: IAction<any>) => any) => void;

export type IActionHandler<T> = (state: T, action: IAction) => T;

export interface IActionHandlers {
  [actionType: string]: IActionHandler;
}
