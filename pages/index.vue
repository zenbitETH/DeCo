<template>
  <section> 
    <!-- <Tutorial /> -->
    <h1 class="text-2xl text-green-400">This is nuxt page. Pages are residing in the <span class="italic">pages</span> directory.</h1>

    <br>

    <!-- if the component is added, then it can be used like this -->
    <DemoComponent>
      <!-- The HTMl content passed here will be inserted at the <slot></slot> position in the component -->
      <h2>HTML content can be passed to the components through 'slots'. </h2>
    </DemoComponent>
    <br>

    <!-- Component slots may be ommited. -->
    <DemoComponentWithoutSlot />
    <br>

    <!-- variables can be printed lik this, but they must be defined in the data() function, see below-->
    <h3 class="text-xl text-gray-600"> {{ message }} </h3>
    <br>

    Links:
    <ul>
      <li>
        <!-- nuxt link is a special tag, because it generate <a> content, but it must be used this way so we doesn't have page reloads -->
        <!-- This generates: -->
        <nuxt-link to="/new-business">New business</nuxt-link>
        <!-- This <a href="/">Register</a> but Nuxt uses it's magic in the background to make it work-->
      </li>
      <li>
        <nuxt-link to="/services">List services</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/services/edit">Add service</nuxt-link>
      </li>
    </ul>

    
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
//components must be imported and added to the Vue instance (see below) before they can be used
import DemoComponent from '~/components/DemoComponent.vue'
import DemoComponentWithoutSlot from '~/components/DemoComponentWithoutSlot.vue'

export default Vue.extend({
  //layouts can be changed like this:
  // layout: 'default'
  //the default layout is layouts/default.vue, since it is the default, it can be ommited

  //components must be added like this
  components: {
    DemoComponent, DemoComponentWithoutSlot
  },

  //component data should be defined here to be able to use in HTML template
  data() {
    return {
      message: 'Hello variable message'
    }
  }

})
</script>
