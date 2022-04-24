<template lang="pug">
  aside.aside
    nuxt-link.title(:to="{ name: $route.name, query: generateLink() }") Фильтры
    nav.aside-list
      nuxt-link.aside-item(
        v-for="item in filters" :key="item.id"
        :to="{ name: $route.name, query: generateLink(item.value) }"
      ) {{ item.name }}
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      required: true
    }
  },
  methods: {
    generateLink(value) {
      const query = { ...this.$route.query }
      delete query.page
      if (!value) {
        delete query.filters
        return query
      }

      return { ...query, filters: value }
    }
  },

}
</script>

<style lang="sass" scoped>
.aside
  border: 2px solid $color-text
  border-radius: 8px 8px 0 0
  height: max-content
  padding-bottom: 40px

.aside-list
  margin: 0
  padding: 0

.title
  font-size: 24px
  font-weight: 600
  padding: 12px 0 12px 12px
  margin-bottom: 20px
  border-bottom: 2px solid $color-text
  background: $green
  border-radius: 8px 8px 0 0
  color: #fff

.aside-item
  margin: 0
  padding: 12px
  font-weight: 600
  font-size: 16px

a
  display: block

.aside-item
  transition: $time
  &.nuxt-link-exact-active
    color: $green
</style>