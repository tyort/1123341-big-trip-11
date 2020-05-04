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
<<<<<<< HEAD
  const {request} = evt; // evt.request - запрос от браузера

  evt.respondWith(
      caches.match(request) // ...если в кэшах есть наш запрос...
        .then((cacheResponse) => {
          if (cacheResponse) {
            return cacheResponse; // ...тогда верни ответ из кэша...
          }
          return fetch(request).then( // ...если нет, то сходи на сервер...
=======
  const {request} = evt;

  evt.respondWith(
      caches.match(request)
        .then((cacheResponse) => {
          if (cacheResponse) {
            return cacheResponse;
          }
          return fetch(request).then(
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
              (response) => {
                if (!response || response.status !== 200 || response.type !== `basic`) {
                  return response;
                } else {
<<<<<<< HEAD
                  const clonedResponse = response.clone(); // если ответ пришел, то мы его клонируем
=======
                  const clonedResponse = response.clone();
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
                  caches.open(CACHE_NAME).then((cache) => cache.put(request, clonedResponse));
                  return response;
                }
              }
          );
        })
  );
};

self.addEventListener(`fetch`, fetchHandler);
