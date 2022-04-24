<template lang="pug">
  header.header.screen
    TopBlock(:meta="meta")
    BottomBlock(:categories="categories")
</template>

<script>
import TopBlock from './top-block.vue'
import BottomBlock from './bottom-block.vue'

export default {
  components: {
    TopBlock,
    BottomBlock
  },
  computed: {
    meta() {
      return this.$store.state.settings.meta
    },
    categories() {
      return this.$store.state.categories.data
    }
  }
}
</script>
