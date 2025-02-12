<template>
    <!-- Display if error server -->
    <div class="flex flex-col items-center gap-2" v-if="isEmpty === true">
           <img :src="image ? image : '/images/loading/empty.svg'" class="h-[50px] w-auto flex items-center justify-center opacity-50" alt="">
           <span class="text-center text-base font-love opacity-70"> {{ message }} </span>
         </div>
 </template>
 
 <script lang="ts">
 import { defineComponent , defineAsyncComponent} from "vue";
 
 export default defineComponent({
   name: "",
   props: ['isEmpty', 'image', 'data', 'message'],
 });
 </script>
 
 <style scoped></style>
 