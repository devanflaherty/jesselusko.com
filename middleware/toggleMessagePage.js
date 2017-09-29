export default function ({ store, route }) {
  var routeName = route.name
  if (routeName === 'series' || routeName === 'seriesSlug-message') {
    store.dispatch('isMessage', true)
  } else {
    store.dispatch('isMessage', false)
  }
}
