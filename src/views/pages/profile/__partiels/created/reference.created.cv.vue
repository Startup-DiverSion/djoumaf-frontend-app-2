<template>
    <section
        class="flex flex-col lg:p-4 lg:w-11/12 w-full m-auto"
        v-if="toAccess == 7"
      >
        <div class="flex justify-between bg-gray-50 p-2 opacity-90 uppercase">
          <span class="text-base font-bold">Mes References</span>
 
        </div>

        <!-- Data -->
        <div
          class="flex flex-col gap-4 lg:px-8 px-4"
        >
          <div v-for="(refc, index) in CV_Data">
            <div class="flex flex-col gap-4 pt-4">
              <div class="text-sm font-semibold">Reference #{{ index + 1 }}</div>

              <div class="flex flex-col w-full">
                <label for="id-title">Nom complet </label>
                <OnlyInput
                  placeholder="Jean Luc Banjon"
                  :modelValue="refc.fullname"
                  @update:modelValue="refc.fullname = $event.target.value"
                  name="fullname"
                />
              </div>

              <div class="flex flex-col w-full">
                <label for="id-title">Status </label>
                <OnlyInput
                  placeholder="Medecin, MDL"
                  :modelValue="refc.domaine"
                  @update:modelValue="refc.domaine = $event.target.value"
                  name="fullname"
                />
              </div>

              <div class="grid grid-cols-2 gap-4 w-full">
                <div class="flex flex-col w-full">
                  <label for="id-title">Telephone </label>
                  <OnlyInput
                    placeholder="+225 02 021 560 20"
                    :modelValue="refc.contacts[0].value"
                    @update:modelValue="
                      refc.contacts[0].value = $event.target.value
                    "
                    name="phone"
                  />
                </div>
                <div class="flex flex-col w-full">
                  <label for="id-title">Email </label>
                  <OnlyInput
                    placeholder="ref@domain.com"
                    :modelValue="refc.contacts[1].value"
                    @update:modelValue="
                      refc.contacts[1].value = $event.target.value
                    "
                    name="email"
                  />
                </div>
              </div>
            </div>
            <BtnRemove
              label="suprimer cette reference"
              :index="index"
              @click="removeData(index)"
            />
          </div>

          <div class="">
            <BtnAdd label="Ajouer une reference" @click="AddNewData" />
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
    props: ["toAccess", "CV_Data", 'removeData', 'AddNewData'],
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
  