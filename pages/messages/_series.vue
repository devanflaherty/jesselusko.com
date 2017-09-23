<template>
  <nuxt-child :key="$route.path"></nuxt-child>
</template>

<script>
export default {
  transition: {
    name: 'page',
    mode: 'out-in'
  }
}
</script>
