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
    "url": "/_nuxt/app.dfd6460932a2424dee21.js",
    "revision": "bb83575edac934c8034f4fbce5664b4b"
  },
  {
    "url": "/_nuxt/common.2b983a3ff32475486408.js",
    "revision": "ded1c31fd6bae9f1cb78e7a18d7cecf3"
  },
  {
    "url": "/_nuxt/layouts/default.bf7ced59a517788f3eda.js",
    "revision": "7966394c1c326da39e506220ebdefbee"
  },
  {
    "url": "/_nuxt/manifest.6697d290c97156467f6a.js",
    "revision": "d3e7f8661afcd61a427a91b883eff0af"
  },
  {
    "url": "/_nuxt/pages/bio.8e9e5ea825dd343ce9c5.js",
    "revision": "53a60f3c8c18bed953c07411ee44c1c6"
  },
  {
    "url": "/_nuxt/pages/book.37b35701d225a42070f3.js",
    "revision": "7fc9902a075018d4afee00579ea729f4"
  },
  {
    "url": "/_nuxt/pages/index.8b26665b6cbd871a6fdd.js",
    "revision": "793ac66f4dc4cb41bcafbf65233f777b"
  },
  {
    "url": "/_nuxt/pages/messages/_series.c83a741ae69eefcb97d5.js",
    "revision": "db025480f511e2d3ab75ec0cffd32c90"
  },
  {
    "url": "/_nuxt/pages/messages/_series/_message.d3c1d5ab2d7321d290b8.js",
    "revision": "fd944df7578dad5a759ded45774c81bc"
  },
  {
    "url": "/_nuxt/pages/messages/_series/_message/index.1dc7f5ba3a6292198d27.js",
    "revision": "cf0e57bc27b81cf12378b4858ec6138a"
  },
  {
    "url": "/_nuxt/pages/messages/_series/index.6a82207725d26ea99883.js",
    "revision": "815d475cfe76a20fb1a3af5c5cd95b78"
  },
  {
    "url": "/_nuxt/pages/messages/index.45c9a5cffdabac3789f1.js",
    "revision": "946f5482ab0b861a98b750345a0ccd50"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "jesselusko_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
