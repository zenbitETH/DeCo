<template>
  <div>
    <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48">
      <button class="text-white mintButton w-24" @click="currentPage === 1 ? $router.push('/') : currentPage--">
        Back
      </button>
    </div>
    <!-- <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerToPunkCity()">
      Register to Punk Cities
    </button>
    <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerPunkCityPlace()">
      Register Place
    </button> -->
    <transition name="slide" mode="out-in" class="relative mt-3">
      <section v-if="currentPage === 1" id="Step1" key="Step1" class="text-white font-lex block">
        <div class="relative">
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
                  src="../../static/punkcities.png"
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
                src="../../static/deco_logo.svg"
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
      </section>

      <section v-else-if="currentPage === 2" id="Step2" key="Step2" class="text-white font-lex">
        <div class="stepTitle">
          Step 2: Product or service?
        </div>
        <div id="step2" class="step">
          <div class="placeNFT" @click.prevent="currentPage = 3; form.kind='products'">
            <div class="NFTlogo">
              <img
                src="../../static/decoNFT.png"
                class=""
              >
            </div>

            <div class="NFTtitle text-solar-100">
              I want to sell physical products
              <div class="NFTdes">
                Mint a public place in your city to get energy or chips
              </div>
            </div>
          </div>

          <div class="decoNFT" @click.prevent="currentPage = 3; form.kind='servcices'">
            <div class="NFTlogo px-2">
              <img
                src="../../static/serviceNFT.png"
                class=""
              >
            </div>
            <div class="NFTtitle text-deco-100">
              I want to offer a service
              <div class="NFTdes">
                Mint your own business NFT to get income and defi interactions
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-else-if="currentPage === 3" id="Step3-Products" key="Step3" class="text-white font-lex">
        <div class="stepTitle">
          Step 3: Present your Deco {{ form.kind === 'products' ? 'business' : 'service' }}
        </div>
        <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48">
          <div class="md:grid md:grid-cols-2 gap-3">
            <Select v-model="form.type" :items="form.kind === 'products' ? productsTypes : servicesTypes" placeholder="1. Choose the type of your business" />
            <Input v-model="form.name" type="text" placeholder="2. What is the name of your business?" />
            <div class="md:w-full mx-5 mb-3 text-deco-400">
              3. Upload your business logo
              <Input v-model="logoUrl" type="text" placeholder="Logo URL will be shown here" :disabled="true" class="w-full" />
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

        <div class="text-center mt-8">
          <button class="mintButton w-48" @click="currentPage = 4">
            Next
          </button>
        </div>
      </section>
      <section v-else-if="currentPage === 4" id="Step4-Products" key="Step4" class="text-white font-lex">
        <div class="stepTitle mt-3">
          Step 4: Add details to your Deco NFT
        </div>

        <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48">
          <Textarea v-model="form.description" placeholder="4. Describe your business" class="mt-8" :rows="3" />
          <Input v-model="form.tags" type="text" placeholder="5. Choose tags for your business" class="w-full" />

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
        </div>

        <div class="text-center">
          <button class="mintButton w-48" @click="createBusiness()">
            {{ form.kind === 'products' ? 'Mint Products NFT' : 'Mint Services NFT' }}
          </button>
        </div>
      </section>
    </transition>
  </div>
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
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
import Input from '~/components/inputs/Input.vue'
import Select from '~/components/inputs/Select.vue'
import Textarea from '~/components/inputs/Textarea.vue'
import Upload from '~/components/inputs/Upload.vue'
import Map from '~/components/inputs/Map.vue'
// const IPFS = require('ipfs')

export default {
  components: {
    Input, Select, Textarea, Map, Upload
  },
  data () {
    return {
      productsTypes: [
        { key: 'clothes', value: 'products-1', text: 'Clothes' },
        { key: 'home-products', value: 'products-2', text: 'Home Products' },
        { key: 'food', value: 'products-3', text: 'Food / Restaurant' },
        { key: 'punk-products', value: 'products-4', text: 'Home Products' },
        { key: 'general-store', value: 'products-5', text: 'General store' }
      ],
      servicesTypes: [
        { key: 'sports', value: 'services-1', text: 'Sports clasess' },
        { key: 'art-fun', value: 'services-2', text: 'Art/fun clasess' },
        { key: 'beauty', value: 'services-3', text: 'Beauty/Barber shop' },
        { key: 'professional', value: 'services-4', text: 'Profesional services' },
        { key: 'logistic', value: 'services-5', text: 'Logistic service' }
      ],

      currentPage: 1,

      file: null, // file upload
      logoUrl: '', // logo url after nft-storage

      form: {
        // from form data
        name: '', // name of the business
        kind: '', // kind of the business (product or service business)
        type: '', // type of the business
        description: '', // description of the business
        tags: '',

        // from nft-storage trough file upload
        logoMetadata: {}, // logo metadata

        // from google calendar
        location: '', // location of the business
        city: '' // city of the business
      }
    }
  },
  methods: {
    async uploadFile ({ file }) {
      // PURE IPFS IMPLEMENTATION
      // console.log(IPFS)
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
      this.form.logoMetadata = result
      this.logo = result.url
      // console.log(result)
    },
    async registerToPunkCity () {
      const ABI = [
        {
          inputs: [
            {
              internalType: 'string',
              name: '_name',
              type: 'string'
            },
            {
              internalType: 'string',
              name: '_hometown',
              type: 'string'
            },
            {
              internalType: 'string',
              name: '_country',
              type: 'string'
            }
          ],
          name: 'registerUser',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]
      const options = {
        contractAddress: this.$config.contractPunkCities,
        functionName: 'registerUser',
        abi: ABI,
        params: { _name: 'faszfeh', _hometown: 'blblab', _country: 'kabbe.com' }
      }
      await Moralis.executeFunction(options)
    },
    async registerPunkCityPlace () {
      const ABI = [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_placeType',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: '_questType',
              type: 'uint256'
            },
            {
              internalType: 'string',
              name: '_ipfsuri',
              type: 'string'
            }
          ],
          name: 'registerPlace',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]

      const options = {
        contractAddress: this.$config.contractPunkCities,
        functionName: 'registerPlace',
        abi: ABI,
        params: { _placeType: 5, _questType: 1, _ipfsuri: 'punkCities.com' }
      }

      await Moralis.executeFunction(options)
    },

    async createBusiness () {
      const services = this.form.services.split(',').map(s => s.trim())
      const ABI = [
        {
          inputs: [
            {
              internalType: 'string',
              name: 'cityName',
              type: 'string'
            },
            {
              internalType: 'string',
              name: 'description',
              type: 'string'
            },
            {
              internalType: 'string',
              name: '_googleAddress',
              type: 'string'
            },
            {
              internalType: 'string',
              name: '_logo',
              type: 'string'
            },
            {
              internalType: 'string[]',
              name: '_services',
              type: 'string[]'
            }
          ],
          name: 'createBusiness',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }

      ]
      const options = {
        contractAddress: this.$config.contractBusinessNft,
        functionName: 'createBusiness',
        abi: ABI,
        params: { cityName: this.form.city, description: this.form.name, _googleAddress: this.form.location, _logo: 'logo.com', _services: services }
      }

      await Moralis.executeFunction(options)
    },

    async createServiceNFT () {
      const ABI = [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'servicePrice',
              type: 'uint256'
            },
            {
              internalType: 'string',
              name: '_serviceDescription',
              type: 'string'
            }
          ],
          name: 'makeService',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]

      const options = {
        contractAddress: this.$config.contract_service_nft,
        functionName: 'makeService',
        abi: ABI,
        params: { servicePrice: 15, _serviceDescription: 'Haircut for Man' }
      }

      await Moralis.executeFunction(options)
    }

  }
}

</script>
