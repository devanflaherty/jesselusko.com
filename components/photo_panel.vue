<template>
  <div class="fold-container">
    <transition name="fade-up" appear>
      <div class="photo-fold" :style="`background: url(${img}); background-position: ${mobileImg}`">
        <transition name="photo-wipe" appear>
          <div class="mask" :style="`background-color: ${color}`"></div>
        </transition>
        <div class="fold-footer">
          <transition name="fade-in" appear>
            <h1>Jesse Lusko</h1>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'photo-panel',
  props: ['img', 'color', 'mobile-img']
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
  height: 100%;
  flex-direction: column;
  padding: 0;
  transition: height 0.5s ease;
  @include mobile(){
    position: relative;
    width: 100%;
    height: 50vh;
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
      z-index: 0;
      bottom: 1rem;
      left: 1rem;
      font-family: SFProDisplay-Bold;
      font-size: 220px;
      line-height: .75;
      color: #eaeaea;
      transition: all 0.5s ease;
      @include mobile(){
        font-size: 120px;
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

.photo-wipe-enter-active, .photo-wipe-leave-active {
  transition: all 0.5s cubic-bezier(.97,0,.51,1);
}
.photo-wipe-enter, .photo-wipe-leave-to  {
  transform: translate(0, 0)
}
</style>
