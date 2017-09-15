<template>
  <nuxt-child :key="$route.path"></nuxt-child>
</template>

<script>
import { TweenMax, Back } from 'gsap'

export default {
  layout: 'messages',
  transition: {
    name: 'series',
    css: false,
    beforeEnter: function (el) {
      TweenMax.set(el, {
        opacity: 0,
        y: -200
      })
    },
    enter: function (el, done) {
      TweenMax.to(el, 1, {
        opacity: 1,
        y: 0
      })
      done()
    },
    beforeLeave: function (el, done) {
      TweenMax.to(el, 1, {
        opacity: 0,
        y: 0,
        ease: Back.easeIn
      })
    },
    leave: function (el, done) {
      done()
    }
  }
}
</script>