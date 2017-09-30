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
    "url": "/_nuxt/app.80b77de761849723c6e0.js",
    "revision": "c22b330c3fbcc2c8a1ca05e839063e9d"
  },
  {
    "url": "/_nuxt/common.2ee3e477bc180c1ac573.js",
    "revision": "1f806ce70b29e81372a50a1d644f4fc0"
  },
  {
    "url": "/_nuxt/layouts/default.fea91b28398c6c266d8e.js",
    "revision": "28fa74b0a25d4530e39a7c6bacda881e"
  },
  {
    "url": "/_nuxt/manifest.ff8684f48f3a04f0e9b4.js",
    "revision": "20ffa923eb621d6a52389c6b1beb6e3e"
  },
  {
    "url": "/_nuxt/pages/_seriesSlug/_message.da0d75a52bc42cf86d57.js",
    "revision": "dd631f8fc32a7ca156802bef0575d187"
  },
  {
    "url": "/_nuxt/pages/_seriesSlug/index.2b1aa458d42a68c1301e.js",
    "revision": "8f579ef24a6cc124c089459ef258262f"
  },
  {
    "url": "/_nuxt/pages/bio.fc18eea8eaf71c19af24.js",
    "revision": "9aac348ca39ab1578e90566b1d5ac1f2"
  },
  {
    "url": "/_nuxt/pages/book.df2434d31d9facb0fcfc.js",
    "revision": "90812b1f6dbdd9d3b0f8d809703b7c84"
  },
  {
    "url": "/_nuxt/pages/index.73de6bf9ffd80201a1c6.js",
    "revision": "37658b7bbd6917685f6eaea88870659e"
  },
  {
    "url": "/_nuxt/pages/series.78f5258fd0c01aaf8e80.js",
    "revision": "d7709eacb31c66b9e3c4c660eb34cf1e"
  },
  {
    "url": "/_nuxt/pages/test.6539bd1e6b0b58fac25b.js",
    "revision": "d2e752f350f7ccaa3de88113282608b0"
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
