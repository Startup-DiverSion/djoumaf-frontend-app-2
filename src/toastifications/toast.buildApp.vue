<template>
 <ToastIndex
          :statut="'En developpement'"
          :icon="'fi fi-sr-megaphone'"
          :textColor="'text-blue-700'"
          :bgColor="'bg-blue-700'"
          :message="`Cette zone est en cours de developpement.`"
        />
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, defineAsyncComponent } from "vue";
  import ToastIndex from "@/toastifications/toast.index.vue";
  
  export default defineComponent({
    name: "toast-build_app",
    props: [],
    components: {
        ToastIndex
    },
    setup(){
     
    }
  });
  </script>
  
  <style scoped>
  
  </style>
  