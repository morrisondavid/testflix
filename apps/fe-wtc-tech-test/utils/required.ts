import MissingParameterError from './MissingParameterError';

export default function required(param, name?: string) {
  if (param !== false && !param) {
    throw new MissingParameterError(name);
  }
}
