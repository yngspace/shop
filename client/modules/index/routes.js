export default (resolve) => [
  {
    path: '/',
    name: 'index',
    components: {
      default: resolve(__dirname, './index.vue'),
    },
  }
]