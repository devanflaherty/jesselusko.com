export default function ({ store, route }) {
  console.log(route.name)
  var routeName = route.name
  if (routeName === 'messages' || routeName === 'messages-series-message') {
    store.dispatch('isMessage', true)
  } else {
    store.dispatch('isMessage', false)
  }
}
