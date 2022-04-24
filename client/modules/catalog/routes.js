export default (resolve) => [
  {
    path: '/catalog/:slug',
    name: 'catalog-slug',
    components: {
      default: resolve(__dirname, './index.vue'),
    },
  }
]