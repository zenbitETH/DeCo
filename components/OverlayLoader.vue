<template>
  <div
    class="relative h-full"
  >
    <div
      ref="overlay"
      class="z-50 fixed top-0 bg-black/60 left-0 w-full h-full place-content-center backdrop-blur-md"
      :class="{'flex  justify-center items-center': loading, 'hidden': !loading}"
    >
      <div class="grid items-center text-center mx-auto font-exo gap-3">
        <div class="mx-auto animate-spin border-8 border-t-deco-200 border-deco-100 ease-linear rounded-full h-24 w-24" />
        <div class="text-2xl text-white text-center text-solar-100 animate-pulse grid items-center">
          Loading...
        </div>
      </div>
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
  data () {
    return {
      topPosition: 50,
      icon: null,
      overlay: null
    }
  },
  mounted () {
    window.addEventListener('scroll', this.calculateIconPosition)
  },
  beforeMount () {
    window.removeEventListener('scroll', this.calculateIconPosition)
  },
  methods: {
    calculateIconPosition () {
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
    caluclateElAbsoluteOffsetTop (el) {
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
