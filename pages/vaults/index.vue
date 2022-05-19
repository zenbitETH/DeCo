<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="vBoard">
        <div class="vBoard0 xl:-mt-20 xl:pt-12">
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
                    <div class="myVaultBT text-white">
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
                    <div class="myVaultBT text-white">
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
                    <div class="myVaultBT2 text-white">
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
                    <div class="myVaultBT2 text-white">
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
  </section>
</template>
