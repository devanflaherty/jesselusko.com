<template>
  <div class="fold-container">
    <transition name="fade-up" appear>
      <div class="box">
        <img class="hero-image" :src="series.fields.thumbnail.fields.file.url">
      </div>
    </transition>
  </div>
</template>

<script>
var pluralize = require('pluralize')

export default {
  name: 'booking',
  props: ['series'],
  methods: {
    pluralMe (str, count, bool) {
      return pluralize(str, count, bool)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/main';
.fold-container {
  position: fixed;
  z-index: 10;
  width: 50%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  @include mobile(){
    position: relative;
    width: 100%;
    height: 50vh;
  }
  .box {
    padding: 0;
    width: 90%;
    overflow: hidden;
    img {
      display: block;
    }
  }
}

// Transitions
.fade-up-enter-active, .fade-up-leave-active {
  transition: all 0.5s ease;
}
.fade-up-enter, .fade-up-leave-to  {
  transform: translate(0, 100px);
}
</style>
