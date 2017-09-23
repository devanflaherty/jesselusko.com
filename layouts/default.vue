<template>
  <div class="layout">
    <SiteNav :message="isMessage"></SiteNav>
    
    <transition name="slide-left" appear>
      <aside id="socialNav" v-if="!isMessage">
        <a href="#"><i class="fa fa-facebook-square"></i></a>
        <a href="#"><i class="fa fa-twitter-square"></i></a>
      </aside>
    </transition>
    <nuxt/>
    <transition name="fade-in" appear>
      <SiteFooter v-if="isMessage"></SiteFooter>
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
    ...mapGetters(['isMessage'])
  }
}
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
}
</style>
