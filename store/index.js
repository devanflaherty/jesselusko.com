import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      mobileVisible: false,
      fixedBody: false,
      isMessage: false,
      breakpoint: 0
    },
    getters: {
      mobileVisibility: state => {
        return state.mobileVisible
      },
      fixedBody: state => {
        return state.fixedBody
      },
      isMessage: state => {
        return state.isMessage
      },
      breakpoint: state => {
        return state.breakpoint
      }
    },
    mutations: {
      TOGGLE_MOBILE (state, bool) {
        state.mobileVisible = bool
      },
      FIX_BODY (state, bool) {
        state.fixedBody = bool
      },
      TOGGLE_MESSAGE_PAGE (state, bool) {
        state.isMessage = bool
      },
      CHANGE_BREAKPOINT (state, bp) {
        state.breakpoint = bp
      }
    },
    actions: {
      toggleMobile (context, bool) {
        context.commit('TOGGLE_MOBILE', bool)
      },
      fixBody (context, bool) {
        if (context.state.fixedBody === true) {
          var body = document.querySelector('body')
          body.style.overflow = 'auto'
          body.style.height = '100%'
        }
        context.commit('FIX_BODY', bool)
      },
      isMessage (context, bool) {
        context.commit('TOGGLE_MESSAGE_PAGE', bool)
      },
      changeBreakpoint (context, bp) {
        context.commit('CHANGE_BREAKPOINT', bp)
      }
    }
  })
}

export default createStore
