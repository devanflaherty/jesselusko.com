<template>
  <div class="page">
    <PhotoPanel img="img/2.jpg" color="#E1E8EB" mobile-img="center"></PhotoPanel>
    <section class="section">
      <div class="columns">
        <div id="content" class="column is-6 is-offset-6">
          <transition-group name="staggered" tag="section" class="main" appear
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave">
            <article class="columns" key="welcome" :data-index="1">
              <div class="column">
                <h2>Request Form</h2>
                <form @submit.prevent="onSubmit">
                  
                  <div class="field">
                    <label class="label">Name</label>
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="text" v-model="name" name="name" 
                        placeholder="John Smith" 
                        v-validate="'required'" 
                        autofocus
                        :class="{'is-danger': errors.has('name') }">
                      <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                      </span>
                      <transition name="pop">
                        <span class="icon is-small is-right" v-if="fields.name.valid">
                          <i class="fa fa-check"></i>
                        </span>
                      </transition>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Phone</label>
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="tel" v-model="phone" name="phone" placeholder="444-555-7777"
                        v-validate="'required|alpha_dash'"
                        :class="{'is-danger': errors.has('phone') }">
                      <span class="icon is-small is-left">
                        <i class="fa fa-phone"></i>
                      </span>
                      <transition name="pop">
                        <span class="icon is-small is-right is-check" v-if="fields.phone.valid">
                          <i class="fa fa-check"></i>
                        </span>
                      </transition>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="email" v-model="email" name="email" placeholder="e.g. johnsmith@gmail.com"
                        v-validate="'required|email'"
                        :class="{'is-danger': errors.has('email') }">
                      <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                      </span>
                      <transition name="pop">
                        <span class="icon is-small is-right is-check" v-if="fields.email.valid">
                          <i class="fa fa-check"></i>
                        </span>
                      </transition>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Message</label>
                    <div class="control">
                      <textarea class="textarea" v-model="message" name="message" placeholder="Tell us about your event."
                        v-validate="'required'"
                        :class="{'is-danger': errors.has('message') }"></textarea>
                    </div>
                  </div>

                  <input type="text" name="_gotcha" style="display:none" />

                  <transition name="fade-in">
                    <div class="notification is-danger" v-if="errors.any()">
                      <transition-group name="list" tag="ul" id="errors">
                        <li v-for="(err, index) in errors.collect()" :key="index">
                          <span v-for="(e, index) in err" :key="index">{{e}}</span>
                        </li>
                      </transition-group>
                    </div>
                  </transition>
  
                  <div class="field is-grouped">
                    <div class="control">
                      <button @click="onSubmit" class="button is-primary" :class="{'is-loading': loading, 'is-success': sent}">
                        <transition name="fade-in">
                          <span class="icon is-small" v-if="sent">
                            <i class="fa fa-check"></i>
                          </span>
                        </transition>
                        <span v-if="!sent">Send Request</span>
                        <span v-else>Saved</span>
                      </button>
                    </div>
                    <div class="control" v-if="!sent">
                      <button class="button is-link" @click.prevent="clearForm">Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
            </article>
          </transition-group>
        </div>
      </div>
    </section>
    <Modal :modalVisible="modalVisible" @changeModalVis="changeModalVis">
      <div slot="body" v-if="errors.any()">
        <h3>Errors</h3>
        <p>Please correct the errors in your form!</p>
      </div>

      <div slot="body" v-if="!errors.any()">
        <h3>Success</h3>
        <h3>Your request has been sent!</h3>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import { TweenMax, Back } from 'gsap'
import VideoPlayer from '~/components/video_player'
import PhotoPanel from '~/components/photo_panel'
import Modal from '~/components/modal'

export default {
  components: {
    Modal,
    VideoPlayer,
    PhotoPanel
  },
  data () {
    return {
      loading: false,
      sent: false,
      modalVisible: false,
      name: null,
      phone: null,
      email: null,
      message: null
    }
  },
  methods: {
    onSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.post()
          return
        }

        this.changeModalVis(true)
      })
    },
    post () {
      this.loading = true
      axios.post('https://formspree.io/devanflaherty@gmail.com', {
        'name': this.name,
        'email': this.email,
        'phone': this.phone,
        'message': this.message,
        '_replyto': this.email,
        '_subject': `Booking Request from ${this.name}`
        // '_subject': 'Booking Request from ' + this.name,
        // '_next': '#success'
      }).then(res => {
        this.loading = false
        this.changeModalVis(true)
        this.name = null
        this.phone = null
        this.email = null
        this.message = null
        this.$validator.clean()
      })
    },
    clearForm () {
      this.name = null
      this.phone = null
      this.email = null
      this.message = null
      this.$validator.clean()
    },
    changeModalVis (bool) {
      this.modalVisible = bool
    },
    beforeEnter: function (el) {
      TweenMax.set(el, {
        opacity: 0,
        y: 100
      })
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        TweenMax.to(el, 1, {
          opacity: 1,
          y: 0,
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
          y: 100,
          ease: Back.easeIn
        })
        done()
      }, delay)
    }
  },
  mounted () {
    console.log(this.fields.name.valid)
    // this.changeModalVis(true)
  }
}
</script>

<style lang="scss">
.fa-check {
  color: hsl(141, 71%, 48%);
}

.fade-in-enter-active, .fade-in-leave-active {
  transition: all .5s ease!important;
}
.fade-in-enter, .fade-in-leave-to {
  opacity: 0!important;
}

.pop-enter-active, .pop-leave-active {
  transition: all .5s ease;
}
.pop-enter, .pop-leave-to  {
  opacity: 0;
  transform: translate(0, 20px);
}

#errors {
  transition: all 0.5s ease;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
