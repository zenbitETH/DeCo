<template>
  <div>
    <section id="Step1" class="text-white font-lex">
      <div class="relative">
            <nuxt-link to="/" class="text-2xl">Back</nuxt-link>
            <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerToPunkCity()">Register to Punk Cities</button>
            <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerPunkCityPlace()">Register Place</button>
            <h1 class="text-center text-5xl">Mint place or business NFT</h1>
        </div>
        <h2 class="stepTitle">Step 1: what do you want to mint?</h2>
        <div id="step1" class="step">

          <div class="placeNFT">
            <div class="NFTlogo">
              <img
                src="../../static/punkcities.png"
                class=""
              />
            </div>
            
            <div class="NFTtitle text-solar-100">Punk Cities NFT
              <div class="NFTdes">Mint a public place in your city to get energy or chips</div>
            </div>
            
          </div>

          <div class="decoNFT">
            <div class="NFTlogo px-2">
              <img
                src="../../static/deco logo.svg"
                class=""
              />
            </div>
            <div class="NFTtitle text-deco-100">Deco NFT
              <div class="NFTdes">Mint your own business NFT to get income and defi interactions</div>
            </div>
          </div>
        </div>
    </section>

    <section id="Step2" class="text-white font-lex">
      <div class="stepTitle">Step 2: Product or service?</div>
        <div id="step2" class="step">
          <div class="placeNFT">
            <div class="NFTlogo">
              <img
                src="../../static/decoNFT.png"
                class=""
              />
            </div>
            
            <div class="NFTtitle text-solar-100">I want to sell physical products
              <div class="NFTdes">Mint a public place in your city to get energy or chips</div>
            </div>
            
          </div>

          <div class="decoNFT">
            <div class="NFTlogo px-2">
              <img
                src="../../static/serviceNFT.png"
                class=""
              />
            </div>
            <div class="NFTtitle text-deco-100"> I want to offer a service
              <div class="NFTdes">Mint your own business NFT to get income and defi interactions</div>
            </div>
          </div>
        </div>
    </section>
    
    <section id="Step3-Products" class="text-white font-lex">
      <div class="stepTitle">Step 3: Add info about your products</div>  
      <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48">
          <div class="md:flex md:flex-row gap-3">
              <Select v-model="form.type, selected" :items="productsTypes" placeholder="1. Choose the type of your business" class="md:w-1/2 " />
              <Input v-model="form.name" type="text" placeholder="2. What is the name of your business?" class="md:w-1/2"  />
          </div>
          <Textarea v-model="form.description" placeholder="3. Describe your business" class="mt-3" :rows="3" />
          <Input v-model="form.name" type="text" placeholder="4. Choose tags for your business" class=""  />
      </div>

      <client-only>
        <div class="flex flex-col mt-8 md:px-24 xl:px-4 ">
          <Map v-model="form.location" @localityChange="form.city=$event"/>
          <div class="flex flex-row gap-3"> 
            <Input class="w-1/2" v-model="form.city" :disabled="true" />
            <Input class="w-1/2" v-model="form.location" :disabled="true" />
          </div>
        </div>
      </client-only>
      <div class="text-center">
        <button class="mintButton"  @click="createBusiness()">Mint Products NFT</button>
      </div>
    </section>
    
    <section id="Step3-Services" class="text-white font-lex">
      <div class="stepTitle">Step 3: Add info about your services</div>
      <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48">
          <div class="md:flex md:flex-row gap-3">
              <Select v-model="form.type, selected" :items="servicesTypes" placeholder="1. Choose the type of your business" class="md:w-1/2 " />
              <Input v-model="form.name" type="text" placeholder="2. What is the name of your business?" class="md:w-1/2"  />
          </div>
          <Textarea v-model="form.description" placeholder="3. Describe your business" class="mt-3" :rows="3" />
          <Input v-model="form.name" type="text" placeholder="4. Choose tags for your business" class=""  />
      </div>

      <client-only>
        <div class="flex flex-col mt-8 md:px-24 xl:px-4 ">
          <Map v-model="form.location" @localityChange="form.city=$event"/>
          <div class="flex flex-row gap-3"> 
            <Input class="w-1/2" v-model="form.city" :disabled="true" />
            <Input class="w-1/2" v-model="form.location" :disabled="true" />
          </div>
        </div>
      </client-only>
      <div class="text-center">
        <button class="mintButton"  @click="createServiceNFT()">Mint Services NFT</button>
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