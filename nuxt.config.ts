import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
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