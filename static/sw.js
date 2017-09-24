importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/jesselusko.com/_nuxt/app.e0ac46d3e0c2305ad0cb.js",
    "revision": "fba27ad4b2710bbc3ae27d93d73c13eb"
  },
  {
    "url": "/jesselusko.com/_nuxt/common.5f6ab1c9b6d8ba9a5d43.js",
    "revision": "c9fcc8a1a2fcff7ecda3022147aff452"
  },
  {
    "url": "/jesselusko.com/_nuxt/layouts/default.47116b7340642d5f787f.js",
    "revision": "aac09b6f67e555f2993bc831b17f43fd"
  },
  {
    "url": "/jesselusko.com/_nuxt/layouts/messages.2924dad7838d5be5dd63.js",
    "revision": "3d921d847268826c74bb58314f0c72aa"
  },
  {
    "url": "/jesselusko.com/_nuxt/manifest.6731e1be5a8abe67368d.js",
    "revision": "1f70d47a66b2397314c02792c8f332c6"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/bio.001d5ecf97be79fee675.js",
    "revision": "6ae50355f05c651191b58ff9f1017ff9"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/book.bdd2e4b7a36138cc6d03.js",
    "revision": "691c5300a1fc1eeb8ae2da9347bfa800"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/index.3c9d779b415ede386b99.js",
    "revision": "5d441bce505efe351ef2bc5d6cf320b0"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/messages/_series.f22347e47ce92d3fb1f9.js",
    "revision": "740012c5ef390d9d46813938ae15f96a"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/messages/_series/_message.8b6e540eddb6c9591460.js",
    "revision": "dd616b1f2fbf34dac4161aa6aa953ddb"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/messages/_series/_message/index.87472011422184712aaa.js",
    "revision": "278a74bf01259bf505e0e79916f1fb95"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/messages/_series/index.88a38a533aafcc7035f4.js",
    "revision": "0df5e37982903d8fb8bf41590ebf3729"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/messages/index.5cf9b4f7b66b67c948b1.js",
    "revision": "c49dc5be3f347aa6c98e6c1613700075"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "jesselusko_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/jesselusko.com/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/jesselusko.com/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
