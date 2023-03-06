<template>
  <OverlayLoader :loading="loading">
    <section class="text-white">
      <div class="MainScreen">
        <div class="MainBoard">
          <div class="xl:col-span-12 grid xl:grid-cols-3 gap-3">
            <div
              class="relative bg-white/10 rounded-xl p-3 grid grid-cols-2 items-center text-center py-10 xl:py-3"
            >
              <div
                class="bg-deco-200/40 absolute p-2 rounded-tl-xl rounded-br-xl top-0 left-0 text-2xl text-white/90"
              >
                🏪 <span class="text-sm">Stores</span>
              </div>
              <div class="xl:text-8xl text-5xl">
                <div class="text-2xl">
                  Minted
                </div>
                {{ minted }}
              </div>

              <div class="xl:text-8xl text-5xl">
                <div class="text-2xl">
                  total sales
                </div>
                ${{ totalSales / Math.pow(10,18) }} <span class="xl:text-xl text-sm">DAI</span>
              </div>
            </div>

            <div
              class="relative bg-white/10 rounded-xl p-3 grid grid-cols-2 items-center text-center py-10 xl:py-3"
            >
              <div
                class="bg-deco-100/40 absolute p-2 rounded-tl-xl rounded-b-xl r-xl top-0 left-0 text-2xl text-white/90"
              >
                🏦 <span class="text-sm">Vault</span>
              </div>
              <div class="grid gap-5 col-span-2">
                <div>
                  <div class="xl:text-base text-sm">
                    Balance on vault
                  </div>
                  <span
                    class="text-4xl"
                  >${{ vaultBalance / Math.pow(10,18) }} <span class="xl:text-xl text-sm">DAI</span></span>
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
                    class="absolute -bottom-5 left-10  text-sm text-white/50"
                  >
                    <div>
                      {{ userDAI / Math.pow(10,18) }} <span>DAI</span>
                      <span>available</span>
                    </div>
                  </div>
                </div>
                <div class="grid gap-5 px-5">
                  <div class="mintButton" @click="aaveDeposit()">
                    supply to aave
                  </div>
                  <div class="mintButton" @click="aaveWithdraw()">
                    withdraw to wallet
                  </div>
                </div>
              </div>
            </div>
            <div
              class="relative bg-white/10 rounded-xl p-3 grid grid-cols-2 grid-rows-2 items-center text-center py-10 xl:py-3"
            >
              <div
                class="bg-gradient-to-b from-glass-700 to-glass-800 absolute p-2 rounded-tl-xl rounded-b-xl r-xl top-0 left-0 text-2xl text-white/90"
              >
                👻 <span class="text-sm">Aave</span>
              </div>
              <div class="grid gap-5 grid-cols-2 col-span-2 mx-12 items-center">
                <div>
                  <div class="xl:text-base text-sm">
                    Balance on Aave
                  </div>
                  <span
                    class="text-4xl"
                  >$<span class="xl:text-xl text-sm">DAI</span></span>
                </div>
                <div>
                  <div class="xl:text-base text-sm">
                    <div>APY</div>
                    <span class="text-4xl">1.3%</span>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 col-span-2 items-center">
                <div class="relative pl-5">
                  <input
                    id="price"
                    v-model="depositedWalletDAI"
                    type="text"
                    name="price"
                    class="w-full rounded-gen border-white/25 pl-5 focus:border-green-100 focus:ring-green-100 text-xl"
                    placeholder="0.00 DAI"
                  >
                  <div
                    class="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer hover:text-cyber-200"
                    @click="setMaxWalletDAI()"
                  >
                    max
                  </div>
                  <div
                    class="absolute -bottom-5 left-10  text-sm text-white/50"
                  >
                    <div>
                      <span>{{ walletDAIBalance / Math.pow(10,18) }}DAI</span>
                      <span>available</span>
                    </div>
                  </div>
                </div>
                <div class="grid gap-5 px-5">
                  <div class="mintButton" @click="aaveWithdraw()">
                    withdraw to vault
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
import getVaultBalance from '~/contracts/vault/getVaultBalance'
import getYourDAIBalance from '~/contracts/vault/getWalletDAIBalance'

export default {
  components: {
    OverlayLoader, AaveModal
  },
  mixins: [CommonFunctions],
  data () {
    return {
      walletDAIBalance: 0,
      depositedWalletDAI: 0,
      vaultBalance: 0,
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
    setTimeout(this.getVBalance, 3000)
    setTimeout(this.getYourDBalance, 3000)
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
    },
    async getVBalance () {
      this.vaultBalance = await getVaultBalance(this.$config.contractVault)
      console.log('Vault Balance is: ', this.vaultBalance)
    },
    async getYourDBalance () {
      this.walletDAIBalance = await getYourDAIBalance(this.$config.contractVault, this.connectedAddress)
      console.log('Your DAI Balance is: ', this.walletDAIBalance)
    },
    setMaxWalletDAI () {
      this.depositedWalletDAI = this.walletDAIBalance / Math.pow(10, 18)
    }

  }
}
</script>
