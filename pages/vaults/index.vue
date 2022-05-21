<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="vBoard">
        <div class="vBoard0 xl:-mt-20 xl:pt-12">
          <div class="">
            My Deco Vault
          </div>
          <div class="grid fhd:grid-cols-3 gap-5 h-full ">
            <div>My MATIC Balance:  </div>
            <div>Vault Balance: </div>
            <div>Current NFTs on Sale: </div>
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
</template>
<script>

import Moralis from 'moralis'
import Modal from '~/components/Modal.vue'

export default {
  components: {
    Modal
  },
  data () {
    return {
      showWithdrawModal: false,
      showBorrowModal: false,
      showRepayModal: false,
      showSupplyModal: false
    }
  },
  methods: {

    soldNFTs: 0,

    getSoldNFTs: async () => {
      await Moralis.start({
        appId, serverUrl
      })

      await Moralis.enableWeb3()
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
        //   contractAddress: contractAddress,
        //   functionName: "getSoldNFTs",
        //   abi: abi
      }

      soldNFTs = await Moralis.Web3API.native.runContractFunction(options)
    },

    init: async () => {
      await Moralis.start({
        appId, serverUrl
      })

      const web3 = new Web3(window.ethereum)
      console.log(web3)

      Moralis.initPlugins()
      const covalent = Moralis.Plugins.covalent
      await getSoldsNFTs()

      // Ezt nagyon magyarázni nem kell, meghívja a contracton lévő NFT-ket egyesével
      const result = await covalent.getNftTokenIdForContract({
        chainId: 80001,
        contractAddress: this.$config.contractServiceNft,
        pageNumber: 10,
        pageSize: 100
      })
      // Itt így ki tudjuk számolni mennyi NFT van jelenleg Salen, mindig
      console.log('Available On-sale NFTs: ', result.data.items.length - soldNFTs)

      // Ez itt meg tudja hívni egy adott ERC20 tokennek a balancát, például MATIC
      const vaultBalance = await covalent.getTokenBalancesForAddress({
        chainId: 80001,
        address: this.$config.contractVault,
        quoteCurrency: 'MATIC'
      })
      console.log('MATIC Balance for Vault is: ', vaultBalance.data.items[0].balance)

      const userMaticBalance = await covalent.getTokenBalancesForAddress({
        chainId: 80001,
        address: ethereum.selectedAddress,
        quoteCurrency: 'MATIC'
      })

      console.log('Your MATIC Balance is: ', userMaticBalance.data.items[0].balance)
    }

  }
}
</script>
