<template>
  <section v-if="series">
    <PhotoPanel :img="series.fields.thumbnail.fields.file.url" :color="series.fields.color" mobile-img="center"></PhotoPanel>

    <section class="section">
      <div class="columns">
        <div id="content" class="column is-half is-offset-6">
          
          <section class="main">
            <div class="columns">
              <div class="column">
                <h2>{{series.fields.title}}</h2>
              </div>
            </div>

            <div id="messages" class="columns is-multiline" appear v-if="series.fields.messages">
              <div class="column is-4-widescreen is-6-desktop is-12-tablet" v-for="(m, index) in series.fields.messages" :key="index" :data-index="index">
                <MessageCard :token="token" :message="m" :color="series.fields.color" :slug="series.fields.slug"></MessageCard>
              </div>
            </div>
          </section>

        </div>
      </div>
    </section>
  </section>
</template>

<script>
// import SeriesHero from '~/components/series_hero'
import PhotoPanel from '~/components/photo_panel'
import MessageCard from '~/components/message_card'

import {createClient} from '~/plugins/contentful.js'
const client = createClient()

const pluralize = require('pluralize')

export default {
  transition: {
    name: 'page-scale'
  },
  scrollToTop: true,
  components: {
    PhotoPanel,
    MessageCard
  },
  data () {
    return {
      selectedMessage: null,
      token: null,
      series: {
        fields: {
          thumbnail: {
            fields: {
              file: {
                url: ''
              }
            }
          }
        }
      },
      error: null
    }
  },
  asyncData ({env, params, error}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'series',
        'fields.slug': params.seriesSlug
      })
    ]).then(([series]) => {
      // return data that should be available
      // in the template
      if (series.items.length > 0) {
        return {
          series: series.items[0]
        }
      } else {
        error({statusCode: 404, message: 'The series you are looking for does not exist.'})
      }
    }).catch(err => {
      console.error(err)
    })
  },
  methods: {
    pluralMe (str, count, bool) {
      return pluralize(str, count, bool)
    }
  }
}
</script>

<style lang="scss">
#messages {
  position: relative;
  z-index: 100;
}
</style>
