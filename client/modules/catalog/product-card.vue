<template lang="pug">
  nuxt-link.product-card(
    :to="{ name: 'product', params: { id: item.id }}"
  )
    .photo
      img(v-if="photo" :src="photo")
      img(v-else src="./assets/default.svg")
    .product-card-body
      .title {{ item.name }}
      .price {{ item.price }}Р
    button.primary-button(
      v-if="!isInCart"
      @click.prevent="getProduct({ item, action: 'add' }, 'add')"
    ) Добавить в корзину
    button.primary-button(
      v-if="isInCart"
      @click.prevent="getProduct({ item, action: 'delete' })"
    ) Убрать из корзины
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      cartItems: 'cart/cartItems'
    }),
    photo() {
      if (this.item.photos.length) {
        return `${process.env.SERVER_HOST}${this.item.photos[0].name}`
      }

      return false
    },
    isInCart() {
      const item = this.cartItems.filter((x) => x.id === this.item.id)
      if (item.length) return item[0]
      return false
    }
  },
  methods: {
    ...mapActions({
      getProduct: 'cart/getProduct'
    })
  }
}
</script>

<style lang="sass" scoped>
.product-card
  position: relative
  background: $color-text
  color: #fff
  border-radius: 8px
  padding-bottom: 40px
  overflow: hidden
  &:hover
    .primary-button
      bottom: 0
.photo
  img
    width: 100%
    height: 300px
    object-position: center
    object-fit: cover
    border-radius: 8px
    border: 2px solid $color-text
    transition: height $time
.product-card-body
  display: flex
  justify-content: space-between
  padding: 20px
.title
  font-weight: 500
  margin-bottom: 12px
.primary-button
  position: absolute
  width: 100%
  bottom: -100px
  transition: $time
  border-radius: 0
  padding: 18px
  font-size: 18px
</style>