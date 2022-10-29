<template>
  <OverlayLoader :loading="loading">
    <transition name="slide" mode="out-in" class="relative mt-3">
      <section v-if="currentPage === 1" key="tokenId" class="text-white">
        <div class="MainScreen">
          <div class="dBoard">
            <div class="assetBoard">
              <div
                class="
                bg-gradient-to-tl
                p-3 py-16 xl:py-3
                from-glass-400
                to-glass-100
                rounded-tf
                grid grid-cols-6
                text-left
                items-center
                row-span-6
                relative
              "
              >
                <div class="text-lg absolute top-5 right-5">
                  📍{{ business ? `${business.city} ` : "Loading..." }}
                </div>
                <div class="relative text-center col-span-2 pb-11/12">
                  <img
                    class="
                    absolute
                    w-auto
                    h-full
                    left-1/2
                    transform
                    -translate-x-1/2
                  "
                    :src="logo"
                  >
                </div>
                <div class="col-span-4 pl-5 grid gap-2">
                  <div class="xl:text-5xl text-2xl">
                    {{ business ? business.shortname : "Loading..." }}
                  </div>
                  <div class="col-span-6 text-lg text-left rounded-tf">
                    {{ business ? business.description : "Loading..." }}
                  </div>
                </div>
                <div
                  class="
                  absolute
                  bottom-5
                  right-5
                  text-center
                  grid grid-cols-2
                  gap-3
                "
                >
                  <div class="myVaultBT">
                    <span>0</span>👍
                  </div>
                  <div class="myVaultBT">
                    <span>0</span>👎
                  </div>
                </div>
              </div>
              <!--  <div class="grid fhd:col-span-2 col-span-4 gap-3 row-span-2">
             <div class="p-3">
                Tags
              </div>
            </div>
             <div class="p-3">
              {{ business ? `${business.googleAddress}` : 'Loading...' }}
            </div>
            -->

              <div
                v-if="business"
                class="md:row-span-6 rounded-xl grid grid-cols-3 gap-5"
              >
                <div
                  class="
                  bg-gradient-to-tl
                  p-3
                  from-glass-400
                  to-glass-100
                  rounded-tf
                  relative
                "
                >
                  <div class="p-3">
                    <img
                      class="h-fit"
                      :src="'/3dAssets/' + business.businessType + '.png'"
                    >
                  </div>
                  <div
                    class="
                    text-xl
                    absolute
                    bottom-5
                    text-center
                    left-0
                    right-0
                    font-bold
                  "
                  >
                    {{
                      business
                        ? businessTypes.find(
                          (t) => t.value === business.businessType
                        ).text
                        : "Type of place"
                    }}
                  </div>
                </div>
                <div
                  class="
                  bg-gradient-to-tl
                  p-3
                  from-glass-400
                  to-glass-100
                  rounded-tf
                  h-fit
                  py-5
                  backdrop-blur-md
                  grid
                  items-center
                "
                >
                  <div class="text-6xl">
                    20
                  </div>
                  <div>Products Sold</div>
                </div>
                <div
                  class="
                  bg-gradient-to-tl
                  p-3
                  from-glass-400
                  to-glass-100
                  rounded-tf
                  h-fit
                  py-5
                  backdrop-blur-md
                  grid
                  items-center
                "
                >
                  <div class="text-6xl">
                    $1.2k
                  </div>
                  <div>Total Income</div>
                </div>
              </div>
            </div>

            <div class="inventory relative">
              <ul id="tabs-tabFill" class="nav nav-tabs flex flex-row flex-wrap list-none border-b-0 pl-0 mb-4 absolute w-full " role="tablist">
                <li class="nav-item flex-auto text-center" role="presentation">
                  <a
                    id="tabs-home-tabFill"
                    href="#tabs-onsaleFill"
                    class="tabFill active focus:text-cyber-100"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-onsaleFill"
                    role="tab"
                    aria-controls="tabs-onsaleFill"
                    aria-selected="true"
                  >
                    On Sale
                  </a>
                </li>
                <li class="nav-item flex-auto text-center" role="presentation">
                  <a
                    id="tabs-profile-tabFill"
                    href="#tabs-soldFill"
                    class="tabFill focus:text-solar-100"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-soldFill"
                    role="tab"
                    aria-controls="tabs-soldFill"
                    aria-selected="false"
                  >Sold</a>
                </li>
              </ul>

              <div id="tabs-tabContentFill" class="tab-content">
                <div id="tabs-onsaleFill" class="tab-pane fade bg-glass-100 rounded-tf py-10 pt-16 show active h-full overflow-y-hidden" role="tabpanel" aria-labelledby="tabs-home-tabFill">
                  <div class="grid lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-8 grid-cols-2 grid-flow-dense px-10 gap-3">
                    <div
                      class="PlaceBG hover:bg-glass-800"
                      @click="currentPage = 2"
                    >
                      <div class="bigIcon">
                        +
                      </div>
                      Add a product or service
                    </div>
                    <div v-for="service in myServices" :key="service.tokenId" class="PlaceBG hover:bg-glass-800 relative">
                      <div class="absolute top-3 right-3">
                        {{ service.price / Math.pow(10,18) }} MATIC
                      </div>
                      <div class="">
                        <img
                          class="xl:h-32 qhd:h-43 h-32 mx-auto"
                          src="product.png"
                        >
                      </div>
                      <div
                        class="
                      bg-glass-800
                      rounded-b-tf
                      grid
                      text-center text-base
                      py-2
                      relative
                    "
                      >
                        <div>
                          {{ service.serviceDescription }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="tabs-soldFill" class="tab-pane fade bg-glass-100 rounded-tf py-10 pt-16 h-full overflow-y-hidden" role="tabpanel" aria-labelledby="tabs-profile-tabFill">
                  <div class="grid lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-8 grid-cols-2 grid-flow-dense px-10 gap-3">
                    <div v-for="service in myServices" :key="service.tokenId" class="PlaceBG bg-glass-500 relative cursor-none">
                      <div class="absolute top-3 right-3">
                        {{ service.price / Math.pow(10,18) }} MATIC
                      </div>
                      <div class="">
                        <img
                          class="xl:h-32 qhd:h-43 h-32 mx-auto"
                          src="product.png"
                        >
                      </div>
                      <div
                        class="
                      bg-glass-500
                      rounded-b-tf
                      grid
                      text-center text-base
                      py-2
                      relative
                    "
                      >
                        <div>
                          {{ service.serviceDescription }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        v-else-if="currentPage === 2"
        key="Products"
        class="text-white font-lex xl:text-2xl"
      >
        <div class="stepTitle">
          Step 1: Set up your Deco business
          {{ form.kind === "businesses" ? "business" : "service" }}
        </div>
        <div class="flex flex-col mt-8 text-deco-100 md:px-24 xl:px-48">
          <div
            v-if="form.kind === 'businesses'"
            class="md:grid md:grid-cols-2 gap-3"
          >
            <Select
              v-model="form.type"
              :items="businessTypes"
              placeholder="1. Choose the type of your business"
            />
            <Input
              v-model="form.name"
              type="text"
              placeholder="2. What is the name of your business?"
              :max-length="nameLength"
            />
            <div class="md:w-full mx-5 mb-3 text-deco-400">
              3. Upload a logo for your business
              <Input
                v-model="form.imageUrl"
                type="text"
                placeholder=""
                class="w-full bg-transparent"
              />
            </div>
            <Upload
              v-model="file"
              :max="1"
              :return-raw="true"
              class="mt-3 col-span-2"
              :has-preview="true"
              :upload="upload"
            />
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
            <Textarea
              v-model="form.description"
              placeholder="1. Describe your service"
              class="mt-8 col-span-2"
              :rows="3"
            />
            <Input
              v-model="form.price"
              type="number"
              placeholder="2. Choose a price for your NFT in MATIC"
              class="col-span-2"
            />
            <div class="md:w-full mx-5 mb-3 text-deco-400">
              3. Upload an image for your product or service
              <Input
                v-model="form.imageUrl"
                type="text"
                placeholder=""
                :disabled="true"
                class="w-full"
              />
            </div>
            <Upload
              v-model="file"
              :max="1"
              :return-raw="true"
              class="mt-3"
              :has-preview="true"
              :upload="upload"
            />
          </div>
        </div>

        <div v-if="form.kind === 'businesses'" class="text-center mt-8">
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
    </transition>
    <MintModal v-show="showModal" @goHome="showModal=false" />
  </OverlayLoader>
</template>
<script>
import 'tw-elements'
import Moralis from 'moralis'
import getYourLogoPicture from '~/contracts/business-nft/getYourLogoPicture'
import listAllBusinessNFTs from '~/contracts/business-nft/listAllBusinessNFTs'
import listMyServices from '~/contracts/service-nft/listMyServices'
import getSoldProducts from '~/contracts/service-nft/getSoldProducts'
import buy from '~/contracts/vault/buy'
import Input from '~/components/inputs/Input.vue'
import Select from '~/components/inputs/Select.vue'
import Textarea from '~/components/inputs/Textarea.vue'
import Upload from '~/components/inputs/Upload.vue'
import makeService from '~/contracts/service-nft/makeService'
import OverlayLoader from '~/components/OverlayLoader.vue'
import MintModal from '~/components/MintModal.vue'

export default {
  components: {
    Input,
    Select,
    Textarea,
    Upload,
    OverlayLoader,
    MintModal
  },
  data () {
    return {
      showModal: false,
      loading: false,
      currentPage: 1,
      tokenId: null,
      business: null,
      services: [],
      logo: '',
      soldNFTs: 0,
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
        logoPicture: '',
        businessId: this.$route.params.tokenId
      }
    }
  },
  computed: {
    unsoldServices () {
      return this.services.filter(service => !service.sold)
    },
    soldServices () {
      return this.services.filter(service => service.sold)
    },
    businesses () {
      return this.$store.state.allBusinesses
    },
    businessTypes () {
      return this.$store.state.businessTypes
    },
    serviceTypes () {
      return this.$store.state.serviceTypes
    },
    myServices () {
      return this.$store.state.myBusinessServices
    }
  },
  watch: {
    business () {
      if (this.business) {
        this.listMyServices()
        this.getLogo()
        this.getSoldNFTs()
      }
    }
  },
  beforeMount () {
    getYourLogoPicture()
    this.tokenId = parseInt(this.$route.params.tokenId)
    if (!this.businesses.length) {
      setTimeout(this.listAllBusinesses, 3000)
    } else {
      this.business = this.businesses.find(
        business => business.tokenId === this.tokenId
      )
    }
    listMyServices()
  },
  methods: {
    listMyServices () {
      listMyServices(this.$config.contractServiceNft, this.$route.params.tokenId).then(
        (result) => {
          this.$store.commit('setMyBusinessServices', result)
          // console.log(result)
          // this.services = result
        }
      )
    },
    listAllBusinesses () {
      listAllBusinessNFTs(this.$config.contractBusinessNft).then((result) => {
        this.$store.commit('setAllBusinesses', result)
        this.business = this.businesses.find(
          business => business.tokenId === this.tokenId
        )
      })
    },
    purchaseServiceNft (service) {
      buy(this.$config.contractVault, service).then(() => {
        console.log('succesful purchase')
      })
    },
    async getLogo () {
      this.logo = await getYourLogoPicture(
        this.$config.contractBusinessNft,
        this.$route.params.tokenId
      )
    },
    async getSoldNFTs () {
      this.soldNFTs = await getSoldProducts(
        this.$config.contractBusinessNft,
        this.$route.params.tokenId
      )
    },
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
    mintNFT () {
      // TODO mint business or service NFT based on kind
      this.loading = true
      makeService(this.$config.contractServiceNft, this.form, this.$route.params.tokenId).then(async (txHash) => {
        await txHash.wait()
        this.showModal = true
        this.loading = false
        this.currentPage = 1
      }).catch((e) => {
        console.error(e)
        this.loading = false
      })
    }
  }
}
</script>
