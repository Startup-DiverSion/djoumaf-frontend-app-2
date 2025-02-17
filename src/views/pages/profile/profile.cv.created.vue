<template>
  <HomeTwoLayout>
    <template #small>
      <div
        class="flex w-full lg:h-24 h-16 pt-4 justify-start lg:justify-center lg:px-0 px-2 overflow-auto"
      >
        <div class="flex items-center" v-for="(menu, index) in MenuCv">
          <div class="flex flex-col items-center justify-center w-full">
            <div
              class="lg:p-3 p-2 rounded-full inline-flex"
              :class="toAccess == index ? 'bg-blue-200 text-white' : 'bg-gray-200'"
              @click="toAccess = menu.id"
            >
              <AvatarIcon :path="menu.icon" className="lg:h-6 h-4" />
            </div>
            <span
              class="absolute text-[10px] top-12 lg:flex hidden"
              :class="toAccess == index ? 'text-blue-200 font-bold' : ''"
            >
              {{ menu.name }}
            </span>
          </div>

          <div
            v-if="MenuCv.length != index + 1"
            class="inline-flex h-[0.15rem] lg:w-12 w-8"
            :class="toAccess == index ? 'bg-blue-200 text-white' : 'bg-gray-200'"
          ></div>
        </div>
      </div>

      <div class="flex flex-col">
        <!-- Basic -->
        <InfoCreatedCv
          :toAccess="toAccess"
          :CV_BasicInfo="CV_BasicInfo"
          :uploadImage="uploadImage"
        />

        <!-- Formation -->
        <CourseCreatedCv
          :toAccess="toAccess"
          :CV_Data="CV_Formation"
          :RemoveData="removeDataInFormation"
          :AddNewData="AddNewFormation"
        />

        <!-- Experience -->
        <ExperienceCreatedCv
          :toAccess="toAccess"
          :CV_Data="CV_Experience"
          :RemoveData="removeDataInExperience"
          :AddNewData="AddNewExperience"
        />

        <!-- Competance -->
        <SkillCreatedCv
          :toAccess="toAccess"
          :CV_Data="CV_Competence"
          :RemoveData="removeDataInCompetence"
          :AddNewData="AddNewCompetence"
        />

        <!-- Reference -->
        <ReferenceCreatedCv
          :toAccess="toAccess"
          :CV_Data="CV_References"
          :RemoveData="removeDataInReference"
          :AddNewData="AddNewReference"
        />

        <!-- Quality -->
        <QualityCreatedCv
          :toAccess="toAccess"
          :CV_Data="CV_Quality"
          :RemoveData="removeDataInQuality"
          :AddNewData="AddNewQuality"
        />

        <!-- Centers of interest -->
        <InterestCreatedCv :toAccess="toAccess" :CV_Data="CV_BasicInfo" />
      </div>
    </template>

    <template #middle>
      <div
        class="fixed z-20 lg:top-20 hidden lg:flex flex-col bottom-0 font-love w-full lg:sticky preview"
      >
        <div class="flex w-11/12 m-auto justify-between">
          <span></span>
          <XMarkIcon class="lg:hidden flex h-6 relative top-10 z-20" @click="Preview(false)" />
        </div>

        <ColorCreatedCvOptions
          :OptionColorDataCv="OptionColorCv"
          :CooColor="optionColor"
          :ChooseColorCv="ChooseColorCv"
          v-if="route.params.id && route.params.id.includes('prenium')"
        />

        <CardMedia label="Preview votre CV.">
          <CvIndex
            :experience="CV_Experience"
            :formation="CV_Formation"
            :competence="CV_Competence"
            :references="CV_References"
            :info="CV_BasicInfo"
            :quality="CV_Quality"
            :color="optionColor"
          />

          <div class="flex flex-col gap-1">
            <button
              type="button"
              class="text-blue-700 border-[1px] border-blue-700 rounded-full px-3 py-2 mt-2 text-xs justify-center flex items-center gap-1"
              @click="exportToPDF"
            >
              <ArrowDownTrayIcon class="h-4" />
              <span class="font-bold">Telechargez</span>
            </button>

            <div class="flex gap-2 items-center">
              <div class="bg-gray-100 rounded-full h-8 flex items-center w-[47%]">
                <input
                  type="text"
                  class="h-5 bg-transparent rounded-full py-2 px-4 text-sm"
                  v-model="nameToSave"
                />
              </div>

              <button
                type="button"
                class="bg-blue-700/80 rounded-full px-3 py-2 text-white text-xs flex items-center gap-1"
                @click="SaveCvInDataBase"
              >
                <CloudArrowDownIcon class="h-4" />
                <span class="font-bold">Enrégistre & Telechargez</span>
              </button>
            </div>
          </div>
        </CardMedia>
      </div>
    </template>
  </HomeTwoLayout>

  <!-- <div
    class="fixed bottom-4 lg:hidden text-white right-4 bg-blue-700 z-10 px-2 py-1 rounded-full flex gap-1 items-center"
    @click="Preview(close)"
  >
    <EyeIcon class="h-4" />
    <span class="">Preview</span>
  </div> -->
</template>

<script setup lang="ts">
import { jsPDF } from 'jspdf'
const OnlyInput = defineAsyncComponent(() => import('@/components/forms/onlyInput.vue'))
const HomeTwoLayout = defineAsyncComponent(() => import('@/layouts/HomeTwoLayout.vue'))
import { defineComponent, onMounted, reactive, ref, defineAsyncComponent } from 'vue'
import Editor from '@tinymce/tinymce-vue'
const formSelect = defineAsyncComponent(() => import('@/components/forms/form.select.vue'))
const formDate = defineAsyncComponent(() => import('@/components/forms/form.date.vue'))
const CardMedia = defineAsyncComponent(() => import('@/components/cards/medias/card.media.vue'))
const CardPostProfile = defineAsyncComponent(
  () => import('@/components/cards/card.post.profile.vue'),
)

const CvIndex = defineAsyncComponent(() => import('@/CV/cv.index.vue'))
import moment from 'moment'
import { usePreferenceComposition } from '@/composables/preference.composition'
import VueSelect from 'vue-select'
import { useUploadLocalFile } from '@/composables/uploadLocalFile'
import BtnRemove from '@/components/buttons/btn.remove.vue'
import BtnAdd from '@/components/buttons/btn.add.vue'
import {
  ArrowDownTrayIcon,
  EyeIcon,
  XMarkIcon,
  LockClosedIcon,
  LockOpenIcon,
  CloudArrowDownIcon,
} from '@heroicons/vue/24/solid'

import { NotifUtils } from '@/vendors/utils/notif.utils'
import { useRoute } from 'vue-router'
import AvatarIcon from '@/components/avatar/avatarIcon.vue'
import InfoCreatedCv from './__partiels/created/info.created.cv.vue'
import { useCvComposition } from '@/composables/cv.composition'
import CourseCreatedCv from './__partiels/created/course.created.cv.vue'
import ExperienceCreatedCv from './__partiels/created/experience.created.cv.vue'
import QualityCreatedCv from './__partiels/created/quality.created.cv.vue'
import SkillCreatedCv from './__partiels/created/skill.created.cv.vue'
import ReferenceCreatedCv from './__partiels/created/reference.created.cv.vue'
import InterestCreatedCv from './__partiels/created/interest.created.cv.vue'
import ColorCreatedCvOptions from './__partiels/created/color.created.cv.options.vue'

const { preferenceData, getAllParameter } = usePreferenceComposition()
onMounted(() => {
  getAllParameter()
})

const {
  router,
  route,
  findCV,
  state_cv,
  DeleteCV,
  exportToPDF,
  CV_Experience,
  AddNewExperience,
  CV_Formation,
  AddNewFormation,
  removeDataInExperience,
  AddNewCompetence,
  CV_Competence,
  CV_BasicInfo,
  uploadImage,
  removeDataInFormation,
  removeDataInCompetence,
  removeDataInQuality,
  AddNewReference,
  removeDataInReference,
  CV_References,
  AddNewQuality,
  CV_Quality,
  Preview,
  SaveCvInDataBase,
  nameToSave,
  optionColor,
  AllColor,
  MenuCv,
  toAccess,
  OptionColorCv,
  ChooseColorCv,
} = useCvComposition()
</script>

<style scoped>
label {
  @apply text-[13px];
  @apply font-bold;
  @apply opacity-80;
}

#id-title {
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
