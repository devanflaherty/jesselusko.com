<template>
  <nav class="navbar" :class="{'relative' : relative, 'is-active': mobileVisibility}">
    <div class="navbar-brand">
      <a id="logo" class="navbar-item" href="http://bulma.io" v-if="relative">
        Jesse Lusko
      </a>
      <div class="navbar-burger burger" :class="{'is-active': mobileVisibility}" data-target="navMenu" @click="showMobile">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- <transition name="nav-scale"> -->
      <div id="navMenu" class="navbar-menu" :class="{'is-active': mobileVisibility}">
        <transition-group name="staggered-up" tag="div" class="navbar-end" appear
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave">
          <nuxt-link class="navbar-item " to="/" key="home" :data-index="1" >
            <span>Home</span>
          </nuxt-link>
          <nuxt-link class="navbar-item " to="/bio" key="bio" :data-index="2">
            <span>Bio</span>
          </nuxt-link>
          <nuxt-link class="navbar-item " to="/messages" key="messages" :data-index="3">Messages</nuxt-link>
          <nuxt-link class="navbar-item " to="/book" key="book" :data-index="4">Book Me</nuxt-link>
        </transition-group>

        <transition name="nav-fade-in" delay="500">
          <span class="nav-footer-logo" v-if="mobileVisibility">Jesse Lusko</span>
        </transition>
      </div>
    <!-- </transition> -->
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { TweenMax, Back } from 'gsap'

export default {
  name: 'nav',
  props: ['relative'],
  computed: {
    ...mapGetters(['mobileVisibility', 'fixedBody', 'isMobile'])
  },
  methods: {
    showMobile (e) {
      this.$store.dispatch('fixBody', !this.fixedBody)
      var target = e.currentTarget.dataset.target
      var menu = document.getElementById(target)
      var body = document.querySelector('body')

      if (this.mobileVisibility) {
        body.style.overflow = 'auto'
        body.style.height = '100%'
        this.$store.dispatch('toggleMobile', !this.mobileVisibility)
        setTimeout(() => {
          menu.style.display = 'none'
        }, 500)
      } else {
        body.style.overflow = 'hidden'
        body.style.height = '100vh'
        menu.style.display = 'flex'
        setTimeout(() => {
          this.$store.dispatch('toggleMobile', !this.mobileVisibility)
        }, 10)
      }
    },
    beforeEnter (el) {
      if (this.$route.path === '/') {
        TweenMax.set(el, {
          opacity: 0,
          y: -100
        })
      }
    },
    enter (el, done) {
      if (this.$route.path === '/') {
        var delay = el.dataset.index * 150
        setTimeout(function () {
          TweenMax.to(el, 1, {
            opacity: 1,
            y: 0,
            ease: Back.easeOut
          })
          done()
        }, delay)
      }
    },
    leave (el, done) {
      if (this.$route.path === '/') {
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
  },
  mounted () {
    var w = window.innerWidth
    var menu = document.getElementById('navMenu')

    if (!this.mobileVisibility && this.isMobile) {
      menu.style.display = 'none'
    }

    window.onresize = () => {
      w = window.innerWidth
      if (w > 1024) {
        this.$store.dispatch('fixBody', false)
        if (this.mobileVisibility) {
          document.body.style.overflow = 'auto'
          document.body.style.height = '100%'
          this.$store.dispatch('toggleMobile', !this.mobileVisibility)
          setTimeout(() => {
            menu.style.display = 'block'
          }, 500)
        }
      } else if (w < 1024) {
        menu.style.display = 'none'
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/main";
#logo {
  font-size: 1.5rem;
  letter-spacing: -1px;
  font-weight: 800;
  margin-left: 0.5rem;
  white-space: nowrap;
}
nav.navbar {
  position: absolute;
  width: 100%;
  top:0;
  left: 0;
  z-index: 200;
  background-color: transparent!important;
  &.is-active {
    height: 100%;
  }
  @include tablet {
    position: fixed;
    right: 74px;
  }
  @include desktop {
    position: absolute!important;
  }
  .navbar-brand {
    position: relative;
    z-index: 200;
    .navbar-burger {
      border-radius: 30px;
      transition: all 0.33s ease;
      margin-top: 0.5rem;
      margin-right: 0.5rem;
      height: 2.25rem;
      width: 2.25rem;
      @include mobile() {
        background: $black;
        span {
          background: $white;
        }
      }
    }
  }
  .navbar-menu {
    z-index: 100;
    transition: all 0.5s ease;
    overflow: hidden;
    @include touch() {
      top: 0;
      position: absolute;
      flex-direction: column;
      // display: flex;
      padding: 0;
      height: 100vh;
      width: 100%;
      transform: translate(100%, 0);
      display: none;
      .navbar-end {
        flex: 1 0 100%;
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-top: 4rem;
        margin-right: 0!important;
        a {
          font-size: 3rem;
          padding-left: 1rem;
        }
      }
    }
    @include tablet() {
      right: 0;
      width: 50%;
    }
    .navbar-end {
      margin-right: 42px;
      transition: all 0.5s ease;
    }
    &.is-active {
      transform: translate(0, 0);
    }
    span.nav-footer-logo {
      position: absolute;
      z-index: 0;
      bottom: 1rem;
      left: 1rem;
      font-family: SFProDisplay-Bold;
      font-size: 120px;
      line-height: .75;
      color: #eaeaea;
      @include tablet() {
        display: none;
      }
    }
  }
  &.relative {
    position: relative!important;
    right: 0;
    top: 0;
    .navbar-end {
      margin-right: 42px
    }
  }
  a {
    transition: all 0.5s ease;
    color: rgba($black, 0.9);
    display: inline-block;
    overflow: hidden;
    border-top: 2px solid transparent;
    &.nuxt-link-exact-active {
      font-weight: 800;
      border-top: 2px solid $primary;
    }
    &:hover {
      border-top: 2px solid $primary;
      color: $black;
    }
    @include touch() {
      border-top: none!important;
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


.nav-scale-enter-active, .nav-scale-leave-active {
  transition: transform 0.5s ease, opacity 0.25s .25s ease;
}
.nav-scale-enter, .nav-scale-leave-to {
  opacity: 0;
  transform: translate(100%, 0);
}

.nav-scale-enter-to {
  opacity: 1;
  transform: translate(0,0)
}

.nav-fade-in-enter-active, .nav-fade-in-leave-active {
  transition: all 0.5s .5s ease;
}
.nav-fade-in-enter, .nav-fade-in-leave-to {
  opacity: 0;
  transform: translate(25%, 0)
}

</style>
