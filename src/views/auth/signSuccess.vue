<template>
   <div class="">
    <div class="bg-white absolute inset-0 w-full h-screen"></div>

    <div class="flex flex-col gap-4 font-love lg:w-5/12 w-11/12 m-auto pt-16">
      <span class="text-3xl font-bold">Compte validé !</span>
     <div class="flex flex-col text-lg">
      <span class=""> Votre profile Djoumaf est bien accosié au <strong>xxxx</strong> </span>
      <span>Connectez-vous ou accedez directement à votre profile sur djoumaf</span>
      <span>Merci, et bienvenue dans la grande famille Djoumaf !</span>
     </div>

     <div class="font-love">
      <RouterLink :to="{name: 'Jobs'}" class="bg-blue-700 px-4 py-2 text-base rounded-sm font-medium text-white">Retouner sur djoumaf</RouterLink>
     </div>
    </div>

   </div>
  </template>
  
  <script lang="ts">
 const onlyInput= defineAsyncComponent(() =>
  import('@/components/forms/onlyInput.vue')
)
  const btnAuthCompoment= defineAsyncComponent(() =>
import('@/components/toPages/Auth/btnAuthCompoment.vue')
)
  const RedirectLinkAuthCompoment= defineAsyncComponent(() =>
import('@/components/toPages/Auth/redirectLinkAuthCompoment.vue')
)
  const AuthLayout= defineAsyncComponent(() =>
import('@/layouts/AuthLayout.vue')
)
  import { defineComponent, reactive, ref, onMounted, defineAsyncComponent } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { AuthService } from "../../services/auth.services";
  const LegalAuthCompoment= defineAsyncComponent(() =>
  import('@/components/toPages/Auth/legalAuthCompoment.vue')
)
  import { useAuthComposition} from "@/composables/auth.composition"
  import axios from "axios";
  
  
  
  export default defineComponent({
    components: {
      onlyInput,
      AuthLayout,
      btnAuthCompoment,
      RedirectLinkAuthCompoment,
      LegalAuthCompoment,
    },
    name: "SignUp",
    props: {},
    setup(props, { expose }) {
      const headerData = reactive({
        title: "Succès",
        sub: `Votre adresse email à été verifier avec success`,
      });
  
  
     
  
      return {
        headerData,
      };
    },
  });
  </script>
  
  <style scoped></style>
  