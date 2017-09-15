<template>
  <transition-group name="staggered-up" tag="nav" class="main" :class="{'relative' : relative}" appear
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave">
    <nuxt-link to="/" key="home" :data-index="1" >
      <span>Home</span>
    </nuxt-link>
    <nuxt-link to="/bio" key="bio" :data-index="2">
      <span>bio</span>
      </nuxt-link>
    <nuxt-link to="/messages" key="messages" :data-index="3">Messages</nuxt-link>
    <nuxt-link to="/book" key="book" :data-index="4">Book Me</nuxt-link>
  </transition-group>
</template>

<script>
import { TweenMax, Back } from 'gsap'

export default {
  name: 'nav',
  props: ['relative'],
  methods: {
    beforeEnter (el) {
      TweenMax.set(el, {
        opacity: 0,
        y: -100
      })
    },
    enter (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        TweenMax.to(el, 1, {
          opacity: 1,
          y: 10,
          ease: Back.easeOut
        })
        done()
      }, delay)
    },
    leave (el, done) {
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
@import "../assets/main";
nav {
  position: absolute;
  right: 74px;
  top: 24px;
  z-index: 200;
  @include tablet {
    right: 74px;
  }
  &.relative {
    position: relative;
    right: 0;
    top: 0;
    float: right;
  }
  a {
    margin-left: 24px;
    color: $black;
    display: inline-block;
    overflow: hidden;
    &.nuxt-link-exact-active {
      font-weight: 800;
    }
    span {
      position: relative;
      z-index: 10;
    }
    svg {
      position: absolute;
      left: 0; right: 0;
      top: 0; bottom: -1.25rem;
      margin: auto;
      z-index: 0;
    }
  }
}
</style>