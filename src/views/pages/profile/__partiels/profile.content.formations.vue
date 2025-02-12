<template>
   <div class="flex flex-col py-2 gap-4 font-love">
    <div class="flex flex-col">

      <span class="text-sm font-light"> {{ data.diploma.title }} </span>
      <span class="text-lg font-extrabold"> {{ data.etablishment }} </span>
      

      <div class="flex items-center gap-2">
        <CalendarIcon class="h-4 opacity-40 "></CalendarIcon>
        <span class="text-gray-600 "> {{ data.date_start_y }} - {{ data.date_finish_y }}</span>
      </div>

      

    </div>


    <div class="text-sm ">
     {{ data.description }}
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { CalendarIcon } from "@heroicons/vue/24/solid";
import { defineComponent , defineAsyncComponent} from "vue";
  
  export default defineComponent({
    name: "profile-content-formations",
    props: ["data"],
    components: { CalendarIcon }
});
  </script>
  
  <style scoped></style>
  