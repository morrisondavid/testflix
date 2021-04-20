export interface IAction<T> {
  type: string;
  data?: T;
}

export type IActionHandler<T> = (state: T, action: IAction) => T;

export interface IActionHandlers {
  [actionType: string]: IActionHandler;
}
