<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="MainBoard">
        <div class="eBoard1">
          <div class="grid md:grid-cols-4 xl:grid-cols-6 grid-cols-2 px-10 gap-5">
            <div v-for="business in businesses" :key="business.tokenId">
              <nuxt-link :to="'business-detail-customer/' + business.tokenId">
                <div class="DecoBG bg-glass-200">
                  <div class="text-lg">
                    <!-- <img class="xl:h-32 qhd:h-43 h-32 mx-auto" :src="logo"> -->
                    <img class="fhd:h-full mx-auto" :src="'/3dAssets/' + business.businessType + '.png'">
                    {{ business.shortname }}
                  </div>
                  <div class="bg-glass-600 rounded-b-tf grid grid-cols-2 text-center text-base py-2">
                    <div>0 👍</div>
                    <div>0 👎</div>
                  </div>
                </div>
              </nuxt-link>
            </div>
            <!-- <nuxt-link to="business-detail-customer" class="DecoBG bg-glass-500">
              <div class="">
                <img class="xl:h-32 qhd:h-43 h-32 mx-auto" src="../../static/deco logo.svg">
              </div>
              <div class="bg-deco-900 rounded-b-tf grid grid-cols-2 text-center text-base py-2">
                <div>0 👍</div>
                <div>0 🛍️</div>
              </div>
            </nuxt-link> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import listAllBusinessNFTs from '~/contracts/business-nft/listAllBusinessNFTs'

export default {
  data () {
    return {
      logo: ''
    }
  },
  computed: {
    businesses () {
      return this.$store.state.allBusinesses
    }
  },
  beforeMount () {
    setTimeout(this.listAllBusinesses, 3000)
  },
  methods: {
    listAllBusinesses () {
      listAllBusinessNFTs(this.$config.contractBusinessNft).then((result) => {
        this.$store.commit('setAllBusinesses', result)
      })
    }
  }
}
</script>
