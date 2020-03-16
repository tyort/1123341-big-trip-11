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
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
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

export const numberToString = (num) => {
  switch (num.toString().length) {
    case 1:
      return `000${num}`;
    case 2:
      return `00${num}`;
    case 3:
      return `0${num}`;
    default:
      return `${num}`;
  }
};

export const getSortDate = (array) => {
  return array.sort((a, b) => new Date(...a).getTime() - new Date(...b).getTime());
};

export const getRandomDateArray = () => {
  const day = getRandomIntegerNumber(1, 5);
  const hours = getRandomIntegerNumber(0, 23);
  const minutes = getRandomIntegerNumber(0, 59);
  const arr = [`2020`, `03`];
  arr[2] = day > 9 ? `${day}` : `0` + `${day}`;
  arr[3] = hours > 9 ? `${hours}` : `0` + `${hours}`;
  arr[4] = minutes > 9 ? `${minutes}` : `0` + `${minutes}`;
  return arr;
};

export const render = (element, template, place = `beforeEnd`) => element.insertAdjacentHTML(place, template);

export const getCompareArray = (arr1, arr2) => {
  return arr1.every((item, index) => item === arr2[index]);
};

export const getSpendingTime = (num) => {
  let days = Math.floor(num / 1440);
  let hours = Math.floor((num % 1440) / 60);
  let minutes = num % 1440 % 60;
  days = days > 9 ? days + `D` : `0` + days + `D`;
  hours = hours > 9 ? hours + `H` : `0` + hours + `H`;
  minutes = minutes > 9 ? minutes + `M` : `0` + minutes + `M`;

  if (num < 1440 && num >= 60) {
    return `${hours} ${minutes}`;
  } else if (num < 60) {
    return `${minutes}`;
  }
  return `${days} ${hours} ${minutes}`;
};
