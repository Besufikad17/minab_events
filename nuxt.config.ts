import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST,
      CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_CLOUD_PRESET,
      CLOUDINARY_URL: process.env.CLOUDINARY_URL
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/apollo',
  ],
  apollo: {
    autoImports: true,
    clients: {
      default: {
        httpEndpoint: 'http://localhost:8080/v1/graphql'
      }
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})
