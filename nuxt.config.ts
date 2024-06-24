import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST,
      CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_CLOUD_PRESET,
      CLOUDINARY_URL: process.env.CLOUDINARY_URL,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/apollo',
  ],
  apollo: {
    autoImports: true,
    authHeader: 'Authorization',
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
