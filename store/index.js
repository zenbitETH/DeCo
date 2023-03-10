
export const state = {
  connectedAddress: null,
  allBusinesses: [],
  myBusinesses: [],
  myBusiness: null,
  myBusinessServices: [],
  myPurchasedServices: [],
  myAllBoughtServices: [],

  businessTypes: [
    { key: 'clothes', value: 'products-1', text: ' Clothes', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmUti5SNcWjPEFZpv47cbYmQPU3FMcGKrXH7fHTdcqft8z' },
    { key: 'food', value: 'products-2', text: ' Food / Restaurant', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmfEbx2aFHNmTZqgye5FNqE3yNLS8vZJm1nTaNHxLfZLn4 ' },
    { key: 'punk-products', value: 'products-3', text: ' Punk Products', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmUKSuYhkR5GiyHQ2VU6jM1nfzN6hjc1T3GTaVWKrMaiwf ' },
    { key: 'general-store', value: 'products-4', text: ' General store', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmbYezsAuWcsiKGkNU5ZRudUyAWGe7j4JBqhXqdRvkDTjc ' },
    { key: 'fitness', value: 'services-1', text: ' Fitness', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmfXw61b7sjPquphjLVivdAas9a8XZT1Bs6BqoAiExzo4r ' },
    { key: 'art-fun', value: 'services-2', text: ' Art/fun', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmT9bTPitveSZhf2yAoHmG8D8cAsksByD383vvf2JEdFm2 ' },
    { key: 'beauty', value: 'services-3', text: ' Beauty/Barber shop', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmdRX9bWmuZu24wvBEscm4L3z9TEs3yPfCeGWvwpHKhfFC ' },
    { key: 'professional', value: 'services-4', text: ' Profesional/Talent', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmVD1c9rtBCfjFmBZ3AjDtL7nzVUDgkG96KysrB1LneGvp ' }
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
  setMyBusinesses: (state, payload) => {
    state.myBusinesses = payload
  },
  setMyBusiness: (state, payload) => {
    state.myBusiness = payload
  },
  setMyBusinessServices: (state, payload) => {
    state.myBusinessServices = payload
  },
  setMyPurchasedServices: (state, payload) => {
    state.myPurchasedServices = payload
  },
  setMyAllSoldServices: (state, payload) => {
    state.myAllBoughtServices = payload
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
