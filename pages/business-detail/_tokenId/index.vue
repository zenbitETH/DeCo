<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="dBoard">
        <div class="assetBoard">
          <div
            class="bg-gradient-to-tl p-3 from-glass-400 to-glass-100 rounded-tf grid grid-cols-6 text-left items-center row-span-6 relative"
          >
            <div class="text-lg absolute top-5 right-5">
              📍{{ business ? `${business.city} ` : 'Loading...' }}
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
              <div class="myVaultBT">
                <span>0</span>👍
              </div>
              <div class="myVaultBT">
                <span>0</span>👎
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
                20
              </div>
              <div>Products Sold </div>
            </div>
            <div class="bg-gradient-to-tl p-3 from-glass-400 to-glass-100 rounded-tf h-fit py-5 backdrop-blur-md grid items-center">
              <div class="text-6xl">
                $1.2k
              </div>
              <div>Total Income</div>
            </div>
          </div>
        </div>

        <div class="inventory">
          <div class="bg-glass-100 rounded-tf">
            <div class="my-2 md:mx-30 xl:mx-60 mx-10">
              On sale
            </div>

            <div class="grid md:grid-cols-3 grid-cols-2 px-10 gap-5">
              <div class="PlaceBG hover:bg-glass-800">
                <div class="bigIcon">
                  +
                </div>Add a product or service
              </div>
              <div class="PlaceBG ">
                <div class="">
                  <img class="xl:h-32 qhd:h-43 h-32 mx-auto" src="product.png">
                </div>
                <div class="bg-glass-800 rounded-b-tf grid grid-cols-3 text-center text-base py-2">
                  <div class="col-span-2">
                    Black T-shirt
                  </div>
                  <div>5 usdc</div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-glass-100 rounded-tf">
            <div class="my-2 md:mx-30 xl:mx-60 mx-10">
              Sold
            </div>
            <div class="grid md:grid-cols-3 grid-cols-2 px-10 gap-5">
              <div class="PlaceBG">
                <div class="">
                  <img class="xl:h-32 qhd:h-43 h-32 mx-auto" src="product.png">
                </div>
                <div class="bg-glass-500 rounded-b-tf grid grid-cols-3 text-center text-base py-2">
                  <div class="col-span-2">
                    Black T-shirt
                  </div>
                  <div>5 usdc</div>
                </div>
              </div>

              <!--
              <div class="col-span-2">
                <img class="fhd:h-full mx-auto" src="deco_logo.svg">
              </div>
              <div class="col-span-2 xl:col-span-4 xl:pt-6">
                product name
              </div>
              <div class="xl:col-span-2 xl:pt-6">
                5 pcs
              </div>
              <div class="xl:col-span-2 xl:pt-6">
                10 usd
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import getYourLogoPicture from '~/contracts/business-nft/getYourLogoPicture'
import listAllBusinessNFTs from '~/contracts/business-nft/listAllBusinessNFTs'
import listMyServices from '~/contracts/service-nft/listMyServices'
import buy from '~/contracts/vault/buy'

export default {
  data () {
    return {
      tokenId: null,
      business: null,
      services: [],
      logo: ''
    }
  },
  computed: {
    unsoldServices () {
      return this.services.filter(service => !service.sold)
    },
    soldServices () {
      return this.services.filter(service => service.sold)
    },
    businesses () {
      return this.$store.state.allBusinesses
    },
    businessTypes () {
      return this.$store.state.businessTypes
    },
    serviceTypes () {
      return this.$store.state.serviceTypes
    }
  },
  watch: {
    business () {
      if (this.business) {
        this.listMyServices()
        this.getLogo()
      }
    }
  },
  beforeMount () {
    getYourLogoPicture()
    this.tokenId = parseInt(this.$route.params.tokenId)
    if (!this.businesses.length) {
      setTimeout(this.listAllBusinesses, 3000)
    } else {
      this.business = this.businesses.find(business => business.tokenId === this.tokenId)
    }
  },
  methods: {
    listMyServices () {
      listMyServices(this.$config.contractServiceNft, this.tokenId).then((result) => {
        console.log(result)
        this.services = result
        // this.services.forEach((service) => {
        //   const CID_REGEX = /ipfs:\/\/(.*)\/metadata.json/
        //   const cid = CID_REGEX.exec(service.tokenURI)
        //   console.log(cid)
        //   const htmlURI = `https://ipfs.io/ipfs/${cid[1]}`
        //   console.log(htmlURI)
        //   fetch(htmlURI)
        //     .then(res => res.json())
        //     .then((json) => {
        //       console.log(json)
        //     })
        // })
        // ipfs://bafyreicob6ss5pyghymbcw5p7r4piwovgy6b336sudpu57gbfupfpuigxm/metadata.json
        // https://bafyreicob6ss5pyghymbcw5p7r4piwovgy6b336sudpu57gbfupfpuigxm.ipfs.dweb.link/metadata.json
      })
    },
    listAllBusinesses () {
      listAllBusinessNFTs(this.$config.contractBusinessNft).then((result) => {
        this.$store.commit('setAllBusinesses', result)
        this.business = this.businesses.find(business => business.tokenId === this.tokenId)
      })
    },
    purchaseServiceNft (service) {
      buy(this.$config.contractVault, service).then(() => {
        console.log('succesful purchase')
      })
    },
    async getLogo () {
      this.logo = await getYourLogoPicture(this.$config.contractBusinessNft, this.$route.params.tokenId)
    }
  }
}
</script>
