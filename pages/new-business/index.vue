<template>
  <OverlayLoader :loading="loading">
    <div>
      <button class="absolute bottom-32 xl:bottom-1/2 left-0 text-white hud0 z-30" @click="currentPage === 1 ? $router.push('/') : currentPage--">
        <div class="bigIcon">
          ⏪
        </div>Back
      </button>

      <!-- <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerToPunkCity()">
      Register to Punk Cities
    </button>
    <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerPunkCityPlace()">
      Register Place
    </button> -->
      <transition name="slide" mode="out-in" class="relative mt-3">
        <section v-if="currentPage === 1" id="Step1" key="Step1" class="text-white font-lex block xl:text-2xl">
          <div class="relative">
            <div id="step2" class="step">
              <div class="placeNFT" @click.prevent="currentPage = 2; form.kind='businesses'">
                <div class="NFTlogo">
                  <img
                    src="/decoNFT.png"
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
                    src="/product.png"
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
            <!--  <h1 class="text-center text-5xl">
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
          </div>-->
          </div>
        </section>

        <section v-else-if="currentPage === 2" id="Step2" key="Step2" class="text-white font-lex xl:text-2xl">
          <div class="stepTitle">
            Step 1: Set up your Deco business {{ form.kind === 'businesses' ? 'business' : 'service' }}
          </div>
          <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48">
            <div v-if="form.kind === 'businesses'" class="md:grid md:grid-cols-2 gap-3">
              <Select v-model="form.type" :items="businessTypes" placeholder="1. Choose the type of your business" />
              <Input v-model="form.name" type="text" placeholder="2. What is the name of your business?" />
            <!-- There is no backing for the uploaded logo in the businessNFT smartcontract, so we cannot upload the image -->
            <!-- <div class="md:w-full mx-5 mb-3 text-deco-400">
              3. Upload a logo for your business
              <Input v-model="form.imageUrl" type="text" placeholder="" :disabled="true" class="w-full" />
            </div>
            <Upload
              v-model="file"
              :max="1"
              :return-raw="true"
              class="mt-3 col-span-2"
              :has-preview="true"
              :upload="uploadFile"
            /> -->
            </div>

            <div v-else class="md:grid md:grid-cols-2 gap-3">
              <!-- There is no name filed in the serviceNFT smartcontract, we shall omit this one -->
              <!-- <Input v-model="form.name" type="text" placeholder="1. What is the name of your business?" class="mt-8 col-span-2" /> -->
              <Textarea v-model="form.description" placeholder="1. Describe your service" class="mt-8 col-span-2" :rows="3" />
              <Input v-model="form.price" type="number" placeholder="2. Choose a price for your NFT in MATIC" class="col-span-2" />
              <div class="md:w-full mx-5 mb-3 text-deco-400">
                3. Upload an image for your product or service
                <Input v-model="form.imageUrl" type="text" placeholder="" :disabled="true" class="w-full" />
              </div>
              <Upload
                v-model="file"
                :max="1"
                :return-raw="true"
                class="mt-3"
                :has-preview="true"
                :upload="uploadFile"
              />
            </div>
          </div>

          <div v-if="form.kind ==='businesses'" class="text-center mt-8">
            <button class="mintButton w-48" @click="currentPage = 3">
              Next
            </button>
          </div>

          <div v-else class="text-center mt-8">
            <button class="mintButton w-48" @click="mintNFT()">
              Mint Service NFT
            </button>
          </div>
        </section>

        <section v-else-if="currentPage === 3" id="Step3-Products" key="Step3" class="text-white font-lex xl:text-2xl">
          <div class="stepTitle mt-3">
            Step 2: Add details to your Deco NFT
          </div>

          <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48">
            <Textarea v-model="form.description" placeholder="4. Describe your business" class="mt-8" :rows="3" />
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

import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
import OverlayLoader from '~/components/OverlayLoader.vue'
import Input from '~/components/inputs/Input.vue'
import Select from '~/components/inputs/Select.vue'
import Textarea from '~/components/inputs/Textarea.vue'
import Upload from '~/components/inputs/Upload.vue'
import Map from '~/components/inputs/Map.vue'

import createBusiness from '~/contracts/business-nft/createBusiness'
import makeService from '~/contracts/service-nft/makeService'
// const IPFS = require('ipfs')

export default {
  components: {
    Input, Select, Textarea, Map, Upload, OverlayLoader
  },
  data () {
    return {
      loading: false,
      // TODO replace with business types
      currentPage: 1,

      file: null, // file upload

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
        city: '' // city of the business -> city //string
      }
    }
  },
  computed: {
    businessTypes () {
      return this.$store.state.businessTypes
    },
    serviceTypes () {
      return this.$store.state.serviceTypes
    }
  },
  methods: {
    async uploadFile ({ file }) {
      this.loading = true
      // PURE IPFS IMPLEMENTATION
      console.log(file)
      // try {
      //   // TODO:[FIXME] we need to control the repo instead of generating a random math number
      //   const ipfs2 = await IPFS.create({ repo: 'deco-' + Math.random() })
      //   // console.log(ipfs2)
      //   const result = await ipfs2.add({
      //     content: file
      //   })
      //   // ipfs2.
      //   // console.log(result)
      //   this.form.logo = `https://ipfs.io/ipfs/${result.path}`
      // } catch (e) {
      //   console.log(e)
      // }

      // NFT.STORAGE IMPLEMENTATION
      // create a new NFTStorage client using our API key
      const nftstorage = new NFTStorage({ token: this.$config.nftStorageApiKey })

      // call client.store, passing in the image & metadata
      const result = await nftstorage.store({
        image: file,
        name: file.name,
        description: this.form.description
      })
      // this.form.logoMetadata = Object.assign({}, result)
      // this.form.logoMetadata.data = result.data
      this.form.imageUrl = result.url
      console.log(result)

      // const blobResult = await nftstorage.storeBlob(file)
      // console.log(blobResult)
      // const ipfsUrl = `ipfs://${blobResult}`
      // this.form.imageUrl = ipfsUrl
      // const json = {
      //   image: file,
      //   name: file.name,
      //   description: this.form.description,
      //   properties: {
      //     origins: {
      //       http: `https://ipfs.io/ipfs/${blobResult}`,
      //       ipfs: ipfsUrl
      //     }
      //   }
      // }
      // const result = await nftstorage.store(json)
      // this.form.imageUrl = result.url
      // console.log(result)
      this.loading = false
    },
    mintNFT () {
      // TODO mint business or service NFT based on kind
      this.loading = true
      if (this.form.kind === 'businesses') {
        createBusiness(this.$config.contractBusinessNft, this.form).then(() => {
          this.loading = false
          this.$router.push('/')
        }).catch((e) => {
          console.error(e)
          this.loading = false
        })
      } else {
        makeService(this.$config.contractServiceNft, this.form).then(() => {
          this.loading = false
          this.$router.push('/')
        }).catch((e) => {
          console.error(e)
          this.loading = false
        })
      }
    }
    // async registerToPunkCity () {
    //   const ABI = [
    //     {
    //       inputs: [
    //         {
    //           internalType: 'string',
    //           name: '_name',
    //           type: 'string'
    //         },
    //         {
    //           internalType: 'string',
    //           name: '_hometown',
    //           type: 'string'
    //         },
    //         {
    //           internalType: 'string',
    //           name: '_country',
    //           type: 'string'
    //         }
    //       ],
    //       name: 'registerUser',
    //       outputs: [],
    //       stateMutability: 'nonpayable',
    //       type: 'function'
    //     }
    //   ]
    //   const options = {
    //     contractAddress: this.$config.contractPunkCities,
    //     functionName: 'registerUser',
    //     abi: ABI,
    //     params: { _name: 'faszfeh', _hometown: 'blblab', _country: 'kabbe.com' }
    //   }
    //   await Moralis.executeFunction(options)
    // },
    // async registerPunkCityPlace () {
    //   const ABI = [
    //     {
    //       inputs: [
    //         {
    //           internalType: 'uint256',
    //           name: '_placeType',
    //           type: 'uint256'
    //         },
    //         {
    //           internalType: 'uint256',
    //           name: '_questType',
    //           type: 'uint256'
    //         },
    //         {
    //           internalType: 'string',
    //           name: '_ipfsuri',
    //           type: 'string'
    //         }
    //       ],
    //       name: 'registerPlace',
    //       outputs: [],
    //       stateMutability: 'nonpayable',
    //       type: 'function'
    //     }
    //   ]

    //   const options = {
    //     contractAddress: this.$config.contractPunkCities,
    //     functionName: 'registerPlace',
    //     abi: ABI,
    //     params: { _placeType: 5, _questType: 1, _ipfsuri: 'punkCities.com' }
    //   }

    //   await Moralis.executeFunction(options)
    // },
  }
}

</script>
