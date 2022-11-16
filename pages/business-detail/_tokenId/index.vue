<template>
  <OverlayLoader :loading="loading">
    <transition name="slide" mode="out-in" class="relative mt-3">
      <section v-if="currentPage === 1" key="tokenId" class="text-white">
        <div class="MainScreen">
          <div class="dBoard">
            <div class="assetBoard">
              <div class="businessCard">
                <div class="text-lg absolute top-5 right-5">
                  📍{{ business ? `${business.city} ` : "Loading..." }}
                  <!--📍{{ business ? `${business.googleAddress} ` : "Loading..." }}-->
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
                  <div class="myVaultBT cursor-default">
                    <span>
                      {{ likes }}
                    </span>👍
                  </div>
                  <div class="myVaultBT cursor-default">
                    <span>
                      {{ disLikes }}
                    </span>👎
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
                  class="businessCell"
                >
                  <div class="md:text-6xl">
                    {{ soldNFTs }}
                  </div>
                  <div class="text-base font-bold xl:text-xl">
                    Products Sold
                  </div>
                </div>
                <div
                  class="businessCell"
                >
                  <div class="md:text-6xl">
                    {{ income / Math.pow(10,18) }} MATIC
                  </div>
                  <div class="text-base font-bold xl:text-xl">
                    Total Income
                  </div>
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
                  <div class="grid lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 px-5 gap-3 ">
                    <div
                      class="PlaceBG hover:bg-glass-800 cursor-pointer"
                      @click="currentPage = 2"
                    >
                      <div class="bigIcon col-span-5">
                        +
                        Add a product or service
                      </div>
                    </div>

                    <div v-for="service in unsoldServices" :key="service.tokenId" class="PlaceBG relative" @click="purchaseServiceNft(service)">
                      <div class="col-span-2 rounded-xl">
                        <img
                          class="mx-auto rounded-xl"
                          :src="service.tokenURI"
                        >
                      </div>
                      <div class="productCard">
                        <div class="text-xl row-span-3">
                          <div>Product Name</div>
                          <div class="text-lg">
                            {{ service.serviceDescription }}
                          </div>
                        </div>

                        <div class="productBuy">
                          <div class="text-xl col-span-2">
                            {{ service.price / Math.pow(10,18) }} MATIC
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="tabs-soldFill" class="tab-pane fade bg-glass-100 rounded-tf py-10 pt-16 h-full overflow-y-hidden" role="tabpanel" aria-labelledby="tabs-profile-tabFill">
                  <div class="grid lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4  grid-flow-dense px-5 gap-3 ">
                    <div v-for="service in soldServices" :key="service.tokenId" class="PlaceBG bg-glass-500 relative">
                      <div class="col-span-2 rounded-xl">
                        <img
                          class="mx-auto rounded-xl"
                          :src="service.tokenURI"
                        >
                      </div>
                      <div class="productCard">
                        <div class="text-xl row-span-3">
                          <div>Product Name</div>
                          <div class="text-lg">
                            {{ service.serviceDescription }}
                          </div>
                        </div>

                        <div class="productBuy">
                          <div class="text-xl col-span-2">
                            {{ service.price / Math.pow(10,18) }} MATIC
                          </div>
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
            <Input
              v-model="form.name"
              type="text"
              placeholder="1. Name of your product or service"
              :max-length="nameLength"
            />
            <Textarea
              v-model="form.description"
              placeholder="2. Describe your product or service"
              class="mt-8 col-span-2"
              :rows="3"
            />
            <Input
              v-model="form.price"
              type="number"
              placeholder="3. Choose a price for your product or service in MATIC"
              class="col-span-2"
            />
            <div class="md:w-full mx-5 mb-3 text-deco-400">
              4. Upload an image for your product or service
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
    <MintModal v-show="showModal" @goHome="goHomeClick" />
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
import CommonFunctions from '~/mixins/CommonFunctions'
import upVote from '~/contracts/business-nft/upVote'
import getUpVotes from '~/contracts/business-nft/getUpVotes'
import downVote from '~/contracts/business-nft/downVote'
import getDownVotes from '~/contracts/business-nft/getDownVotes'
import getIncomeOfBusiness from '~/contracts/service-nft/getIncomeOfBusiness'

export default {
  components: {
    Input,
    Select,
    Textarea,
    Upload,
    OverlayLoader,
    MintModal
  },
  mixins: [CommonFunctions],
  data () {
    return {
      income: 0,
      likes: 0,
      disLikes: 0,
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
      return this.myServices.filter(service => !service.sold)
    },
    soldServices () {
      return this.myServices.filter(service => service.sold)
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
    },
    mySoldServices () {
      return this.$store.myPurchasedServices
    }
  },
  watch: {
    business () {
      if (this.business) {
        this.listMyServices()
        this.getLogo()
        this.getSoldNFTs()
        this.getLikes()
        this.getDislikes()
        this.getIncome()
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
  }, // Itt már alapból összemergeli a listMyServices-t
  methods: {
    // listMyServices () {
    //   listMyServices(this.$config.contractServiceNft, this.$route.params.tokenId).then(
    //     (result) => {
    //       this.$store.commit('setMyBusinessServices', result)
    //       // console.log(result)
    //       // this.services = result
    //     }
    //   )
    // },
    listAllBusinesses () {
      listAllBusinessNFTs(this.$config.contractBusinessNft).then((result) => {
        this.$store.commit('setAllBusinesses', result)
        this.business = this.businesses.find(
          business => business.tokenId === this.tokenId
        )
      })
    },
    purchaseServiceNft (service) {
      buy(this.$config.contractVault, service, this.$route.params.tokenId).then(() => {
        console.log('succesful purchase')
        // location.reload()
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
        this.$config.contractServiceNft,
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
      // console.log('ipfs file is: ', this.form.logoPicture)
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
    },
    goHomeClick () {
      this.showModal = false
      location.reload()
    },
    makeUpVote () {
      upVote(this.$config.contractBusinessNft, this.$route.params.tokenId).then(async () => {
        // console.log('Successfully upVoted')
        // await location.reload()
      })
    },
    async getLikes () {
      this.likes = await getUpVotes(this.$config.contractBusinessNft, this.$route.params.tokenId)
    },
    async getDislikes () {
      this.disLikes = await getDownVotes(this.$config.contractBusinessNft, this.$route.params.tokenId)
    },
    makeDownVote () {
      downVote(this.$config.contractBusinessNft, this.$route.params.tokenId).then(() => {
        // result.wait()
        console.log('Successfully upVoted')
        // location.reload()
      })
    },
    async getIncome () {
      this.income = await getIncomeOfBusiness(this.$config.contractServiceNft, this.$route.params.tokenId)
    }
  }
}
</script>
