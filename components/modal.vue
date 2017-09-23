<template>
  <div class="modal" :class="{'is-active' : modalVisible}">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <slot name="body"></slot>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>

<script>
import VideoPlayer from '~/components/video_player'
export default {
  name: 'message-modal',
  props: ['color', 'modalVisible', 'header', 'footer'],
  components: {
    VideoPlayer
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    closeModal () {
      this.$emit('changeModalVis', false)
    }
  }
}
</script>

<style lang="scss">
.modal {
  z-index: 200;
}
.modal-content {
  border-radius: 15px;
  background: white;
  padding: 1rem;
}
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
  transition: all 0.5s cubic-bezier(.97,0,.51,1);
}
.photo-wipe-enter, .photo-wipe-leave-to  {
  transform: translate(0, 0)
}
.fade-in-enter-active, .fade-in-leave-active {
  transition: all 0.5s ease;
}
.fade-in-enter, .fade-in-leave-to  {
  opacity: 0
}
</style>