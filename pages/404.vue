<template>
  <div class="page">
    <PhotoPanel img="img/4.jpg" color="#8a9d68" mobile-img="center"></PhotoPanel>
    <section class="section">
      <div class="columns">
        <div id="content" class="column is-6 is-offset-6">
          <transition-group name="staggered" tag="section" class="main" appear
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave">
            <article class="columns is-multiline" key="welcome" :data-index="1">
              <div class="column">
                <h2>404</h2>
                <p v-if="!error">Sorry this page doesn't exist!</p>
                <p v-else>{{error}}</p>
              </div>
            </article>
          </transition-group>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { TweenMax, Back } from 'gsap'
import Booking from '../components/booking'
import VideoPlayer from '~/components/video_player'
import PhotoPanel from '~/components/photo_panel'

export default {
  components: {
    Booking,
    VideoPlayer,
    PhotoPanel
  },
  props: ['error'],
  methods: {
    beforeEnter: function (el) {
      TweenMax.set(el, {
        autoAlpha: 0,
        y: 100
      })
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        TweenMax.to(el, 1, {
          autoAlpha: 1,
          y: 0,
          ease: Back.easeOut
        })
        done()
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        TweenMax.to(el, 1, {
          autoAlpha: 0,
          y: 100,
          ease: Back.easeIn
        })
        done()
      }, delay)
    }
  }
}
</script>

<style lang="scss">
</style>
