import listAllofMyBusinessNFTs from '~/contracts/business-nft/listAllofMyBusinessNFTs'
import listMyServices from '~/contracts/service-nft/listMyServices'
export default {
  methods: {
    listAllofMyBusinessNFTs () {
      listAllofMyBusinessNFTs(this.$config.contractBusinessNft).then((result) => {
        this.$store.commit('setMyBusinesses', result)
      })
    },
    listMyServices () {
      listMyServices(this.$config.contractServiceNft, this.$route.params.tokenId).then(
        (result) => {
          this.$store.commit('setMyBusinessServices', result)
          // console.log(result)
          // this.services = result
        }
      )
    }
  }
}
