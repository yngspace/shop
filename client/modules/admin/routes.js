export default (resolve) => [
  {
    path: '/admin',
    name: 'admin',
    components: {
      default: resolve(__dirname, './index.vue')
    }
  }
]