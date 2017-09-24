<template>
  <section id="messagePage" class="section" :key="$route.path">
    <div class="container">
      <div class="columns">
        <div class="column is-8">
          <videoPlayer :url="message.fields.videoUrl" color="ffffff"></videoPlayer>
        </div>
        <div class="column is-4">
          <nuxt-link :to="`/messages/${series.fields.slug}`" >Back to {{series.fields.title}}</nuxt-link>
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
    name: 'page-left'
  },
  components: {
    VideoPlayer
  },
  props: ['series'],
  asyncData ({env, params}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'messages',
        'fields.slug': params.message
      })
    ]).then(([message]) => {
      // return data that should be available
      // in the template
      console.log(message)
      return {
        message: message.items[0]
      }
    }).catch(console.error)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/main';
.section {
  padding-top: 6rem;
  @include mobile() {
    padding-top: 4rem!important;
  }
}
</style>
