<template>
  <OverlayLoader :loading="loading">
    <section class="text-white">
      <div class="MainScreen">
        <div class="dBoard">
          <div class="assetBoard">
            <div
              class="businessCard"
            >
              <div class="text-lg absolute top-5 right-5">
                <!-- 📍{{ business ? `${business.googleAddress} ` : "Loading..." }} -->
                📍{{ business ? `${business.city} ` : 'Loading...' }}
              </div>
              <div class="relative text-center col-span-2 pb-11/12">
                <img class="absolute w-auto h-full  left-1/2 transform -translate-x-1/2" :src="logo">
              </div>
              <div class="col-span-4 pl-5 grid gap-2">
                <div class="xl:text-5xl text-2xl">
                  {{ business ? business.shortname : 'Loading...' }}
                </div>
                <div class="col-span-6 text-lg text-left  rounded-tf ">
                  {{ business ? business.description : 'Loading...' }}
                </div>
              </div>
              <div class="absolute bottom-5 right-5 text-center grid grid-cols-2 gap-3 ">
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

            <div v-if="business" class="md:row-span-6 rounded-xl grid grid-cols-3 gap-5">
              <div class="bg-gradient-to-tl p-3 from-glass-400 to-glass-100 rounded-tf relative">
                <div class="p-3">
                  <img class=" h-fit" :src="'/3dAssets/' + business.businessType + '.png'">
                </div>
                <div class="text-base xl:text-xl absolute bottom-5 text-center left-0 right-0 font-bold">
                  {{ business ? businessTypes.find(t => t.value === business.businessType).text : 'Type of place' }}
                </div>
              </div>
              <div class="businessCell">
                <div class="md:text-6xl">
                  {{ soldNFTs }}
                </div>
                <div class="text-base font-bold xl:text-xl">
                  Products Sold
                </div>
              </div>
              <div class="businessCell">
                <div class="md:text-6xl">
                  {{ income / Math.pow(10,18) }} MATIC
                </div>
                <div class="text-base font-bold xl:text-xl">
                  Total Income
                </div>
              </div>
            </div>
          </div>

          <div class="inventory relative">
            <ul id="customertabs-tabFill" class="nav nav-tabs flex flex-row flex-wrap list-none border-b-0 pl-0 mb-4 absolute w-full " role="tablist">
              <li class="nav-item flex-auto text-center" role="presentation">
                <a
                  id="customertabs-home-tabFill"
                  href="#customertabs-onSaleFill"
                  class="tabFill active focus:text-cyber-100"
                  data-bs-toggle="customerpill"
                  data-bs-target="#customertabs-onsaleFill"
                  role="tab"
                  aria-controls="customertabs-onsaleFill"
                  aria-selected="true"
                >
                  On Sale
                </a>
              </li>
              <li class="nav-item flex-auto text-center" role="presentation">
                <a
                  id="customertabs-profile-tabFill"
                  href="#customertabs-customersoldFill"
                  class="tabFill focus:text-solar-100"
                  data-bs-toggle="customerpill"
                  data-bs-target="#customertabs-soldFill"
                  role="tab"
                  aria-controls="customertabs-soldFill"
                  aria-selected="false"
                >Sold</a>
              </li>
            </ul>
            <div id="customertabs-tabContentFill" class="tab-content">
              <div id="customertabs-onsaleFill" class="tab-pane fade bg-glass-100 rounded-tf py-5 pt-16 show active h-full overflow-y-hidden" role="tabpanel" aria-labelledby="customertabs-home-tabFill">
                <div class="grid lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4  grid-flow-dense px-5 gap-3 ">
                  <div v-for="service in unsoldServices" :key="service.tokenId" class="PlaceBG relative">
                    <div class="col-span-2 rounded-xl">
                      <img
                        class="mx-auto rounded-xl"
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
                          {{ service.price / Math.pow(10,18) }} MATIC
                        </div>
                        <div class="buyBT">
                          Buy
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="customertabs-soldFill" class="tab-pane fade bg-glass-100 rounded-tf  pt-16 h-full overflow-y-hidden" role="tabpanel" aria-labelledby="customertabs-profile-tabFill">
                <div class="grid lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4  grid-flow-dense px-5 gap-3 ">
                  <div v-for="service in soldServices" :key="service.tokenId" class="PlaceBG relative">
                    <div class="col-span-2 rounded-xl">
                      <img
                        class="mx-auto rounded-xl"
                        :src="service.tokenURI"
                      >
                    </div>
                    <div class="productCard">
                      <div class="text-xl row-span-3">
                        <div> Product Name</div>
                        <div class="text-lg">
                          {{ service.serviceDescription }}
                        </div>
                      </div>

                      <div class="productBuy">
                        <div class="text-xl col-span-2">
                          {{ service.price / Math.pow(10,18) }} MATIC
                        </div>
                      </div>
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

export default {
  components: {
    OverlayLoader,
    BuyModal
  },
  data () {
    return {
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
    purchaseServiceNft (service) {
      this.loading = true
      buy(this.$config.contractVault, service, this.$route.params.tokenId).then(async (txHash) => {
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
    }
  }
}
</script>
