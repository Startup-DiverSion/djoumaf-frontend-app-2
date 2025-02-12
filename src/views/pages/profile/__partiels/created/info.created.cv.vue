<template>
  <!-- Basic -->
  <section
    class="flex flex-col lg:p-4 lg:w-11/12 w-full m-auto"
    v-if="toAccess == 0"
  >
    <div class="flex bg-gray-50 p-2 opacity-90 uppercase">
      <span class="text-base font-bold">Mes info basic</span>
    </div>

    <!-- Data -->
    <div class="flex flex-col gap-4 lg:px-8 px-4">
      <div class="flex flex-col gap-4 pt-4">
        <div class="flex flex-col w-full">
          <label for="id-title"> Photo de profile </label>
          <OnlyInput
            @change="uploadImage"
            placeholder="Ange Emmanuel Diomande"
            type="file"
            name="basic_image"
          />
          <label for="id-title" class="text-red-400 text-xs">
            (Veillez ajouter une image carré svp (eg:200x200))
          </label>
        </div>

        <div class="grid grid-cols-2 gap-4 w-full">
          <div class="flex flex-col w-full">
            <label for="id-title">Nom </label>
            <OnlyInput
              placeholder="Jean Bilat"
              :modelValue="CV_BasicInfo.firstname"
              @update:modelValue="CV_BasicInfo.firstname = $event.target.value"
              name="basic_name"
            />
          </div>
          <div class="flex flex-col w-full">
            <label for="id-title">Prenoms </label>
            <OnlyInput
              placeholder="Jean Bilat"
              :modelValue="CV_BasicInfo.lastname"
              @update:modelValue="CV_BasicInfo.lastname = $event.target.value"
              name="basic_name"
            />
          </div>
        </div>

        <div class="flex flex-col w-full">
          <label for="id-title"> Domaine professionel </label>
          <OnlyInput
            placeholder="Developpeur web | Mobile"
            :modelValue="CV_BasicInfo.profession"
            @update:modelValue="CV_BasicInfo.profession = $event.target.value"
            name="basic_profession"
          />
        </div>

        <!--  -->
        <div class="grid grid-cols-2 gap-4 w-full">
          <div class="flex flex-col w-full">
            <label for="id-title">Contact </label>
            <OnlyInput
              placeholder="+225 01 008 580 30"
              :modelValue="CV_BasicInfo.me.tel"
              @update:modelValue="CV_BasicInfo.me.tel = $event.target.value"
              name="basic_contact"
            />
          </div>

          <div class="flex flex-col">
            <label for="id-title"> Mail </label>
            <OnlyInput
              placeholder="name@domaine.com"
              name="basic_mail"
              :modelValue="CV_BasicInfo.me.mail"
              @update:modelValue="CV_BasicInfo.me.mail = $event.target.value"
            />
          </div>
        </div>

        <!--  -->
        <div class="grid grid-cols-2 gap-4 w-full">
          <div class="flex flex-col w-full">
            <label for="id-title">Site </label>
            <OnlyInput
              placeholder="www.djoumaf.net"
              :modelValue="CV_BasicInfo.me.site"
              @update:modelValue="CV_BasicInfo.me.site = $event.target.value"
              name="basic_site"
            />
          </div>

          <div class="flex flex-col">
            <label for="id-title">Localisation </label>
            <OnlyInput
              name="basic_place"
              placeholder="Abidjan, Côte d'ivoire"
              :modelValue="CV_BasicInfo.me.place"
              @update:modelValue="CV_BasicInfo.me.place = $event.target.value"
            />
          </div>
        </div>

        <div class="flex flex-col">
          <label for="id-title">A propos </label>
          <OnlyInput
            name="company"
            placeholder="Passionner par le deveploment d'application web et mobile."
            :modelValue="CV_BasicInfo.about"
            @update:modelValue="CV_BasicInfo.about = $event.target.value"
          />
        </div>

        
      </div>
    </div>
  </section>
</template>

<script lang="ts">
const OnlyInput = defineAsyncComponent(
  () => import("@/components/forms/onlyInput.vue")
);
const HomeTwoLayout = defineAsyncComponent(
  () => import("@/layouts/HomeTwoLayout.vue")
);
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  defineAsyncComponent,
} from "vue";

const formSelect = defineAsyncComponent(
  () => import("@/components/forms/form.select.vue")
);
const formDate = defineAsyncComponent(
  () => import("@/components/forms/form.date.vue")
);


const CvIndex = defineAsyncComponent(() => import("@/CV/cv.index.vue"));
import { usePreferenceComposition } from "@/composables/preference.composition";
import VueSelect from "vue-select";
import BtnRemove from "@/components/buttons/btn.remove.vue";
import BtnAdd from "@/components/buttons/btn.add.vue";
import AvatarIcon from "@/components/avatar/avatarIcon.vue";

export default defineComponent({
  name: "",
  components: {
    HomeTwoLayout,
    OnlyInput,
    formSelect,
    formDate,
    CvIndex,
    VueSelect,
    BtnRemove,
    BtnAdd
  },
  props: ["toAccess", "CV_BasicInfo", 'uploadImage'],
  setup(props) {
    const { preferenceData, getAllParameter } = usePreferenceComposition();
    onMounted(() => {
      getAllParameter();
    });

   

    return {
      preferenceData
    };
  },
});
</script>

<style scoped>
label {
  @apply text-[13px];
  @apply font-bold;
  @apply opacity-80;
}
.triangle {
  width: 0;
  height: 0;
  border: 0 solid transparent;
  border-right-width: 10px;
  border-left-width: 10px;
  border-bottom: 12px solid;
}
</style>
