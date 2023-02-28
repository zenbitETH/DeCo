<template>
  <div class="modal-overlay items-center bg-black/60 backdrop-blur-md font-exo">
    <div class="h-96 h-96 rounded-tf bg-white/60 m-auto grid items-center p-10 text-center">
      <div>
        <div class="text-8xl animate-bounce">
          🗳️
        </div>
        <div class="text-xl">
          You have voted this storeNFT!
        </div>
      </div>
      <button class="text-xl mx-auto px-3 py-2 bg-cyber-100/80 hover:bg-solar-100 text-white hover:text-gray-800 cursor-pointer rounded-tf" @click="goHome()">
        Return
      </button>
    </div>
    <!-- <div class="close">
      <img class="close-img" src="~/assets/close-icon.svg" alt="">
    </div> -->
  </div>
</template>

<script>
export default {
  methods: {
    goHome () {
      this.$emit('goHome')
    }
  }
}
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 50;
}
</style>
