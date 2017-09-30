<template>
  <section id="seriesPage" class="section">
    
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
        'content_type': 'series'
      })
    ]).then(([series]) => {
      // return data that should be available
      // in the template
      var sarr = series.items.map((s) => {
        return `/${s.fields.slug}`
      })

      var marr = []
      series.items.forEach(s => {
        if (s.fields.messages) {
          var messages = s.fields.messages.map((m) => {
            return `/${s.fields.slug}/${m.fields.slug}`
          })
          marr = [...marr, ...messages]
        }
      })
      var rarr = [...sarr, ...marr]
      console.log(rarr)
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
