<template>
    <div
      class="flex flex-col gap-6 w-full font-love"
    >
    
      <div class="text-sm font-love mx-0 font-ligth">
        En utilisant DjoumAf, vous acceptez nos
        <RouterLink
          :to="{ name: 'CGU' }"
          class="text-blue-500 font-ligth hover:underline"
          >Conditions générales</RouterLink
        >, notre
        <RouterLink
          :to="{ name: 'CGU' }"
          href=""
          class="text-blue-500 font-ligth hover:underline"
          >Politique de confidentialité</RouterLink
        >
        et
        <RouterLink
          :to="{ name: 'PUC' }"
          class="text-blue-500 font-ligth hover:underline"
          >Politique d’utilisation des cookies.</RouterLink
        >
        © 2023
        DjoumAf.
      </div>
      <!-- Display button -->
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from "vue";
  import { useRouter, useRoute, RouterLink } from "vue-router";
  
  export default defineComponent({
    name: "SignIn",
    props: ["authConnexion", "head"],
    setup() {
      const router = useRouter();
      const route = useRoute();
      return {
        router,
        route,
      };
    },
    components: { RouterLink },
  });
  </script>
  
  <style scoped></style>
  