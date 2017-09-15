<template>
  <section class="section">
    <div class="columns">
      <div class="column is-4">
        <h2>Messages</h2>
      </div>
    </div>
    <transition-group name="staggered" tag="div" class="columns is-multiline" appear v-if="series.length > 0"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave">
      <div class="column is-4" v-for="(s, index) in series" :key="index" :data-index="index">
        <SeriesCard :series="s"></SeriesCard>
      </div>
    </transition-group>
      <!-- <div class="tile is-ancestor">
        <div class="tile is-parent is-6">
          <article class="tile is-child">
            <SeriesCard :series="series[0]"></SeriesCard>
          </article>
        </div>
        <div class="tile" v-if="series.length > 1">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child">
             <SeriesCard :series="series[1]"></SeriesCard>
            </article>
            <article class="tile is-child" v-if="series.length > 2">
              <SeriesCard :series="series[2]"></SeriesCard>
            </article>
          </div>
        </div>
        <div class="tile" v-if="series.length > 3">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child">
              <SeriesCard :series="series[3]"></SeriesCard>
            </article>
            <article class="tile is-child" v-if="series.length > 4">
              <SeriesCard :series="series[4]"></SeriesCard>
            </article>
          </div>
        </div>
      </div>

      <div class="tile is-ancestor" v-if="series.length > 5">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child">
              <SeriesCard :series="series[5]"></SeriesCard>
            </article>
            <article class="tile is-child" v-if="series.length > 6">
              <SeriesCard :series="series[6]"></SeriesCard>
            </article>
          </div>
        </div>
        <div class="tile is-parent is-8" v-if="series.length > 7">
          <article class="tile is-child">
            <SeriesCard :series="series[7]"></SeriesCard>
          </article>
        </div>
      </div> -->
    </section>
  </section>
</template>

<script>
import { TweenMax, Back } from 'gsap'
import SeriesCard from '~/components/series_card'

import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  layout: 'messages',
  components: {
    SeriesCard
  },
  asyncData ({env}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'series',
        order: '-sys.createdAt'
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
    beforeLeave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        TweenMax.to(el, 1, {
          opacity: 0,
          y: 100,
          ease: Back.easeIn
        })
        done()
      }, delay)
    },
    leave: function (el, done) {
      done()
    }
  }
}
</script>

<style lang="scss">
.box {
  overflow: hidden;
}
</style>
