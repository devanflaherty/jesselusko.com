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
                <h2>Welcome</h2>
                <p>Jesse Lusko is pastor, speaker and evangelist. Learn more about his story by watching the video below.</p>
              </div>
            </article>

            <article id="video" class="columns" key="video" :data-index="2">
              <div class="column">
                <VideoPlayer url="https://player.vimeo.com/video/233254026" color="e51717"></VideoPlayer>
              </div>
            </article>

            <Booking key="book" :data-index="3"></Booking>
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
  methods: {
    beforeEnter: function (el) {
      TweenMax.set(el, {
        opacity: 0,
        y: 100
      })
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        TweenMax.to(el, 1, {
          opacity: 1,
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
          opacity: 0,
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
