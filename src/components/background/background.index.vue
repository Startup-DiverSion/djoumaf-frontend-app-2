<template>
   
      <!-- Background auth page -->
      <div class="bg-gray-50 absolute flex w-full h-auto top-0">
        <div
          class="bg-gray-900 h-screen w-full fixed top-0 left-0 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 "
        >
          <img
            class="object-cover w-full h-full opacity-10"
            v-lazy="'/images/placeholder/femme-choix-photos-personnes-v5.png'"
            alt=""
          />
        </div>
      </div>
  
   
  </template>
  
  <script lang="ts">

  import { defineComponent, reactive, computed } from "vue";

  
  export default defineComponent({
    name: "background-index",
    props: [],
    components: {  },
    setup() {
    
      return {  };
    },
  });
  </script>
  
  <style>

  </style>
  