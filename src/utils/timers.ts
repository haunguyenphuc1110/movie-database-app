export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;

  return function (...args: any[]) {
    clearTimeout(timerId);

    if (!delay) {
      func(...args);
      return;
    }

    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const delay = (duration: number) => {
  return new Promise(resolve => {
    const timeIns = setTimeout(() => {
      resolve(true);
      clearTimeout(timeIns);
    }, duration);
  });
};
