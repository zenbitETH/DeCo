<template>
    <section>
        <div class="relative">
            <nuxt-link to="/" class="absolute left-0 top-0  text-2xl">Back</nuxt-link>
            <h1 class="text-center text-5xl">Create new Business</h1>
        </div>

        <div>
          <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="registerToPunkCity()">Register to Punk Cities</button>
          <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" >Register Place</button>
        </div>
        
        <div class="flex flex-col mt-8">
            <h2 class="text-3xl text-left">Business info</h2>
            <div class="flex flex-row gap-3">
                <Input v-model="form.name" placeholder="Business name" class="w-1/2" />
                <Select v-model="form.type" :items="businessTypes" placeholder="Business type" class="w-1/2" />
            </div>
            <Textarea v-model="form.description" placeholder="Business description" class="mt-3" :rows="3" />
        </div>
        
        <div class="flex flex-col mt-8">
            <h2 class="text-3xl text-left">Services</h2>
            <h3 class="text-lg text-left">Please list your services in a comma separated list</h3>
            
            <Textarea v-model="form.services" placeholder="Eg.: hair coloring, hari cutting, styling, etc..." class="w-full" :rows="3" />
        </div>



        <client-only>
          <div class="flex flex-col mt-8">
              <h2 class="text-3xl text-left">Location</h2>
              <h3 class="text-lg text-left">Please select the location of your business</h3>

              <Map v-model="form.location" />
              <Input v-model="form.location" :disabled="true" />
          </div>
        </client-only>
        

        <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400">Mint Business NFT</button>
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
  
}
  }
}



</script>