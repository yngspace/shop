<template lang="pug">
  .pagination
    nuxt-link.prev(
      :to="{ name: $route.name, query: generateLink(prev ? page - 1 : page) }"
      :class="{ active: !prev }"
    ): include ./assets/pagination-arrow.svg
    nuxt-link.page(
      v-for="p, idx in totalPage" :key="idx"
      :class="{ active: page === parseInt(p) }"
      :to="{ name: $route.name, query: generateLink(p) }"
    ) {{ p }}
    nuxt-link.next(
      :to="{ name: $route.name, query: generateLink(next ? page + 1 : page) }"
      :class="{ active: !next }"
    ): include ./assets/pagination-arrow.svg
</template>

<script>
export default {
  props: {
    next: {
      type: Boolean,
      default: false
    },
    prev: {
      type: Boolean,
      default: false
    },
    totalPage: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  },
  methods: {
    generateLink(page) {
      const query = { ...this.$route.query }
      query.page = page
      return query
    }
  },
}
</script>

<style lang="sass" scoped>
.pagination
  display: flex
  align-items: center
  justify-content: center
  column-gap: 12px
  position: absolute
  bottom: 20px
  left: 50%
.next
  transform: rotate(180deg)
.page, .prev, .next
  &.active
    opacity: .7
</style>