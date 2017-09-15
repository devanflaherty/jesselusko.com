<template>
  <article class="message-card" :style="`background-color: ${color}`">
    <nuxt-link :to="`/messages/${slug}/${message.fields.slug}`"> 
      <transition name="photo-wipe" appear v-if="!loading">
        <div class="mask" :style="`background-color: ${color}`"></div>
      </transition>
      <template v-if="!loading">
        <transition name="fade-in" appear>
          <img :src="thumb">
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
  props: ['message', 'color', 'slug'],
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
  methods: {
    emitModal (message) {
      this.$emit('showModal', message)
    }
  },
  created () {
    if (this.message.fields.videoUrl) {
      axios.get(`http://vimeo.com/api/v2/video/${this.videoId}.json`).then(response => {
        this.loading = false
        this.thumb = response.data[0].thumbnail_large
      })
    }
  }
}
</script>

<style lang="scss">
.message-card {
  position: relative;
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
      transform: scale(1.05);
    }
    img {
      display: block;
    }
    .is-loading {
      display: block;
    }
  }
}

.mask {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: black;
  top: 0;
  left: 0;
  transform: translate(0, -100%);
}
.photo-wipe-enter-active, .photo-wipe-leave-active {
  transition: all 0.5s cubic-bezier(.97,0,.51,1);
}
.photo-wipe-enter, .photo-wipe-leave-active  {
  transform: translate(0, 0)
}
.fade-in-enter-active, .fade-in-leave-active {
  transition: all 0.5s ease;
}
.fade-in-enter, .fade-in-leave-active  {
  opacity: 0
}
</style>