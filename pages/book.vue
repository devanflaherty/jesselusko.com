<template>
  <section class="container-vh">
    <div class="columns">
      <div class="column fold-container">
        <transition name="fade-up" appear>
          <div class="photo-fold" style="background-image: url(/img/jesse.png)">
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
          <article class="columns is-multiline" key="welcome" :data-index="1">
            <div class="column">
              <h2 class="is-half">Welcome</h2>
              <p>Jesse Lusko is pastor, speaker and evangelist. Learn more about his story by watching the video below.</p>
            </div>
          </article>

          <article class="columns" key="video" :data-index="2">
            <div class="column">
              <div class="video-wrapper wide">
                <iframe src="https://player.vimeo.com/video/232323497" width="640" height="273" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              </div>
            </div>
          </article>

          <article class="columns" key="book" :data-index="3">
            <div class="column is-half">
              <h2>Book Me</h2>
              <p>Jesse Lusko is available for bookings. Get in contact today!</p>
            </div>
            <div class="column is-half">
              <h2 class="is-half">&nbsp;</h2>
              <nuxt-link to="/book" class="button is-primary is-expanded">Request a Booking</nuxt-link>
            </div>
          </article>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script>
import { TweenMax, Back } from 'gsap'
export default {
  components: {
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
