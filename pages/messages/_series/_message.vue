<template>
  <nuxt-child :key="$route.path" :series="series">
  </nuxt-child>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  transition: {
    name: 'page-scale',
    mode: 'out-in'
  },
  asyncData ({ env, params }) {
    return Promise.all([
      client.getEntries({
        'content_type': 'series',
        'fields.slug': params.series
      })
    ]).then(([series]) => {
      // return data that should be available
      // in the template
      return {
        series: series.items[0]
      }
    }).catch(console.error)
  }
}
</script>
