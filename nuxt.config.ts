import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST,
    }
  },
  devtools: { enabled: true },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['Vue3Lottie'].includes(tag),
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/apollo'
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
