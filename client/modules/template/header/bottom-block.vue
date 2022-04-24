<template lang="pug">
  nav.header-bottom.nav-list
    nuxt-link.nav-item(
      v-for="item, idx in categories" :key="idx"
      :to="{ name: 'catalog-slug', params: { slug: item.slug }}"
    ) {{ item.name }}
    .nav-item.cart
      include ./assets/cart.svg
      span.cart-count {{ cartCount }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      cartCount: 'cart/countCart'
    })
  }
}
</script>

<style lang="sass" scoped>
.nav-list
  display: flex
  flex-wrap: wrap
  border-bottom: 1px solid $color-text

.nav-item
  padding: 20px
  font-size: 18px
  font-weight: 600
  transition: $time

.cart
  background: $green
  display: flex
  column-gap: 10px
  color: #fff
  margin-left: auto

.nuxt-link-active
  background: $color-text
  color: #fff
</style>
