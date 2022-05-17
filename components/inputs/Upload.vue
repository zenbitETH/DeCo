<template>
  <client-only>
    <div class="w-full ">
      <div
        class="bg-gray-lightest p-3 border border-dashed border-red flex flex-col place-items-center"
      >
        <div
          class="w-full text-center "
          @drop.prevent="onDrop($event)"
          @dragover.prevent="onDragOver($event)"
          @dragenter.prevent="onDragEnter($event)"
          @dragleave="onDragLeave($event)"
          @paste="onPaste($event)"
        >
          <div
            v-if="hasPreview"
            class="w-full h-full flex flex-row flex-wrap mb-5"
          >
            <div
              v-for="(file, index) in files"
              :key="file.url"
              class="w-full lg:w-1/3 px-1 text-left"
            >
              <img
                :src="imgPreview[index]"
                class="w-full"
              >
              <span class="text-left text-semigray">
                {{ file.name }}
                <i
                  class="fas fa-times cursor-pointer text-black hover:text-red"
                  @click="onClose(index)"
                />
              </span>
            </div>
          </div>
          <div
            v-else
            class="w-full h-full mb-5"
          >
            <ul class="flex flex-col gap-2">
              <li
                v-for="(file, index) in files"
                :key="index"
              >
                <i
                  v-if="is('image', file)"
                  class="fas fa-image text-red"
                />
                <i
                  v-if="is('audio', file)"
                  class="fas fa-music text-red"
                />
                <i
                  v-if="!is('image', file) && !is('audio', file)"
                  class="fas fa-file text-red"
                />
                {{ file.name }}
                <i
                  class="fas fa-times hover:text-red pointer-events-auto cursor-pointer"
                  @click="onClose(index)"
                />
              </li>
            </ul>
          </div>
          <div
            class="w-full min-h-[50px] flex justify-center items-center  place-content-center p-8"
          >
            <input
              :id="id"
              :name="id + '[]'"
              class="hidden"
              type="file"
              data-multiple-caption="{count} files selected"
              multiple
              @change="onFileUpload($event)"
            >
            <label
              :for="id"
              class="font-merriweather-sans text-lg"
            >
              <span class="font-bold pointer-events-auto cursor-pointer">Select a file</span><br>
              <span class="text-semigray">or drag it here!</span>
            </label>
          </div>
        </div>
      </div>
      <div
        v-if="uploading"
        class="w-full text-center font-merriweather-serif text-xl mt-6 font-semibold"
      >
        <button
          v-if="uploading"
          :disabled="true"
          class="w-full btn btn-red"
          type="submit"
          @click="uploadFiles()"
        >
          Upload in progress ...
        </button>
      </div>
      <div
        :class="{ '!h-[32px]': fileError }"
        class="font-merriweather-sans text-sm text-red transition-all h-[0px] duration-1000"
      >
        {{ fileError ? fileError : "" }}
      </div>
    </div>
  </client-only>
</template>
<script>

export default {
  props: {
    id: {
      type: String,
      default: 'file_upload'
    },
    // eslint-disable-next-line
    value: {
      validation: (prop) => {
        return prop instanceof Object || Array.isArray(prop) || prop === null
      },
      default: null,
      required: true
    },
    hasPreview: {
      type: Boolean,
      default: false
    },
    // deprecated param
    upload: {
      type: Function,
      default: null
    },
    size: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      uploading: false,
      percentage: 0,

      hasAdvancedUpload: false,
      isDragged: false,
      showPreview: false,
      previewIndex: false,
      enterCounter: 0,

      imgPreview: [],
      imgTempData: null,

      firstUpdate: true,
      filesToProcess: [],
      files: [],
      fileError: ''
    }
  },
  watch: {
    value: {
      handler () {
        if (this.max === 1) {
          if (this.value !== null) {
            const newFiles = []
            newFiles.push(this.value)
            this.files = newFiles
          } else {
            this.files = []
          }
        } else {
          this.files = this.value
        }
      },
      immediate: true
    },
    percentage: {
      handler () {
        if (this.percentage >= 100) {
          setTimeout(() => {
            this.uploading = false
            this.files = []
            this.percentage = 0
          }, 1000)
        }
      }
    }
  },
  methods: {
    is (type, file) {
      if (file.type.includes(type)) {
        return true
      }
      return false
    },
    async uploadFiles () {
      this.uploading = true

      const promises = []
      if (this.upload) {
        this.files.forEach((file, index) => {
          promises.push(this.upload({ file, index }))
          this.emitInput()
        })
      }
      await Promise.all(promises).catch((e) => { console.log(e); this.uploading = false })
      this.uploading = false
    },
    /// //////////////////////////////////////////////////////////////////////////////////////
    // VALIDATION METHODS
    /// //////////////////////////////////////////////////////////////////////////////////////
    uploadValidation (file) {
      if (this.size && file.size > this.size) {
        const size = Math.round((this.size / 1024 / 1024) * 100) / 100
        this.fileError = 'A fájlok mérete maximum ' + size + ' MB lehet'
      } else {
        return true
      }
    },

    processFiles () {
      this.filesToProcess.forEach((file) => {
        if (this.files.length >= this.max) {
          this.files.splice(0, 1)
          this.imgPreview.splice(0, 1)
        }
        this.files.push(file)
        const reader = new FileReader()

        reader.onload = (e) => {
          this.imgPreview.push(e.target.result)
        }
        reader.readAsDataURL(file)
      })
      this.filesToProcess = []
      this.uploadFiles()
    },
    /// //////////////////////////////////////////////////////////////////////////////////////
    // FILE UPLOAD EVENT METHODS
    /// //////////////////////////////////////////////////////////////////////////////////////
    onFileUpload (event) {
      this.fileError = ''
      for (let i = 0; i < event.target.files.length; i++) {
        // If dropped items aren't , reject them
        const file = event.target.files[i]

        if (this.uploadValidation(file)) {
          this.filesToProcess.push(file)
        }
        // TODO only image types
      }

      this.processFiles()
    },
    onPaste (event) {
      this.fileError = ''
      if (event.clipboardData.items) {
        for (let i = 0; i < event.clipboardData.items.length; i++) {
          // If dropped items aren't , reject them
          if (event.clipboardData.items[i].kind === 'file') {
            const file = event.clipboardData.items[i].getAsFile()

            if (this.uploadValidation(file)) {
              this.filesToProcess.push(file)
            }
            // TODO only image types
          }
        }
      }

      this.processFiles()
    },
    /// //////////////////////////////////////////////////////////////////////////////////////
    // DRAG AND DROP EVENTS
    /// //////////////////////////////////////////////////////////////////////////////////////
    onDrop (event) {
      this.fileError = ''
      this.isDragged = false

      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)

        for (let i = 0; i < event.dataTransfer.items.length; i++) {
          // If dropped items aren't , reject them
          if (event.dataTransfer.items[i].kind === 'file') {
            const file = event.dataTransfer.items[i].getAsFile()

            if (this.uploadValidation(file)) {
              this.filesToProcess.push(file)
            }
            // TODO only image types
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < event.dataTransfer.files.length; i++) {
          const file = event.dataTransfer.files[i]
          this.filesToProcess.push(file)
          // TODO only image types
          // TODO size validation
        }
      }

      this.processFiles()
    },
    onDragEnd () {},
    onDragOver () {},
    onDragEnter () {
      this.enterCounter++
      this.isDragged = true
    },
    onDragLeave () {
      this.enterCounter--
      if (this.enterCounter === 0) {
        this.isDragged = false
      }
    },

    /// //////////////////////////////////////////////////////////////////////////////////////
    // BUTTON EVENTS
    /// //////////////////////////////////////////////////////////////////////////////////////
    onClose (index) {
      this.files.splice(index, 1)
      this.emitInput()
      this.$emit('onClose', { index })
    },
    emitInput () {
      let emitable = null
      emitable = this.files

      if (this.max === 1 && emitable[0]) {
        emitable = emitable[0]
      } else if (this.max === 1) {
        emitable = null
      }
      this.$emit('input', emitable)
    }
  }
}
</script>
