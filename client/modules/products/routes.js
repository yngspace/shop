export default (resolve) => [
  {
    path: '/product/:id',
    name: 'product',
    components: {
      default: resolve(__dirname, './index.vue'),
    },
  }
]