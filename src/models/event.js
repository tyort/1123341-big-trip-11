export default class Event {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.dateFrom = data[`date_from`] ? new Date(data[`date_from`]) : null;
    this.dateTo = data[`date_to`] ? new Date(data[`date_to`]) : null;
    this.destinationName = data[`destinationName`];
    this.basePrice = data[`base_price`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.description = data[`description`] || ``;
    this.pictures = new Set(data[`pictures`] || []);
    this.offers = new Set(data[`offers`] || []);
  }

  toRAW() { // метод преобразует данные в формат JSON для отправки на сервер
    return {
      'id': this.id,
      'type': this.type,
      'date_from': this.dateFrom ? this.dateFrom.toISOString() : null,
      'date_to': this.dateTo ? this.dateTo.toISOString() : null,
      'destination': {
        'name': this.destinationName,
        'description': this.description,
        'pictures': Array.from(this.pictures)
      },
      'base_price': this.basePrice,
      'is_favorite': this.isFavorite,
      'offers': Array.from(this.offers)
    };
  }

  static parseEvent(data) { // создает экземпляр модели
    return new Event(data);
  }

  static parseEvents(data) { // вызывает предыдущий метод
    return data.map(Event.parseEvent);
  }

  static clone(data) { // создает полную копию модели
    return new Event(data.toRAW());
  }
}
