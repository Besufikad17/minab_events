import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_CLOUD_PRESET,
      CLOUDINARY_URL: process.env.CLOUDINARY_URL,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      GQL_HOST: process.env.GQL_HOST,
      PLACE_API_URL: process.env.PLACE_API_URL,
      PLACE_API_KEY: process.env.PLACE_API_KEY,
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/apollo', "@nuxtjs/leaflet"],
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