const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

export default {
  warn: (message: string) => {
    if (!isProduction()) console.warn(message);
  },
  debug: (message: string) => {
    if (!isProduction()) console.debug(message);
  },
  error: (message: string) => {
    if (!isProduction()) console.error(message);
  },
  info: (message: string) => {
    if (!isProduction()) console.info(message);
  },
};
