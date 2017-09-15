<template>
  <div>
    <SiteNav></SiteNav>
    <aside id="socialNav">
      <a href="#"><i class="fa fa-facebook-square"></i></a>
      <a href="#"><i class="fa fa-twitter-square"></i></a>
    </aside>
    <nuxt/>
  </div>
</template>

<script>
import SiteNav from '~/components/nav'
export default {
  components: {
    SiteNav
  }
}
</script>

<style lang="scss">

</style>
