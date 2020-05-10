export default class Offers {
  constructor(typeOffers) {
    this.offers = new Map(typeOffers[`offers`].map((offer) => [offer.title, false]));
    this.offersPrice = new Map(typeOffers[`offers`].map((offer) => [offer.title, offer.price]));
    this.type = typeOffers[`type`];
  }

  toRAW() {
    const offersForServer = Array.from(this.offersPrice).map((offer) => {
      return {title: offer[0], price: offer[1]};
    });

    return {
      'offers': offersForServer,
      'type': this.type
    };
  }

  static parseReport(item) {
    return new Offers(item);
  }

  static parseReports(items) {
    return items.map(Offers.parseReport);
  }

  static clone(item) {
    return new Offers(item.toRAW());
  }
}


