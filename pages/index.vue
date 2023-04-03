<template>
  <div class="flex grid items-center justify-center">
    <main class="flex w-full grid items-center justify-center text-center">
      <div class="grid xl:grid-cols-2 justify-center h-full items-center mx-auto my-auto">
        <div class="text-right h-5/6 mx-auto">
          <img
            src="../static/deco_logo.svg"
            class="h-5/6"
          >
        </div>
        <div class="text-left xl:my-auto grid">
          <div class=" 3xl:text-5xl text-4xl font-lex items-center items-center text-white mx-5">
            Decentralized Commerce with NFTs and yield on Aave for small business
          </div>
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
