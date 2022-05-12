import Vue from 'vue'
import * as VueGoogleMaps from  'vue2-google-maps'


export default function({ $config }) {
    Vue.use(VueGoogleMaps, {
        load: {
            key: $config.google_maps_api_key,
            libraries: 'places',
            language: "en",
            region: "en"
        },
    })
}