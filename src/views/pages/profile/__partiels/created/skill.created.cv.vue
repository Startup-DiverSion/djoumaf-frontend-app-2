<template>
  <section class="flex flex-col lg:p-4 lg:w-11/12 w-full m-auto" v-if="toAccess == 3">
    <div class="flex bg-gray-50 p-2 opacity-90 uppercase">
      <span class="text-base font-bold">Mes Competance</span>
    </div>

    <!-- Data -->
    <div class="flex flex-col gap-4 lg:px-8 px-4">
      <div v-for="(comp, index) in CV_Data">
        <div class="flex flex-col gap-4 pt-4">
          <div class="text-sm font-semibold">Competance #{{ index + 1 }}</div>

          <!--  -->
          <div class="grid grid-cols-3 gap-4 w-full">
            <div class="flex flex-col w-full col-span-2">
              <label for="id-title">libelle </label>
              <OnlyInput
                placeholder="JavaScript"
                :modelValue="comp.libelle"
                @update:modelValue="comp.libelle = $event.target.value"
                name="libelle"
              />
            </div>

            <div class="flex flex-col">
              <label for="id-title">Niveau <span class="text-sm">(%)</span> </label>
              <OnlyInput
                placeholder="50"
                type="number"
                name="per"
                :modelValue="comp.per"
                @update:modelValue="comp.per = $event.target.value"
              />
            </div>
          </div>
        </div>
        <BtnRemove label="suprimer cette competence" :index="index" @click="removeData(index)" />
      </div>
    </div>

    <div class="">
      <BtnAdd label="Ajouer une competence" @click="AddNewData" />
    </div>
  </section>
</template>

<script setup lang="ts">
const OnlyInput = defineAsyncComponent(() => import('@/components/forms/onlyInput.vue'))
const HomeTwoLayout = defineAsyncComponent(() => import('@/layouts/HomeTwoLayout.vue'))
import { defineComponent, onMounted, reactive, ref, defineAsyncComponent } from 'vue'

const formSelect = defineAsyncComponent(() => import('@/components/forms/form.select.vue'))
const formDate = defineAsyncComponent(() => import('@/components/forms/form.date.vue'))

const CvIndex = defineAsyncComponent(() => import('@/CV/cv.index.vue'))
import { usePreferenceComposition } from '@/composables/preference.composition'
import VueSelect from 'vue-select'
import BtnRemove from '@/components/buttons/btn.remove.vue'
import BtnAdd from '@/components/buttons/btn.add.vue'
import AvatarIcon from '@/components/avatar/avatarIcon.vue'

defineProps(['toAccess', 'CV_Data', 'removeData', 'AddNewData'])

const { preferenceData, getAllParameter } = usePreferenceComposition()
onMounted(() => {
  getAllParameter()
})
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
