<template>
  <OverlayLoader :loading="loading">
    <section class="text-white">
      <div class="MainScreen">
        <div class="vBoard">
          <div class="vBoard0 xl:-mt-20 xl:pt-12">
            <div class="">
              My Deco Vault
            </div>
            <div class="grid fhd:grid-cols-3 gap-5 h-full ">
              <div>My MATIC Balance: {{ userMaticBalance }} MATIC</div>
              <div>Vault Balance: {{ vaultBalance }} MATIC</div>
              <div>Current NFTs on Sale: {{ onSaleNFTs }}</div>
            </div>
          </div>

          <div class="vBoard1">
            <div class="grid fhd:grid-rows-4 gap-5 h-full ">
              <div class="row-span-2">
                Your supplies
                <div class="grid grid-rows-10 gap-3 h-full text-base py-5">
                  <div class="grid grid-cols-12">
                    <div class="col-span-3">
                      Asset
                    </div>
                    <div class="col-span-2">
                      Balance
                    </div>
                    <div class="col-span-2">
                      APY
                    </div>
                    <div class="col-span-2">
                      Collateral
                    </div>
                    <div class="col-span-3">
                      Actions
                    </div>
                  </div>

                  <div class="vAssetBG">
                    <div class="col-span-3">
                      Ethereum
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      Y/N
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT text-white" @click="showWithdrawModal = true">
                        Withdraw
                      </div>
                    </div>
                  </div>

                  <div class="vAssetBG">
                    <div class="col-span-3">
                      Matic
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      Y/N
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT text-white">
                        Withdraw
                      </div>
                    </div>
                  </div>

                  <div class="vAssetBG">
                    <div class="col-span-3">
                      USDC
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      Y/N
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT text-white">
                        Withdraw
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row-span-2 mt-3">
                Assets to supply
                <div class="grid grid-rows-9 gap-3 h-full text-base pb-16 pt-5">
                  <div class="vAssetBG1">
                    <div class="col-span-3">
                      Ethereum
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      Y/N
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT text-white" @click="showSupplyModal = true">
                        Supply
                      </div>
                    </div>
                  </div>

                  <div class="vAssetBG1">
                    <div class="col-span-3">
                      Matic
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      Y/N
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT text-white">
                        Supply
                      </div>
                    </div>
                  </div>

                  <div class="vAssetBG1">
                    <div class="col-span-3">
                      USDC
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      Y/N
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT text-white">
                        Supply
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="vBoard2">
            <div class="grid fhd:grid-rows-4 gap-5 h-full ">
              <div class="row-span-2">
                Your borrows
                <div class="grid grid-rows-10 gap-3 h-full text-base py-5">
                  <div class="grid grid-cols-12">
                    <div class="col-span-3">
                      Asset
                    </div>
                    <div class="col-span-2">
                      Balance
                    </div>
                    <div class="col-span-2">
                      APY (variable)
                    </div>
                    <div class="col-span-2">
                      APY (stable)
                    </div>
                    <div class="col-span-3">
                      Actions
                    </div>
                  </div>

                  <div class="vAssetBG">
                    <div class="col-span-3">
                      Ethereum
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT2 text-white" @click="showRepayModal = true">
                        Repay
                      </div>
                    </div>
                  </div>

                  <div class="vAssetBG">
                    <div class="col-span-3">
                      Matic
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT2 text-white">
                        Repay
                      </div>
                    </div>
                  </div>

                  <div class="vAssetBG">
                    <div class="col-span-3">
                      USDC
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT2 text-white">
                        Repay
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row-span-2 mt-3">
                Assets to borrow
                <div class="grid grid-rows-9 gap-3 h-full text-base pb-16 pt-5">
                  <div class="vAssetBG1">
                    <div class="col-span-3">
                      Ethereum
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT2 text-white" @click="showBorrowModal = true">
                        Borrow
                      </div>
                    </div>
                  </div>

                  <div class="vAssetBG1">
                    <div class="col-span-3">
                      Matic
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT2 text-white">
                        Borrow
                      </div>
                    </div>
                  </div>

                  <div class="vAssetBG1">
                    <div class="col-span-3">
                      USDC
                    </div>
                    <div class="col-span-2">
                      0 USD
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-2">
                      0%
                    </div>
                    <div class="col-span-3 px-5">
                      <div class="myVaultBT2 text-white">
                        Borrow
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal :show="showWithdrawModal">
        <h2 class="wTitle text-2xl mb-10">
          Withdraw from vault
        </h2>
        <div class="relative px-36 text-deco-900">
          <input

            type="number"
            placeholder="0"
            class="inNum"
            :value="'(' + number + ') matic'"
          ><span class="inMatic right-1/5">Matic <div class="text-lg">available <br> 2 Matic</div></span>
        </div>
        <div class="text-center mt-10">
          <button class="myVaultBT2 py-3 px-5 text-2xl font-exo">
            Withdraw funds
          </button>
        </div>
        <div class="absolute -top-10 right-0 text-center mt-10">
          <button class="xBT py-3 px-5 text-2xl font-exo" @click="showWithdrawModal = false">
            X
          </button>
        </div>
      </Modal>

      <Modal :show="showBorrowModal">
        <h2 class="wTitle text-deco-900 mb-10">
          Borrow from vault
        </h2>
        <div class="relative px-36 text-deco-900">
          <input

            type="number"
            placeholder="0"
            class="inNum"
            :value="'(' + number + ') matic'"
          ><span class="inMatic right-1/5">Matic <div class="text-lg">available <br> 2 Matic</div></span>
        </div>
        <div class="text-center mt-10">
          <button class="myVaultBT2 py-3 px-5 text-2xl font-exo">
            Withdraw funds
          </button>
        </div>
        <div class="absolute -top-10 right-0 text-center mt-10">
          <button class="xBT py-3 px-5 text-2xl font-exo" @click="showBorrowModal = false">
            X
          </button>
        </div>
      </Modal>

      <Modal :show="showSupplyModal">
        <h2 class="wTitle text-deco-900 mb-10">
          Supply modal
        </h2>
        <div class="relative px-36 text-deco-900">
          <input

            type="number"
            placeholder="0"
            class="inNum"
            :value="'(' + number + ') matic'"
          ><span class="inMatic right-1/5">Matic <div class="text-lg">available <br> 2 Matic</div></span>
        </div>
        <div class="text-center mt-10">
          <button class="myVaultBT2 py-3 px-5 text-2xl font-exo">
            Withdraw funds
          </button>
        </div>
        <div class="absolute -top-10 right-0 text-center mt-10">
          <button class="xBT py-3 px-5 text-2xl font-exo" @click="showSupplyModal = false">
            X
          </button>
        </div>
      </Modal>

      <Modal :show="showRepayModal">
        <h2 class="wTitle text-deco-900 mb-10">
          Repay modal
        </h2>
        <div class="relative px-36 text-deco-900">
          <input

            type="number"
            placeholder="0"
            class="inNum"
            :value="'(' + number + ') matic'"
          ><span class="inMatic right-1/5">Matic <div class="text-lg">available <br> 2 Matic</div></span>
        </div>
        <div class="text-center mt-10">
          <button class="myVaultBT2 py-3 px-5 text-2xl font-exo">
            Withdraw funds
          </button>
        </div>
        <div class="absolute -top-10 right-0 text-center mt-10">
          <button class="xBT py-3 px-5 text-2xl font-exo" @click="showRepayModal = false">
            X
          </button>
        </div>
      </Modal>
    </section>
  </OverlayLoader>
</template>
<script>

import Moralis from 'moralis'
import Modal from '~/components/Modal.vue'
import OverlayLoader from '~/components/OverlayLoader.vue'

export default {
  components: {
    Modal, OverlayLoader
  },
  data () {
    return {
      loading: false,
      soldNFTs: 0,
      onSaleNFTs: 0,
      vaultBalance: 0,
      userMaticBalance: 0,
      number: 0,
      showWithdrawModal: false,
      showBorrowModal: false,
      showRepayModal: false,
      showSupplyModal: false
    }
  },
  beforeMount () {
    this.loading = true
    setTimeout(this.init, 3000)
  },
  methods: {
    async getSoldNFTs () {
      const ABI = [
        {
          inputs: [],
          name: 'getSoldNFTs',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ]

      const options = {
        chain: 'mumbai',
        address: this.$config.contractServiceNft,
        function_name: 'getSoldNFTs',
        abi: ABI
      }

      this.soldNFTs = await Moralis.Web3API.native.runContractFunction(options)
      console.log(soldNFTs)
    },
    // init().apply(this, arguments)
    // init: () => {
    async init () {
      this.loading = true
      const covalent = await Moralis.Plugins.covalent
      // console.log(covalent)
      const result = await covalent.getNftTokenIdForContract({
        chainId: 80001,
        contractAddress: this.$config.contractServiceNft,
        pageNumber: 10,
        pageSize: 100
      })
      // Gets all Service NFTs - SoldNfts
      console.log('Available On-sale NFTs: ', result.data.items.length - this.soldNFTs)
      this.onSaleNFTs = result.data.items.length - this.soldNFTs

      // Vault's MATIC Balance
      const tokenBalancesForVault = await covalent.getTokenBalancesForAddress({
        chainId: 80001,
        address: this.$config.contractVault,
        quoteCurrency: 'MATIC'
      })
      console.log('MATIC Balance for Vault is: ', tokenBalancesForVault.data.items[0].balance)
      this.vaultBalance = Math.round(tokenBalancesForVault.data.items[0].balance / Math.pow(10, 13)) / 100000

      // Current address's MATIC Balance
      const tokenBalancesForUser = await covalent.getTokenBalancesForAddress({
        chainId: 80001,
        address: this.$store.state.connectedAddress,
        quoteCurrency: 'MATIC'
      })
      console.log('Your MATIC Balance is: ', tokenBalancesForUser.data.items[0].balance)
      this.userMaticBalance = Math.round(tokenBalancesForUser.data.items[0].balance / Math.pow(10, 15)) / 1000
      this.loading = false
    }

  }
}
</script>
