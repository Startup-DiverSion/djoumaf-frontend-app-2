<template>
    <div
      class=" bg-white border-[1px] w-full flex flex-col gap-4 p-4 border-opacity-5 rounded-md animate-pulse" >
      <div class="flex flex-col gap-2">
        <div class="flex flex-col  gap-2 w-full">
            <span class="h-4 w-4/12 rounded-full bg-gray-100"></span>
  
          <div class="flex flex-col gap-2 w-8/12">
            <span class="h-3 w-8/12 rounded-full bg-gray-100"></span>
            <!-- <div class="flex gap-2">
              <span class="h-3 w-9/12 rounded-full bg-gray-100"></span>
              <span class="h-3 w-3/12 rounded-full bg-gray-100"></span>
            </div> -->
          </div>
        </div>
  
        <!-- <div class="flex gap-2 w-8/12">
          <span class="h-6 w-4/12 rounded-full bg-gray-100"></span>
          <span class="h-6 w-8/12 rounded-full bg-gray-100"></span>
        </div> -->
      </div>
  
      <!-- <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <span class="h-3 w-8/12 rounded-full bg-gray-100"></span>
          <span class="h-3 w-4/12 rounded-full bg-gray-100"></span>
        </div>
        <div class="flex gap-2">
          <span class="h-3 w-5/12 rounded-full bg-gray-100"></span>
          <span class="h-3 w-7/12 rounded-full bg-gray-100"></span>
        </div>
        <div class="flex gap-2">
          <span class="h-3 w-2/12 rounded-full bg-gray-100"></span>
          <span class="h-3 w-10/12 rounded-full bg-gray-100"></span>
        </div>
      </div> -->
  
      <div class="flex flex-col gap-2">
        <span class="h-2 w-8/12 rounded-full bg-gray-100"></span>
        <span class="h-2 w-6/12 rounded-full bg-gray-100"></span>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent , defineAsyncComponent} from "vue";
  
  export default defineComponent({
    name: "loading-faster-card",
    props: {
      sizeCard: {
          type: String,
          default: 'w-full'
      }
    },
  });
  </script>
  
  <style scoped></style>
  