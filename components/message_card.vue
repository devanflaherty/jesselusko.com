<template>
  <article class="message-card" :style="`background-color: ${color}`">
    <nuxt-link :to="`/messages/${slug}/${message.fields.slug}`">
      <transition name="photo-wipe">
        <div class="mask" :style="`background-color: ${color}`" v-if="loading"></div>
      </transition>
      <template v-if="!loading">
        <transition name="fade-in">
          <img :src="thumb" width="320" height="180" v-if="!loading">
        </transition>
      </template>
      <template v-else>
        <div class="loader"></div>
      </template>
    </nuxt-link>
  </article>
</template>

<script>
import axios from 'axios'
export default {
  name: 'message-card',
  props: ['message', 'color', 'slug', 'token'],
  data () {
    return {
      loading: true,
      thumb: null
    }
  },
  computed: {
    videoId () {
      const url = this.message.fields.videoUrl
      const urlLength = url.length
      const stripL = urlLength - 9
      var res = url.substring(stripL, urlLength)

      return res
    }
  },
  created () {
    if (this.message.fields.videoUrl) {
      axios.get(`https://api.vimeo.com/videos/${this.videoId}`, {
        headers: {
          'Authorization': 'Bearer ' + '4b1c131e6b72a9c33c598dc6c83b61f3'
        }
      }).then(response => {
        this.loading = false
        this.thumb = response.data.pictures.sizes[3].link
      }).catch(err => {
        console.log(err.data)
      })
    }
  }
}
</script>

<style lang="scss">
.message-card {
  position: relative;
  z-index: 200;
  padding-top: 55.25%;
  overflow: hidden;
  a {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
    &:hover {
      z-index: 200;
      transform: scale(1.05);
    }
    img {
      display: block;
      width: 100%;
      height: auto;
    }
    .is-loading {
      display: block;
    }
    .loader {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
