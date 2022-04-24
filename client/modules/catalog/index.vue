<template lang="pug">
  .screen
    .container
      .row
        Sidebar(:filters="filters")
        .col
          h1 Каталог
          .product-list
            ProductCard(
              v-for="product in products.result" :key="product.id" :item="product"
            )
          Pagination(
            v-if="totalPage > 1"
            :totalPage="totalPage"
            :page="products.page"
            :next="products.next"
            :prev="products.prev"
          )
</template>

<script>
import Sidebar from './sidebar.vue'
import ProductCard from './product-card.vue'
import Pagination from '../UI/pagination.vue'

export default {
  components: {
    Sidebar,
    ProductCard,
    Pagination
  },
  async asyncData({ params, $axios, query }) {
    try {
      const { slug } = params
      const reqParam = { perPage: 9, categories: slug, ...query }
      const promises = [
        $axios.get('/products/', { params: reqParam }),
        $axios.get('/filters/', { params: reqParam })
      ]
      const [products, filters] = await Promise.all(promises)
      return {
        products: products.data,
        filters: filters.data,
        query: reqParam,
      }
    } catch (e) {
      return e
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.products.count / 9)
    }
  },
  watch: {
    $route() {
      this.load()
    }
  },
  methods: {
    async load() {
      this.query = { ...this.$route.query }
      this.products = (await this.$axios.get('/products/',
        { params: { ...this.query, categories: this.$route.params.slug } })
      ).data
    }
  }
}
</script>

<style lang="sass" scoped>
.screen
  padding-bottom: 80px
.row
  display: grid
  grid-template-columns: 300px 70%
  column-gap: 60px
.col
  margin-top: 12px
.product-list
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-gap: 30px
h1
  margin-bottom: 40px
</style>
