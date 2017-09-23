export default function ({ store, route }) {
  store.dispatch('fixBody', false)
  store.dispatch('toggleMobile', false)
}
