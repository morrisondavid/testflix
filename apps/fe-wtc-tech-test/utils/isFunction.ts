const isFunction = (object): boolean => {
  return object && {}.toString.call(object) === '[object Function]';
};

export default isFunction;
