const CACHE_PREFIX = `big-trip-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll([
            `/`,
            `/index.html`,
            `/bundle.js`,
            `/css/style.css`,
            `/img/icons/bus.png`,
            `/img/icons/check-in.png`,
            `/img/icons/drive.png`,
            `/img/icons/flight.png`,
            `/img/icons/restaurant.png`,
            `/img/icons/ship.png`,
            `/img/icons/sightseeing.png`,
            `/img/icons/taxi.png`,
            `/img/icons/train.png`,
            `/img/icons/transport.png`,
            `/img/icons/trip.png`,
            `/img/header-bg.png`,
            `/img/header-bg@2x.png`,
            `/img/logo.png`,
          ]);
        })
  );
});

self.addEventListener(`activate`, (evt) => {
  evt.waitUntil(
      caches.keys()
        .then(
            (keys) => Promise.all(
                keys.map(
                    (key) => {
                      if (key.indexOf(CACHE_PREFIX) === 0 && key !== CACHE_NAME) {
                        return caches.delete(key);
                      }
                      return null;
                    }
                ).filter(
                    (key) => key !== null
                )
            )
        )
  );
});

const fetchHandler = (evt) => {
  const {request} = evt; // evt.request - запрос от браузера

  evt.respondWith(
      caches.match(request) // ...если в кэшах есть наш запрос...
        .then((cacheResponse) => {
          if (cacheResponse) {
            return cacheResponse; // ...тогда верни ответ из кэша...
          }
          return fetch(request).then( // ...если нет, то сходи на сервер...
              (response) => {
                if (!response || response.status !== 200 || response.type !== `basic`) {
                  return response;
                } else {
                  const clonedResponse = response.clone(); // если ответ пришел, то мы его клонируем
                  caches.open(CACHE_NAME).then((cache) => cache.put(request, clonedResponse));
                  return response;
                }
              }
          );
        })
  );
};

self.addEventListener(`fetch`, fetchHandler);
