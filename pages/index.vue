<template>
    <div class="flex min-h-screen flex-col items-center justify-center">
        <main class="flex w-full flex-1 flex-col items-center justify-center text-center">
          <div class="grid xl:grid-cols-2 justify-center h-full xl:py-20 qhd:py-60 qhd:mx-80">
          <img
            src="../static/deco logo.svg"
            class=""
          />
          <div class="justify-items-center text-center xl:pt-60">
            <div class=" 2xl:text-5xl text-3xl font-lex items-center items-center text-white">
            Decentralized Commerce for IRL business on
            <span class="text-solar-100 hover:text-cyber-100 cursor-pointer"> Punk Cities</span>
            </div>            
            <div class="xl:text-2xl mx-10 font-lex-200 text-center mt-20 text-white">Developed @</div>
            
            <div class="font-bal text-white xl:text-8xl text-5xl">
              <span class="text-deco-100">Hack</span> <span class="text-deco-400">Money</span> 2022
              <Link class="" href={}> </Link>
            </div>
          </div>
          </div>
          <div class="h-screen mt-20 pb-64">
            <div class="xl:text-6xl text-2xl mx-10 text-deco-100 font-black hover:animate-pulse">How to mint my deco NFT?</div>
            <div class="grid xl:grid-cols-3 gap-5 mt-20 text-white text-2xl font-exo">
              <a href={https://punkcity.surge.sh}>
              <div class="joinBG">1.  Start a new game
                <img src="https://punkcities.mypinata.cloud/ipfs/QmPoSnaj68Lcbs8TiAT1Lg9aodWcXE27t94kjhAw8xYZwn" class="p-5 w-3/5 mx-auto"/>
              </div>
              </a>
              <div class="joinBG cursor-default">2. Mint your deco NFT
                
              </div>
              <div class="joinBG cursor-default">3. Add your products or services
                
              </div>
              <div class="joinBG cursor-default">4.  Sell to punk cities' customers
          
              </div>
              <div class="joinBG cursor-default">5. Get de-fi income
                
              </div>
              <div class="joinBG cursor-default">6. Get⚡and 💽 rewards!
                
              </div>
            </div>
            <a href="./dashboard"> <div class="text-9xl py-96 mx-10 text-white font-black animate-pulse"> 🕹️Demo time!</div></a>
            <div class="text-6xl mt-20 mx-10 text-white font-black hover:animate-pulse">Built with:</div>
            <div class="grid xl:grid-cols-6 gap-5 mt-20 text-white text-xl font-exo pb-96">
              <a href="" class="builtBG">1. Nuxt.js</a>
              <a href="" class="builtBG">2. Solidity</a>
              <a href="" class="builtBG">3. IPFS</a>
              <a href="" class="builtBG">4. </a>
              <a href="" class="builtBG">5.</a>
              <a href="/" class="builtBG">6.</a>
            </div>
            <div class="text-6xl mt-20 mx-10 text-white font-black hover:animate-pulse ">Future work:</div>
            <div class="grid xl:grid-cols-3 gap-5 mt-20 text-white text-2xl font-exo mb-96">
              <div class="Future cursor-default">1. 
                <div class="xl:text-9xl py-40 ">emoji</div>
              </div>
              <div class="Future cursor-default">2.
                <div class="xl:text-9xl py-40 ">emoji</div>
              </div>
              <div class="Future cursor-default">3.
                <div class="xl:text-9xl py-40 ">emoji</div>
              </div>
            </div>
                        
          </div>
          
        </main>
      </div>
</template>

<script lang="ts">
import Vue from 'vue'
//components must be imported and added to the Vue instance (see below) before they can be used
import DemoComponent from '~/components/DemoComponent.vue'
import DemoComponentWithoutSlot from '~/components/DemoComponentWithoutSlot.vue'

export default Vue.extend({
  //layouts can be changed like this:
  // layout: 'default'
  //the default layout is layouts/default.vue, since it is the default, it can be ommited

  //components must be added like this
  components: {
    DemoComponent, DemoComponentWithoutSlot
  },

  //component data should be defined here to be able to use in HTML template
  data() {
    return {
      message: 'Hello variable message'
    }
  }

})
</script>
