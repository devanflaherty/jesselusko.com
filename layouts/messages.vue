<template>
  <div>
    <SiteNav :relative="true"></SiteNav>
    <nuxt/>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
import SiteNav from '~/components/nav'
import SiteFooter from '~/components/footer'

export default {
  components: {
    SiteNav,
    SiteFooter
  }
}
</script>

<style lang="scss">

</style>
