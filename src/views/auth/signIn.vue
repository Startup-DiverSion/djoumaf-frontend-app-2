<template>
  <AuthLayout :head="headerData" :authConnexion="SignIn">
    <template v-slot:default>
      <div class="flex flex-col gap-4">
        <OnlyInput
          placeholder="Adresse Electronique (Professionnelle)"
          type="email"
          name="email"
          :modelValue="inputData.email"
          @update:modelValue="inputData.email = $event.target.value"
          :errorInput="isError"
        />
        <OnlyInput
          placeholder="Mot de passe"
          type="password"
          :modelValue="inputData.password"
          name="password"
          @update:modelValue="inputData.password = $event.target.value"
          :errorInput="isError"
        />

        <div class="flex justify-start text-xs items-center">
          <span class="text-sm">Vous avez oublié votre ?</span>
          <RouterLink
            :to="{ name: 'SignChangeEmail' }"
            class="hover:bg-blue-200 text-blue-500 px-2 py-1 font-love text-sm rounded-full"
          >
            <span class="">Mot de passe </span>
          </RouterLink>
        </div>
      </div>

      <btnAuthCompoment label="Se connecter" :is-loading="state.loading" />
    </template>

    <template v-slot:redirect>
      <RedirectLinkAuthCompoment
        routeName="SignIn"
        quiz="Première fois sur DjoumAf ?"
        route-label="Inscrivez-vous"
        routeLink="SignUp"
      />
    </template>
  </AuthLayout>
</template>

<script lang="ts">
const AuthLayout = defineAsyncComponent(() => import('@/layouts/AuthLayout.vue'))
import { defineComponent, reactive, ref, defineAsyncComponent } from 'vue'
const OnlyInput = defineAsyncComponent(() => import('@/components/forms/onlyInput.vue'))
const btnAuthCompoment = defineAsyncComponent(
  () => import('@/components/toPages/Auth/btnAuthCompoment.vue'),
)
const RedirectLinkAuthCompoment = defineAsyncComponent(
  () => import('@/components/toPages/Auth/redirectLinkAuthCompoment.vue'),
)
import { useAuthComposition } from '@/composables/auth.composition'
import { useMeta } from 'vue-meta'
export default defineComponent({
  name: 'SignIn',
  components: {
    AuthLayout,
    OnlyInput,
    btnAuthCompoment,
    RedirectLinkAuthCompoment,
  },
  props: {},
  setup() {
    useMeta({ title: 'Se connecter', StyleSheetList })
    const headerData = reactive({
      title: "Connectez-vous, votre reseau n'attend que vous...",
      sub: `Developper votre reseau afin de gagner en notériter et en visibilité sur DjoumAf.`,
    })

    const { inputData, isError, SignIn, state } = useAuthComposition()

    return {
      headerData,
      inputData,
      isError,
      SignIn,
      state,
    }
  },
})
</script>

<style scoped></style>
