<template>
  <transition name="fade-up" appear>
    <div class="fold-container" :style="`background-color: ${color}`">
      <div class="photo-fold" v-lazy:background-image="img" :style="`background-position: ${mobileImg}`">
        <transition name="photo-wipe">
          <div class="mask" :style="`background-color: ${color};`" v-if="loading"></div>
        </transition>
        <div class="fold-footer">
          <transition name="fade-in" appear>
            <h1 v-if="$route.name !== 'seriesSlug'">Jesse Lusko</h1>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'photo-panel',
  props: ['img', 'color', 'mobile-img'],
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.loading = true
  },
  mounted () {
    this.$Lazyload.$on('loaded', () => {
      this.loading = false
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/main';

.fold-container {
  position: fixed;
  width: 50%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
  transition: height 0.5s ease;
  @include mobile(){
    position: relative;
    width: 100%;
    height: 50vh;
  }
  .loaded {
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 0;
    transition: height 0.5s ease;
    @include mobile(){
      position: relative;
      width: 100%;
      height: 50vh;
    }
  }
  .photo-fold {
    flex: 1 0 auto;
    background-size: cover!important;
    background-position: center;
    min-height: 50vh;
    position: relative;
    overflow: hidden;
    h1 {
      position: absolute;
      z-index: 2;
      bottom: 1rem;
      left: 1rem;
      font-size: 220px;
      line-height: .75;
      color: #eaeaea;
      transition: all 0.5s ease;
      font-weight: 800;
      @include mobile(){
        font-size: 120px;
        letter-spacing: -3px;
      }
      @include tablet(){
        font-size: 120px;
        letter-spacing: -5px;
      }
      @include desktop(){
        font-size: 220px;
        letter-spacing: -10px;
      }
    }
  }
}
</style>
