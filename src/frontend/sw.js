// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

import { workbox } from 'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js';

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.routing.registerRoute(
    '/',
    workbox.strategies.networkFirst()
  );

  workbox.precaching.precacheAndRoute([]);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
// https://codelabs.developers.google.com/codelabs/workbox-lab/#4
// https://developers.google.com/web/fundamentals/codelabs/offline/
