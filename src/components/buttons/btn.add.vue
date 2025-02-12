<template>
<button type="button" class="bg-blue-700 rounded-full px-2 py-2 mx-2 text-xs  mt-2 text-white  flex gap-0 items-center">
  <PlusSmallIcon class="h-4" />
          <span class="font-bold">{{ label }}</span>
          </button>
  </template>
  
  <script lang="ts">
  import {
    defineComponent,
    onMounted,
    computed,
    ref,
    defineAsyncComponent,
  } from "vue";
  import { useCerleComposition } from "@/composables/cerle.composition";
  import { useUserComposition } from "@/composables/user.composition";
  import { PlusIcon, PlusSmallIcon, CheckIcon } from "@heroicons/vue/24/solid";
  
  export default defineComponent({
    name: "btn-follow",
    props: ['label'],
    components: { PlusIcon, CheckIcon, PlusSmallIcon },
    setup(props) {
    
      return {
       
      };
    },
    
  });
  </script>
  
  <style>

  </style>
  