<template>
  <section class="container-vh">
    <div class="columns">
      <div class="column fold-container">
        <transition name="fade-up" appear>
          <div class="photo-fold" style="background-image: url(img/jesse.png)">
            <transition name="photo-wipe" appear>
              <div class="mask"></div>
            </transition>
            <div class="fold-footer">
              <h2>Jesse Lusko</h2>
            </div>
          </div>
        </transition>
      </div>
      <div id="content" class="column is-half">
        <transition-group name="staggered" tag="section" class="main" appear
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave">
          <article class="columns is-multiline" key="bio" :data-index="1">
            <div class="column is-two-thirds">
              <h2 class="is-half">Bio</h2>
              <p>Jesse Lusko is pastor, speaker and evangelist. Jesus got a hold of his soul at a young age and gave him an unrelenting passion to bring people real life in the gospel, not just dead religion. He served as a youth pastor for six years and was trained to teach the Bible by Pastor Skip Heitzig at Calvary Albuquerque in New Mexico.  He and his wife Rebekah enjoy clever movies, exploring cities, and watching their son, Lyon, melt the tough exteriors of strangers.</p>
            </div>
          </article>

          <Booking key="book" :data-index="3"></Booking>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script>
import { TweenMax, Back } from 'gsap'
import Booking from '../components/booking'
export default {
  components: {
    Booking
  },
  methods: {
    beforeEnter: function (el) {
      TweenMax.set(el, {
        opacity: 0,
        x: 100
      })
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        TweenMax.to(el, 1, {
          opacity: 1,
          x: 0,
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
          x: 100,
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
