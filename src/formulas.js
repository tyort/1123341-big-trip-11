export const getRandomIntegerNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const generateWaybillType = (it) => {
  switch (it) {
    case `restaurant`:
      return it + ` at`;
    case `sightseeing`:
      return it + ` at`;
    case `check-in`:
      return it;
    default:
      return it + ` to`;
  }
};

export const getRandomDateArray = () => {
  const day = getRandomIntegerNumber(12, 15);
  const hours = getRandomIntegerNumber(0, 23);
  const minutes = getRandomIntegerNumber(0, 59);
  return [2020, 3, day, hours, minutes];
};

export const renderComponent = (container, element, place) => {
  switch (place) {
    case `afterBegin`:
      container.prepend(element.getElement());
      break;
    case `afterEnd`:
      container.after(element.getElement());
      break;
    default:
      container.append(element.getElement());
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const dayCounter = (arr) => {
  return arr.map((it) => window.moment(it))
    .map((it, index, array) => 1 + it.diff(array[0], `days`));
};

export const itemTimePeriod = (arr1, arr2) => {
  const startDate = window.moment(arr1);
  const endDate = window.moment(arr2);

  let daysDiff = endDate.diff(startDate, `days`);
  startDate.add(daysDiff, `days`);
  daysDiff = daysDiff > 0 ? `${castTimeFormat(daysDiff)}D ` : ``;

  let hoursDiff = endDate.diff(startDate, `hours`);
  startDate.add(hoursDiff, `hours`);
  hoursDiff = hoursDiff > 0 ? `${castTimeFormat(hoursDiff)}H ` : ``;

  let minDiff = endDate.diff(startDate, `minutes`);
  minDiff = `${castTimeFormat(minDiff)}M`;

  return `${daysDiff}${hoursDiff}${minDiff}`;
};

export const OFFERS_BOOLEAN = [
  [`luggage`, false],
  [`comfort`, false],
  [`meal`, false],
  [`neighbor`, false],
  [`music`, false]
];

export const OFFERS_PRICE = new Map([
  [`luggage`, 30],
  [`comfort`, 120],
  [`meal`, 550],
  [`neighbor`, 60],
  [`music`, 200]
]);

export const WAYBILL_DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  `Cras aliquet varius magna, non porta ligula feugiat eget`,
  `Fusce tristique felis at fermentum pharetra`,
  `Aliquam id orci ut lectus varius viverra`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`,
  `Sed sed nisi sed augue convallis suscipit in sed felis`,
  `Aliquam erat volutpat`,
  `Nunc fermentum tortor ac porta dapibus`,
  `In rutrum ac purus sit amet tempus`
];


export const generateExclusiveArray = (array, minCount, maxCount) =>
  new Array(getRandomIntegerNumber(minCount, maxCount))
    .fill(``)
    .map(() => array[getRandomIntegerNumber(0, array.length - 1)]);
