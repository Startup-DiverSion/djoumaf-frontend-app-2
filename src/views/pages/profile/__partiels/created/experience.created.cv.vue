<template>
    <section
        class="flex flex-col lg:p-4 lg:w-11/12 w-full m-auto"
        v-if="toAccess == 2"
      >
        <div class="flex bg-gray-50 p-2 opacity-90 uppercase">
          <span class="text-base font-bold">Mes experience professionelle</span>
        </div>

        <!-- Data -->
        <div class="flex flex-col gap-4 lg:px-8 px-4">
          <div v-for="(exp, index) in CV_Data" :key="index">
            <div class="flex flex-col gap-4 pt-4">
              <div class="text-sm font-semibold">
                Experience #{{ index + 1 }}
              </div>

              <!-- Type de d'experience -->
              <div class="flex flex-col">
                <label for="id-title">Type d'experience</label>
                <OnlyInput
                  placeholder="Senior Full Stack Web et Mobile"
                  name="type_experience"
                  :modelValue="exp.type_exp"
                  @update:modelValue="
                    CV_Data[index].type_exp = $event.target.value
                  "
                />
              </div>

              <!-- Input Date de debut -->
              <div class="grid grid-cols-2 gap-4 w-full">
                <div class="flex flex-col w-full">
                  <label for="id-title">Date de debut</label>
                  <formDate
                    name="date_start"
                    :modelValue="exp.date_start"
                    @update:modelValue="exp.date_start = $event.target.value"
                  />
                </div>

                <div class="flex flex-col">
                  <label for="id-title">Date de fin</label>
                  <formDate
                    :modelValue="exp.date_fin"
                    name="date_fin"
                    @update:modelValue="exp.date_fin = $event.target.value"
                  />
                </div>
              </div>

              <!--  -->
              <div class="grid grid-cols-2 gap-4 w-full">
                <div class="flex flex-col w-full">
                  <label for="id-title">Localisation </label>
                  <OnlyInput
                    placeholder="Abidjan(Rivera), Côte d'ivoire"
                    :modelValue="exp.place"
                    @update:modelValue="exp.place = $event.target.value"
                    name="place"
                  />
                </div>

                <div class="flex flex-col">
                  <label for="id-title">Entreprise </label>
                  <OnlyInput
                    placeholder="Startup Deversion"
                    name="company"
                    :modelValue="exp.compagny"
                    @update:modelValue="exp.compagny = $event.target.value"
                  />
                </div>
              </div>

              <div class="flex flex-col">
                <label for="id-title">Description </label>
                <textarea
                  class="border-[1px] rounded-lg h-24"
                  name="company_description"
                  v-model="exp.description"
                ></textarea>
              </div>

              <div class="">
                <BtnRemove
                  label="suprimer cette experience"
                  :index="index"
                  @click="removeData(index)"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="">
          <BtnAdd label="Ajouer une experience" @click="AddNewData" />
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
  