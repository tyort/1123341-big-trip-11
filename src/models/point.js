export default class Point {
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

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}


