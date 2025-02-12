<template>
  <div class="w-10/12 m-auto flex flex-col pt-4 gap-4">
    <div class="flex flex-col lg:flex-row gap-2">
      <OnlyForm
        name="first_name"
        label="Prenoms"
        placeholder="Emmanuel"
        :modelValue="inputData.first_name"
        @update:modelValue="inputData.first_name = $event.target.value"
        :errorInput="isError"
      />
      <OnlyForm
        name="last_name"
        :modelValue="inputData.last_name"
        @update:modelValue="inputData.last_name = $event.target.value"
        :errorInput="isError"
        label="Nom"
        placeholder="Yao"
      />
    </div>

    <OnlyForm
      name="bio"
      :modelValue="inputData.bio"
      @update:modelValue="inputData.bio = $event.target.value"
      :errorInput="isError"
      label="Bio"
      placeholder="Senior web developper at Calatis"
    />

    <div class="flex flex-col">
      <label for="id-title" class="text-base">Décrivez-vous </label>
      <textarea
        name="description"
        v-model="inputData.description"
        id="in-info"
        class="outline-none border-[1px] rounded-md p-4 text-base font-light"
        placeholder="Étudiant en Master 2 Droit/
Collaborateur à Office notarial Me Augustin GNÉKOYAMOU/Cogérant de la CCEJ-SARL (Clinique de Conseil et d'expertise Juridique)."
        cols="30"
        rows="5"
      >
Étudiant en Master 2 Droit/
Collaborateur à Office notarial Me Augustin GNÉKOYAMOU/Cogérant de la CCEJ-SARL (Clinique de Conseil et d'expertise Juridique).</textarea
      >
      <span
        class="text-sm font-love text-red-500 mt-1 mx-1"
        v-if="isError.path === 'description'"
      >
        {{ isError.message }}
      </span>
    </div>

    <div class="flex flex-col gap-4">
      <label for="id-title"> Ajouter une photo de profil. </label>

      <!-- Input To select Files -->
      <div class="flex items-center gap-4">
        <img
          v-if="toImageConvert.length !== 0"
          class="w-24 h-24 object-cover rounded-full"
          :src="toImageConvert[0]"
          alt=""
        />
        <UserIcon
          v-else
          class="flex bg-blue-50 w-24 h-24 rounded-full items-center justify-center opacity-50"
        />
        <input
          type="file"
          name="filesPost"
          @change="uploadImage"
          accept="image/png,image/gif,image/jpeg,image/jpg,image/*"
          id="id-files-profile"
          class="absolute hidden"
        />

        <label
          for="id-files-profile"
          class="bg-green-600/70 text-white text-sm font-bold cursor-pointer rounded-full px-2 py-1"
        >
          Modifer
        </label>
      </div>
      <span
        class="text-sm font-love text-red-500 mt-1 mx-1"
        v-if="isError.path === 'image'"
      >
        {{ isError.message }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from "vue";
import ModalStep from "@/components/modals/modal.step.vue";
import OnlyForm from "@/components/forms/onlyInput.vue";
import { useUploadLocalFile } from "@/composables/uploadLocalFile";
import { useProfileComposition} from "@/composables/profile.composition";
const BtnNext= defineAsyncComponent(() =>
import('@/components/buttons/btn.next.vue')
)
import { useProfileStore } from "@/stores/profile.store"
import { UserIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "SignCreatedProfile",
  components: { ModalStep, OnlyForm, BtnNext, UserIcon },
  props: ["inputData", "isError"],
  setup() {
    const { toImageConvert, image, binaryImage } = useUploadLocalFile();

    const uploadImage = (event: any) => {
      useProfileStore().binaryImageToInput = binaryImage;
      image(event);
    };

    return { uploadImage, toImageConvert };
  },
});
</script>

<style scoped></style>
