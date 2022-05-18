<template>
  <div v-if="show" class="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-500 bg-opacity-75">
    <div class="top-1/2 left-1/2 max-w-3xl w-auto bg-glass-200 rounded-lg relative -translate-x-1/2 -translate-y-1/2">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>
