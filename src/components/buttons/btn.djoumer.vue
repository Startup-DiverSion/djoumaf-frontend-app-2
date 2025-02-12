<template>
  

    <button
    :class="[classeName, isFollow ? 'bg-blue-700 ' : 'border-blue-700 border-[1px] ']"
    class=" font-love gap-1 font-bold flex items-center justify-center rounded-full"
  >
    <i
      :class="
        isFollow ? 'fi fi-rr-social-network text-white' : 'fi fi-rr-social-network text-blue-700'
      "
      class="flex text-xs font-bold"
    ></i>
    <span
      :class="[classeText, isFollow ? 'text-white ' : 'text-blue-700']"
      class="font-bold"
    >
       {{ isFollow ? 'Djoumer' : 'Djoumer' }} </span
    >
  </button>
  
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'btn-sjoumer',
    props: {
      label: String,
      classeName: {
        type: String,
        default: "px-3 py-2  "
      },
      classeText: {
        type: String,
        default: "text-xs "
      },
      isFollow: Boolean,
    }
  });
  </script>
  
  <style scoped>
  
  </style>
  