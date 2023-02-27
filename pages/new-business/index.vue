<template>
  <OverlayLoader :loading="loading">
    <div>
      <!-- <button class="absolute bottom-32 xl:bottom-1/2 -left-42 text-white hud0 z-30" @click="currentPage === 1 ? $router.push('/') : currentPage--">
        <div class="bigIcon">
          ⏪
        </div>Back
      </button>
       <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerToPunkCity()">
      Register to Punk Cities
    </button>
    <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerPunkCityPlace()">
      Register Place
    </button> -->
      <transition name="slide" mode="out-in" class="relative mt-3">
        <!--<section v-if="currentPage === 1" id="Step1" key="Step1" class="text-white font-lex block xl:text-2xl">
          <div class="relative">
            <div id="step2" class="step">
              <div class="placeNFT" @click.prevent="currentPage = 2; form.kind='businesses'">
                <div class="NFTlogo">
                  <img
                    src="../../static/3dAssets/products-4.png"
                    class=""
                  >
                </div>
                <div class="NFTtitle text-solar-100">
                  Step 1: Create your Deco Business
                  <div class="NFTdes">
                    Mint your own service NFT to get income and defi interactions
                  </div>
                </div>
              </div>

              <div class="decoNFT" @click.prevent="currentPage = 2; form.kind='service'">
                <div class="NFTlogo px-2">
                  <img
                    src="/proser.png"
                    class=""
                  >
                </div>
                <div class="NFTtitle text-deco-100">
                  Step 2: Set up your Deco business
                  <div class="NFTdes">
                    Add products or services to your business
                  </div>
                </div>
              </div>
            </div>
          <h1 class="text-center text-5xl">
            Mint place or business NFT
          </h1>
        </div>
        <h2 class="stepTitle">
          Step 1: what do you want to mint?
        </h2>
        <div id="step1" class="step">
          <a href="#" target="_blank">
            <div class="placeNFT">
              <div class="NFTlogo">
                <img
                  src="/punkcities.png"
                  class=""
                >
              </div>
              <div class="NFTtitle text-solar-100">
                Punk Cities NFT
                <div class="NFTdes">
                  Mint a public place in your city to get energy or chips
                </div>
              </div>
            </div>
          </a>
          <div class="decoNFT" @click.prevent="currentPage = 2">
            <div class="NFTlogo px-2">
              <img
                src="/deco_logo.svg"
                class=""
              >
            </div>
            <div class="NFTtitle text-deco-100">
              Deco NFT
              <div class="NFTdes">
                Mint your own business NFT to get income and defi interactions
              </div>
            </div>
          </div>
          </div>
        </section>-->

        <section v-if="currentPage === 1" id="Step2" key="Step2" class="text-white font-lex xl:text-2xl">
          <div class="stepTitle">
            Step 1: Set up your new store {{ form.kind === 'businesses' ? 'business' : 'service' }}
          </div>
          <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48 mx-auto">
            <div class="gap-6">
              <Select v-model="form.type" :items="businessTypes" placeholder="1. Choose the type of your business" />
              <Input v-model="form.name" type="text" placeholder="2. What is the name of your business?" :max-length="nameLength" />
              <div class="md:w-full mx-5 mb-3 text-white">
                3. Upload a logo for your business
              </div>
              <Upload
                v-model="file"
                :max="1"
                :return-raw="true"
                class="mt-3 col-span-2 "
                :has-preview="true"
                :upload="upload"
              />
            </div>
          </div>

          <div class="text-center mt-8">
            <button class="mintButton w-48" @click="currentPage = 2">
              Next
            </button>
          </div>
        </section>

        <section v-else-if="currentPage === 2" id="Step3-Products" key="Step3" class="text-white font-lex xl:text-2xl">
          <div class="stepTitle mt-3">
            Step 2: Add details to your Deco NFT
          </div>

          <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48">
            <Textarea v-model="form.description" placeholder="4. Describe your business" class="mt-8" :rows="3" :max-length="dLength" />
            <!-- <Input v-model="form.tags" type="text" placeholder="5. Choose tags for your business" class="w-full" /> -->
            <!-- <Input v-if="form.kind === 'services'" v-model="form.price" type="text" placeholder="6. Choose a price for your NFT" class="w-full" /> -->

            <client-only>
              <div class="flex flex-col mt-16">
                <Map v-model="form.location" @localityChange="form.city=$event" />
                <div class="grid grid-cols-2 gap-5">
                  <div class="verify">
                    Verify your city
                    <Input v-model="form.city" class="w-full" :disabled="true" />
                  </div>
                  <div class="verify">
                    Verify your address
                    <Input v-model="form.location" class="w-full" :disabled="true" />
                  </div>
                </div>
              </div>
            </client-only>
            <div class="text-center">
              <button class="mintButton" @click="mintNFT()">
                Mint Business NFT
              </button>
            </div>
          </div>
        </section>
      </transition>
    </div>
    <MintModal v-show="showModal" @goHome="$router.push('/')" />
  </OverlayLoader>
</template>

<script>
// TODO:[Design] create design for inputs and page
// TODO:[Feature] upload logo to IPFS
// TODO:[Feature] connect to contract to create NFT
// TODO:[Feature] minimalistic input validation
// TODO:[Content] more business types
// TODO:[Content] maybe some more written content and descriptions
// Import the NFTStorage class and File constructor from the 'nft.storage' package
// The 'mime' npm package helps us set the correct file type on our File objects
// import mime from 'mime'
import Moralis from 'moralis'
import OverlayLoader from '~/components/OverlayLoader.vue'
import Input from '~/components/inputs/Input.vue'
import Select from '~/components/inputs/Select.vue'
import Textarea from '~/components/inputs/Textarea.vue'
import Upload from '~/components/inputs/Upload.vue'
import Map from '~/components/inputs/Map.vue'
import MintModal from '~/components/MintModal.vue'
import createBusiness from '~/contracts/business-nft/createBusiness'
import CommonsFunctions from '~/mixins/CommonFunctions'
// import checkApproval from '~/contracts/business-nft/checkApproval'
// import approveBusinessContract from '~/contracts/business-nft/approveBusinessContract'
// const IPFS = require('ipfs')
export default {
  components: {
    Input, Select, Textarea, Map, Upload, OverlayLoader, MintModal
  },
  mixins: [CommonsFunctions],
  data () {
    return {
      isApproved: false,
      loading: false,
      nameLength: 15,
      dLength: 140,
      // TODO replace with business types
      currentPage: 1,
      file: null, // file upload
      showModal: false,
      form: {
        // COMMON FIELDS
        // form data -> smart contract data
        kind: '', // kind of NFT business or service
        name: '', // name of the NFT -> shortName //string
        type: '', // type of the NFT -> type //string
        description: '', // description of the NFT -> description //string
        tags: '',
        // from nft-storage trough file upload
        imageUrl: '', // logo url -> tokenUri //string
        // SERVICES
        price: '',
        // BUSINESSES location from google calendar
        location: '', // location of the business -> googleAddress //string
        city: '', // city of the business -> city //string
        URI: '', // Image of the 3d assets, this is going to be the main NFT picture of OpenSea
        logoPicture: ''
      }
    }
  },

  computed: {
    businessTypes () {
      return this.$store.state.businessTypes
    },
    serviceTypes () {
      return this.$store.state.serviceTypes
    },
    getImageUrl () {
      return this.$store.state.businessTypes.find(businessTpye => businessTpye.value === this.form.type).imageUrl
    },
    getBusinessType () {
      return this.$store.state.businessTypes.find(businessType => businessType.value === this.form.type).text
    },
    connectedAddress () {
      return this.$store.state.connectedAddress
    }
  },
  beforeMount () {
    // this.checkApprove()
  },

  methods: {
    async upload ({ file }) {
      this.loading = true
      // const logoPicture = ''
      console.log(file.name)
      const data = file
      const imageFile = new Moralis.File(data.name, data)
      await imageFile.saveIPFS()
      console.log(imageFile.ipfs(), imageFile.hash())
      this.form.logoPicture = imageFile.ipfs()
      console.log('ipfs file is: ', this.form.logoPicture)
      // this.form.logoPicture = ipfsUri
      this.loading = false
    },
    async mintNFT () {
      this.loading = true
      this.form.kind = 'businesses'
      const metadata = {
        name: this.getBusinessType,
        image: this.getImageUrl, // here there is no () as normally with functions, because getImageUrl() is used in methods!!!
        description: this.form.description,
        uploadedImage: this.form.logoPicture
      }
      const metadataFile = new Moralis.File('metadata.json', {
        base64: btoa(JSON.stringify(metadata))
      })
      await metadataFile.saveIPFS()
      const metadataURI = metadataFile.ipfs()
      this.form.URI = metadataURI
      console.log(metadataURI)
      createBusiness(this.$config.contractBusinessNft, this.form).then(async (txHash) => {
        await txHash.wait()
        // await this.listAllofMyBusinessNFTs()
        this.showModal = true
        this.loading = false
      }).catch((e) => {
        console.error(e)
        this.loading = false
      })
      // }
      // else {
      //   makeService(this.$config.contractServiceNft, this.form).then(() => {
      //     this.loading = false
      //     this.$router.push('/')
      //   }).catch((e) => {
      //     console.error(e)
      //     this.loading = false
      //   })
      // }
    }
    // async checkApprove () {
    //   this.isApproved = await checkApproval(this.$config.contractBusinessNft, this.connectedAddress)
    //   // console.log('contract Approved is: ', this.isApproved);
    //   console.log(' isApproved? : ', this.isApproved)
    // },
    // async getApproval () {
    //   this.loading = true
    //   const res = await approveBusinessContract(this.$config.contractDai, this.$config.contractBusinessNft).then(async (result) => {
    //     await result.wait()
    //     // await location.reload()
    //     this.loading = false
    //     console.log(res)
    //     this.isApproved = true
    //   })
    // }
  }
}
</script>
