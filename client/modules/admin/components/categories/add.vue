<template lang="pug">
  form.add
    InputCmp(
      label="Название категории"
      placeholder="Введите название категории"
      modelValue="name"
      @input="changeForm"
    )
    button.primary-button(@click.prevent="submit()") Сохранить
</template>

<script>
import { request } from '../../axios'
import InputCmp from '../../../UI/input.vue'

export default {
  components: {
    InputCmp
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
    async submit() {
      try {
        await request('post', '/categories/', this.form)
        this.$emit('onsavecategories')
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e.response.data.message)
      }
    }
  },
}
</script>

<style lang="sass" scoped>
.add
  display: flex
  flex-direction: column
  row-gap: 40px
.primary-button
  max-width: 320px
</style>