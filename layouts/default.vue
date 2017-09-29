<template>
  <div class="layout">
    <SiteNav :message="isMessage"></SiteNav>
    
    <transition name="slide-left" appear>
      <aside id="socialNav" v-if="!isMessage">
        <a target="_blank" rel="noopener" href="https://www.facebook.com/jesselusko"><i class="fa fa-facebook-square"></i></a>
        <a target="_blank" rel="noopener" href="https://twitter.com/jesselusko"><i class="fa fa-twitter-square"></i></a>
      </aside>
    </transition>
    <nuxt/>
    <transition name="fade-in" appear>
      <SiteFooter v-if="isMessage || breakpoint == 1"></SiteFooter>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SiteNav from '~/components/nav'
import SiteFooter from '~/components/footer'

export default {
  components: {
    SiteNav,
    SiteFooter
  },
  computed: {
    ...mapGetters(['breakpoint', 'isMessage'])
  },
  methods: {
    setBreakpoint (w) {
      if (w <= 768) {
        // mobile
        if (this.breakpoint !== 1) {
          this.$store.dispatch('changeBreakpoint', 1)
        }
      } else if (w > 768 && w < 1008) {
        // tablet
        if (this.breakpoint !== 2) {
          this.$store.dispatch('changeBreakpoint', 2)
        }
      } else if (w >= 1008 && w < 1200) {
        // desktop
        if (this.breakpoint !== 3) {
          this.$store.dispatch('changeBreakpoint', 3)
        }
      } else if (w >= 1200 && w < 1392) {
        // widescreen
        if (this.breakpoint !== 4) {
          this.$store.dispatch('changeBreakpoint', 4)
        }
      } else if (w >= 1392) {
        // fullhd
        if (this.breakpoint !== 5) {
          this.$store.dispatch('changeBreakpoint', 5)
        }
      }
    }
  },
  mounted () {
    var w = window.innerWidth
    this.setBreakpoint(w)
    window.onresize = () => {
      w = window.innerWidth
      this.setBreakpoint(w)
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/bulma";

.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
}
</style>
