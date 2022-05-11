<template>
  <div
    class="relative h-full"
  >
    <div
      ref="overlay"
      class="z-50 fixed top-0 opacity-70 bg-gray-300 left-0 w-full h-full place-content-center"
      :class="{'flex  justify-center items-center': loading, 'hidden': !loading}"
    >
      <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 " />
    </div>

    <slot />
  </div>
</template>
<script>

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      topPosition: 50,
      icon: null,
      overlay: null
    }
  },
  mounted() {
    window.addEventListener('scroll', this.calculateIconPosition)
  },
  beforeMount() {
    window.removeEventListener('scroll', this.calculateIconPosition)
  },
  methods: {
    calculateIconPosition() {
      if (icon.value && overlay.value) {
        const overlayHeight = overlay.value.getBoundingClientRect().height
        const overlayAbsoluteTop = caluclateElAbsoluteOffsetTop(overlay.value)
        // const scrollbarHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight)
        // console.log('rectangle bottom:' + ((articlesBottom + 75) - 150))
        // console.log('scroll y:' + (scrollbarHeight + window.scrollY))
        // console.log('scrollbarHeight y:' + (scrollbarHeight ))
        // console.log('window scroll y: ' + window.scrollY)
        // console.log('overlay absolutetop: ' + overlayAbsoluteTop)
        // console.log('overlay height: ' + overlayHeight)
        // console.log('overlay height: ' + overlay.offsetHeight)
        // positionTop =

        topPosition.value = ((window.innerHeight / 2) * ((window.scrollY > overlayAbsoluteTop ? overlayAbsoluteTop : window.scrollY) / overlayAbsoluteTop))
        if (window.scrollY > (overlayAbsoluteTop + 50)) { topPosition.value += window.scrollY - (overlayAbsoluteTop + 50) }

        if (topPosition.value < 50) {
          topPosition.value = 50
        }
        if (topPosition.value > (overlayHeight - 125)) { topPosition.value = overlayHeight - 125 }
        // if ((listBottom + 75) - 1000 < (scrollbarHeight + window.scrollY) && !this.$fetchState.pending) {
      }
    },
    caluclateElAbsoluteOffsetTop(el) {
      const pageHeight = (document.body.scrollHeight - window.innerHeight)
      let itemOffsetTop = 0
      let parent = el
      while (parent && parent.tagName !== 'BODY') {
        itemOffsetTop = parent.offsetTop > itemOffsetTop ? parent.offsetTop : itemOffsetTop
        parent = parent.parentNode
      }
      if (itemOffsetTop > pageHeight) {
        itemOffsetTop = pageHeight
      } else if (itemOffsetTop < 0) {
        itemOffsetTop = 0
      }
      // const offset = itemOffsetTop - window.innerHeight
      return itemOffsetTop
    }
  }
}
</script>
<style>
  .loader {
    border-top-color: rgb(151, 17, 16);
    -webkit-animation: spinner 1.5s linear infinite;
    animation: spinner 1.5s linear infinite;
  }

  @-webkit-keyframes spinner {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
