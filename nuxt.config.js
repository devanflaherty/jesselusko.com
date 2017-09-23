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
      { hid: 'description', name: 'description', content: 'Jesse Lusko is a speaker and evangelist.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: { 
    base: '/jesselusko.com/',
    middleware: ['mobileToggle', 'toggleMessagePage']
  },
  css: [
    { src: '~assets/main.scss', lang: 'scss' },
  ],
  loading: { color: '#3B8070' },
  modules: [
    // '@nuxtjs/bulma',
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
          return `/messages/${s.fields.slug}`
        })

        var marr = []
        series.items.forEach( s => {
          if (s.fields.messages) {
            marr = s.fields.messages.map((m) => {
              return `/messages/${s.fields.slug}/${m.fields.slug}`
            })
          }
        })
        rarr = [...sarr, ...marr]
        return rarr
      }).catch(console.error)
    }
  },
  plugins: [
    {src: '~plugins/vee-validate.js', ssr: true}
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
    vendor: ['vue-vimeo-player', 'vee-validate']
  }
}
