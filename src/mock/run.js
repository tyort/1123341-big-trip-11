const ROUTE_TYPES = [
  `Bus`,
  `Check-in`,
  `Drive`,
  `Flight`,
  `Restaurant`,
  `Ship`,
  `Sightseeing`,
  `Taxi`,
  `Train`,
  `Transport`,
  `Trip`
];

const ROUTE_CITIES = [
  `Brisbane`,
  `Sydnay`,
  `Budapest`,
  `Graz`,
  `Bremen`,
  `Norwich`,
  `Freshford`,
  `Gorey`
];

const RouteDescriptionList = [
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

const RouteExtraOptionList = [
  {name: `Add luggage`, price: `+10€`},
  {name: `Switch to comfort class`, price: `+150€`},
  {name: `Add meal`, price: `+2€`}
];

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomDate = () => {
  const targetDate = new Date();
  targetDate.setDate(getRandomIntegerNumber(1, 31));
  targetDate.setMonth(getRandomIntegerNumber(0, 11));
  targetDate.setHours(getRandomIntegerNumber(0, 20));
  targetDate.setMinutes(getRandomIntegerNumber(0, 59));
  targetDate.setYear(2020);
  return targetDate;
};


const generateRouteItem = () => ({
  date: getRandomDate(),
  days: null,
});

const generateEventItem = () => ({
  type: ROUTE_TYPES[getRandomIntegerNumber(0, ROUTE_TYPES.length)],
  city: ROUTE_CITIES[getRandomIntegerNumber(0, ROUTE_CITIES.length)],
  description: new Array(getRandomIntegerNumber(1, 3))
    .fill(``)
    .map(() => RouteDescriptionList[getRandomIntegerNumber(0, RouteDescriptionList.length)])
    .join(`. `) + `.`,
  extraOption: new Array(getRandomIntegerNumber(0, 10))
    .fill(``)
    .map(() => RouteExtraOptionList[getRandomIntegerNumber(0, RouteExtraOptionList.length)]),
  price: getRandomIntegerNumber(20, 1000),
  date: getRandomDate()
});

const generateRoute = (count, items) => {
  return new Array(count)
    .fill(``)
    .map(items);
};

export {generateRoute, getRandomIntegerNumber, generateRouteItem, generateEventItem};
