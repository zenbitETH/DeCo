<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="dBoard">
        <div class="assetBoard">
          <div
            class="relative bg-gradient-to-tl pl-5 p-3 from-glass-400 to-glass-100 rounded-tf grid grid-cols-6 text-left items-center row-span-6"
          >
            <div class="text-lg absolute top-5 right-5">
              📍{{ business ? `${business.googleAddress} ` : 'Loading...' }}
            </div>
            <div class="relative text-center col-span-2 pb-11/12">
              <img class="absolute w-auto h-full  left-1/2 transform -translate-x-1/2" :src="logo">
            </div>
            <div class="col-span-3 pl-5 grid gap-2">
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

          <div v-if="business" class="md:row-span-6 rounded-xl md:grid grid-cols-3 gap-5">
            <div class="bg-gradient-to-tl p-3 from-glass-400 to-glass-100 rounded-tf relative">
              <div class="p-3">
                <img class=" h-fit" :src="'/3dAssets/' + business.businessType + '.png'">
              </div>
              <div class="text-xl absolute bottom-5 text-center left-0 right-0 font-bold">
                {{ business ? businessTypes.find(t => t.value === business.businessType).text : 'Type of place' }}
              </div>
            </div>
            <div class="bg-gradient-to-tl p-3 from-glass-400 to-glass-100 rounded-tf h-fit py-5 backdrop-blur-md grid items-center">
              <div class="text-6xl">
                {{ soldNFTs }}
              </div>
              <div>Products Sold </div>
            </div>
            <div class="bg-gradient-to-tl p-3 from-glass-400 to-glass-100 rounded-tf h-fit py-5 backdrop-blur-md grid items-center">
              <div class="text-6xl">
                {{ income / Math.pow(10,18) }} MATIC
              </div>
              <div>Total Income</div>
            </div>
          </div>
        </div>

        <div class="inventory relative">
          <ul id="tabs-tabFill" class="nav nav-tabs flex flex-row flex-wrap list-none border-b-0 pl-0 mb-4 absolute w-full " role="tablist">
            <li class="nav-item flex-auto text-center" role="presentation">
              <a
                id="tabs-home-tabFill"
                href="#tabs-onsaleFill"
                class="tabFill active focus:text-cyber-100"
                data-bs-toggle="pill"
                data-bs-target="#tabs-onsaleFill"
                role="tab"
                aria-controls="tabs-onsaleFill"
                aria-selected="true"
              >
                On Sale
              </a>
            </li>
            <li class="nav-item flex-auto text-center" role="presentation">
              <a
                id="tabs-profile-tabFill"
                href="#tabs-soldFill"
                class="tabFill focus:text-solar-100"
                data-bs-toggle="pill"
                data-bs-target="#tabs-soldFill"
                role="tab"
                aria-controls="tabs-soldFill"
                aria-selected="false"
              >Sold</a>
            </li>
          </ul>
          <div id="tabs-tabContentFill" class="tab-content">
            <div id="tabs-onsaleFill" class="tab-pane fade bg-glass-100 rounded-tf py-10 pt-16 show active h-full overflow-y-hidden" role="tabpanel" aria-labelledby="tabs-home-tabFill">
              <div class="grid lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-8 grid-cols-2 grid-flow-dense px-10 gap-3">
                <div v-for="service in unsoldServices" :key="service.tokenId" class="PlaceBG" @click="purchaseServiceNft(service)">
                  <div class="text-center">
                    <img class="xl:h-32 qhd:h-43 h-32 mx-auto" :src="service.tokenURI">
                  </div>
                  <div class="bg-gradient-to-r from-deco-500 to-glass-500 rounded-b-tf grid grid-cols-3 text-center text-base py-2">
                    <div class="text-deco-900 col-span-2">
                      {{ service.serviceDescription }}
                    </div>
                    <div>{{ service.price / Math.pow(10,18) }} MATIC</div>
                  </div>
                </div>
              </div>
            </div>
            <div id="tabs-soldFill" class="tab-pane fade bg-glass-100 rounded-tf py-10 pt-16 h-full overflow-y-hidden" role="tabpanel" aria-labelledby="tabs-profile-tabFill">
              <div class="grid lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-8 grid-cols-2 grid-flow-dense px-10 gap-3">
                <div v-for="service in soldServices" :key="service.tokenId" class="PlaceBG col-span-2">
                  <div class="text-center">
                    <img class="xl:h-32 qhd:h-43 h-32 mx-auto" :src="service.tokenURI">
                  </div>
                  <div class="bg-gradient-to-r from-glass-500 to-glass-800 rounded-b-tf grid grid-cols-3 text-center text-base py-2">
                    <div class="col-span-2">
                      {{ service.serviceDescription }}
                    </div>
                    <div>{{ service.price / Math.pow(10,18) }} MATIC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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

import getSoldProducts from '~/contracts/service-nft/getSoldProducts'

export default {
  data () {
    return {
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
      buy(this.$config.contractVault, service, this.$route.params.tokenId).then(() => {
        console.log('succesful purchase')
        // location.reload()
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
      })
    },
    async getLikes () {
      this.likes = await getUpVotes(this.$config.contractBusinessNft, this.$route.params.tokenId)
    },
    async getDislikes () {
      this.disLikes = await getDownVotes(this.$config.contractBusinessNft, this.$route.params.tokenId)
    },
    makeDownVote () {
      downVote(this.$config.contractBusinessNft, this.$route.params.tokenId).then(() => {
        // result.wait()
        console.log('Successfully upVoted')
        // location.reload()
      })
    },
    async getIncome () {
      this.income = await getIncomeOfBusiness(this.$config.contractServiceNft, this.$route.params.tokenId)
    }
  }
}
</script>
