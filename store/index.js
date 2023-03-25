
export const state = {
  connectedAddress: null,
  allBusinesses: [],
  myBusinesses: [],
  myBusiness: null,
  myBusinessServices: [],
  myPurchasedServices: [],
  myAllBoughtServices: [],

  businessTypes: [
    { key: 'store', value: 'products-1', text: 'Convenience Store', imageUrl: 'https://bafybeidk6giaif72qno3idbpzuku47btmwyd2cgkl6owmwkoq4s64wjnla.ipfs.nftstorage.link' },

    { key: 'clothes', value: 'products-2', text: 'Clothing Shop ', imageUrl: 'https://bafybeihx2xihqljwfpsnyvxniyxdns2jk2vi2t2win3ugu5agxfmhdv5vm.ipfs.nftstorage.link' },
    //  { key: 'food', value: 'products-2', text: ' Food / Restaurant', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmfEbx2aFHNmTZqgye5FNqE3yNLS8vZJm1nTaNHxLfZLn4 ' },

    { key: 'urban', value: 'products-3', text: 'Urban Store', imageUrl: 'https://bafybeiaxoauncqu7t5zdiv6lf3ais7vrwgv3orp4zq74eeasprrvsyy5bm.ipfs.nftstorage.link' },

    //  { key: 'fitness', value: 'services-1', text: ' Fitness', imageUrl: 'https://ipfs.moralis.io:2053/ipfs/QmfXw61b7sjPquphjLVivdAas9a8XZT1Bs6BqoAiExzo4r ' },

    { key: 'artwork', value: 'products-4', text: 'Artworks', imageUrl: 'https://bafybeichd5f7x3bmsxoj6nlrfpihep2zis4nmei5mkheln5x5uvgwi6x24.ipfs.nftstorage.link' },

    { key: 'beauty', value: 'products-5', text: 'Beauty Shop', imageUrl: 'https://bafybeihfpwxmxten7loypo43efi5hfblb5m3n3r34al5copluq6lba5e6y.ipfs.nftstorage.link' },

    { key: 'professional', value: 'products-6', text: 'Profesional Service', imageUrl: 'https://bafybeigxcc4klso32bc4f5nfhpjlsajdueozx2teon6p5qv2wl7l2bgwmu.ipfs.nftstorage.link' }
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
