<template lang="pug">
  .screen
    AuthForm(v-if="!check" @onauth="onAuth")
    .container(v-else)
      Tabs(@click="changeTab")
      Categories(v-if="activeTab === 'categories'")
</template>

<script>
import AuthForm from './components/auth-form.vue'
import Tabs from './components/tabs.vue'
import Categories from './components/categories/index.vue'

export default {
  components: {
    AuthForm,
    Tabs,
    Categories
  },
  // layout: 'admin',
  async asyncData({ $cookies, $axios }) {
    try {
      $axios.setHeader('token', `jwt ${$cookies.get('token')}`)
      await $axios.get('/users/')
      return {
        check: true
      }
    } catch (e) {
      return {
        check: false
      }
    }
  },
  data() {
    return {
      activeTab: 'categories'
    }
  },
  methods: {
    onAuth() {
      this.check = true
    },
    changeTab(value) {
      this.activeTab = value
    }
  },
}
</script>