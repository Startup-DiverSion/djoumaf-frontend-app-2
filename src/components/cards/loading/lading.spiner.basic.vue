<template>
    <div class=" w-full h-full flex justify-center items-center" v-if="loading">
      <div class="flex items-center justify-center " >
      <div
        class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]  motion-reduce:animate-[spin_1.5s_linear_infinite]" :class="color ? color : 'text-white'"
        role="status">
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span
        >
      </div>
    </div>
    </div>  
    </template>
    
    <script lang="ts">
    import { defineComponent } from 'vue';
    
    export default defineComponent({
      name: '',
      props: ['loading', 'color']
    });
    </script>
    
    <style scoped>
    
    </style>
    