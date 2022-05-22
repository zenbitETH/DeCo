<template>
  <div
    class="group flex flex-row place-items-center min-h-12 h-auto mb-2"
    @click="onInput()"
  >
    <div
      :id="id"
      :class="{ '!bg-red': inputValue }"
      class="h-4 w-4 ring-1 ring-gray-300 group-hover:ring-gray-600 bg-transparent  transition-all flex place-items-center cursor-pointer place-self-start mt-2"
    >
      <img
        src="/img/icons/inputs/checkbox_mark_icon.svg"
        class="h-3 w-3 mx-auto"
        :class="{ 'hidden': !inputValue }"
      >
    </div>
    <label
      :for="id"
      class="ml-2 w-[calc(100%-24px)] cursor-pointer"
    ><slot /></label>
    <div
      :class="{ '!h-[32px]': validationErrors }"
      class="text-sm text-red transition-all h-[0px] duration-1000"
    >
      {{ validationErrors ? validationErrors[0] : "" }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
    // eslint-disable-next-line
      validation: prop => {
        return prop instanceof Boolean || prop === undefined
      },
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    validationErrors: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isFocus: false,
      data: false,
      inputValue: false
    }
  },
  watch: {
    value (newValue) {
      this.inputValue = newValue
      // this.$emit("input", this.inputValue);
    }
  },
  beforeMount () {
    this.inputValue = this.value
  },
  methods: {
    onInput () {
      if (!this.disabled) {
        this.inputValue = !this.inputValue
        this.$emit('input', this.inputValue)
      }
    }
  }
}
</script>
