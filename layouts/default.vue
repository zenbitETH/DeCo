<template>
    <div class="py-10 px-2 bg-gradient-to-t from-deco-900 to-deco-800 h-screen overflow-y-auto">
        <nav class="top-hud">
            <div v-if="!user" class="hud1con" @click="connectWallet()">
              Wallet</div>
            <div v-else class="hud1con" @click="logOut()">
              {{getAddress()}}</div>
          <div class="hud3">
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
        <div class="max-w-7xl mx-auto mt-10">
          <Nuxt />
        </div>
        <nav class="bottom-hud">
            <div class="huda">
              <nuxt-link to="new-business">New business NFT</nuxt-link>
            </div>
            <div class="hudb">
                My decos
            </div>
            <div class="hudd">
                <nuxt-link to="all-businesses">Explore decos</nuxt-link>
            </div>
        </nav>
   </div>
</template>
<script>
import Moralis from 'moralis';
export default {
  data(){
    return {
      user: null
    }
  },
  beforeMount(){
  this.user = Moralis.User.current();
  console.log(this.$config);
  },
  methods: {
    async  connectWallet() {
     this.user = Moralis.User.current();
    if(!this.user) {
        this.user = await Moralis.authenticate({
            signingMessage: "Log in using Moralis"
        })
    }
},
async logOut(){
      await Moralis.User.logOut();
      this.user = null;
},
 getAddress(){
  console.log(this.user.get("ethAddress"));
  const address = this.user.get("ethAddress");
  return address;
}
  }
}
</script>

