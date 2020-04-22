import moment from 'moment';

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const isPastDate = (itemDate, currentDate) => {
  return itemDate < currentDate && !isOneDay(itemDate, currentDate);
};

export const isFutureDate = (itemDate, currentDate) => {
  return itemDate > currentDate && !isOneDay(itemDate, currentDate);
};

export const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

export const getPastPoints = (points, currentDate) => {
  return points.filter((it) => {
    const itemDate = new Date(it.dateFrom);
    return isPastDate(itemDate, currentDate);
  });
};

export const getFuturePoints = (points, currentDate) => {
  return points.filter((it) => {
    const itemDate = new Date(it.dateFrom);
    return isFutureDate(itemDate, currentDate);
  });
};


export const getPointsByFilter = (points, filterType) => {
  const currentDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.PAST:
      return getPastPoints(points, currentDate);
    case FilterType.FUTURE:
      return getFuturePoints(points, currentDate);
  }

  return points; // если фильтра из списка нет
};
