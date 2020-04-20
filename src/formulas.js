import moment from 'moment';

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

const VISUALLY_HIDDEN = `visually-hidden`;

export const showComponent = (neededClassName) => {
  const component = document.querySelector(`.${neededClassName}`);
  if (component.classList.contains(VISUALLY_HIDDEN)) {
    component.classList.remove(VISUALLY_HIDDEN);
  }
};

export const hideComponent = (neededClassName) => {
  const component = document.querySelector(`.${neededClassName}`);
  if (!component.classList.contains(VISUALLY_HIDDEN)) {
    component.classList.add(VISUALLY_HIDDEN);
  }
};
