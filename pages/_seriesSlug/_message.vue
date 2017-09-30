<template>
  <section id="messagePage" class="section" v-if="message && series">
    <div class="container">
      <div class="columns">
        <div class="column is-8">
          <videoPlayer :url="message.fields.videoUrl" color="ffffff" v-if="message.fields.videoUrl"></videoPlayer>
        </div>
        <div class="column is-4">
          <nuxt-link :to="`/${series.fields.slug}`">Back to {{series.fields.title}}</nuxt-link>
          <h2>{{message.fields.title}}</h2>
          <h4 v-if="message.fields.scripture">{{message.fields.scripture}}</h4>
          <p v-if="message.fields.description">{{message.fields.description}}</p>
          <a :href="message.fields.podcastLink" target="_blank" class="button is-dark" v-if="message.fields.podcastLink">Podcast</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VideoPlayer from '~/components/video_player'
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  scrollToTop: true,
  transition: {
    name: 'page-scale'
  },
  components: {
    VideoPlayer
  },
  data () {
    return {
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
      message: {
        fields: {}
      },
      error: null
    }
  },
  asyncData ({env, params, redirect, error}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'messages',
        'fields.slug': params.message
      }),
      client.getEntries({
        'content_type': 'series',
        'fields.slug': params.seriesSlug
      })
    ]).then(([message, series]) => {
      // return data that should be available
      // in the template
      if (series.items.length > 0 && message.items.length > 0) {
        return {
          message: message.items[0],
          series: series.items[0]
        }
      } else {
        error({statusCode: 404, message: 'The message or series you are looking for does not exist.'})
      }
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/main';
.section {
  padding-top: 6rem;
  @include mobile() {
    padding-top: 4rem!important;
  }
}
</style>
