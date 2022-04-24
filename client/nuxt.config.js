import router from './router.js'

module.exports = {
  router: router,
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, maximum-scale=1.0' }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    script: []
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  css: [
    '@/styles/reset.sass',
    '@/styles/main.sass'
  ],
  styleResources: {
    sass: [
      '@/styles/vars.sass'
    ]
  },
  loading: { color: '#000000' },
  build: {
    vendor: [
      'vue-awesome-swiper'
    ],
    extend(config, ctx) {
      // правило для открытия файлов по ссылке на assets
      const assetsLoader = config.module.rules.find((rule) => rule.test.test('.png'))
      assetsLoader.test = /\.(png|jpe?g|gif|svg|webp|pdf|doc?x)$/i

      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }

      return config
    },
  },
  plugins: [
    { src: '~/plugins/swiper-slider.js', mode: 'client' }
  ],
  axios: {
    baseURL: process.env.BASE_URL ? process.env.BASE_URL : '',
    browserBaseURL: process.env.BROWSER_URL ? process.env.BROWSER_URL : '',
  },
}
