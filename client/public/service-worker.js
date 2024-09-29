self.addEventListener('push', event => {
  const payload = event.data ? event.data.json() : { name: '', destination: '', date: '', time: '' };
  let message;
  if(payload.dir === 'false' || payload.dir === false)
    message = `${payload.name} wishes to go to ${payload.destination} on ${payload.date} at ${payload.time}. Click here to get contact details!`;
  else
    message = `${payload.name} is returning from ${payload.destination} on ${payload.date} at ${payload.time}. Click here to get contact details!`
  const notificationOptions = {
    body: message,
    icon:"icons/manifest-icon-192.maskable.png",
    data: {
      destination: payload.destination,
      date: payload.date,
      time: payload.time,
      dir: payload.dir
    }
  };

  event.waitUntil(
    self.registration.showNotification('Companion Found!', notificationOptions)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const payload = event.notification.data;
  const url = `https://goto.webnd-iitbbs.org/showCompanions/${payload.destination}/${payload.date}/${payload.time}/${payload.dir}`;

  event.waitUntil(
    clients.openWindow(url)
  );
});

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com' ||
              url.origin === 'https://fonts.gstatic.com',
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'script',
  new workbox.strategies.NetworkFirst()
);