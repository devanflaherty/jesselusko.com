<template>
  <div class="error-page">
    <SiteNav></SiteNav>

    <transition name="slide-left" appear>
      <aside id="socialNav" v-if="!isMessage">
        <a target="_blank" rel="noopener" href="https://www.facebook.com/jesselusko"><i class="fa fa-facebook-square"></i></a>
        <a target="_blank" rel="noopener" href="https://twitter.com/jesselusko"><i class="fa fa-twitter-square"></i></a>
      </aside>
    </transition>

    <div class="error-container">
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <div class="error-wrapper-message">
        <h3 class="error-message">{{ error.message }}</h3>
        <p v-if="error.statusCode === 404"><nuxt-link class="error-link" to="/">Back to the home page</nuxt-link></p>
      </div>
    </div>

    <transition name="fade-in" appear>
      <SiteFooter></SiteFooter>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SiteNav from '~/components/nav'
import SiteFooter from '~/components/footer'

export default {
  name: 'nuxt-error',
  components: {
    SiteNav,
    SiteFooter
  },
  computed: {
    ...mapGetters(['breakpoint'])
  },
  props: ['error'],
  head () {
    return {
      title: this.error.message || 'An error occured'
    }
  }
}
</script>

<style scoped lang="scss">
footer {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.error-page {
  color: #000;
  background: #fff;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  height: 100vh;
  font-family: "SF UI Text", "Helvetica Neue", "Lucida Grande";
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.error-container {
  text-align: center;
}
.error-code {
  display: inline-block;
  font-size: 48px;
  font-weight: 500;
  vertical-align: top;
  border-right: 1px solid rgba(0, 0, 0, 0.298039);
  margin: 0px 20px 0px 0px;
  padding: 10px 23px;
}
.error-wrapper-message {
  display: inline-block;
  text-align: left;
  line-height: 49px;
  vertical-align: middle;
}
.error-message {
  font-size: 14px;
  font-weight: normal;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.error-link {
  color: #00BCD4;
  font-weight: normal;
  text-decoration: none;
  font-size: 14px;
}
</style>