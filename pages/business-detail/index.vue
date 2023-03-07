<template>
  <OverlayLoader :loading="loading">
    <section class="text-white">
      <div class="MainScreen">
        <div class="MainBoard">
          <div class="xl:col-span-12 grid xl:grid-cols-5 gap-3">
            <div
              class="relative bg-white/10 rounded-xl p-3 grid grid-cols-2 items-center text-center py-10 xl:py-3"
            >
              <div
                class="bg-deco-200/40 absolute p-2 rounded-tl-xl rounded-br-xl top-0 left-0 text-2xl text-white/90"
              >
                🏪 <span class="text-base">Stores</span>
              </div>
              <div class="text-5xl">
                <div class="text-2xl">
                  Minted
                </div>
                {{ minted }}
              </div>

              <div class="text-5xl">
                <div class="text-2xl">
                  total sales
                </div>
                ${{ totalSales / Math.pow(10,18) }} <span class="xl:text-xl text-sm">DAI</span>
              </div>
            </div>

            <div
              class="relative bg-white/10 rounded-xl p-3 grid grid-cols-2 items-center text-center py-10 xl:py-3 col-span-2"
            >
              <div
                class="bg-deco-100/40 absolute p-2 rounded-tl-xl rounded-b-xl r-xl top-0 left-0 text-2xl text-white/90"
              >
                🏦 <span class="text-base">Vault</span>
              </div>
              <div class="grid gap-5 grid-cols-3 col-span-2 items-center">
                <div class="">
                  <div class="xl:text-base text-sm">
                    Balance on vault
                  </div>
                  <span
                    class="text-4xl"
                  >${{ userDAI / Math.pow(10,18) }} <span class="xl:text-xl text-sm">DAI</span></span>
                </div>
                <div class="col-span-2 grid gap-5">
                  <div class="grid grid-cols-2 items-center">
                    <div class="relative">
                      <input
                        id="price"
                        v-model="depositedAmount"
                        type="text"
                        name="price"
                        class="w-full rounded-gen border-white/25 pl-5 focus:border-green-100 focus:ring-green-100 text-xl"
                        placeholder="0.00 DAI"
                      >
                      <div
                        class="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer hover:text-deco-200 text-sm"
                        @click="setMaxDAI()"
                      >
                        max
                      </div>
                      <div
                        class="absolute -bottom-5 right-0 text-sm text-white/50"
                      >
                        <div>
                          <span>Max</span>
                          {{ userDAI / Math.pow(10,18) }} <span>DAI</span>
                        </div>
                      </div>
                    </div>
                    <div class="grid gap-5">
                      <div class="grid gap-10 px-2">
                        <div class="mintButton" @click="aaveDeposit()">
                          Supply👻
                        </div>
                      </div>
                      <div class="grid gap-5 px-2">
                        <div class="mintButton" @click="aaveWithdraw()">
                          Withdraw💵
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="relative bg-white/10 rounded-xl p-3 grid grid-cols-3 items-center text-center py-10 xl:py-3 col-span-2"
            >
              <div
                class="bg-gradient-to-b from-glass-700 to-glass-800 absolute p-2 rounded-tl-xl rounded-b-xl r-xl top-0 left-0 text-2xl text-white/90"
              >
                👻 <span class="text-base">Aave / </span>
                <span class="xl:text-sm ">
                  <span>APY </span>
                  <span class="">1.3%</span>
                </span>
              </div>

              <div class="grid gap-3 mx-5 items-center">
                <div>
                  <div class="xl:text-base text-sm">
                    Balance on Aave
                  </div>
                  <span
                    class="text-4xl"
                  >$<span class="xl:text-xl text-sm">aDAI</span></span>
                </div>
              </div>
              <div class="col-span-2 grid gap-5">
                <div class="grid grid-cols-2 col-span-2 items-center">
                  <div class="relative pl-5">
                    <input
                      id="price"
                      v-model="depositedAmount"
                      type="text"
                      name="price"
                      class="w-full rounded-gen border-white/25 pl-5 focus:border-green-100 focus:ring-green-100 text-xl"
                      placeholder="0.00 DAI"
                    >
                    <div
                      class="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer hover:text-cyber-200"
                      @click="setMaxDAI()"
                    >
                      max
                    </div>
                    <div
                      class="absolute -bottom-5 right-0  text-sm text-white/50"
                    >
                      <div>
                        <span>DAI</span>
                        <span>available</span>
                      </div>
                    </div>
                  </div>
                  <div class="grid gap-5 px-5">
                    <div class="mintButton" @click="aaveWithdraw()">
                      Supply more👻
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 col-span-2 items-center">
                  <div class="relative pl-5">
                    <input
                      id="price"
                      v-model="depositedAmount"
                      type="text"
                      name="price"
                      class="w-full rounded-gen border-white/25 pl-5 focus:border-green-100 focus:ring-green-100 text-xl"
                      placeholder="0.00 DAI"
                    >
                    <div
                      class="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer hover:text-cyber-200"
                      @click="setMaxDAI()"
                    >
                      max
                    </div>
                    <div
                      class="absolute -bottom-5 right-0  text-sm text-white/50"
                    >
                      <div>
                        <span>aDAI</span>
                        <span>available</span>
                      </div>
                    </div>
                  </div>
                  <div class="grid gap-5 px-5">
                    <div class="mintButton" @click="aaveWithdraw()">
                      Withdraw💵
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="xl:col-span-12">
            <div class="grid md:grid-cols-4 xl:grid-cols-6 grid-cols-2 gap-5">
              <div v-for="business in businesses" :key="business.tokenId">
                <nuxt-link :to="'business-detail/' + business.tokenId">
                  <div class="DecoBG">
                    <div class="text-lg text-center">
                      <img
                        class="fhd:h-full mx-auto"
                        :src="'/3dAssets/' + business.businessType + '.png'"
                      >
                      {{ business.shortname }}
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <AaveModal v-show="showModal" @goHome="goHomeClick" />
  </OverlayLoader>
</template>
<script>
// import listAllofMyBusinessNFTs from '~/contracts/business-nft/listAllofMyBusinessNFTs'
import CommonFunctions from '~/mixins/CommonFunctions'
import getBusinessNumber from '~/contracts/business-nft/getBusinessNumber'
import getTotalSales from '~/contracts/vault/getTotalSales'
import getAaaveAvailibility from '~/contracts/vault/getAaaveAvailibility'
import isAaveApproved from '~/contracts/vault/isAaveApproved'
import aaveDeposit from '~/contracts/vault/aaveDeposit'
import aaveWithdraw from '~/contracts/vault/aaveWithdraw'
import AaveModal from '~/components/AaveModal.vue'
import OverlayLoader from '~/components/OverlayLoader.vue'
import getTotalBalance from '~/contracts/vault/getTotalBalance'
import approveAaveContract from '~/contracts/vault/approveAaveContract'

export default {
  components: {
    OverlayLoader, AaveModal
  },
  mixins: [CommonFunctions],
  data () {
    return {
      showModal: false,
      loading: false,
      minted: 0,
      totalSales: 0,
      userDAI: 0,
      aaveApproved: false,
      depositedAmount: 0,
      totalBalance: 0
    }
  },
  computed: {
    businesses () {
      return this.$store.state.myBusinesses
    },
    connectedAddress () {
      return this.$store.state.connectedAddress
    }
  },
  beforeMount () {
    setTimeout(this.listAllofMyBusinessNFTs, 3000)
    setTimeout(this.getBusinessNumber, 3000)
    setTimeout(this.getSalesNumber, 3000)
    setTimeout(this.isAaveavailable, 3000)
    setTimeout(this.isAaveApproved, 3000)
    setTimeout(this.getTotalAmount, 3000)
  },
  methods: {
    async getBusinessNumber () {
      this.minted = await getBusinessNumber(this.$config.contractBusinessNft, this.connectedAddress)
      console.log('minted is: ', this.minted)
    },
    async getSalesNumber () {
      this.totalSales = await getTotalSales(this.$config.contractVault, this.connectedAddress)
      console.log('totalSales is: ', this.totalSales)
    },
    async isAaveavailable () {
      this.userDAI = await getAaaveAvailibility(this.$config.contractVault, this.connectedAddress)
      // console.log(this.connectedAddress, this.userDAI)
    },
    async isAaveApproved () {
      this.aaveApproved = await isAaveApproved(this.$config.contractVault, this.connectedAddress)
      console.log('Aave approved?', this.aaveApproved)
    },
    async aaveDeposit () {
      if (this.aaveApproved === false) {
        this.loading = true
        await approveAaveContract(this.$config.contractVault, this.connectedAddress)
        await aaveDeposit(this.$config.contractVault, this.connectedAddress, this.depositedAmount)
        this.showModal = true
        this.loading = false
      } else {
        this.loading = true
        await aaveDeposit(this.$config.contractVault, this.connectedAddress, this.depositedAmount)
        this.showModal = true
        this.loading = false
      }
    },
    async aaveWithdraw () {
      this.loading = true
      await aaveWithdraw(this.$config.contractVault, this.depositedAmount)
      this.showModal = true
      this.loading = false
    },
    setMaxDAI () {
      this.depositedAmount = this.userDAI / Math.pow(10, 18)
    },
    goHomeClick () {
      this.showModal = false
      location.reload()
    },
    async getTotalAmount () {
      this.totalBalance = await getTotalBalance(this.$config.contractVault)
      console.log('totalBalance is:', this.totalBalance)
    }
  }
}
</script>
