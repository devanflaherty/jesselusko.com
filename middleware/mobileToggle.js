export default function ({ store, route, window }) {
  store.dispatch('fixBody', false)
  store.dispatch('toggleMobile', false)
}
