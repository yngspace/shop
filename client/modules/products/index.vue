<template lang="pug">
  .screen
    .container
      h1 {{ product.name }}
      .row
        .col
          .photo
            img(:src="photo")
          .description {{ product.description }}
        .col
          .price {{ product.price }} Руб
          button Добавить в корзину
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    try {
      const { id } = params
      const { data } = await $axios.get(`/products/${id}`)
      return {
        product: data
      }
    } catch (e) {
      return e
    }
  },
  computed: {
    photo() {
      if (this.product.photos.length) {
        return `${process.env.SERVER_HOST}${this.product.photos[0].name}`
      }

      return false
    }
  }
}
</script>

<style lang="sass" scoped>
.row
  display: flex
  column-gap: 60px
.col
  width: 50%
h1
  margin-bottom: 40px
.description
  margin-top: 40px
  max-width: 920px
  margin-bottom: 40px
.photo
  max-height: 500px
.price
  font-size: 22px
  font-weight: 600
</style>