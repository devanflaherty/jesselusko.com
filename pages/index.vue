<template>
  <section class="container-vh">
    <div class="columns">
      <div class="column fold-container">
        <transition name="fade-up" appear>
          <div class="photo-fold" style="background: url('img/jesse.png')">
            <transition name="photo-wipe" appear>
              <div class="mask"></div>
            </transition>
            <div class="fold-footer">
              <h2>Jesse Lusko</h2>
            </div>
          </div>
        </transition>
      </div>
      <div id="content" class="column is-half">
        <transition-group name="staggered" tag="section" class="main" appear
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave">
          <article class="columns is-multiline" key="welcome" :data-index="1">
            <div class="column">
              <h2 class="is-half">Welcome</h2>
              <p>Jesse Lusko is pastor, speaker and evangelist. Learn more about his story by watching the video below.</p>
            </div>
          </article>

          <article id="video" class="columns" key="video" :data-index="2">
            <div class="column">
              <div class="video-wrapper">
                <VideoPlayer url="https://player.vimeo.com/video/233254026" color="e51717"></VideoPlayer>
              </div>
            </div>
          </article>

          <Booking key="book" :data-index="3"></Booking>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script>
import { TweenMax, Back } from 'gsap'
import Booking from '../components/booking'
import VideoPlayer from '~/components/video_player'

export default {
  components: {
    Booking,
    VideoPlayer
  },
  methods: {
    beforeEnter: function (el) {
      TweenMax.set(el, {
        opacity: 0,
        x: 100
      })
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        TweenMax.to(el, 1, {
          opacity: 1,
          x: 0,
          ease: Back.easeOut
        })
        done()
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        TweenMax.to(el, 1, {
          opacity: 0,
          x: 100,
          ease: Back.easeIn
        })
        done()
      }, delay)
    }
  }
}
</script>

<style lang="scss">
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  top: 0;
  left: 0;
  transform: translate(0, -100%);
}
.photo-wipe-enter-active, .photo-wipe-leave-active {
  transition: all 0.5s cubic-bezier(.97,0,.51,1);
}
.photo-wipe-enter, .photo-wipe-leave-active  {
  transform: translate(0, 0)
}
.fade-up-enter-active, .fade-up-leave-active {
  transition: all 0.5s ease;
}
.fade-up-enter, .fade-up-leave-active  {
  transform: translate(0, 100px);
}
.fade-left-enter-active, .fade-left-leave-active {
  transition: all 0.5s cubic-bezier(.94,.34,.57, 2.45);
}
.fade-left-enter, .fade-left-leave-active  {
  transform: translate(-100px, 0);
}
.container-vh {
  height: 100vh;
  .columns {
  flex: 1 0 100%;
  .column {
    overflow: scroll;
  }
}
}
.fold-container {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  padding: 0;
  .photo-fold {
    flex: 1 0 auto;
    background-size: cover!important;
    background-position: center;
    min-height: 400px;
    position: relative;
    overflow: hidden;
    h2 {
      color: white;
      border: none;
      position: absolute;
      bottom: 24px;
      left: 24px;
    }
   }
}
#video {
  margin-bottom: 2rem;
}
.video-wrapper {
	position: relative;
	padding-bottom: 52.25%;/*56.25%;  16:9 */
	padding-top: 25px;
	height: 0;
  &.wide {
    padding-bottom: 38.25%; /* 16:9 */
  }
}
.video-wrapper iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
