<template>
  <section id="seriesPage" class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <h2>Series</h2>
        </div>
      </div>
      <transition-group name="staggered" tag="div" class="columns is-multiline" appear v-if="series.length > 0"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave">
        <div class="column is-4 series-block" v-for="(s, index) in series" :key="index" :data-index="index">
          <SeriesCard :series="s"></SeriesCard>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
import { TweenMax, Back } from 'gsap'
import SeriesCard from '~/components/series_card'

import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  components: {
    SeriesCard
  },
  asyncData ({env}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'series',
        order: 'fields.position'
      })
    ]).then(([series]) => {
      // return data that should be available
      // in the template
      return {
        series: series.items
      }
    }).catch(console.error)
  },
  methods: {
    beforeEnter (el) {
      TweenMax.set(el, {
        autoAlpha: 0,
        y: 100
      })
    },
    enter (el, done) {
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
    leave (el, done) {
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

<style lang="scss" scoped>
@import '../assets/main';
.section {
  position: relative;
  z-index: 10;
  @include mobile() {
    padding-top: 4rem!important;
  }
}
.series-block {
  opacity: 0;
}
.box {
  overflow: hidden;
}
</style>
