const WAYBILL_TYPES = [
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

const WAYBILL_CITIES = [
  `Brisbane`,
  `Sydnay`,
  `Budapest`,
  `Graz`,
  `Bremen`,
  `Norwich`,
  `Freshford`,
  `Gorey`
];

const WAYBILL_DESCRIPTION = [
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

const EXTRA_OPTION = [
  [`Add luggage`, 10],
  [`Switch to comfort class`, 150],
  [`Add meal`, 2]
];
// const sadsad = new Map(RouteExtraOptionList);
// for (var [key, value] of sadsad) {
//   console.log(key + ' +' + value + `€`);
// }

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

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
  price: getRandomIntegerNumber(20, 1000),
  date: getRandomDate(),
  extraOption: new Array(getRandomIntegerNumber(0, 10))
    .fill(``)
    .map(() => RouteExtraOptionList[getRandomIntegerNumber(0, RouteExtraOptionList.length)])
});

const generateRoute = (count, items) => {
  return new Array(count)
    .fill(``)
    .map(items);
};

export {generateRoute, getRandomIntegerNumber, generateRouteItem, generateEventItem};
