<template>
  <div>
    <section id="Step1" class="text-white font-lex">
      <div class="relative">
        <nuxt-link to="/" class="text-2xl">
          Back
        </nuxt-link>
        <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerToPunkCity()">
          Register to Punk Cities
        </button>
        <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerPunkCityPlace()">
          Register Place
        </button>
        <h1 class="text-center text-5xl">
          Mint place or business NFT
        </h1>
      </div>
      <h2 class="stepTitle">
        Step 1: what do you want to mint?
      </h2>
      <div id="step1" class="step">
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

        <div class="decoNFT">
          <div class="NFTlogo px-2">
            <img
              src="../../static/deco logo.svg"
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

    <section id="Step2" class="text-white font-lex">
      <div class="stepTitle">
        Step 2: Product or service?
      </div>
      <div id="step2" class="step">
        <div class="placeNFT">
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

        <div class="decoNFT">
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

    <section id="Step3-Products" class="text-white font-lex">
      <div class="stepTitle">
        Step 3: Present your deco business
      </div>
      <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48">
        <div class="md:grid md:grid-cols-2 gap-3">
          <Select v-model="businessForm.type" :items="productsTypes" placeholder="1. Choose the type of your business" />
          <Input v-model="businessForm.name" type="text" placeholder="2. What is the name of your business?" />
          <div class="md:w-full mx-5 mb-3 text-deco-400">
            3. Upload your business logo
            <Input v-model="businessForm.logo" type="text" placeholder="Logo URL will be shown here" :disabled="true" class="w-full" />
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
        <div class="stepTitle mt-3">
          Step 4: Add details to your Deco NFT
        </div>
        <Textarea v-model="businessForm.description" placeholder="4. Describe your business" class="mt-8" :rows="3" />
        <Input v-model="businessForm.name" type="text" placeholder="5. Choose tags for your business" class="" />
      </div>

      <client-only>
        <div class="flex flex-col mt-16 md:px-24 xl:px-4 ">
          <Map v-model="businessForm.location" @localityChange="businessForm.city=$event" />
          <div class="grid grid-cols-2 gap-5">
            <div class="verify">
              Verify your city
              <Input v-model="businessForm.city" class="w-full" :disabled="true" />
            </div>
            <div class="verify">
              Verify your address
              <Input v-model="businessForm.location" class="w-full" :disabled="true" />
            </div>
          </div>
        </div>
      </client-only>

      <div class="text-center">
        <button class="mintButton" @click="createBusiness()">
          Mint Products NFT
        </button>
      </div>
    </section>

    <section id="Step3-Products" class="text-white font-lex">
      <div class="stepTitle">
        Step 3: Present your deco service
      </div>
      <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48">
        <div class="md:grid md:grid-cols-2 gap-3">
          <Select v-model="businessForm.type" :items="productsTypes" placeholder="1. Choose the type of your business" />
          <Input v-model="businessForm.name" type="text" placeholder="2. What is the name of your business?" />
          <div class="md:w-1/2 mx-5 mb-3 text-deco-400">
            3. Upload your business logo
          </div>
          <Upload v-model="file" :max="1" :return-raw="true" class="mt-3" :has-preview="true" />
        </div>
        <div class="stepTitle">
          Step 4: Add details to your Deco NFT
        </div>
        <Textarea v-model="businessForm.description" placeholder="4. Describe your business" class="mt-8" :rows="3" />
        <Input v-model="businessForm.name" type="text" placeholder="5. Choose tags for your business" class="" />
      </div>

      <client-only>
        <div class="flex flex-col mt-16 md:px-24 xl:px-4 ">
          <Map v-model="businessForm.location" @localityChange="businessForm.city=$event" />
          <div class="grid grid-cols-2 gap-5">
            <div class="verify">
              Verify your city
              <Input v-model="businessForm.city" class="w-1/2" :disabled="true" />
            </div>
            <div class="verify">
              Verify your address
              <Input v-model="businessForm.location" class="w-1/2" :disabled="true" />
            </div>
          </div>
        </div>
      </client-only>
      <div class="text-center">
        <button class="mintButton" @click="createBusiness()">
          Mint Services NFT
        </button>
      </div>
    </section>
  </div>
</template>

<script>
// TODO:[Design] create design for inputs and page
// TODO:[Feature] upload logo to IPFS
// TODO:[Feature] connect to contract to create NFT
// TODO:[Feature] minimalistic input validation
// TODO:[Content] more business types
// TODO:[Content] maybe some more written content and descriptions

import Moralis from 'moralis'
import Input from '~/components/inputs/Input.vue'
import Select from '~/components/inputs/Select.vue'
import Textarea from '~/components/inputs/Textarea.vue'
import Upload from '~/components/inputs/Upload.vue'
import Map from '~/components/inputs/Map.vue'
const IPFS = require('ipfs')

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
      file: null,
      businessForm: {
        name: '', // input
        type: '', // select
        description: '', // textarea
        services: '',
        // services.split(",").map(s => s.trim())
        // ezek fognak kelleni a business NFT creation function argumentként

        // from google calendar
        location: '',
        // city: '',
        // address: '',

        logo: '' // file upload
      }
    }
  },
  methods: {
    async uploadFile ({ file }) {
      // console.log(IPFS)
      try {
        const ipfs2 = await IPFS.create({ repo: 'deco-' + Math.random() })
        // console.log(ipfs2)
        const result = await ipfs2.add({
          content: file
        })
        // ipfs2.
        // console.log(result)
        this.businessForm.logo = `https://ipfs.io/ipfs/${result.path}`
      } catch (e) {
        console.log(e)
      }
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
      const services = this.businessForm.services.split(',').map(s => s.trim())
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
        params: { cityName: this.businessForm.city, description: this.businessForm.name, _googleAddress: this.businessForm.location, _logo: 'logo.com', _services: services }
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
