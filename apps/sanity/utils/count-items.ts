export const countItems = (number: number = 0) => {
  if (number >= 2) {
    return `${number} elements`;
  } else if (number === 1) {
    return `${number} element`;
  } else return 'No elements';
};
