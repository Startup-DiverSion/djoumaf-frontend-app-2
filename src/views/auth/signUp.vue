<template>
  <AuthLayout :head="headerData" :authConnexion="SignUp">
    <template #default>
      <div class="flex flex-col gap-4">
        <only-input
          placeholder="Adresse email"
          name="email"
          :modelValue="inputData.email"
          @update:modelValue="inputData.email = $event.target.value"
          :errorInput="isError"
        />
        <only-input
          placeholder="Mot de passe (6 charactere ou plus)"
          name="password"
          type="password"
          :modelValue="inputData.password"
          @update:modelValue="inputData.password = $event.target.value"
          :errorInput="isError"
        />
      </div>

      <LegalAuthCompoment />

      <btnAuthCompoment label="S'incrire" :isLoading="state.loading" />
    </template>

    <template v-slot:redirect>
      <RedirectLinkAuthCompoment
        routeName="SignUp"
        quiz="Vous avez un compte ?"
        route-label="Connectez-vous"
        routeLink="SignIn"
      />
    </template>
  </AuthLayout>
</template>

<script lang="ts">
const onlyInput = defineAsyncComponent(() => import('@/components/forms/onlyInput.vue'))
const btnAuthCompoment = defineAsyncComponent(
  () => import('@/components/toPages/Auth/btnAuthCompoment.vue'),
)
const RedirectLinkAuthCompoment = defineAsyncComponent(
  () => import('@/components/toPages/Auth/redirectLinkAuthCompoment.vue'),
)
const AuthLayout = defineAsyncComponent(() => import('@/layouts/AuthLayout.vue'))
import { defineComponent, reactive, ref, onMounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AuthService } from '../../services/auth.services'
const LegalAuthCompoment = defineAsyncComponent(
  () => import('@/components/toPages/Auth/legalAuthCompoment.vue'),
)
import { useAuthComposition } from '@/composables/auth.composition'
import axios from 'axios'
import { useMeta } from 'vue-meta'

export default defineComponent({
  components: {
    onlyInput,
    AuthLayout,
    btnAuthCompoment,
    RedirectLinkAuthCompoment,
    LegalAuthCompoment,
  },
  name: 'SignUp',
  props: {},
  setup(props, { expose }) {
    useMeta({ title: "S'inscrire", StyleSheetList })
    const headerData = reactive({
      title: 'Rejoignez-nous, maintenant sur DjoumAf.',
      sub: ` Créez votre réseau,
            trouvez un emploi ou des
            profils locaux adaptés à votre entreprise.`,
    })

    const { inputData, route, SignUp, isError, state } = useAuthComposition()

    return {
      headerData,
      route,
      SignUp,
      inputData,
      isError,
      state,
    }
  },
})
</script>

<style scoped></style>
