export const channel = (callback, name = null) => {
  return (...args) => {
    console.log('channel', name, args);
    callback(...args);
  };
};
