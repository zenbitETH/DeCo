<template>
    <section class="text-white font-lex">
        <div class="relative">
            <nuxt-link to="/" class="absolute left-0 top-0  text-2xl">Back</nuxt-link>
            <h1 class="text-center text-5xl">Create new Business</h1>
        </div>

        <div>
          <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerToPunkCity()">Register to Punk Cities</button>
          <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerPunkCityPlace()">Register Place</button>
        </div>
        
        <div class="flex flex-col mt-8 text-deco-100">
            <h2 class="text-3xl text-left">Business info</h2>
            <div class="flex flex-row gap-3">
                <Input v-model="form.name" type="text" placeholder="What is the name of your business?" class="w-1/2"  />
                <Select v-model="form.type, selected" :items="businessTypes" placeholder="Choose the type of your business" class="w-1/2 " />
            </div>
            <Textarea v-model="form.description" placeholder="Business description" class="mt-3" :rows="3" />
        </div>
        
        <div class="flex flex-col mt-8">
            <h2 class="text-3xl text-left">Services</h2>
            <h3 class="text-lg text-left ">Please list your services in a comma separated list</h3>
            
            <Textarea v-model="form.services" placeholder="Eg.: hair coloring, hari cutting, styling, etc..." class="w-full" :rows="3" />
        </div>



        <client-only>
          <div class="flex flex-col mt-8">
              <h2 class="text-3xl text-left">Location</h2>
              <h3 class="text-lg text-left">Please select the location of your business</h3>

              <Map v-model="form.location" @localityChange="form.city=$event"/>
              <div class="flex flex-row gap-3"> 

              <Input class="w-1/2" v-model="form.city" :disabled="true" />
              <Input class="w-1/2" v-model="form.location" :disabled="true" />
              </div>
          </div>
        </client-only>
        

        <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400"  @click="createBusiness()">Mint Business NFT</button>
        <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400"  @click="createServiceNFT()">Mint Service NFT</button>

    </section>
</template>

<script>
// TODO:[Design] create design for inputs and page
// TODO:[Feature] upload logo to IPFS
// TODO:[Feature] connect to contract to create NFT
// TODO:[Feature] minimalistic input validation
// TODO:[Content] more business types
// TODO:[Content] maybe some more written content and descriptions

import Input from '~/components/inputs/Input.vue'
import Select from '~/components/inputs/Select.vue'
import Textarea from '~/components/inputs/Textarea.vue'
import Map from '~/components/inputs/Map.vue'
import Moralis from 'moralis'

export default {
  components: {
      Input, Select, Textarea, Map
  },
  data() {
    return {
      businessTypes: [
        { key: 'market', value: 'shop', text: 'Market' },
        { key: 'shop', value: 'shop', text: 'Shop' },
        { key: 'other', value: 'other', text: 'Other' }
      ],
      form: {
        name: '',//input
        type: '',//select
        description: '',//textarea
        services: '',
      // services.split(",").map(s => s.trim())
    // ezek fognak kelleni a business NFT creation function argumentként

        //from google calendar
        location: 'test',
        // city: '',
        // address: '',

        logo: '', //file upload
      }
    }
  },
  methods: {

async registerToPunkCity() {
  var ABI = [
{
				inputs: [
					{
						internalType: "string",
						name: "_name",
						type: "string"
					},
					{
						internalType: "string",
						name: "_hometown",
						type: "string"
					},
					{
						internalType: "string",
						name: "_country",
						type: "string"
					}
				],
				name: "registerUser",
				outputs: [],
				stateMutability: "nonpayable",
				type: "function"
			},
  ];
  const options = {
    contractAddress: this.$config.contract_punk_cities,
    functionName: "registerUser",
    abi: ABI,
    params: {_name: "faszfeh", _hometown: "blblab", _country: "kabbe.com"}
  }
  let register = await Moralis.executeFunction(options);
  
},
  async registerPunkCityPlace(){
    var ABI = [
{
				inputs: [
					{
						internalType: "uint256",
						name: "_placeType",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "_questType",
						type: "uint256"
					},
					{
						internalType: "string",
						name: "_ipfsuri",
						type: "string"
					}
				],
				name: "registerPlace",
				outputs: [],
				stateMutability: "nonpayable",
				type: "function"
			}
    ];

    const options = {
      contractAddress: this.$config.contract_punk_cities,
      functionName: "registerPlace",
      abi: ABI,
      params: {_placeType: 5, _questType: 1, _ipfsuri: "punkCities.com"}
    }

    let registerPlace = await Moralis.executeFunction(options);
  },

  async createBusiness(){
    var services = this.form.services.split(",").map(s => s.trim());
    var ABI = [
      {
				inputs: [
					{
						internalType: "string",
						name: "cityName",
						type: "string"
					},
					{
						internalType: "string",
						name: "description",
						type: "string"
					},
					{
						internalType: "string",
						name: "_googleAddress",
						type: "string"
					},
					{
						internalType: "string",
						name: "_logo",
						type: "string"
					},
					{
						internalType: "string[]",
						name: "_services",
						type: "string[]"
					}
				],
				name: "createBusiness",
				outputs: [],
				stateMutability: "nonpayable",
				type: "function"
			},

    ]
    const options = {
      contractAddress: this.$config.contract_business_nft,
      functionName: "createBusiness",
      abi: ABI,
      params: {cityName: this.form.city, description: this.form.name, _googleAddress: this.form.location, _logo: "logo.com", _services: services}
    }

    let createBusiness = await Moralis.executeFunction(options);
  },

  async createServiceNFT() {
    var ABI = [
{
				inputs: [
					{
						internalType: "uint256",
						name: "servicePrice",
						type: "uint256"
					},
					{
						internalType: "string",
						name: "_serviceDescription",
						type: "string"
					}
				],
				name: "makeService",
				outputs: [],
				stateMutability: "nonpayable",
				type: "function"
			},
    ];

  const options = {
    contractAddress: this.$config.contract_service_nft,
    functionName: "makeService",
    abi: ABI,
    params: {servicePrice: 15, _serviceDescription: "Haircut for Man"}
  }

    let createService = await Moralis.executeFunction(options);

  },

  }
}



</script>