<template>
  <section>
    <SeriesCard :series="series"></SeriesCard>
    
    <section class="section">
      <div class="container">
        <div class='columns'>
          <div class="column is-4">
            <h2>{{series.fields.title}}</h2>
          </div>
        </div>

        <div class="columns is-multiline" appear v-if="series.fields.messages.length > 0">
          <div class="column is-4" v-for="(m, index) in series.fields.messages" :key="index" :data-index="index">
            <MessageCard :message="m" :color="series.fields.color" :slug="series.fields.slug" @showModal="showModal"></MessageCard>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import SeriesCard from '~/components/series_card'
import MessageCard from '~/components/message_card'
import MessageModal from '~/components/message_modal'

import {createClient} from '~/plugins/contentful.js'
const client = createClient()

const pluralize = require('pluralize')

export default {
  components: {
    SeriesCard,
    MessageCard,
    MessageModal
  },
  data () {
    return {
      selectedMessage: null,
      modalVisible: false
    }
  },
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
  },
  methods: {
    showModal (message) {
      this.selectedMessage = message
      console.log(this.selectedMessage)
      this.modalVisible = !this.modalVisible
    },
    changeModalVis (bool) {
      this.modalVisible = bool
      this.selectedMessage = null
    },
    pluralMe (str, count, bool) {
      return pluralize(str, count, bool)
    }
  }
}
</script>

<style lang="scss">
.hero-foot {
  position: relative;
  height: 65px;
}
</style>
