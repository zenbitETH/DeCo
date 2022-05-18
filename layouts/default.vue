<template>
  <div class="relative py-10 bg-gradient-to-t from-deco-900 to-deco-800 h-screen overflow-y-auto">
    <nav class="top-hud">
      <div v-if="!connectedAddress" class="hud1con" @click="showConnectWalletModal = true">
        Connect to Deco
      </div>
      <!-- TODO show only first and last 4 characters= 0x04...abcd-->
      <div v-else class="hud1con" @click="logOut()">
        {{ connectedAddress }}
      </div>
      <div class="hud2">
        <span> 🏢 </span>
        <span class="mx-2">2</span>
      </div>
      <div class="hud3">
        <span> ⚡ </span>
        <span class="mx-2">20</span>
      </div>
      <div class="hud4">
        <span> 💽 </span>
        <span class="mx-2">12</span>
      </div>
    </nav>
    <!-- The actual page will be inserted here -->
    <div class="fhd:mx-36 qhd:mx-96 mt-10">
      <Nuxt />
    </div>
    <nav class="bottom-hud">
      <div class="huda">
        <nuxt-link to="new-business">
          New deco NFT
        </nuxt-link>
      </div>
      <div class="hudb">
        <nuxt-link to="dashboard">
          Deco Dashboard
        </nuxt-link>
      </div>
      <div class="hudb">
        <nuxt-link to="vaults">
          DeFi Vault
        </nuxt-link>
      </div>
      <div class="hudd">
        <nuxt-link to="all-businesses">
          Explore decos
        </nuxt-link>
      </div>
    </nav>
    <div v-if="showConnectWalletModal" class="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-500 bg-opacity-75">
      <div class="top-1/2 left-1/2 w-96 h-64 joinBG relative -translate-x-1/2 -translate-y-1/2">
        <h2 class="stepTitle">
          How would you like to connect?
        </h2>
        <div class="flex flex-row gap-3">
          <img src="/img/ic_wallet.png" class="p-5 w-32 h-32 mx-auto" @click="connectWithMoralis()">
          <img src="/img/ic_wallet-connect.png" class="p-5 w-32 h-32 mx-auto" @click="connectWithConnectWallet()">
        </div>
        <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="showConnectWalletModal = false">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Moralis from 'moralis'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

export default {
  data () {
    return {
      showConnectWalletModal: false,

      walletConnector: null,
      user: null,
      connectedAddress: null
    }
  },
  beforeMount () {
    this.initMoralisUser()
    this.initWalletConnect()
    // console.log(this.walletConnector)

    // this.initWalletConnect()
  },
  methods: {
    initWalletConnect () {
      this.walletConnector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal
      })
      if (this.walletConnector.connected) {
        this.connectedAddress = this.walletConnector.accounts[0]
      }
    },
    initMoralisUser () {
      this.user = Moralis.User.current()
      if (this.user) { this.connectedAddress = this.user.get('ethAddress') }
    },
    walletConnectOnConnect (error, payload) {
      if (error) { console.log(error) }

      console.log('connect', payload)
      this.connectedAddress = payload.params[0].accounts[0]
      // Get provided accounts and chainId
      // const { accounts, chainId } = payload.params[0]
    },
    walletConnectOnSessionUpdate (error, payload) {
      if (error) { console.log(error) }
      console.log('sessionUpdate', payload)

      // Get updated accounts and chainId
      // const { accounts, chainId } = payload.params[0],
    },
    walletConnectOnDisconnect (error, payload) {
      if (error) { console.log(error) }
      console.log('disconnect', payload)
      this.connectedAddress = null
      // Delete this.walletConnector
      this.walletConnector = null
    },
    async connectWithMoralis () {
      if (!this.user) {
        try {
          this.user = await Moralis.authenticate({
            signingMessage: 'Log in using Moralis'
          })
        } catch (e) {
          console.log(e)
        }
      }
      this.showConnectWalletModal = false
    },
    connectWithConnectWallet () {
      if (!this.walletConnector) {
        this.walletConnector = new WalletConnect({
          bridge: 'https://bridge.walletconnect.org', // Required
          qrcodeModal: QRCodeModal
        })
      }
      // Check if connection is already established
      if (!this.walletConnector.connected) {
        // create new session
        this.walletConnector.createSession()
      }

      // Subscribe to connection events
      this.walletConnector.on('connect', this.walletConnectOnConnect)
      this.walletConnector.on('session_update', this.walletConnectOnSessionUpdate)
      this.walletConnector.on('disconnect', this.walletConnectOnDisconnect)
      this.showConnectWalletModal = false
    },
    async logOut () {
      if (this.user) {
        await Moralis.User.logOut()
        this.user = null
      } else if (this.walletConnector) {
        this.walletConnector.killSession()
      }
      this.connectedAddress = null
    }
  }
}
</script>
