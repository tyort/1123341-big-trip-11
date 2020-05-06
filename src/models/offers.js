export default class Offers {
  constructor(typeOffers) {
    this.offers = new Map(typeOffers[`offers`].map((it) => [it.title, true]));
    this.offersPrice = new Map(typeOffers[`offers`].map((it) => [it.title, it.price]));
    this.type = typeOffers[`type`];
  }

  toRAW() {
    const offersForServer = Array.from(this.offersPrice).map((it) => {
      return {title: it[0], price: it[1]};
    });

    return {
      'offers': offersForServer,
      'type': this.type
    };
  }

  static parseType(item) {
    return new Offers(item);
  }

  static parseTypes(items) {
    return items.map(Offers.parseType);
  }

  static clone(item) {
    return new Offers(item.toRAW());
  }
}


