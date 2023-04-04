
export const state = {
  connectedAddress: null,
  allBusinesses: [],
  myBusinesses: [],
  myBusiness: null,
  myBusinessServices: [],
  myPurchasedServices: [],
  myAllBoughtServices: [],

  businessTypes: [
    { key: 'store', value: '1-store', text: 'Convenience Store', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmZbE92xWPaqL55s7xWdap1Y3yT2L6eLZP8EjcXczrHANT' },

    { key: 'clothes', value: '2-clothes', text: 'Clothing Shop ', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmeWQiDnFwaSTXR6oHzGnYB5HQkxmQquAkDcfh5WsBULni' },
    //  { key: 'food', value: 'products-2', text: ' Food / Restaurant', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmfEbx2aFHNmTZqgye5FNqE3yNLS8vZJm1nTaNHxLfZLn4 ' },

    { key: 'urban', value: '3-urban', text: 'Urban Store', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmXsPvTTooo1VJqH1D18x7LEfhVoTHCz7eaKYcVqei5yte' },

    //  { key: 'fitness', value: 'services-1', text: ' Fitness', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmfXw61b7sjPquphjLVivdAas9a8XZT1Bs6BqoAiExzo4r ' },

    { key: 'artwork', value: '4-artwork', text: 'Artworks', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmZxhaqU17xvr7wRJYcdP897JTPi7BAvZhRyqAVgnFhb41' },

    { key: 'beauty', value: '5-beauty', text: 'Beauty Shop', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmRj4eYixtwLX6Bfb5LMzzrZxqQABP6kN75MGpsZ9ZtS7H' },

    { key: 'professional', value: '6-professional', text: 'Profesional Service', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmWdPdsQRWJdEWcBwDb4tWFHLznpznxXU2a131v92znqDq' }
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
