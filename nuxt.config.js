const config = require('./.contentful.json')
const contentful = require('contentful')
const contconfig = {
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
}
const client = contentful.createClient(contconfig)

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'jesselusko',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Jesse Lusko. Pastor. Speaker. Evangelist.' },
      { name: 'theme-color', content: '#005236' },
      { name: 'robots', content: 'all' },
      { property: 'og:url', content: 'https://jesselusko.com' },
      { property: 'og:image', content: 'https://jesselusko.com/unfurl.png' },
      { property: 'og:title', content: 'JesseLusko.com' },
      { property: 'og:description', content: 'Jesse Lusko. Pastor. Speaker. Evangelist.' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:domain', value: 'https://jesselusko.com' },
      { name: 'twitter:title', value: 'JesseLusko.com' },
      { name: 'twitter:description', value: 'Jesse Lusko. Pastor. Speaker. Evangelist.' },
      { name: 'twitter:image', content: 'https://jesselusko.com/unfurl.png' },
      { name: 'twitter:url', value: 'https://jesselusko.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      // { rel: 'manifest', href: '/manifest.json' },
      { rel: 'image_src', href: 'https://jesselusko.com/unfurl.png' },
      { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' }
    ]
  },
  router: {
    middleware: ['mobileToggle', 'toggleMessagePage']
  },
  css: [
    { src: '~assets/main.scss', lang: 'scss' },
  ],
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome'
  ],
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
  },
  generate: {
    routes: function () {
      var rarr = []

      return Promise.all([
        client.getEntries({
          'content_type': 'series'
        })
      ]).then(([series]) => {
        // return data that should be available
        // in the template
        var sarr = series.items.map((s) => {
          return `/${s.fields.slug}`
        })

        var marr = []
        series.items.forEach(s => {
          if (s.fields.messages) {
            var messages = s.fields.messages.map((m) => {
              return `/${s.fields.slug}/${m.fields.slug}`
            })
            marr = [...marr, ...messages]
          }
        })
        var rarr = [...sarr, ...marr]
        return rarr
      }).catch(console.error)
    }
  },
  plugins: [
    {src: '~plugins/vee-validate.js', ssr: true},
    { src: `~plugins/vimeo-player`, ssr: false },
    { src: `~plugins/vue-lazyload`, ssr: false }
  ],
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    vendor: ['vue-vimeo-player', 'vee-validate', 'vue-lazyload']
  }
}
