import {dateToArray} from '../formulas.js';

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
    const offersForServer = Array.from(this.offersPrice).map((it) => {
      return {title: it[0], price: it[1]};
    });

    return {
      'id': this.id,
      'base_price': this.basePrice,
      'date_from': window.moment(this.datefrom).format(),
      'date_to': window.moment(this.dateTo).format(),
      'destination': {
        'name': this.name,
        'description': this.description,
        'pictures': this.pictures
      },
      'is_favorite': this.isFavorite,
      'offers': offersForServer,
      'type': this.type
    };
  }

  static parsePoint(data) { // вызывается на каждый объект. data - это объект
    return new Point(data); // экземпляр для каждого объекта
  }

  static parsePoints(data) { // data массив объектов с неизмененным набором свойств
    return data.map(Point.parsePoint); // массив экземпляров, т.е. new Point(ов)
  }

  static clone(data) { // создается полная копия нашей модели для редактирования
    return new Point(data.toRAW());
  }
}


