<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="MainBoard">
        <div class="eBoard1">
          <div class="my-2 ">
            All Deco business
          </div>
          <div class="grid md:grid-cols-4 xl:grid-cols-8 grid-cols-2 px-10 gap-5">
            <!-- <div class="DecoBG bg-glass-700">
              <div class="">
                <img class="fhd:h-32 qhd:h-43 h-32 mx-auto" src="punkcities.png">
              </div>
              <div class="bg-night-100 rounded-b-lg grid grid-cols-2 text-center text-base py-2">
                <div>1 👍</div>
                <div>3 🛍️</div>
              </div>
            </div> -->
            <div v-for="business in businesses" :key="business.tokenId">
              <nuxt-link :to="'business-detail-customer/' + business.tokenId">
                <div class="DecoBG bg-glass-700">
                  <div class="">
                    <img class="xl:h-32 qhd:h-43 h-32 mx-auto" src="/deco logo.svg">
                    {{ business.shortname }}
                  </div>
                  <div class="bg-night-100 rounded-b-lg grid grid-cols-2 text-center text-base py-2">
                    <div>0 👍</div>
                    <div>0 🛍️</div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import listAllBusinessNFTs from '~/contracts/business-nft/listAllBusinessNFTs'

export default {
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
