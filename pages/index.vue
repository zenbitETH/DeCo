<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <main class="flex w-full flex-1 flex-col items-center justify-center text-center">
      <div class="grid xl:grid-cols-2 justify-center h-full xl:py-20 qhd:py-60 qhd:mx-80">
        <img
          src="../static/deco_logo.svg"
          class=""
        >
        <div class="justify-items-center text-center xl:pt-60">
          <div class=" 2xl:text-5xl text-3xl font-lex items-center items-center text-white">
            Decentralized Commerce for IRL business
          </div>
          <div class="xl:text-2xl mx-10 font-lex-200 text-center mt-20 text-white">
            Developed @
          </div>

          <div class="font-bal text-white xl:text-8xl text-5xl">
            <span class="text-deco-100">Hack</span> <span class="text-deco-400">Money</span> 2022
            <Link class="" href="{}" />
          </div>
        </div>
      </div>
      <div class="h-screen mt-20 pb-64">
        <div class="xl:text-6xl text-2xl mx-10 text-deco-100 font-black hover:animate-pulse">
          Why Deco?
        </div>
        <div class="grid fhd:mx-36 gap-5 mt-10 text-white text-2xl font-exo">
          <div class="joinBG cursor-default">
            <div class="text-9xl my-10">
              4.2T USD <span class="text-lg">by 2025</span>
            </div>
            E-commerce and M-Commerce rising
          </div>

          <div class="!bg-glass-700 !animate-pulse joinBG cursor-default">
            <div class="text-9xl my-10">
              Only 25%
            </div>
            of small business make e-commerce sales
          </div>
          <div class="joinBG cursor-default">
            <div class="text-9xl my-10">
              Centralization
            </div>
            on few services and UX
          </div>
        </div>
        <div class="xl:text-6xl text-2xl mx-10 mt-36 text-deco-100 font-black hover:animate-pulse">
          Whats Deco?
        </div>
        <div class="grid fhd:mx-36 grid-cols-3 mt-10 gap-5 text-white text-2xl font-exo">
          <div class="joinBG cursor-default">
            <div class="text-6xl my-10">
              Decentralized Commerce
            </div>
          </div>
          <div class="mt-20 -mx-20 cursor-default">
            <div class="text-6xl my-10">
              +
            </div>
          </div>
          <div class="hover:!bg-deco-400 joinBG cursor-default">
            <div class="text-6xl my-10">
              Game-fi
            </div>
          </div>
        </div>
        <div class="xl:text-6xl text-2xl mx-10 mt-36 text-deco-100 font-black hover:animate-pulse">
          How deco works?
        </div>
        <div class="grid xl:grid-cols-3 gap-5 mt-20 text-white text-2xl font-exo">
          <div class="joinBG cursor-default">
            <div class="text-9xl my-10">
              🏪
            </div>
            1. Mint your deco NFT
          </div>
          <div class="joinBG cursor-default">
            <div class="text-9xl my-10">
              👕👩‍💻
            </div>
            2. Add your products or services
          </div>
          <div class="joinBG cursor-default">
            <div class="text-9xl my-10">
              🎮
            </div>
            3. Game-fi with Punk Cities
          </div>
        </div>
        <a href="./dashboard"> <div class="text-9xl py-96 mx-10 text-white font-black animate-pulse"> 🕹️Demo time!</div></a>
        <div class="text-6xl mt-20 mx-10 text-white font-black hover:animate-pulse">
          Built with:
        </div>
        <div class="grid xl:grid-cols-6 gap-5 mt-20 text-white text-xl font-exo pb-96">
          <a href="" class="builtBG">1. Nuxt.js</a>
          <a href="" class="builtBG">2. ERC721 contract</a>
          <a href="" class="builtBG">3. Wallet Connect</a>
          <a href="" class="builtBG">4. Coinbase Wallet</a>
          <a href="" class="builtBG">5. IPFS</a>
          <a href="/" class="builtBG">6. Covalent</a>
        </div>
        <div class="text-6xl mt-20 mx-10 text-white font-black hover:animate-pulse ">
          Future work:
        </div>
        <div class="grid xl:grid-cols-3 gap-5 mt-20 text-white text-2xl font-exo mb-96">
          <div class="Future cursor-default">
            1. City vault for Punk Cities
            <div class="xl:text-9xl py-20 ">
              🏙️
            </div>
          </div>
          <div class="Future cursor-default">
            2. Energy and chips integration
            <div class="xl:text-9xl py-20 ">
              ⚡💽
            </div>
          </div>
          <div class="Future cursor-default">
            3. DeFi Protocols
            <div class="xl:text-9xl py-20 ">
              💱
            </div>
          </div>
        </div>
        <div class="text-6xl mx-10 text-white font-black hover:animate-pulse my-20 text center">
          Team:
        </div>
        <div class="grid grid-cols-4 gap-5 mt-20 text-white text-2xl font-exo justify-items-center">
          <a href="https://github.com/HabacucMX">
            <div class="teamMB"><img src="https://avatars.githubusercontent.com/u/57845110?s=400&u=5460231e3addfd30b2f4f35650c81206e3d7552f&v=4" class="bg-deco-100 rounded-full h-60 w-60">
              habacuc.eth<div class="text-lg text-deco-400">UX/UI</div></div></a>
          <a href="https://github.com/Riki0923">
            <div class="teamMB"><img src="https://wallpapercave.com/wp/wp10533483.jpg" class="bg-deco-100 rounded-full h-60 w-60">
              Riki0923<div class="text-lg text-deco-400">Smart contracts</div></div></a>
          <a href="https://github.com/gumacs92">
            <div class="teamMB"><img src="https://i.pinimg.com/736x/63/6c/45/636c451fd0a774623a45ec805fd91f1a.jpg" class="bg-deco-100 rounded-full h-60 w-60">
              gumacs92<div class="text-lg text-deco-400">Fullstack dev</div></div></a>
          <a href="https://github.com/tyrasz">
            <div class="teamMB"><img src="https://avatars.githubusercontent.com/u/16234736?v=4" class="bg-deco-100 rounded-full h-60 w-60">
              tyrasz<div class="text-lg text-deco-400">Contract verification</div></div></a>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // layouts can be changed like this:
  // layout: 'default'
  // the default layout is layouts/default.vue, since it is the default, it can be ommited

  // component data should be defined here to be able to use in HTML template
  data () {
    return {
      message: 'Hello variable message'
    }
  }

})
</script>
