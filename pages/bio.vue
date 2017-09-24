<template>
  <div class="page">
    <PhotoPanel img="img/1.jpg" color="#DFCBB1" mobile-img="center"></PhotoPanel>
    <section class="section">
      <div class="columns">
        <div id="content" class="column is-6 is-offset-6">
          <transition-group name="staggered" tag="section" class="main" appear
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave">
            <article class="columns is-multiline" key="bio" :data-index="1">
              <div class="column is-12">
                <h2>Bio</h2>
                <p>Jesse Lusko is pastor, speaker and evangelist. Jesus got a hold of his soul at a young age and gave him an unrelenting passion to bring people real life in the gospel, not just dead religion. He served as a youth pastor for six years and was trained to teach the Bible by Pastor Skip Heitzig at Calvary Albuquerque in New Mexico.  He and his wife Rebekah enjoy clever movies, exploring cities, and watching their son, Lyon, melt the tough exteriors of strangers.</p>
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
import PhotoPanel from '~/components/photo_panel'

export default {
  components: {
    Booking,
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
.fade-in-enter-active, .fade-in-leave-active {
  transition: all .5s ease!important;
}
.fade-in-enter, .fade-in-leave-active  {
  opacity: 0!important;
}
</style>
