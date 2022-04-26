<template lang="pug">
  .filters-list
    form.top-row
      InputCmp(
        label="Добавить новый фильтр"
        placeholder="Название"
        modelValue="name"
        @input="changeForm"
      )
      button.primary-button(@click.prevent="addFilter()") Сохранить
    .filters-item(
      v-for="item in filters" :key="item.id"
    )
      .col
        input(:value="item.name")
        input(:value="item.value" disablet)
      .col
        button.primary-button(@click="$emit('deletefilter', item.id)") Удалить
      .col
        button.primary-button Сохранить
</template>

<script>
import InputCmp from '../../../UI/input.vue'

export default {
  components: {
    InputCmp
  },
  props: {
    slug: {
      type: String,
      default: ''
    },
    filters: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {
    changeForm(model, value) {
      this.form[model] = value
    },
    addFilter() {
      if (this.form.name.trim() === '') return
      this.form.categories = this.slug
      this.$emit('addfilter', this.form)
    }
  },
}
</script>

<style lang="sass" scoped>
.top-row
  display: flex
  align-items: center
  column-gap: 40px
.filters-item
  display: flex
  justify-content: space-between
  padding: 12px 20px
  border: 1px solid $dark-green
  margin: 10px 0
</style>