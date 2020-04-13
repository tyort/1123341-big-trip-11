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
  let cardItemDate = getRandomDateArray();
  let spendingTime = [...cardItemDate.slice(0, 3), ...getRandomDateArray().slice(3, 5)];
  if (new Date(...cardItemDate).getTime() >= new Date(...spendingTime).getTime()) {
    [cardItemDate, spendingTime] = [spendingTime, cardItemDate];
  }

  const description = Array.from(new Set(generateExclusiveArray(WAYBILL_DESCRIPTION, 1, 3)))
    .join(`. `) + `.`;

  const waybillType = Array.from(new Map(WAYBILL_TYPES).keys())[getRandomIntegerNumber(0, 10)];

  return {
    id: String(new Date() + Math.random()),
    extraOptions: new Map(generateExclusiveArray(generateExtraOption, 0, 5)),
    waybillType,
    waybillPurpose: waybillType === `Check-in` ? `hotel` : Array.from(new Map(WAYBILL_PURPOSE).keys())[getRandomIntegerNumber(0, 7)],
    description,
    photos: generatePhotos(),
    cardItemDate,
    spendingTime,
    price: getRandomIntegerNumber(50, 200),
    isFavorite: Math.random() > 0.5,
  };
};

const generateSomeUnit = (count, createObj) =>
  new Array(count)
    .fill(``)
    .map(createObj); // функция без ()

export {generateCardItem, generateSomeUnit};
