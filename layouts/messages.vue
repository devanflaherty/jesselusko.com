<template>
  <div>
    <SiteNav :relative="true"></SiteNav>
    <nuxt/>
    <Footer></Footer>
  </div>
</template>

<script>
import SiteNav from '~/components/nav'
import Footer from '~/components/footer'

export default {
  components: {
    SiteNav,
    Footer
  }
}
</script>

<style lang="scss">

</style>
