<template>
     <!-- Display if error server -->
     <div class="flex flex-col items-center" v-if="error === true && loading === false">
            <img src="/images/loading/error.svg" class="h-[150px] w-auto flex items-center justify-center opacity-50" alt="">
            <span class="text-center text-sm font-love">Oups, une erreur c'est produite, vieillez réessayer...</span>
            <button class="bg-blue-800 px-3 py-1 rounded-md text-white font-bold text-base mt-1">Réessayer</button>
          </div>
         
          <!-- Display if data empty -->
          <div class="flex flex-col  m-auto" v-if="data.length === 0 && loading === true  && error === false">
            <img src="/images/loading/empty.svg" class="h-[100px]  opacity-50" alt="">
            

            <div class="flex flex-col justify-center items-center text-center ">
              <span class=" text-lg opacity-90 font-love font-bold "> {{message}} </span>
            <span class="text-xs"> {{messageSub}} </span>
            </div>
          </div>
  </template>
  
  <script lang="ts">
  import { defineComponent , defineAsyncComponent} from "vue";
  
  export default defineComponent({
    name: "",
    props: ['error', 'loading', 'data', 'message', 'messageSub'],
  });
  </script>
  
  <style scoped></style>
  