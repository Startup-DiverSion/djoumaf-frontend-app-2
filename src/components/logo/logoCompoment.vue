


<template>

<RouterLink :to="{name: 'Home'}" class="flex items-center pt-4 w-32 h-16">
    <img src="/images/logo.png" class="flex w-full h-full relative -left-2" alt="" />

    <!-- <span class="relative -left-8  font-black text-3xl">DjoumAf</span> -->
  </RouterLink>
    
      
    </template>
      
      <script lang="ts">
    
   
    import { defineComponent , defineAsyncComponent} from "vue";
     
      
      export default defineComponent({
        name: "Logo",
        props: [],
        setup() {
         
          return {
          
          };
        },
        components: {  }
      });
      </script>
      
      <style scoped>
      
      </style>
      