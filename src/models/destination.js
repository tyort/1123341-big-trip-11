export default class Destination {
  constructor(destination) {
    this.description = destination[`description`];
    this.name = destination[`name`];
    this.pictures = destination[`pictures`];
  }

  toRAW() {
    return {
      'name': this.name,
      'description': this.description,
      'pictures': this.pictures
    };
  }

  static parseDestination(item) {
    return new Destination(item);
  }

  static parseDestinations(items) {
    return items.map(Destination.parseDestination);
  }

  static clone(item) {
    return new Destination(item.toRAW());
  }
}


