<template>
   
  </template>
  
  <script lang="ts">
 const onlyInput = defineAsyncComponent(() =>
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
        title: "Rejoignez-nous, maintenant sur DjoumAf",
        sub: `Creez votre réseau,
              trouvez un emploi ou des
              profils locaux adaptés à votre entreprise.`,
      });
  
  
     
  
      return {
        headerData,
      };
    },
  });
  </script>
  
  <style scoped></style>
  