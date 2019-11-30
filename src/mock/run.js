const RouteTypeList = [
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
]

const RouteCityList = [
  `Brisbane`,
  `Sydnay`,
  `Budapest`,
  `Graz`,
  `Bremen`,
  `Norwich`,
  `Freshford`,
  `Gorey`
]

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
]

const RouteExtraOptionList = [
  { 'Add luggage': `10€` },
  { 'Switch to comfort class': `150€` },
  { 'Add meal': `2€` }
]

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomDate = () => {
  const targetDate = new Date(2013, 2, 1, 1, 10);
  targetDate.setDate(getRandomIntegerNumber(1, 31));
  targetDate.setMonth(getRandomIntegerNumber(0, 11));
  targetDate.setHours(getRandomIntegerNumber(0, 23));
  targetDate.setYear(2020);
  return targetDate;
};


const getRandomPrice = () => (
  getRandomIntegerNumber(1, 10) * 100 + `₽`
)

const generateRouteItem = () => {
  return {
    type: RouteTypeList[Math.floor(Math.random() * RouteTypeList.length)],
    city: RouteCityList[Math.floor(Math.random() * RouteCityList.length)],
    description: new Array(getRandomIntegerNumber(1, 3))
      .fill(``)
      .map(() => RouteDescriptionList[Math.floor(Math.random() * RouteDescriptionList.length)])
      .join('. ') + '.',
    extraOption: new Array(getRandomIntegerNumber(0, 3))
      .fill(``)
      .map(() => RouteExtraOptionList[Math.floor(Math.random() * RouteExtraOptionList.length)]),
    date: getRandomDate(),
    price: getRandomPrice(),
    days: null
  };
}

const generateRoute = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateRouteItem);
};

export { generateRouteItem, generateRoute };
