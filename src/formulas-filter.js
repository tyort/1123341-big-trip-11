export const FILTER_TYPE = {
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
  const a = window.moment(dateA);
  const b = window.moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

export const getPastPoints = (points, currentDate) => {
  return points.filter((it) => {
    const itemDate = new Date(...it.datefrom);
    return isPastDate(itemDate, currentDate);
  });
};

export const getFuturePoints = (points, currentDate) => {
  return points.filter((it) => {
    const itemDate = new Date(...it.datefrom);
    return isFutureDate(itemDate, currentDate);
  });
};


export const getPointsByFilter = (points, filterType) => {
  const currentDate = new Date();

  switch (filterType) {
    case FILTER_TYPE.EVERYTHING:
      return points;
    case FILTER_TYPE.PAST:
      return getPastPoints(points, currentDate);
    case FILTER_TYPE.FUTURE:
      return getFuturePoints(points, currentDate);
  }

  return points; // если фильтра из списка нет
};
