export const generateStatement = (it) => {
  switch (it) {
    case `comfort`:
      return `Switch to ` + it + `class`;
    case `neighbor`:
      return `Choose ` + it;
    default:
      return `Add ` + it;
  }
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

export const generateWaybill = (it) => {
  switch (it) {
    case `Restaurant`:
      return it + ` at`;
    case `Sightseeing`:
      return it + ` at`;
    case `Check-in`:
      return it + ` hotel`;
    default:
      return it + ` to`;
  }
};
