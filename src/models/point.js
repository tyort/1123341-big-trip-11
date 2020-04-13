export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.basePrice = data[`base_price`];
    this.datefrom = dateToArray(data[`date_from`]);
    this.dateTo = dateToArray(data[`date_to`]);
    this.description = data[`destination`].description;
    this.name = data[`destination`].name;
    this.pictures = data[`destination`].pictures;
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = new Map(data[`offers`].map((it) => [it.title, false]));
    this.offersPrice = new Map(data[`offers`].map((it) => [it.title, it.price]));
    this.type = data[`type`];
  }

  toRAW() { // этот метод нужен, когда потребуется отправить данные на сервер
    return {
      'id': this.id,
      'description': this.description,
      'due_date': this.dueDate ? this.dueDate.toISOString() : null,
      'tags': Array.from(this.tags),
      'repeating_days': this.repeatingDays,
      'color': this.color,
      'is_favorite': this.isFavorite,
      'is_archived': this.isArchive,
    };
  }

  static parsePoint(data) { // всего лишь создает экземпляр модели
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) { // создается полная копия нашей модели для редактирования
    return new Point(data.toRAW());
  }
}

const dateToArray = (currentDate) => {
  const arr = [];
  const instance = new Date(currentDate);
  arr.push(instance.getFullYear());
  arr.push(instance.getMonth());
  arr.push(instance.getDate());
  arr.push(instance.getHours());
  arr.push(instance.getMinutes());
  return arr;
};
