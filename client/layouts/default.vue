<template lang="pug">
  .root
    Header
    nuxt.page-screen
    Footer
</template>

<script>
import { mapActions } from 'vuex'
import Header from '../modules/template/header/index.vue'
import Footer from '../modules/template/footer/index.vue'

export default {
  components: {
    Header,
    Footer
  },
  watch: {
    $route() {
      window.scrollTo(0, 0)
    }
  },
  mounted() {
    this.getInitialData()
  },
  methods: {
    ...mapActions({
      getInitialData: 'cart/getInitialData'
    })
  },
}
</script>
