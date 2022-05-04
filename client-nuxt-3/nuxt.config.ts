import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    '@/styles/reset.sass',
    '@/styles/main.sass',
    '@/styles/vars.sass'
  ],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      SERVER_HOST: process.env.SERVER_HOST
    }
  },
})
