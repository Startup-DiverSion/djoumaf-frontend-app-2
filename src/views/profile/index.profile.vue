<template>
  <ModalStep
    :submit="setpOfCreation === 1 ? VerifyFiledStep__one : ProfileCreate"
  >
    <div class="flex">
      <div class="items-start w-10/12 m-auto flex flex-col pt-8 pb-4 gap-2">
        <span class="text-4xl font-bold">
          {{
            setpOfCreation === 1
              ? "Finalisez votre inscription !"
              : "Chosisez vos preferences"
          }}
        </span>
        <span class="text-base opacity-80">
          {{
            setpOfCreation === 1
              ? "Soignez votre profile, pour attirer les bonnes personnes."
              : "Cette étape permet à Djoumaf de vous guider tout au long de votre progression sur la plateforme."
          }}
        </span>
      </div>
    </div>

    <div :class="setpOfCreation === 1 ? 'flex' : 'hidden'">
      <CreatedProfile :inputData="inputData" :isError="isError" />
    </div>
    <div :class="setpOfCreation === 2 ? 'flex' : 'hidden'">
      <PreferenceProfile v-show="setpOfCreation === 2" :isError="isError" />
    </div>

    <div class="text-xs  w-10/12 m-auto py-8 flex flex-col">
      <span @click="CANCEL_INSCRIS" class="text-red-400 font-bold text-xs cursor-pointer">ANNULER EN CAS D'ECHEC (Cliquez-ici) </span>
      <span class="">(Veuillez vous connecter à votre compte pour continuer la création de votre profil. Merci !)</span>
    </div>

    <template #footer>
      <div class="fixed lg:absolute bottom-0 w-full">
        <div
          class="flex drop-shadow-[0_-1px_0.6px_rgba(0,0,0,0.05)] bg-white rounded-b-md z-40 w-full"
        >
          <div class="flex justify-between items-center w-10/12 py-4 m-auto">
            <div class="text-sm flex items-center gap-4">
              <span> {{ setpOfCreation }} sur 2 Page(s)</span>
              <span
                v-if="setpOfCreation >= 2"
                @click="goback"
                class="p-2 bg-gray-50 rounded-full cursor-pointer"
                >Retour</span
              >
            </div>

            <BtnNext v-if="setpOfCreation === 1" />
            <BtnSimple
              :label="
                state.loading_create_profile ? 'chargement...' : 'Terminer'
              "
              :disabled="state.loading_create_profile"
              v-else
            />
          </div>
        </div>
      </div>
    </template>
  </ModalStep>
</template>

<script lang="ts">
import { defineComponent, ref, computed, defineAsyncComponent } from "vue";
import CreatedProfile from "./created.profile.vue";
import PreferenceProfile from "./preference.profile.vue";
import ModalStep from "@/components/modals/modal.step.vue";
const BtnNext = defineAsyncComponent(
  () => import("@/components/buttons/btn.next.vue")
);
import { useProfileComposition } from "@/composables/profile.composition";
import { useProfileStore } from "@/stores/profile.store";
import { useUploadLocalFile } from "@/composables/uploadLocalFile";
const BtnSimple = defineAsyncComponent(
  () => import("@/components/buttons/btn.simple.vue")
);
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "auth-profile",
  props: [],
  components: {
    CreatedProfile,
    PreferenceProfile,
    ModalStep,
    BtnNext,
    BtnSimple,
  },
  setup() {

    const router = useRouter()
    const goback = () => {
      useProfileStore().setpOfCreation = useProfileStore().setpOfCreation - 1;
    };

    const { inputData, isError, ProfileCreate, VerifyFiledStep__one, state } =
      useProfileComposition();

    const jUseStore = useProfileStore();

    const setpOfCreation = computed(() => {
      const PROFILE_AUTH_CLASS :any =  document.querySelector('.PROFILE_AUTH')
      PROFILE_AUTH_CLASS?.scrollTo(0,0)
      return jUseStore.setpOfCreation;
    });

    const CANCEL_INSCRIS =  () => {
      new LocalSotreUtils().clear()
      router.push('/auth/sign-in')
    }

    const step = ref(1);
    return {
      step,
      inputData,
      isError,
      setpOfCreation,
      goback,
      VerifyFiledStep__one,
      ProfileCreate,
      state,
      CANCEL_INSCRIS
    };
  },
});
</script>

<style scoped></style>
