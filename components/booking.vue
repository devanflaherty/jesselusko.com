<template>
  <article class="columns">
    <div class="column">
      <h2>Book Me</h2>
      <div class="columns">
        <div class="column is-half">
          <p>Jesse Lusko is available for bookings. Get in contact today!</p>
        </div>
        <div class="column is-half">
          <nuxt-link to="/book" class="button is-primary is-expanded">Request a Booking</nuxt-link>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'booking'
}
</script>
