import {
  generateExclusiveArray,
  getRandomIntegerNumber,
  getRandomDateArray,
  generateExtraOption,
  WAYBILL_TYPES,
  WAYBILL_PURPOSE,
  WAYBILL_DESCRIPTION
} from '../formulas.js';

const generatePhotos = () =>
  new Array(5)
    .fill(``)
    .map(() => `http://picsum.photos/300/150?r=${Math.random()}`)
    .map((it) => {
      return {src: it, description: `залупня какая-то`};
    });

const generateCardItem = () => {
  let datefrom = getRandomDateArray();
  let spendingTime = [...datefrom.slice(0, 3), ...getRandomDateArray().slice(3, 5)];
  if (new Date(...datefrom).getTime() >= new Date(...spendingTime).getTime()) {
    [datefrom, spendingTime] = [spendingTime, datefrom];
  }

  const description = Array.from(new Set(generateExclusiveArray(WAYBILL_DESCRIPTION, 1, 3)))
    .join(`. `) + `.`;

  const type = Array.from(new Map(WAYBILL_TYPES).keys())[getRandomIntegerNumber(0, 10)];

  return {
    id: String(new Date() + Math.random()),
    extraOptions: new Map(generateExclusiveArray(generateExtraOption, 0, 5)),
    type,
    name: type === `Check-in` ? `hotel` : Array.from(new Map(WAYBILL_PURPOSE).keys())[getRandomIntegerNumber(0, 7)],
    description,
    photos: generatePhotos(),
    datefrom,
    spendingTime,
    basePrice: getRandomIntegerNumber(50, 200),
    isFavorite: Math.random() > 0.5,
  };
};

const generateSomeUnit = (count, createObj) =>
  new Array(count)
    .fill(``)
    .map(createObj); // функция без ()

export {generateCardItem, generateSomeUnit};
