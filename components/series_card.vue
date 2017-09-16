<template>
  <article>
    <transition name="scale-in" appear v-if="!$route.params.series">
      <nuxt-link class="series-card" :to="`/messages/${series.fields.slug}`">
        <transition name="photo-wipe" appear>
          <div class="mask" :style="`background-color: ${series.fields.color}`"></div>
        </transition>
        <div class="flex" :class="{'show-title' : showTitle}" @mouseenter="showSeriesTitle(true)" @mouseleave="showSeriesTitle(false)">
          <div class="show-card" :style="`background-color:${series.fields.color}`"></div>
          <div class="hgroup">
            <h3>{{series.fields.title}}</h3>
            <span v-if="series.fields.messages">{{pluralMe('Message', series.fields.messages.length, true)}}</span>
          </div>
        </div>
        <img :src="series.fields.thumbnail.fields.file.url">
      </nuxt-link>
    </transition>

    <transition name="scale-out" appear v-if="$route.params.series">
      <section class="hero is-medium" :style="`width:100%; background-color: ${series.fields.color}`">
        <div class="hero-image" :style="`background-image: url(${series.fields.thumbnail.fields.file.url})`"></div>
        <div class="hero-body">
          <div class="container">
            <div class="flex" :class="{'show-title' : showTitle}" @mouseenter="showSeriesTitle(true)" @mouseleave="showSeriesTitle(false)">
              <div class="show-card" :style="`background-color:${series.fields.color}`"></div>
              <div class="hgroup">
                <h3>{{series.fields.title}}</h3>
                <span v-if="series.fields.messages">{{pluralMe('Message', series.fields.messages.length, true)}}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </transition>
  </article>
</template>

<script>
var pluralize = require('pluralize')

export default {
  name: 'booking',
  props: ['series'],
  data () {
    return {
      showTitle: false
    }
  },
  methods: {
    findAncestor (el, sel) {
      const e = document.querySelector(el).closest(sel)
      return e
    },
    pluralMe (str, count, bool) {
      return pluralize(str, count, bool)
    },
    showSeriesTitle (bool) {
      this.showTitle = bool
    }
  }
}
</script>

<style lang="scss">
.series-card, .hero {
  display: block;
  transition: all 0.5s ease;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  img {
    display: block;
    width: 100%;
    height: auto;
    margin: 0;
  }
  .flex {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    .show-card {
      position: absolute;
      display: block;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 250px;
      height: 250px;
      background: rgba(0,0,0,0.5);
      transition: all 0.5s ease;
      opacity: 0;
      transform: scale(0) rotate(-180deg);
    }
    &.show-title {
      .show-card {
        opacity: 0.95;
        transform: scale(1) rotate(45deg);
      }
      .hgroup {
        opacity: 1;
        transition: all 0.5s .125s ease;
        transform: scale(1);
        h3, span {
          transform: translate(0,0);
        }
      }
    }
  }
  .hgroup {
    position: relative;
    color: white;
    transition: all 0.25s ease;
    opacity: 0;
    transform: scale(0);
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      transform: translate(-50px, 0);
      transition: all 0.5s .25s ease;
    }
    span {
      display: inline-block;
      font-size: .75rem;
      opacity: 0.75;
      transform: translate(-70px, 0);
      transition: all 0.66s 0.33s ease;
    }
  }
}

.series-card {
  border-radius: 6px;
  &:hover {
    transform: scale(1.066) perspective(0px) translateZ(100px);
    z-index: 20;
  }
}
.hero {
  position: relative;
  overflow: hidden;
  .hero-image {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover!important;
    background-position: center;
    opacity: 0.9;
  }
  .show-card {
    opacity: 0.95!important;
    transform: scale(1) rotate(45deg)!important;
  }
  .hgroup {
    opacity: 1;
    transition: all 0.5s .125s ease;
    transform: scale(1);
    h3, span {
      transform: translate(0,0);
    }
  }
}

// Transitions
.mask {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: black;
  top: 0;
  left: 0;
  transform: translate(0, -100%);
}
.photo-wipe-enter-active, .photo-wipe-leave-active {
  transition: all 0.5s 1s cubic-bezier(.97,0,.51,1)!important;
}
.photo-wipe-enter, .photo-wipe-leave-active  {
  transform: translate(0, 0)
}
.scale-in-enter-active, .scale-in-leave-active {
  transition: all 0.5s ease;
}
.scale-in-enter, .scale-in-leave-active  {
  transform: scale(1.2);
}
.scale-out-enter-active, .scale-out-leave-active {
  transition: all 1s ease;
}
.scale-out-enter, .scale-out-leave-active  {
  // opacity: 0;
  transform: translate(0, 25%);
}
</style>
