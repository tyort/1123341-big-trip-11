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

  static parseReport(item) {
    return new Destination(item);
  }

  static parseReports(items) {
    return items.map(Destination.parseReport);
  }

  static clone(item) {
    return new Destination(item.toRAW());
  }
}


