import Vue from 'vue'
import * as VueGoogleMaps from  'vue2-google-maps'


export default function({ $config }) {
    Vue.use(VueGoogleMaps, {
        load: {
            key: $config.googleMapsApiKey,
            libraries: 'places',
            language: "en",
            region: "en"
        },
    })
}