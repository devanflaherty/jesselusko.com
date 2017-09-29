<template>
  <transition name="scale-in" appear>
    <nuxt-link class="series-card" :to="`/${series.fields.slug}`" v-if="!$route.params.series">
      <transition name="photo-wipe">
        <div class="mask" :style="`background-color: ${series.fields.color}`" v-if="loading"></div>
      </transition>
      <div class="flex" :class="{'show-title' : showTitle}" @mouseenter="showSeriesTitle(true)" @mouseleave="showSeriesTitle(false)">
        <div class="show-card" :style="`background-color:${series.fields.color}`"></div>
        <div class="hgroup">
          <h3>{{series.fields.title}}</h3>
          <span v-if="series.fields.messages">{{pluralMe('Message', series.fields.messages.length, true)}}</span>
        </div>
      </div>
      <img v-lazy="series.fields.thumbnail.fields.file.url">
    </nuxt-link>
  </transition>
</template>

<script>
var pluralize = require('pluralize')

export default {
  name: 'series-card',
  props: ['series'],
  data () {
    return {
      loading: true,
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
  },
  mounted () {
    this.$Lazyload.$on('loaded', () => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss">
.series-card {
  display: block;
  transition: all 0.5s ease;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 75%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: auto;
    margin: 0;
  }
  .mask {
    z-index: 10;
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
    z-index: 10;
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

// Transitions
.scale-in-enter-active, .scale-in-leave-active {
  transition: all 0.5s ease;
}
.scale-in-enter, .scale-in-leave-to  {
  transform: scale(1.2);
}
</style>
