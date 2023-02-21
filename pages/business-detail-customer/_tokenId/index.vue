<template>
  <OverlayLoader :loading="loading">
    <section class="text-white">
      <div class="MainScreen">
        <div class="dBoard">
          <div class="assetBoard bg-glass-200">
            <div class="relative text-center  items-center grid xl:grid-cols-6  h-full w-full">
              <div class="xl:col-span-2 mx-auto rounded-xl">
                <img class=" object-scale-down h-64 rounded-tf" :src="logo">
              </div>
              <div class="xl:text-5xl text-2xl items-center xl:col-span-4 xl:text-left">
                {{ business ? business.shortname : 'Loading...' }}
              </div>
            </div>
            <div class="mx-auto grid items-center grid-rows-3 w-full">
              <div class="grid gap-2">
                <div v-if="business" class="flex mx-auto items-center gap-3">
                  <img class="h-20" :src="'/3dAssets/' + business.businessType + '.png'">
                  {{ business ? `${business.googleAddress} ` : "Loading..." }}
                </div>
              <!--📍{{ business ? `${business.city} ` : 'Loading...' }} -->
              </div>
              <div class="text-lg">
                {{ business ? business.description : 'Loading...' }}
              </div>

              <div class=" grid grid-cols-2 gap-3 max-w-5xl mt-1 mx-auto">
                <div class="myVaultBT bg-glass-300 hover:bg-green-500" @click="makeUpVote()">
                  <span>{{ likes }}</span>👍
                </div>
                <div class="myVaultBT bg-glass-300 hover:bg-red-500" @click="makeDownVote()">
                  <span>{{ disLikes }}</span>👎
                </div>
              </div>
            </div>

            <!--  <div class="grid fhd:col-span-2 col-span-4 gap-3 row-span-2">
             <div class="p-3">
                Tags
              </div>
            </div>
             <div class="p-3">
              {{ business ? `${business.googleAddress}` : 'Loading...' }}
            </div>
            -->
          </div>
          <div class="inventory relative">
            <div class="grid md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4  grid-flow-dense gap-3 ">
              <div v-for="service in unsoldServices" :key="service.tokenId" class="PlaceBG ">
                <div class="relative text-center col-span-2 rounded-xl pb-11/12">
                  <img
                    class="absolute w-auto h-full left-1/2 transform -translate-x-1/2"
                    :src="service.tokenURI"
                  >
                </div>
                <div class="productCard">
                  <div class="text-xl row-span-3">
                    <div>Product Name</div>
                    <div class="text-lg">
                      {{ service.serviceDescription }}
                    </div>
                  </div>

                  <div class="productBuy" @click="purchaseServiceNft(service)">
                    <div class="text-xl">
                      {{ service.price / Math.pow(10,18) }} DAI
                    </div>
                    <div class="buyBT">
                      {{ buyA ? "Buy" : "Approve DAI" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <BuyModal v-show="showModal" @goHome="goHomeClick" />
  </OverlayLoader>
</template>
<script>
import getAllIpfsHashbyTokenId from '~/contracts/business-nft/getAllIpfsHashByTokenId'
import listAllBusinessNFTs from '~/contracts/business-nft/listAllBusinessNFTs'
import listMyServices from '~/contracts/service-nft/listMyServices'
import buy from '~/contracts/vault/buy'
import upVote from '~/contracts/business-nft/upVote'
import getUpVotes from '~/contracts/business-nft/getUpVotes'
import downVote from '~/contracts/business-nft/downVote'
import getDownVotes from '~/contracts/business-nft/getDownVotes'
import getIncomeOfBusiness from '~/contracts/service-nft/getIncomeOfBusiness'
import OverlayLoader from '~/components/OverlayLoader.vue'
import getSoldProducts from '~/contracts/service-nft/getSoldProducts'
import BuyModal from '~/components/BuyModal.vue'
import checkBuyAllowance from '~/contracts/vault/checkBuyAllowance'
import approveVaultContract from '~/contracts/vault/approveVaultContract'

export default {
  components: {
    OverlayLoader,
    BuyModal
  },
  data () {
    return {
      buyA: false,
      showModal: false,
      loading: false,
      soldNFTS: 0,
      income: 0,
      likes: 0,
      disLikes: 0,
      tokenId: null,
      business: null,
      services: [],
      logo: ''
    }
  },
  computed: {
    unsoldServices () {
      return this.myServices.filter(service => !service.sold)
    },
    soldServices () {
      return this.myServices.filter(service => service.sold)
    },
    businesses () {
      return this.$store.state.allBusinesses
    },
    businessTypes () {
      return this.$store.state.businessTypes
    },
    serviceTypes () {
      return this.$store.state.serviceTypes
    },
    myServices () {
      return this.$store.state.myBusinessServices
    },
    connectedAddress () {
      return this.$store.state.connectedAddress
    }
  },
  watch: {
    business () {
      if (this.business) {
        this.listMyServices()
        this.getLogo()
        this.getSoldNFTs()
        this.getLikes()
        this.getDislikes()
        this.getIncome()
      }
    }
  },
  beforeMount () {
    getAllIpfsHashbyTokenId()
    this.tokenId = parseInt(this.$route.params.tokenId)
    if (!this.businesses.length) {
      setTimeout(this.listAllBusinesses, 3000)
    } else {
      this.business = this.businesses.find(
        business => business.tokenId === this.tokenId
      )
    }
    listMyServices()
    setTimeout(this.checkBuy, 3000)
  },
  methods: {
    listMyServices () {
      listMyServices(this.$config.contractServiceNft, this.$route.params.tokenId).then(
        (result) => {
          this.$store.commit('setMyBusinessServices', result)
          // console.log(result)
          // this.services = result
        }
      )
    },
    listAllBusinesses () {
      listAllBusinessNFTs(this.$config.contractBusinessNft).then((result) => {
        this.$store.commit('setAllBusinesses', result)
        this.business = this.businesses.find(business => business.tokenId === this.tokenId)
      })
    },
    async purchaseServiceNft (service) {
      this.loading = true
      if (this.buyA === false) {
        await approveVaultContract(this.$config.contractDai, this.$config.contractVault)
      }
      buy(this.$config.contractVault, service, this.$route.params.tokenId, this.connectedAddress).then(async (txHash) => {
        await txHash.wait()
        this.showModal = true
        this.loading = false
      }).catch((e) => {
        console.error(e)
        this.loading = false
      })
    },
    async getLogo () {
      this.logo = await getAllIpfsHashbyTokenId(
        this.$config.contractBusinessNft,
        this.$route.params.tokenId
      )
    },
    async getSoldNFTs () {
      this.soldNFTs = await getSoldProducts(
        this.$config.contractServiceNft,
        this.$route.params.tokenId
      )
    },
    makeUpVote () {
      upVote(this.$config.contractBusinessNft, this.$route.params.tokenId).then(async () => {
        // console.log('Successfully upVoted')
        // await location.reload()
        await alert('You successfully made a vote for this business. In order to see the result please refresh the page after the Metamask Transaction')
      }).catch((error) => {
        console.error(error)
        alert('You can only vote for a business once')
      })
    },
    async getLikes () {
      this.likes = await getUpVotes(this.$config.contractBusinessNft, this.$route.params.tokenId)
    },
    async getDislikes () {
      this.disLikes = await getDownVotes(this.$config.contractBusinessNft, this.$route.params.tokenId)
    },
    makeDownVote () {
      downVote(this.$config.contractBusinessNft, this.$route.params.tokenId).then(async () => {
        // console.log('Successfully upVoted')
        // await location.reload()
        await alert('You successfully made a vote for this business. In order to see the result please refresh the page after the Metamask Transaction')
      }).catch((error) => {
        console.error(error)
        alert('You can only vote for a business once')
      })
    },
    async getIncome () {
      this.income = await getIncomeOfBusiness(this.$config.contractServiceNft, this.$route.params.tokenId)
    },
    goHomeClick () {
      this.showModal = false
      location.reload()
    },
    async checkBuy () {
      this.buyA = await checkBuyAllowance(this.$config.contractVault, this.connectedAddress)
      console.log('buyAllowance:', this.buyA)
    }
  }
}
</script>
