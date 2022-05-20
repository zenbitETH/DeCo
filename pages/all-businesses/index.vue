<template>
  <section class="text-white">
    <div class="MainScreen">
      <div class="MainBoard">
        <div class="eBoard1">
          <div class="my-2 ">
            All Deco business
          </div>
          <div class="grid md:grid-cols-4 xl:grid-cols-8 grid-cols-2 px-10 gap-5">
            <nuxt-link to="business-detail-customer" class="DecoBG bg-glass-700">
              <div class="">
                <img class="fhd:h-32 qhd:h-43 h-32 mx-auto" src="../../static/punkcities.png">
              </div>
              <div class="bg-deco-900 rounded-b-lg grid grid-cols-2 text-center text-base py-2">
                <div>1 👍</div>
                <div>3 🛍️</div>
              </div>
            </nuxt-link>

            <nuxt-link to="business-detail-customer" class="DecoBG bg-glass-700">
              <div class="">
                <img class="xl:h-32 qhd:h-43 h-32 mx-auto" src="../../static/deco logo.svg">
              </div>
              <div class="bg-deco-900 rounded-b-lg grid grid-cols-2 text-center text-base py-2">
                <div>0 👍</div>
                <div>0 🛍️</div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
