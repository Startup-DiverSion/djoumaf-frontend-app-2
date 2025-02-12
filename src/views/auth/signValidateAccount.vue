<template>
  <div class="font-love">
    <div class="bg-white absolute inset-0 w-full h-screen"></div>
    <div class="pt-4 mx-2">
      <span class="text-lg" :class="isError ? 'text-red-500' : 'text-blue-700' " > {{ stateLinks }} </span>

      <div class="" v-if="isError">
        <RouterLink :to="{name: 'SignIn'}" class="underline" > Retour a la page de connexion </RouterLink>
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
import { defineComponent, reactive, ref, onBeforeMount, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AuthService } from "../../services/auth.services";
const LegalAuthCompoment= defineAsyncComponent(() =>
  import('@/components/toPages/Auth/legalAuthCompoment.vue')
)
import { useAuthComposition} from "@/composables/auth.composition"
import axios from "axios";
import { URL} from "@/router/url";
import router from "@/router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";

export default defineComponent({
  components: {
    onlyInput,
    AuthLayout,
    btnAuthCompoment,
    RedirectLinkAuthCompoment,
    LegalAuthCompoment,
  },
  name: "Sign-validate-account",
  props: {},
  setup(props, { expose }) {
    const route = useRoute();
    const router = useRouter();
    const stateLinks = ref("En cours de verification...");
    const isError = ref(false)

    onBeforeMount(async() => {
        await verifyLinks()
    });

    const verifyLinks = async () => {
      try {
        const { data } = await axios.post(URL.AUTH_IS_OWNER_EMAIL, {
          token: route.query?.token,
        });
        if (data) {
          new LocalSotreUtils().set(
              "jEmailComfirm", true
            );
          router.push({ name: "Jobs" });
        }
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.data?.message)
          stateLinks.value = error.response.data?.message;
          isError.value = true
        }
      }
    };

    return {stateLinks, isError};
  },
});
</script>

<style scoped></style>
