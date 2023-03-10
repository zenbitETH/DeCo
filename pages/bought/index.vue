<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="MainBoard">
        <div class="eBoard1">
          <div class="grid md:grid-cols-3 grid-cols-2 px-10 gap-5">
            <div v-for="service in MyBoughtServices" :key="service.tokenId" class="DecoBG grid grid-cols-2 hover:bg-glass-200 cursor-default">
              <img class="object-scale-down h-64 rounded-tf bg-white/20" :src="service.tokenURI">
              <div class="grid items-center relative">
                <div>
                  <div>{{ service.serviceDescription }}</div>
                  <div class="text-sm">
                    {{ service.businessName }}
                  </div>
                </div>
                <div class="absolute right-0 top-0 px-3 py-1 bg-deco-100/60 rounded-tr-tf rounded-bl-tf text-xl">
                  {{ service.price / Math.pow(10,18) }}
                </div>
                <div class="mintButton">
                  Reedem
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
import listAllMyBoughtProdocuts from '~/contracts/service-nft/listAllMyBoughtProducts'

export default {

  computed: {

    MyBoughtServices () {
      return this.$store.state.myAllBoughtServices
    }
  },

  watch: {
    beforeMount () {
      this.listBoughtServices()
    }
  },
  methods: {
    listBoughtServices () {
      listAllMyBoughtProdocuts(this.$config.contractServiceNft).then((result) => {
        this.$store.commit('setMyAllSoldServices', result)
      })
    }
  }
}

</script>
