<template>
  <client-only>
    <div class="w-full h-full relative ">
      <div class="search absolute -top-16 z-30 w-full">
        <GmapAutocomplete
          :placeholder="'6. Type your business address or locate it on the map'"
          @place_changed="setPlace"
        />
      </div>
      <GmapMap
        :center="center"
        :zoom="zoom"
        :options="{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUi: false
        }"
        @click="onMapClick($event)"
        class="h-[486px] mb-4"
        map-type-id="terrain"
      >
        <GmapMarker
          v-if="markerPosition"
          ref="gmap"
          :position="{
            lat: markerPosition.lat,
            lng: markerPosition.lng
          }"
          :clickable="false"
          :draggable="false"
          title="Current position"
          :icon="{ url: '/img/map-marker.svg' }"
        />
      </GmapMap>
    </div>
  </client-only>
</template>
<script>
export default {
  props: {  
    value: {
      type: String,
      required: true
    },
    fitBounds: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      zoom: 7,
      searchAddressInput: "",
      place: null,
      center: { lat: 47.342829, lng: 20.8732793 },
      markerPosition: null
    };
  },
  watch: {
    markerPosition: function(newValue){
      if(newValue){
        this.reverseGeoCoding(newValue)
      }
    }
  },
  methods: {
    onMapClick(event){
      console.log(event)
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    },
    openInfoWindowTemplate(item) {
      this.setInfoWindowTemplate(item);
      this.infoWindow.position = this.getCoordinates(item);
      this.infoWindow.open = true;
    },
    searchLocation() {
      if (this.searchAddressInput.length > 0) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { address: this.searchAddressInput },
          (results, status) => {
            if (status === "OK") {
              this.center.lat = results[0].geometry.location.lat();
              this.center.lng = results[0].geometry.location.lng();
              this.zoom = 11;
            }
          }
        );
      } else {
        this.zoom = 7;
        this.center = { lat: 47.342829, lng: 20.8732793 };
      }
    },
    reverseGeoCoding(location) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: location })
        .then((response) => {

          const address = response.results.find(
            (result) => result.types.includes("street_address") || result.types.includes('route')
          );
          const city = response.results.find(
            (result) => result.types.includes("locality") 
          );
          if(city){
          this.$emit('localityChange', city.formatted_address.split(',')[0])

          }
          if(address) {
            this.$emit('input', address.formatted_address)
          } else {
            window.alert("No results found");
          }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
    },
    setPlace(place) {
      if (place.name.length > 0) {
        if (place.address_components !== undefined) {
          this.place = place;
          this.center = {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          };
          this.markerPosition = {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          };
          this.zoom = 11;
        } else {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: place.name }, (results, status) => {
            if (status === "OK") {
              this.center.lat = results[0].geometry.location.lat();
              this.center.lng = results[0].geometry.location.lng();
              this.zoom = 11;
            } else {
              console.log("Faulty address, please try again, with another.")
            }
          });
        }
      } else {
        this.place = null;
        this.center = { lat: 47.342829, lng: 20.8732793 }; // { lat: 47.4813602, lng: 18.9902208 };
        this.zoom = 7;
      }
    }
  }
};
</script>
<style>
.pac-target-input {
  @apply left-auto h-12 focus:outline-none hover:ring-gray-600 group-hover:bg-[#e8f0fe] group-disabled:bg-none
}
</style>
