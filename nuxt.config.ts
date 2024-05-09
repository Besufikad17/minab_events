import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST,
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    //'nuxt-graphql-client',
    //'@nuxtjs/apollo'
  ],
  // apollo: {
  //   autoImports: true,
  //   clients: {
  //     default: {
  //       httpEndpoint: 'https://spacex-production.up.railway.app'
  //     }
  //   },
  // },
  // 'graphql-client': {
  //   watch: true,
  //   autoImport: true,
  //   functionPrefix: 'Gql',
  //   documentPaths: ['./'],
  //   preferGETQueries: false,
  //   codegen: {
  //     avoidOptionals: true
  //   },
  //   clients: {
  //     default: {
  //       host: "https://spacex-production.up.railway.app",
  //       corsOptions: {
  //         mode: "no-cors",
  //         credentials: "same-origin",
  //       },
  //     },
  //   }
  // },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})
