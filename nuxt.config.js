export default {
  ssr: false,
  server: {
    host: '0.0.0.0', // default: localhost
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Deco @Hack Money 2022',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/tailwind.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/google-maps.js',
    "~/plugins/moralis.client.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  eslint: {
    fix: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  },

  publicRuntimeConfig: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    moralisAppId: process.env.MORALIS_APP_ID || '',
    moralisServerUrl: process.env.MORALIS_SERVER_URL || '',

    contractPunkCities: process.env.CONTRACT_PUNK_CITIES || '',
    contractBusinessNft: process.env.CONTRACT_BUSINESS_NFT || '',
    contractServiceNft: process.env.CONTRACT_SERVICE_NFT || '',
    contractVault: process.env.CONTRACT_VAULT || '',
    contractDai: process.env.CONTRACT_DAI || '',

    walletConnectId: process.env.WALLET_CONNECT_ID || '',
    nftStorageApiKey: process.env.NFT_STORAGE_API_KEY || ''
  },
  
}
