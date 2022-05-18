<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="vBoard">
        <div class="vBoard0">
          <div class="">
            My Deco Vault
          </div>
          <div class="grid fhd:grid-cols-3 gap-5 h-full ">
            <div>Net worth:</div>
            <div>Net APY:</div>
            <div>Healtg factor:</div>
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
      <h2 class="stepTitle">
        Withdraw modal
      </h2>
      <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="showWithdrawModal = false">
        Cancel
      </button>
    </Modal>

    <Modal :show="showBorrowModal">
      <h2 class="stepTitle">
        Borrow modal
      </h2>
      <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="showBorrowModal = false">
        Cancel
      </button>
    </Modal>

    <Modal :show="showSupplyModal">
      <h2 class="stepTitle">
        Supply modal
      </h2>
      <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="showSupplyModal = false">
        Cancel
      </button>
    </Modal>

    <Modal :show="showRepayModal">
      <h2 class="stepTitle">
        Repay modal
      </h2>
      <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="showRepayModal = false">
        Cancel
      </button>
    </Modal>
  </section>
</template>
<script>

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
  }
}
</script>
