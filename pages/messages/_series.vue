<template>
  <nuxt-child :key="$route.path"></nuxt-child>
</template>

<script>
export default {
  transition: {
    name: 'fade-in',
    mode: 'out-in'
  }
}
</script>
