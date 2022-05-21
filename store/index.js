
export const state = {
  connectedAddress: null,
  allBusinesses: [],
  myBusiness: null,
  myBusinessServices: [],
  myPurchasedServices: [],

  businessTypes: [
    { key: 'clothes', value: 'products-1', text: '1. Clothes' },
    { key: 'food', value: 'products-3', text: '2. Food / Restaurant' },
    { key: 'punk-products', value: 'products-4', text: '3. Punk Products' },
    { key: 'general-store', value: 'products-5', text: '4. General store' },
    { key: 'sports', value: 'services-1', text: '5. Sports' },
    { key: 'art-fun', value: 'services-2', text: '6. Art/fun' },
    { key: 'beauty', value: 'services-3', text: '7. Beauty/Barber shop' },
    { key: 'professional', value: 'services-4', text: '8. Profesional/Talent' }
  ]

}

export const getters = {
  getConnectedAddress: (state) => {
    return state.connectedAddress
  }
}

export const mutations = {
  setConnectedAddress: (state, payload) => {
    state.connectedAddress = payload
  },
  setAllBusinesses: (state, payload) => {
    state.allBusinesses = payload
  },
  setMyBusiness: (state, payload) => {
    state.myBusiness = payload
  },
  setMyBusinessServices: (state, payload) => {
    state.myBusinessServices = payload
  },
  setMyPurchasedService: (state, payload) => {
    state.myPurchasedService = payload
  }
}

// export const actions = {
//   async getConnectedAddress({ commit }) {
//     const connectedAddress = await Moralis.getConnectedAddress()
//     commit('setConnectedAddress', connectedAddress)
//   },
//   async getMyBusiness({ commit, state }) {
//     const myBusiness = await Moralis.getMyBusiness(state.connectedAddress)
//     commit('setMyBusiness', myBusiness)
//   },
//   async getMyBusinessServices({ commit, state }) {
//     const myBusinessServices = await Moralis.getMyBusinessServices(state.connectedAddress)
//     commit('setMyBusinessServices', myBusinessServices)
//   },
//   async getMyPurchasedService({ commit, state }) {
//     const myPurchasedService = await Moralis.getMyPurchasedService(state.connectedAddress)
//     commit('setMyPurchasedService', myPurchasedService)
//   }
// }
