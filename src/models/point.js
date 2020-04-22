export default class Point {
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

  static parsePoint(item) {
    return new Point(item);
  }

  static parsePoints(items) {
    return items.map(Point.parsePoint);
  }

  static clone(item) {
    return new Point(item.toRAW());
  }
}


