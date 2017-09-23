<template>
  <footer class="section">
    <transition name="slide-up" appear>
      <h1>Jesse Lusko</h1>
    </transition>
    <div class="container">
      <div class="columns">
        <div class="column is-7">
          <span>Pastor. Speaker. Evangelist</span>
        </div>
        <div class="column">
          <nuxt-link to="/book" class="button is-primary is-expanded">Request a Booking</nuxt-link>
        </div>
        <div id="socialIcons" class="column is-narrow">
          <a href="#"><i class="fa fa-facebook-square"></i></a>
          <a href="#"><i class="fa fa-twitter-square"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '../assets/main';
footer {
  flex: 1 0 auto;
  position: relative;
  z-index: 0!important;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @include tablet() {
    height: 14rem;
  }
  @include widescreen() {
    height: 10rem;
  }
  h1 {
    position: fixed;
    z-index: 0;
    bottom: 0;
    left: 0;
    font-family: SFProDisplay-Bold;
    font-size: 220px;
    line-height: .75;
    color: #eaeaea;
    letter-spacing: -10px;
    transition: all 0.5s ease;
    @include mobile() {
      font-size: 160px;
    }
    @include tablet() {
      font-size: 220px;
    }
  }
  #socialIcons {
    display: flex;
    justify-content: center;
    a {
      font-size: 2rem;
      margin: 0 1rem;
    }
  }
}
</style>
