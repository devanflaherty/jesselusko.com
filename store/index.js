import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      mobileVisible: false,
      fixedBody: false,
      isMessage: false
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
      }
    }
  })
}

export default createStore
