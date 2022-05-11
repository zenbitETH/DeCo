import Vue from 'vue'
import * as VueGoogleMaps from  'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCmR6Y0r-UDbYU5uqIyNqm62gCfpSQErbE',
        libraries: 'places',
        language: "en",
        region: "en"
    },
})