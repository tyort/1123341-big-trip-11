import moment from 'moment';

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

export const getRandomDateArray = () => {
  const day = getRandomIntegerNumber(1, 5);
  const hours = getRandomIntegerNumber(0, 23);
  const minutes = getRandomIntegerNumber(0, 59);
  return [`2020`, `03`, castTimeFormat(day), castTimeFormat(hours), castTimeFormat(minutes)];
};

export const renderCompon = (container, element, place) => {
  switch (place) {
    case `afterBegin`:
      container.prepend(element);
      break;
    case `afterEnd`:
      container.after(element);
      break;
    default:
      container.append(element);
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
  return arr.map((it) => moment(it))
    .map((it, index, array) => 1 + it.diff(array[0], `days`));
};

export const itemTimePeriod = (arr1, arr2) => {
  const startDate = moment(arr1);
  const endDate = moment(arr2);

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
