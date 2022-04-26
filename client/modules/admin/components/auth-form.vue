<template lang="pug">
  .wrap
    h1 Авторизация
    form.auth-form
      InputCmp(label="Логин" placeholder="Введите логин" @input="onInput" modelValue="login")
      InputCmp(label="Пароль" placeholder="Введите пароль" type="password" modelValue="password" @input="onInput")
      button.primary-button(@click.prevent="submit()") Отправить
</template>

<script>
import { request } from '../axios'
import InputCmp from '../../UI/input.vue'

export default {
  components: {
    InputCmp
  },
  data() {
    return {
      form: {
        login: '',
        password: ''
      },
      errors: null
    }
  },
  methods: {
    onInput(model, value) {
      this.form[model] = value
    },
    async submit() {
      try {
        const { data } = await request('post', '/users/login/', this.form)
        this.$emit('onauth')
        this.$cookies.set('token', data.token)
      } catch (e) {
        if (e.response.data.message) this.errors = e.response.data.message
      }
    }
  },
}
</script>

<style lang="sass" scoped>
.wrap
  max-width: 800px
  margin: 0 auto
h1
  text-align: center
  margin-bottom: 40px
.auth-form
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  .default-input
    margin: 16px
    width: 420px
</style>