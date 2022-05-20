<template>
  <div
    class="relative h-20 min-w-[120px]"
    :class="{ '!h-12': !hasErrors && !small, 'h-8': !hasErrors && small, 'h-16': hasErrors && small}"
  >
    <div
      class="h-20"
      :class="{ '!h-12': !hasErrors && !small, 'h-8': !hasErrors && small, 'h-16': hasErrors && small}"
    >
      <div
        v-if="icon"
        class="ml-3 absolute h-12 flex place-items-center place-content-center"
        :class="{'h-8': small }"
      >
        <img
          :src="icon"
          class="h-5 w-5"
        >
      </div>
      <button
        id="dropzone"
        class="h-12 px-5 w-full focus:outline-none focus:bg-transparent border-b group-disabled:bg-gray-300 disabled:bg-gray-300 valid:text-deco-400 border-deco-400 hover:border-deco-100 selection:text-deco-400
        flex items-center group"
        :class="{
          'justify-center text-center': center,
          'justify-start': !center,
          ' font-semibold rounded-none ring-0 text-lg': gray,
          '!bg-gray-300 !placeholder-gray-light !pointer-events-none cursor-default': disabled,
          'h-8': small,
          'pl-11': icon
        }"
        type="button"
        @click="show()"
        @dragover.prevent
        @drop="onDrop($event)"
      >
        <p
          v-if="selectedItems.length == 0"
          class="text-deco-400 border-deco-400 whitespace-nowrap"
          :class="{ '!text-white': disabled}"
        >
          {{ placeholder }}
        </p>
        <div
          v-for="(item, index) in showableItems"
          :id="item.value"
          :key="index"
          :draggable="draggable"
          :class="{
            'inline-block mr-2 rounded-3xl bg-gray-lightest py-1 px-2 hover:bg-gray-light overflow-ellipsis': multiple,
            'cursor-move': draggable
          }"
          @dragstart="dragStart($event, item.value)"
        >
          {{ item.text }}
          <span
            v-if="multiple"
            class="ml-1 hover:text-red hover:cursor-pointer text-gray-300 text-sm"
            @click.stop="selectItem(item.value)"
          >
            <i
              slot="prefix"
              class="fas fa-times"
            />
          </span>
        </div>
        <div
          v-if="!showAll && showableItems.length < selectedItems.length"
          class="inline-block mr-2 rounded-3xl  py-1 px-2 hover:bg-gray-light"
        >
          + {{ (selectedItems.length - showableItems.length) }}
        </div>
        <img
          src="/img/icons/inputs/dropdown_arrow_icon.svg"
          class="h-[16px] w-[16px] ml-6 transform transition-all group-hover:text-gray-darkest duration-500 "
          :class="{
            'rotate-180': hasFocus,
            '!ml-auto': !center
          }"
        >
      </button>

      <div
        :class="{
          'ring-[#CFCFCF] max-h-[224px] px-5 py-3': hasFocus,
          'ring-transparent max-h-[0px] py-0 px-5': !hasFocus,
          'text-center': center,
          'bg-gray-lightest': gray
        }"
        class="z-30 absolute top-14 bg-deco-900 rounded w-full h-auto transition-height duration-500 overflow-y-auto"
      >
        <ReOverlayLoader
          :loading="loading"
          class="mt-[-58px] -mx-5 px-5 pt-[50px]"
        >
          <ReInput
            v-if="hasFilter"
            ref="searchfilter"
            v-model="filterText"
            type="text"
            class="mt-5"
            placeholder="szűrő"
            :has-focus="hasFocus"
            @input="filterTimeout"
          />
          <!-- @input="filter()" -->
          <div v-if="multiple">
            <div v-if="showSelected">
              <p
                class="-mt-3"
              >
                Kiválasztottak:
              </p>
              <ReCheckbox
                v-for="(item, index) in selectedItems"
                :key="'selected_'+ index + (item.key ? item.key : item.value)"
                :value="isSelected(item.value)"
                class="h-full "
                @input="selectItem(item.value)"
              >
                {{ item.text }}
              </ReCheckbox>
            </div>
            <div>
              <p
                v-if="showSelected"
                class="mt-3 text-deco-400"
              >
                Lehetőségek {{ resultSize !== -1 ? '(' + resultSize +' db)' : '' }}:
              </p>
              <div
                v-if="multiple"
              >
                <ReCheckbox
                  v-for="(item, index) in filteredItems"
                  :key="'filtered_' + index + (item.key ? item.key : item.value)"
                  :value="isSelected(item.value)"
                  class="h-full"
                  @input="selectItem(item.value)"
                >
                  {{ item.text }}
                </ReCheckbox>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-if="showSelected">
              <p
                class="-mt-3"
              >
                Kiválasztottak:
              </p>
              <div
                v-for="(item, index) in selectedItems"
                :key="'selected_'+ index + (item.key ? item.key : item.value)"
                class="pointer-events-auto cursor-pointer  text-deco-400 border-deco-400"
                @click="selectItem(item.value)"
              >
                {{ item.text }}
              </div>
            </div>
            <div>
              <p
                v-if="showSelected"
                class="mt-3 text-deco-400 border-deco-400"
              >
                Lehetőségek {{ resultSize !== -1 ? '(' + resultSize +' db)' : '' }}:
              </p>
              <div
                v-for="(item, index) in filteredItems"
                :key="'filtered_' + index + (item.key ? item.key : item.value)"
                class="pointer-events-auto cursor-pointer"
                @click="selectItem(item.value)"
              >
                {{ item.text }}
              </div>
            </div>
          </div>
        </ReOverlayLoader>
      </div>
      <div
        v-if="hasErrors"
        :class="{ '!h-[32px]': validationErrors }"
        class="text-sm text-red transition-all h-[0px] duration-1000"
      >
        {{ validationErrors ? validationErrors[0] : "" }}
      </div>
    </div>
  </div>
</template>

<script>
import ReInput from '~/components/inputs/Input.vue'
import ReCheckbox from '~/components/inputs/Checkbox.vue'
import ReOverlayLoader from '~/components/OverlayLoader.vue'
export default {
  components: {
    ReInput,
    ReCheckbox,
    ReOverlayLoader
  },
  props: {
    value: {
      required: true,
      default: null,
      validator: value =>
        typeof value === 'string' ||
        value === null ||
        Array.isArray(value) ||
        typeof value === 'number'
    },
    placeholder: {
      type: String,
      default: ''
    },
    validationErrors: {
      type: Array,
      default: () => {
        return []
      }
    },
    items: {
      type: Array,
      required: true
    },
    preSelectedItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    icon: {
      type: String,
      default: ''
    },
    showAll: {
      type: Boolean,
      default: false
    },
    showedItemsNumber: {
      type: Number,
      default: 2
    },
    showSelected: {
      type: Boolean,
      default: false
    },
    hasFilter: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    ajax: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    gray: {
      type: Boolean,
      default: false
    },
    resultSize: {
      type: Number,
      default: -1
    },
    hasErrors: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      timer: null,
      hasFocus: false,
      innerLoading: false,
      filteredItems: this.items,
      filterText: '',
      selectedItems: [],

      previousFilterText: null,
      intervalTimer: null,

      valueChange: false
    }
  },
  computed: {
    showableItems () {
      if (this.showAll) {
        return this.selectedItems
      }
      return this.selectedItems.slice(0, this.showedItemsNumber)
    }
  },
  watch: {
    loading () {
      this.innerLoading = this.loading
    },
    items () {
      this.filteredItems = this.items
      // this.$forceUpdate();
    },
    value: {
      handler () {
        if (this.multiple && Array.isArray(this.value)) {
          if (this.value.length > 0) {
            this.value.forEach((val) => {
              const toBePushed = this.items.find((item) => {
                return item.value === val
              })
              const inSelected = this.selectedItems.find((item) => {
                return item.value === val
              })
              if (toBePushed && !inSelected) {
                this.selectedItems.push(toBePushed)
              }
            })
          } else {
            this.selectedItems = []
          }
        }
        if (!this.multiple && this.value !== null) {
          const toBePushed = this.items.find((item) => {
            return item.value === this.value
          })
          const inSelected = this.selectedItems.find((item) => {
            return item.value === this.value
          })
          if (toBePushed && !inSelected) {
            this.selectedItems = []
            this.selectedItems.push(toBePushed)
          }
        } else if (!this.multiple && this.value === null) {
          this.selectedItems = []
        }
      },
      immediate: true
    }
  },
  beforeMount () {
    this.innerLoading = this.loading
    if (process.browser) {
      window.addEventListener('click', this.close)
    }
  },
  beforeDestroy () {
    if (process.browser) {
      window.removeEventListener('click', this.close)
    }
  },
  methods: {
    dragStart (event, value) {
      event.dataTransfer.setData('value', value)
    },
    onDrop (event) {
      const id = event.dataTransfer.getData('value')

      const atElement = document.elementFromPoint(event.clientX, event.clientY)
      const atId = atElement.id

      const indexInsertBefore = this.selectedItems.findIndex((item) => {
        // eslint-disable-next-line
        return item.value == atId;
      })
      const indexToSplice = this.selectedItems.findIndex((item) => {
        // eslint-disable-next-line
        return item.value == id;
      })

      if (indexInsertBefore !== -1 && indexToSplice !== -1) {
        const itemToInsert = this.selectedItems.splice(indexToSplice, 1)
        this.selectedItems.splice(indexInsertBefore, 0, itemToInsert[0])
      }

      event.dataTransfer.clearData()

      this.emitInput()
    },
    // filter() {
    //   if (!this.ajax) {
    //     if (this.filterText.length > 0) {
    //       this.filteredItems = this.items.filter(
    //         item =>
    //           item.text.toLowerCase().indexOf(this.filterText.toLowerCase()) ===
    //           0
    //       );
    //     } else {
    //       this.filteredItems = this.items;
    //     }
    //   } else {
    //     setTimeout(this.filterTimout, 700)
    //   }
    // },
    filterTimeout () {
      if (!this.ajax) {
        if (this.filterText.length > 0) {
          this.filteredItems = this.items.filter(
            item =>
              item.text.toLowerCase().indexOf(this.filterText.toLowerCase()) ===
              0
          )
        } else {
          this.filteredItems = this.items
        }
      } else {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.$emit('filter', this.filterText)
        }, 800)
      }
    },
    show () {
      this.hasFocus = !this.hasFocus
      if (this.hasFocus) {
        this.filterTimeout()
      }
    },
    isSelected (value) {
      if (
        this.selectedItems.find((item) => {
          return item.value === value
        })
      ) {
        return true
      }
      return false
    },
    selectItem (value) {
      let input = null
      if (this.multiple) {
        const removeIndex = this.selectedItems.findIndex((item) => {
          return item.value === value
        })
        if (removeIndex !== -1) {
          this.selectedItems.splice(removeIndex, 1)
        } else {
          this.selectedItems.push(
            this.items.find((item) => {
              return item.value === value
            })
          )
        }

        input = this.selectedItems.map((item) => {
          return item.value
        })
      }
      //  else if (
      //   this.selectedItems[0] &&
      //   this.selectedItems[0].value === value
      // ) {
      //   this.selectedItems = [];
      // }
      else {
        this.hasFocus = false
        this.selectedItems = []
        this.selectedItems.push(
          this.items.find((item) => {
            return item.value === value
          })
        )
        input = this.selectedItems[0] ? this.selectedItems[0].value : null
      }
      // this.hasFocus = false
      // this.$forceUpdate();
      this.$emit('input', input)
    },
    emitInput () {
      let input = null
      if (this.multiple) {
        input = this.selectedItems.map((item) => {
          return item.value
        })
      } else {
        input = this.selectedItems[0] ? this.selectedItems[0].value : null
      }
      this.$emit('input', input)
    },
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.hasFocus = false
      }
    }
  }
}
</script>
