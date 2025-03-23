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

export const convertMinsToHrsMins = (mins: number) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  const formattedH = h < 10 ? '0' + h : h.toString();
  const formattedM = m < 10 ? '0' + m : m.toString();

  return `${formattedH}h ${formattedM}m`;
};
