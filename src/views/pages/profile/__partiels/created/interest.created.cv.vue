<template>
  <section class="flex flex-col lg:p-4 lg:w-11/12 w-full m-auto gap-4" v-if="toAccess == 6">
    <div class="flex bg-gray-50 p-2 opacity-90 uppercase justify-between">
      <span class="text-base font-bold">Vos centres d'intérêt</span>
      <LockOpenIcon class="w-6 h-6" />
      <LockClosedIcon
        class="w-6 h-6"
        v-if="route.params.id && !route.params.id.includes('prenium')"
      />
    </div>

    <!-- Data -->
    <div class="flex flex-col gap-4 lg:px-8 px-4">
      <div class="flex flex-col w-full">
        <label for="id-title" class="text-sm font-semibold">Centre d'intêret </label>

        <VueSelect
          class="font-love text-base placeholder:text-xs"
          v-model="CV_Data.hobit"
          :options="preferenceData(2)"
          name="basic_interet"
          label="title"
          multiple="true"
          placeholder="Chosisez vos centre d'intêrets"
        />
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
import { useRoute } from 'vue-router'

defineProps(['toAccess', 'CV_Data', 'removeData', 'AddNewData'])

const route = useRoute()

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
