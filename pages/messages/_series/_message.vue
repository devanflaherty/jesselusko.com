<template>
  <section>
    <nuxt-child :series="series" :key="$route.path"></nuxt-child>
  </section>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()
export default {
  layout: 'messages',
  asyncData ({env, params}) {
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

<style lang="scss">
</style>
