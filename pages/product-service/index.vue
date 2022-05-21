<template>
  <section class="text-white">
    <nuxt-link to="/business-detail" class="absolute bottom-32 xl:bottom-1/2 left-0 text-white hud0">
      <div class="bigIcon">
        ⏪
      </div>Back
    </nuxt-link>
    <div class="MainScreen">
      <div class="dBoard">
        <div class="productBoard">
          <div class="grid grid-cols-6 text-left">
            <div class="text-center col-span-2">
              <img class="xl:h-1/2 mx-auto" src="deco logo.svg">
            </div>
            <div class="col-span-4 pt-6 xl:pt-20">
              <div class="xl:text-5xl text-2xl">
                Name of the product or service
              </div>
            </div>
          </div>

          <div class="col-span-6 row-span-5 bg-gradient-to-b from-glass-400 to-glass-200 rounded-lg relative">
            <img class="xl:h-full mx-auto" src="/product.png">
            <div class="col-span-2 row-span-2 p-3 xl:text-9xl text-7xl productBT absolute bottom-0 right-0">
              <div class="xl:text-2xl text-xl">
                Buy for
              </div> 5 <span class="xl:text-2xl text-xl">Matic</span>
            </div>
          </div>
          <div class="col-span-4 row-span-2 p-3">
            Description
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
