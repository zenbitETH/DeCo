<template>
    <div class="py-10 px-2">
        <nav class="top-hud">
            <div class="hud1con">Wallet</div>
        
          <div class="hud3">
            <span> 🏢 </span>
            <span className="mx-2">2</span>
          </div>
          <div class="hud3">
            <span> ⚡ </span>
            <span class="mx-2">20</span>
          </div>
          <div class="hud4">
            <span> 💽 </span>
            <span class="mx-2">12</span>
          </div>
        </nav>
        <!-- The actual page will be inserted here -->
        <div class="max-w-7xl mx-auto mt-10">
          <Nuxt />
        </div>
        <nav class="bottom-hud">
            <div class="huda">
                <nuxt-link to="new-business">New business NFT</nuxt-link>
            </div>
            <div class="hudb">
                My business
            </div>
            <div class="hudb">
                My city business
            </div>
            <div class="hudd">
                All business
            </div>
        </nav>
   </div>
</template>