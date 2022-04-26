<template lang="pug">
  .tab-list
    button.tab-item(v-for="item, idx in tabList" :key="idx" @click="$emit('click', item.value)") {{ item.name }}
</template>

<script>
export default {
  data() {
    return {
      tabList: [
        { name: 'Категории', value: 'categories' },
        { name: 'Товары', value: 'products' }
      ]
    }
  },
}
</script>

<style lang="sass" scoped>
.tab-list
  display: flex
  align-items: center
  column-gap: 20px
  margin-bottom: 40px
.tab-item
  padding: 20px
  background: $dark-green
  color: #fff
  border-radius: 16px
</style>