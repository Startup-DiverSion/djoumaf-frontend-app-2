<template>
    <div
        class="z-20  w-full  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 border-b-[0px]  transition-all duration-100 " :class="className">
        <slot  />
    </div>
  
 
  </template>
    
  <script lang="ts">
  
import { defineComponent , defineAsyncComponent} from "vue";
  
  
  export default defineComponent({
    name: "navigation-layout",
    props: {
        className: String
    },
    setup() {

       
    },
    components: {  }
  });
  </script>
    
  <style scoped>
  
  </style>
    