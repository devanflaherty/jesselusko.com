<template>
  <div :ref="refkey" class="card-container" :class="{'modal-active' : showModal}">
    <transition name="overlay-in">
      <div class="overlay" v-if="showModal"></div>
    </transition>
    <div class="apple-modal is-ready" :class="{'modal-active' : showModal}">
      <transition name="close-button-anim">
        <button class="delete" aria-label="close" @click="fireResetModal" v-if="showModal"></button>
      </transition>

      <header class="modal-card-head">
        <a class="fire-modal" href="#" @click.prevent="fireModal" v-if="!showModal"></a>
        <div class="modal-card-image" :style="`background-image: url(${img})`"></div>

        <div class="header-head" v-if="title">
          <span v-if="subTitle">Sub-Title</span>
          <h2 class="modal-card-title">Modal title</h2>
        </div>
        <div class="header-foot" v-if="desc">
          <span>Great thing that does great things.</span>
        </div>
      </header>
      <transition name="up-in">
        <section class="modal-card-body" v-if="showModal">
          <slot name="body"></slot>
        </section>
      </transition>
    </div>
  </div>
</template>
<script>
import { TimelineMax, Back } from 'gsap'
import VideoPlayer from '~/components/video_player'

export default {
  name: 'modal',
  props: ['refkey', 'color', 'img', 'title', 'sub-title', 'desc'],
  components: {
    VideoPlayer
  },
  data () {
    return {
      showModal: false,
      tl: new TimelineMax(),
      origAttr: {
        left: '',
        top: '',
        width: '',
        height: ''
      },
      defaultAttr: {
        toWidth: '640px',
        margin: '0 20px',
        borderRadius: '15px',
        position: {
          top: '56px',
          left: '50%',
          right: 0,
          percent: '-50'
        }
      },
      currentAttr: {
        toWidth: '640px',
        margin: '0 20px',
        borderRadius: '15px',
        position: {
          top: '56px',
          left: '50%',
          right: '50%',
          percent: '-50'
        }
      }
    }
  },
  methods: {
    changeModalStatus (bool) {
      this.showModal = bool
    },

    fireModal (e) {
      var el = e.currentTarget.parentNode.parentNode
      this.$store.dispatch('fixBody', true)
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'

      this.tl.clear()
      this.tl.restart()
      this.changeModalStatus(true)
      this.positionModal(el)
    },
    fireResetModal (e) {
      var el = e.currentTarget.parentNode
      this.$store.dispatch('fixBody', false)
      document.body.style.overflow = 'auto'
      document.body.style.height = 'auto'

      this.tl.clear()
      this.changeModalStatus(false)
      this.reverseModal(el)
      this.$router.push({
        path: this.$route.path,
        query: {
          message: this.refkey
        }
      })
    },

    positionModal (el, rect) {
      this.setOriginAttr()
      this.setCurrentAttr()

      this.tl.set(el, {
        position: 'fixed',
        zIndex: 900,
        width: this.origAttr.width,
        height: this.origAttr.height,
        left: this.origAttr.left,
        top: this.origAttr.top
      }).to(el, 1, {
        height: '200%',
        maxHeight: '100%',
        left: this.currentAttr.position.left,
        right: this.currentAttr.position.right,
        top: this.currentAttr.position.top,
        xPercent: this.currentAttr.position.percent,
        yPercent: 0,
        boxShadow: '0px 5px 30px rgba(0,0,0, 0.5)',
        borderRadius: this.currentAttr.borderRadius,
        margin: this.currentAttr.margin,
        maxWidth: '640px',
        width: '100%',
        ease: Back.easeOut
      }).set(el, {
        overflow: 'scroll'
      })
    },

    reverseModal (el) {
      this.setOriginAttr()

      this.tl.set(el, {
        overflow: 'hidden'
      }).to(el, 1, {
        left: this.origAttr.left,
        top: this.origAttr.top,
        xPercent: 0,
        yPercent: 0,
        ease: Back.easeOut.config(0.75)
      }).to(el, 0.5, {
        margin: '0',
        width: this.origAttr.width,
        height: this.origAttr.height,
        boxShadow: '0px 5px 30px rgba(0,0,0, 0.15)'
      }, 0).set(el, {
        position: 'absolute',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      })
    },
    setCurrentAttr () {
      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

      this.currentAttr = {
        toWidth: this.defaultAttr.toWidth,
        margin: this.defaultAttr.margin,
        borderRadius: this.defaultAttr.borderRadius,
        position: {
          top: this.defaultAttr.position.top,
          left: this.defaultAttr.position.left,
          right: this.defaultAttr.position.right,
          percent: this.defaultAttr.position.percent
        }
      }
      if (windowWidth < 700) {
        this.currentAttr = {
          toWidth: '100%',
          margin: 0,
          borderRadius: 0,
          position: {
            top: 0,
            left: '50%',
            right: 0,
            percent: '-50'
          }
        }
      }
    },
    setOriginAttr () {
      var root = this.$refs[this.refkey]
      var rect = root.getBoundingClientRect()
      this.origAttr.left = rect.left
      this.origAttr.top = rect.top
      this.origAttr.width = root.offsetWidth
      this.origAttr.height = root.offsetHeight
    }
  },
  mounted () {
    // TODO: update originalAttributes when window resizes
    this.setOriginAttr()
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/main';

.overlay {
  position: fixed;
  z-index: 500;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
}
.card-container {
  position: relative;
  width: 100%;
  border-radius: 15px;
  &:before {
    content: '';
    display: block;
    padding-top: 52.25%;
  }
}
.apple-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: white;
  box-shadow: 0px 5px 30px rgba(0,0,0, 0.15);
  overflow: hidden;
  &:active {
    transition: all 0.5s ease;
    transform: scale(0.9)
  }
  &.modal-active {
    position: fixed;
    .modal-card-image {
      position: absolute;
      // max-width: 640px;
      // width: 640px;
      right: 0;
      margin: auto;
      top: 0;
    }
  }
  .delete {
    position: absolute;
    cursor: pointer;
    z-index: 100;
    right: 2rem;
    top: 2rem;
  }
  header.modal-card-head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    overflow: hidden;
    padding: 0;
    .fire-modal {
      display: block;
      z-index: 100;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
    .modal-card-image {
      position: absolute;
      width: 100%;
      height: 400px;
      left: 0;
      right: 0;
      margin: auto;
      top: 0;
      background-size: 640px auto;
      background-position: center;
    }
    .header-head {
      position: relative;
      display: block;
    }
    .header-foot {
      position: relative;
      display: block;
    }
  }

  .up-in-enter-active {
    transition: all 0.5s .25s ease;
  }
  .up-in-leave-to, .up-in-leave-active {
    transition: all 0.5s ease;
  }
  .up-in-enter  {
    opacity: 0;
    transform: translate(0, 100px)
  }
  .up-in-leave-to  {
    opacity: 0;
  }

  .close-button-anim-enter-active, .close-button-anim-leave-active {
    transition: all 0.5s 0.5s ease;
  }
  .close-button-anim-enter, .close-button-anim-leave-to  {
    opacity: 0;
    transform: scale(0)
  }
}
</style>
