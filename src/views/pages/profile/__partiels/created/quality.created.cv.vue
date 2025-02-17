<template>
  <!-- v-if="$route.params.id && $route.params.id.includes('prenium')" -->
  <section class="flex flex-col lg:p-4 lg:w-11/12 w-full m-auto" v-if="toAccess == 5">
    <div class="flex bg-gray-50 p-2 opacity-90 uppercase justify-between">
      <span class="text-base font-bold" id="id-heading">Mes Qualites</span>
      <LockOpenIcon class="w-6 h-6" />
      <LockClosedIcon class="w-6 h-6" />
    </div>

    <!-- Data -->
    <div class="flex flex-col gap-4 lg:px-8 px-4">
      <div v-for="(qual, index) in CV_Data">
        <div class="flex flex-col gap-4 pt-4">
          <div class="font-semibold text-sm" id="id-title">Qualité #{{ index + 1 }}</div>

          <!--  -->
          <div class="grid grid-cols-3 gap-4 w-full">
            <div class="flex flex-col w-full col-span-2">
              <label for="id-title">libelle </label>
              <OnlyInput
                placeholder="JavaScript"
                :modelValue="qual.libelle"
                @update:modelValue="qual.libelle = $event.target.value"
                name="libelle"
              />
            </div>

            <div class="flex flex-col">
              <label for="id-title">Niveau <span class="text-sm">(%)</span> </label>
              <OnlyInput
                placeholder="50"
                type="number"
                name="per"
                :modelValue="qual.per"
                @update:modelValue="qual.per = $event.target.value"
              />
            </div>
          </div>
        </div>
        <BtnRemove label="suprimer cette qualité" :index="index" @click="removeData(index)" />
      </div>

      <div class="">
        <BtnAdd label="Ajouer une qualité" @click="AddNewData" />
      </div>
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
