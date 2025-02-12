

<template>
<div
                class="py-8"
                v-if="
                  data.length != 0 &&
                  endData < data.length
                "
              >
                <button
                  
                  class="flex items-center justify-center bg-gray-100 px-3 py-2 rounded-full gap-1"
                >
                  <span>Voir plus</span>
                  <ArrowRightIcon class="flex h-5" />
                </button>
              </div>
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
    props: ['data', 'endData'],
    setup(props) {
     

      return {
      };
    },
    components: { PlusIcon, CheckIcon, PlusSmallIcon },
  });
  </script>
  
  <style>
  
  </style>
  