<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="MainBoard">
        <div class="Board1">
          <div class="fhd:mt-10">
            🏪 My Deco Business NFT
            <div class="text-lg text-left m-5 grid grid-cols-7 fhd:gap-3 mt-12">
              <div class="bigNumber col-span-3">
                0 <span class="text-base">matic</span>
              </div><div class="numDesc">
                Total income
              </div>
              <div class="bigNumber col-span-3">
                0 <span class="text-base">matic</span>
              </div><div class="numDesc">
                Inocome on vault
              </div>
              <div class="bigNumber col-span-3">
                3%
              </div><div class="numDesc">
                APY on vault
              </div>
            </div>
          </div>
          <div class="fhd:mt-10">
            Products and services
            <div class="text-lg text-left m-5 grid grid-cols-7 fhd:gap-3 mt-12">
              <div class="bigNumber">
                1
              </div><div class="numDesc">
                product or service
              </div>
              <div class="bigNumber">
                0
              </div><div class="numDesc">
                product or service sold
              </div>
              <div class="bigNumber">
                0 <span class="text-base">usdc</span>
              </div><div class="numDesc">
                Income from this business
              </div>
            </div>
          </div>
        </div>
        <div class="Board2">
          <div class="my-2 ">
            My deco business
          </div>
          <div v-if="hasBusiness" class="grid fhd:grid-cols-6 grid-cols-2 px-10 gap-5">
            <div class="col-span-2 row-span-2 text-lg">
              Type of place / name<br>
              {{ business.shortname }}<br>
              {{ business.googleAddress }}
            </div>
            <div class="col-span-2 row-span-2 text-lg">
              <img src="../../static/3dAssets/1-Clothes.png" class="max-h-80" alt="">
              <!-- >>>>>>> Stashed changes -->
            </div>
            <!-- <div class="selDecoBG bg-glass-700">
              <div class="">
                <img class="fhd:h-32 qhd:h-43 h-32 mx-auto" src="/punkcities.png">
              </div>
              <div class="bg-deco-900 rounded-b-lg grid grid-cols-3 text-center text-base">
                <div class="py-2">
                  1 👍
                </div>
                <div class="py-2">
                  3 🛍️
                </div>
                <nuxt-link class="hover:bg-glass-700 rounded-br-lg py-2" to="../business-detail">
                  ⚙️
                </nuxt-link>
              </div>
            </div> -->
            <!-- <div class="DecoBG bg-glass-700">
              <div class="">
                <img class="xl:h-32 qhd:h-43 h-32 mx-auto" src="/deco logo.svg">
              </div>
              <div class="bg-deco-900 rounded-b-lg grid grid-cols-3 text-center text-base">
                <div class="py-2">
                  1 👍
                </div>
                <div class="py-2">
                  3 🛍️
                </div>
                <nuxt-link class="hover:bg-glass-700 rounded-br-lg py-2" to="../business-detail">
                  ⚙️
                </nuxt-link>
              </div>
            </div> -->
          </div>

          <div v-else class="grid fhd:grid-cols-6 grid-cols-2 px-10 gap-5">
            <div class="col-span-6 row-span-2 text-lg">
              Sorry you don't have a business yet. Login and create one.
            </div>
            <div class="myVaultBT m-3 p-3 text-center col-span-7 max-w-xs mx-auto">
              🏪 New business
            </div>
          </div>
        </div>

        <div class="Board3 -mt-5">
          <div class="my-2 ">
            Products and services on this business
          </div>
          <div class="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 px-10 gap-5">
            <div class="PlaceBG">
              <div class="">
                <img class="xl:h-32 qhd:h-43 h-32 mx-auto" src="/product.png">
              </div>
              <div class="bg-night-100 rounded-b-lg grid grid-cols-3 text-center text-base py-2">
                <div class="col-span-2">
                  Black T-shirt
                </div>
                <div>0.0002 matic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import getBusinessByOwner from '~/contracts/business-nft/getBusinessByOwner'

export default {
  computed: {
    connectedAddress () {
      return this.$store.state.connectedAddress
    },
    hasBusiness () {
      return this.$store.state.myBusiness &&
        this.$store.state.myBusiness.tokenId >= 0 &&
        this.$store.state.myBusiness.createdAt !== 0
    },
    business () {
      return this.$store.state.myBusiness
    }
  },
  mounted () {
    if (!this.hasBusiness) { setTimeout(this.getBusinessByOwner, 3000) }
  },
  methods: {
    getBusinessByOwner () {
      getBusinessByOwner(this.$config.contractBusinessNft).then((response) => {
        if (response.createdAt !== 0) { this.$store.commit('setMyBusiness', response) }
      })
    }
  }
}
</script>
