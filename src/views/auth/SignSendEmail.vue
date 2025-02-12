<template>
  <AuthLayout :head="headerData" :auth-connexion="SignVerifyEmail">
    <template #default>
      <div class="flex flex-col gap-4">
        <OnlyInput placeholder="adresse email" type="email" name="email" :modelValue="inputData.email"
          @update:modelValue="inputData.email = $event.target.value"
          :errorInput="isError" />
      </div>

      <btnAuthCompomentVue label="Envoyer" :is-loading="state.loading" />
    </template>

    <template v-slot:redirect>
      <RedirectLinkAuthCompoment
        routeName="SignChangeEmail"
        quiz="Avez-vous votre mot de passe ?"
        route-label="Connectez-vous"
        routeLink="SignIn"
      />
    </template>
  </AuthLayout>
</template>

<script lang="ts">
const AuthLayout= defineAsyncComponent(() =>
import('@/layouts/AuthLayout.vue')
)
import { defineComponent, onMounted, computed, ref, defineAsyncComponent, reactive } from "vue";
const OnlyInput= defineAsyncComponent(() =>
import('@/components/forms/onlyInput.vue')
)
const RedirectLinkAuthCompoment= defineAsyncComponent(() =>
import('@/components/toPages/Auth/redirectLinkAuthCompoment.vue')
)
import btnAuthCompomentVue from "@/components/toPages/Auth/btnAuthCompoment.vue";
import { useAuthComposition} from "@/composables/auth.composition"

export default defineComponent({
  name: "SignIn",
  components: {
    AuthLayout,
    OnlyInput,
    RedirectLinkAuthCompoment,
    btnAuthCompomentVue,
  },
  props: {},
  setup() {
    const headerData = reactive({
      title: "Besoin d'aide avec votre mot de passe?",
      sub: `Entrez l'e-mail que vous utilisez pour Djoumaf et nous vous aiderons à créer un nouveau mot de passe.`,
    });

    const { isError, inputDataOnlyEmail, SignVerifyEmail, state }= useAuthComposition()

    return {
      headerData,
      inputData: inputDataOnlyEmail,
      isError,
      SignVerifyEmail,
      state
    };
  },
});
</script>

<style scoped></style>
