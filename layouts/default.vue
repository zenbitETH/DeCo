<template>
    <div class="py-10 px-2 bg-gradient-to-t from-deco-900 to-deco-800 h-screen overflow-y-auto">
        <nav class="top-hud">
            <div class="hud1con">Wallet</div>
        
          <div class="hud3">
            <span> 🏢 </span>
            <span class="mx-2">2</span>
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
        <Nuxt />
        <nav class="bottom-hud">
            <div class="huda">
                New deco NFT
            </div>
            <div class="hudb">
                My decos
            </div>
            <div class="hudd">
                Explore decos
            </div>
        </nav>
   </div>
</template>
