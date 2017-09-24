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
    "url": "/jesselusko.com/_nuxt/app.31bf35659c8ba77648f9.js",
    "revision": "0b113afe290272f14a34903cdeb0f444"
  },
  {
    "url": "/jesselusko.com/_nuxt/common.8a46d3942ebd229a0666.js",
    "revision": "b5d3273e8145b4ced41c4ffe0db43fae"
  },
  {
    "url": "/jesselusko.com/_nuxt/layouts/default.bf7ced59a517788f3eda.js",
    "revision": "7966394c1c326da39e506220ebdefbee"
  },
  {
    "url": "/jesselusko.com/_nuxt/manifest.142851a2921e984b8db5.js",
    "revision": "e313a64a50257155e5cfadb591b06c6b"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/bio.8e9e5ea825dd343ce9c5.js",
    "revision": "53a60f3c8c18bed953c07411ee44c1c6"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/book.37b35701d225a42070f3.js",
    "revision": "7fc9902a075018d4afee00579ea729f4"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/index.8b26665b6cbd871a6fdd.js",
    "revision": "793ac66f4dc4cb41bcafbf65233f777b"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/messages/_series.c83a741ae69eefcb97d5.js",
    "revision": "db025480f511e2d3ab75ec0cffd32c90"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/messages/_series/_message.d3c1d5ab2d7321d290b8.js",
    "revision": "fd944df7578dad5a759ded45774c81bc"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/messages/_series/_message/index.1dc7f5ba3a6292198d27.js",
    "revision": "cf0e57bc27b81cf12378b4858ec6138a"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/messages/_series/index.6a82207725d26ea99883.js",
    "revision": "815d475cfe76a20fb1a3af5c5cd95b78"
  },
  {
    "url": "/jesselusko.com/_nuxt/pages/messages/index.45c9a5cffdabac3789f1.js",
    "revision": "946f5482ab0b861a98b750345a0ccd50"
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
