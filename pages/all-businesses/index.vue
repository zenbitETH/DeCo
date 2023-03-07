<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="MainBoard">
        <div class="eBoard1">
          <div class="grid md:grid-cols-4 xl:grid-cols-5 grid-cols-2 px-10 gap-5">
            <div v-for="business in businesses" :key="business.tokenId">
              <nuxt-link :to="'business-detail-customer/' + business.tokenId">
                <div class="DecoBG">
                  <div class="">
                    {{ business.shortname }}
                    <img class="fhd:h-full mx-auto" :src="'/3dAssets/' + business.businessType + '.png'">
                  </div>
                  <div class="rounded-b-tf grid grid-cols-2 text-center text-base py-2 ">
                    <div class="text-xl">
                      {{ business.upVotes }} 👍
                    </div>
                    <div class="text-xl">
                      {{ business.downVotes }} 👎
                    </div>
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
