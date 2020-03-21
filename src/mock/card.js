import {getRandomIntegerNumber, generateWaybill, getRandomDateArray} from '../formulas.js';

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

const WAYBILL_PURPOSE = [
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

const EXTRA_OPTIONS = [
  [`luggage`, 10],
  [`comfort`, 150],
  [`meal`, 2],
  [`neighbor`, 250],
  [`music`, 50]
];

const generateExtraOptions = () =>
  new Array(getRandomIntegerNumber(0, 5))
    .fill(``)
    .map(() => EXTRA_OPTIONS[getRandomIntegerNumber(0, 4)]); // порядковый номер от 0 до 4

const generateDescription = () =>
  new Array(getRandomIntegerNumber(1, 3)) // количество от 1 до 3
    .fill(``)
    .map(() => WAYBILL_DESCRIPTION[getRandomIntegerNumber(0, 10)]);

const generatePhotos = () =>
  new Array(5)
    .fill(``)
    .map(() => `http://picsum.photos/300/150?r=${Math.random()}`);

const generateCardItem = () => {
  const waybillType = WAYBILL_TYPES[getRandomIntegerNumber(0, 10)];
  let cardItemDate = getRandomDateArray();
  let spendingTime = [...cardItemDate.slice(0, 3), ...getRandomDateArray().slice(3, 5)];
  if (new Date(...cardItemDate).getTime() >= new Date(...spendingTime).getTime()) {
    [cardItemDate, spendingTime] = [spendingTime, cardItemDate];
  }

  return {
    icon: waybillType.toLowerCase(),
    extraOptions: new Map(generateExtraOptions()),
    waybillType: generateWaybill(waybillType),
    waybillPurpose: WAYBILL_PURPOSE[getRandomIntegerNumber(0, 7)],
    description: new Set(generateDescription()),
    photos: new Set(generatePhotos()),
    cardItemDate,
    spendingTime,
    price: getRandomIntegerNumber(50, 200)
  };
};

const generateSomeUnit = (count, createObj) =>
  new Array(count)
    .fill(``)
    .map(createObj); // функция без ()

export {generateCardItem, generateSomeUnit};
