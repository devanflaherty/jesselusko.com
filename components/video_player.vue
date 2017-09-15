<template>
  <transition name="fade-in" appear> 
    <article class="video-wrapper">
        <iframe :src="`https://player.vimeo.com/video/${id}?color=${vColor}&title=0&byline=0&portrait=0`" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </article>
  </transition>
</template>

<script>
export default {
  name: 'video_player',
  props: ['url', 'color'],
  data () {
    return {
      vColor: '#ffffff'
    }
  },
  computed: {
    id () {
      const url = this.url
      const urlLength = url.length
      const stripL = urlLength - 9
      var res = url.substring(stripL, urlLength)

      return res
    }
  },
  mounted () {
    if (this.color) {
      this.vColor = this.color
    }
  }
}
</script>

<style lang="scss">
.fade-in-enter-active, .fade-in-leave-active {
  transition: all 1s 1s ease;
}
.fade-in-enter, .fade-in-leave-active  {
  opacity: 0
}
.video-wrapper {
	position: relative;
	padding-bottom: 52.25%;/*56.25%;  16:9 */
	padding-top: 25px;
	height: 0;
  &.wide {
    padding-bottom: 38.25%; /* 16:9 */
  }
}
.video-wrapper iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>