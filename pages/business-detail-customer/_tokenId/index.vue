<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="dBoard">
        <div class="assetBoard">
          <div class="grid grid-cols-6 text-left">
            <div class="text-center col-span-2">
              <img class="fhd:h-full mx-auto" src="../../../static/3dAssets/1-Clothes.png">
            </div>
            <div class="col-span-4 pt-6 xl:pt-20">
              <div class="text-xl">
                {{ business ? businessTypes.find(t => t.value === business.businessType).text : 'Type of place' }}
              </div>
              <div class="xl:text-5xl text-2xl">
                {{ business ? business.shortname : 'Loading...' }}
              </div>
            </div>
          </div>

          <div class="col-span-6 row-span-4">
            <img class="fhd:h-full mx-auto" src="/deco logo.svg">
          </div>

          <div class="dataBoard">
            <div class="col-span-4 row-span-2 p-3">
              {{ business ? business.description : 'Loading...' }}
            </div>
            <div class="grid fhd:col-span-2 col-span-4 gap-3 row-span-2">
              <!-- <div class="p-3">
                Tags
              </div> -->
              <div class="text-center grid grid-cols-2 col-span-4 gap-3 fhd:pt-5 mr-5">
                <div class=" text-4xl">
                  0👍
                </div>
                <div class="myVaultBT">
                  👍 Verify
                </div>
              </div>
            </div>
            <div class="col-span-4 row-span-2 p-3">
              {{ business ? `${business.city} ${business.googleAddress}` : 'Loading...' }}
            </div>
          </div>
        </div>

        <div class="inventory">
          <div>
            <div class="my-2 md:mx-30 xl:mx-60 mx-10">
              On sale
            </div>

            <div class="grid md:grid-cols-3 grid-cols-2 px-10 gap-5">
              <div v-for="service in unsoldServices" :key="service.serviceId" class="PlaceBG" @click="purchaseServiceNft(service)">
                <div class="text-center">
                  <img class="xl:h-32 qhd:h-43 h-32 mx-auto" src="../../../static/product.png">
                </div>
                <div class="bg-gradient-to-r from-deco-500 to-glass-700 rounded-b-lg grid grid-cols-3 text-center text-base py-2">
                  <div class="text-deco-900 col-span-2">
                    {{ service.serviceDescription }}
                  </div>
                  <div>{{ service.price / Math.pow(10,18) }} MATIC</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <div class="my-2 md:mx-30 xl:mx-60 mx-10">
              Sold
            </div>
            <div class="grid md:grid-cols-4 grid-cols-2 px-10 gap-5">
              <div v-for="service in soldServices" :key="service.serviceId" class="PlaceBG col-span-2">
                <div class="text-center">
                  <img class="xl:h-32 qhd:h-43 h-32 mx-auto" :src="service.tokenURI">
                </div>
                <div class="bg-gradient-to-r from-glass-700 to-glass-800 rounded-b-lg grid grid-cols-3 text-center text-base py-2">
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
  </section>
</template>
<script>
import listAllBusinessNFTs from '~/contracts/business-nft/listAllBusinessNFTs'
import listMyServices from '~/contracts/service-nft/listMyServices'
import buy from '~/contracts/vault/buy'

export default {
  data () {
    return {
      tokenId: null,
      business: null,
      services: []
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
      }
    }
  },
  beforeMount () {
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
    }
  }
}
</script>
