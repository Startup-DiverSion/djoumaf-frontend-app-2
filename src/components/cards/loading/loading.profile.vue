<template>
 <div class="flex flex-col gap-4 animate-pulse">

    <div
    class="bg-white  w-full flex flex-col gap-8 pb-16 border-opacity-5 rounded-md  "
  >
    <div class="flex flex-col gap-4">
      <div class="bg-gray-50 w-full h-[150px] lg:h-[200px] rounded-t-md">
        <div class="h-20 bg-blue-500 inline-flex"></div>

        <div
          class="bg-blue-50 w-32 h-32 lg:h-36 lg:w-36 rounded-full relative top-4 lg:top-20 left-8"
        ></div>
      </div>
    </div>

    <div class="flex flex-col gap-2 mx-4 mt-8"></div>
  </div>


  <div class="flex gap-4 ">
    <span class="h-6 w-3/12 lg:w-1/12 rounded-full bg-gray-50"></span>
    <span class="h-6 w-2/12 lg:w-1/12 rounded-full bg-gray-50"></span>
  </div>

  <div class="flex flex-col lg:flex-row w-full gap-4">
    
    <div class="bg-white h-[150px] lg:h-[200px] gap-8 lg:w-3/12 w-full rounded-md p-4 flex flex-col">
        <div class="flex flex-col gap-2 w-8/12">
            <span class="h-5 w-8/12 rounded-full bg-gray-100"></span>
            <div class="flex gap-2">
              <span class="h-6 w-9/12 rounded-full bg-gray-100"></span>
              <span class="h-6 w-3/12 rounded-full bg-gray-100"></span>
            </div>
          </div>

          <div class="flex flex-col gap-2 w-8/12">
            <span class="h-3 w-8/12 rounded-full bg-gray-100"></span>
            <div class="flex gap-2">
              <span class="h-3 w-9/12 rounded-full bg-gray-100"></span>
              <span class="h-3 w-3/12 rounded-full bg-gray-100"></span>
            </div>
          </div>
    </div>

    <div class="bg-white h-[150px] lg:h-[500px] inline-flex w-full rounded p-4">
        
        <div class="flex flex-col gap-2 w-8/12">
            <span class="h-5 w-8/12 rounded-full bg-gray-100"></span>
            <div class="flex gap-2">
              <span class="h-5 w-9/12 rounded-full bg-gray-100"></span>
              <span class="h-5 w-3/12 rounded-full bg-gray-100"></span>
            </div>
          </div>
    </div>

  </div>

 </div>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";

export default defineComponent({
  name: "",
  props: {
    sizeCard: {
      type: String,
      default: "w-full",
    },
  },
});
</script>

<style scoped></style>
