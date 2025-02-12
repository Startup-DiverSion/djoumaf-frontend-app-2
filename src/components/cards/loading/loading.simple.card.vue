<template>
    <div
      class=" bg-white  w-full flex flex-col gap-8 px-2 py-3 border-opacity-5 rounded-md animate-pulse" >
      <div class="flex flex-col gap-2">
        <div class="flex items-start gap-2 w-full">
          <div class="flex gap-1 bg-gray-100 rounded-full w-10 h-10"></div>
  
          <div class="flex flex-col gap-3 w-8/12">
            <span class="h-3 w-8/12 rounded-full bg-gray-100"></span>
            <div class="flex w-11/12 gap-2">
              <span class="h-3 w-4/12 rounded-full bg-gray-100"></span>
              <span class="h-3 w-2/12 rounded-full bg-gray-100"></span>
              <span class="h-3 w-6/12 rounded-full bg-gray-100"></span>
            </div>

            <div class="flex gap-2 w-7/12">
          <span class="h-3 w-4/12 rounded-full bg-gray-100"></span>
          <span class="h-3 w-8/12 rounded-full bg-gray-100"></span>
        </div>

        <span class="h-3 w-5/12 rounded-full bg-gray-100"></span>
          </div>
        </div>
  
        
      </div>
  
  
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent , defineAsyncComponent} from "vue";
  
  export default defineComponent({
    name: "loading-simple-card",
    props: {
      sizeCard: {
          type: String,
          default: 'w-full'
      }
    },
  });
  </script>
  
  <style scoped></style>
  