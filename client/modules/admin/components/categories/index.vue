<template lang="pug">
  .categories
    .actions-list
      .actions-item(
        v-for="item, idx in actions" :key="idx"
        @click="activate(item.value)"
        :class="{ active: item.value === activeAction }"
      ) {{ item.name }}
    component(:is="activeAction" @onsavecategories="onSaveCategories")
</template>

<script>
import Add from './add.vue'
import Edit from './edit.vue'

export default {
  components: {
    Add,
    Edit
  },
  data() {
    return {
      actions: [
        { name: 'Редактировать', value: 'Edit' },
        { name: 'Добавить', value: 'Add' }
      ],
      activeAction: 'Edit'
    }
  },
  methods: {
    activate(value) {
      if (this.activeAction === value) return
      this.activeAction = value
    },
    onSaveCategories() {
      this.activeAction = 'Edit'
    }
  },
}
</script>

<style lang="sass" scoped>
.categories
  display: grid
  grid-template-columns: 20% 80%
.actions-item
  margin: 16px 0
  cursor: pointer
  &.active
    transform: scale(1.1)
    color: $green
</style>