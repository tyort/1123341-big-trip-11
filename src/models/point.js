export default class Point {
<<<<<<< HEAD
  constructor(parameter) {
    this.id = parameter[`id`];
    this.basePrice = parameter[`base_price`];
    this.dateFrom = parameter[`date_from`];
    this.dateTo = parameter[`date_to`];
    this.description = parameter[`destination`].description;
    this.name = parameter[`destination`].name;
    this.pictures = parameter[`destination`].pictures;
    this.isFavorite = Boolean(parameter[`is_favorite`]);
    this.offers = new Map(parameter[`offers`].map((it) => [it.title, false]));
    this.offersPrice = new Map(parameter[`offers`].map((it) => [it.title, it.price]));
    this.type = parameter[`type`];
=======
  constructor(data) {
    this.id = data[`id`];
    this.basePrice = data[`base_price`];
    this.dateFrom = data[`date_from`];
    this.dateTo = data[`date_to`];
    this.description = data[`destination`].description;
    this.name = data[`destination`].name;
    this.pictures = data[`destination`].pictures;
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = new Map(data[`offers`].map((it) => [it.title, false]));
    this.offersPrice = new Map(data[`offers`].map((it) => [it.title, it.price]));
    this.type = data[`type`];
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  }

  toRAW() {
    const offersForServer = Array.from(this.offersPrice).map((it) => {
      return {title: it[0], price: it[1]};
    });

    return {
      'id': this.id,
      'base_price': this.basePrice,
      'date_from': this.dateFrom,
      'date_to': this.dateTo,
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

<<<<<<< HEAD
  static parsePoint(item) {
    return new Point(item);
  }

  static parsePoints(items) {
    return items.map(Point.parsePoint);
  }

  static clone(item) {
    return new Point(item.toRAW());
=======
  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  }
}


