<template>
  <section class="flex flex-col w-full">
    <div class="flex mb-2 px-4 md:px-16 py-4 border-b-[1px] rounded-t-md">
      <span class="text-xl text-gray-700 font-bold">
        {{ data === 'created' ? 'Creation' : 'Modification' }} offre d'emploi</span
      >
    </div>

    <div class="flex flex-col gap-8 px-4 md:px-16 py-8">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label for="id-title">Intitulé du poste</label>
          <OnlyInput
            placeholder="eg: Developpeur d'application web"
            name="title"
            :modelValue="inputDataJob.title"
            @update:modelValue="inputDataJob.title = $event.target.value"
            :error-input="isError"
          />
        </div>

        <!--  -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div class="flex flex-col w-full">
            <label for="id-title">Domaine d'activité </label>

            <VueSelect
              class="font-love text-base"
              v-model="inputDataJob.field_activity"
              :options="preferenceData(1)"
              name="field_activity"
              label="title"
              placeholder="Choix un domaine d'activité"
            />

            <span
              class="text-xs font-bold font-love text-red-500 mt-1 mx-1"
              v-if="isError.path === 'field_activity'"
            >
              {{ isError.message }}
            </span>
          </div>

          <div class="flex flex-col">
            <label for="id-title">Lieu de travail </label>
            <formSelect
              :modelValue="inputDataJob.work_place"
              @update:modelValue="inputDataJob.work_place = $event.target.value"
              name="work_place"
              :data="preferenceData(5)"
              placeholder="Quel est le lieu de travail"
            />
          </div>
        </div>

        <!--  -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div class="flex flex-col w-full">
            <label for="id-title">Type de contract</label>
            <formSelect
              :modelValue="inputDataJob.contract_type"
              @update:modelValue="inputDataJob.contract_type = $event.target.value"
              name="contract_type"
              :data="preferenceData(6)"
              placeholder="Le type de contrat pour le poste"
              :error-input="isError"
            />
          </div>

          <div class="flex flex-col">
            <label for="id-title">Date limite</label>
            <formDate
              v-if="data === 'edit' && inputDataJob.dead_line"
              name="dead_line"
              :model-value="inputDataJob.dead_line"
              @update:modelValue="inputDataJob.dead_line = $event.target.value"
              :error-input="isError"
            />
            <formDate
              v-if="data !== 'edit'"
              name="dead_line"
              :model-value="inputDataJob.dead_line"
              @update:modelValue="inputDataJob.dead_line = $event.target.value"
              :error-input="isError"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div class="flex flex-col w-full">
            <label for="id-title">Pour quel pays?</label>
            <VueSelect
              class="font-love text-base"
              v-model="inputDataJob.localizaton_country"
              :options="Places.country"
              name="localizaton_country"
              label="name"
              placeholder="Selectionner le pays"
            />
            <span
              class="text-sm font-love text-red-500 mt-1 mx-1"
              v-if="isError.path === 'localizaton_country'"
            >
              {{ isError.message }}
            </span>
          </div>
          <div class="flex flex-col w-full">
            <label for="id-title">Dans quelle ville?</label>

            <VueSelect
              v-model="inputDataJob.localizaton_city"
              :options="localizatonCity"
              label="name"
              class="font-love text-base"
              placeholder="Selectioner la ville"
              name="localizaton_city"
            />
            <span
              class="text-sm font-love text-red-500 mt-1 mx-1"
              v-if="isError.path === 'localizaton_city'"
            >
              {{ isError.message }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex">
        <span class="text-lg">Descriptif du poste</span>
      </div>

      <div class="flex flex-col w-full">
        <!-- <editor
        placeholder="Pour rendre votre offre d'emploi plus informatif, il pourrait être judicieux de mettre à jour votre description."
          output-format="text"
          v-model="inputDataJob.description"
          :init="initilization()"
          api-key="k184r5i8ai2e80c8i5uw5msmrige88nhfq2jj89d513v5uwg"
        /> -->

        <textarea
          v-model="inputDataJob.description"
          name="description"
          id="description"
          class="w-full border-[1px] rounded-md p-4"
          placeholder="Pour rendre votre offre d'emploi plus informatif, il pourrait être judicieux de mettre à jour votre description."
          rows="10"
        ></textarea>

        <span
          class="text-sm font-love text-red-500 mt-1 mx-1"
          v-if="isError.path === 'description'"
        >
          {{ isError.message }}
        </span>
      </div>
      <!-- undo redo | removeformat | a11ycheck code table help -->

      <div class="flex justify-between">
        <div class="flex items-center text-lg underline">
          <button
            :disabled="loading_delete"
            class="text-red-500 underline"
            v-if="data == 'edit'"
            @click="deleteJob({ id: inputDataJob.id })"
          >
            {{ loading_delete ? 'En cours...' : 'Supprimer' }}
          </button>
          <RouterLink :to="{ name: 'Jobs' }" v-if="data == 'create'">Annuler</RouterLink>
        </div>

        <BtnSimple
          :label="
            state.loading ? 'Chargement...' : data === 'created' ? 'Publier l\'offre' : 'Modifier'
          "
          :disabled="state.loading"
          classe-name="px-8 py-3 text-base"
          @click="data == 'created' ? createNewJob() : updateJob()"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const OnlyInput = defineAsyncComponent(() => import('@/components/forms/onlyInput.vue'))
const HomeTwoLayout = defineAsyncComponent(() => import('@/layouts/HomeTwoLayout.vue'))
import { defineComponent, onMounted, ref, reactive, computed, defineAsyncComponent } from 'vue'
import Editor from '@tinymce/tinymce-vue'
const formSelect = defineAsyncComponent(() => import('@/components/forms/form.select.vue'))
const formDate = defineAsyncComponent(() => import('@/components/forms/form.date.vue'))
const CardMedia = defineAsyncComponent(() => import('@/components/cards/medias/card.media.vue'))
const CardPostProfile = defineAsyncComponent(
  () => import('@/components/cards/card.post.profile.vue'),
)
import { usePreferenceComposition } from '@/composables/preference.composition'
import { JobService } from '@/services/job.services'
import moment from 'moment'
const BtnNext = defineAsyncComponent(() => import('@/components/buttons/btn.next.vue'))
const BtnSimple = defineAsyncComponent(() => import('@/components/buttons/btn.simple.vue'))
import VueSelect from 'vue-select'
import axios from 'axios'
import { useJobComposition } from '../job.compositoin'
import { useRoute } from 'vue-router'

const props = defineProps(['data', 'slug'])
const address = ref('')
const JobDetail: any = ref()
const route = useRoute()

const {
  inputDataJob,
  createNewJob,
  isError,
  state,
  localizaton,
  loading_delete,
  localizatonCity,
  deleteJob,
  updateJob,
  Places,
} = useJobComposition()
const { preferenceData, getAllParameter } = usePreferenceComposition()

//
onMounted(async () => {
  inputDataJob.description = ``
  await getAllParameter()
  await localizaton()
  console.log(props.data)
  if (props.data === 'edit') {
    await Job__findone()
  }
})

// Get specify job
const Job__findone = async () => {
  const { JobOne, profile, e } = await new JobService().findOne(route.params?.slug)

  if (JobOne) {
    JobDetail.value = JobOne
    inputDataJob.id = JobOne?.id
    inputDataJob.title = JobOne?.title
    inputDataJob.field_activity = JobOne?.field_activity?.title.toString()
    inputDataJob.contract_type = JobOne?.contract_type?.id.toString()
    inputDataJob.work_place = JobOne?.work_place?.id.toString()
    const getCountry: any = Places.country.find((el: any) => {
      return el.name === JobOne?.country
    })
    const getCitie: any = Places.city.find((el: any) => {
      return el.name === JobOne?.city
    })
    inputDataJob.dead_line = new Date(JobOne?.dead_line).toISOString()
    inputDataJob.localizaton_country = getCountry
    inputDataJob.localizaton_city = getCitie
    inputDataJob.description = JobOne?.description
  }
}

// initilization area
const initilization = () => {
  return {
    height: 500,
    menubar: false,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'help',
      'wordcount',
    ],
    toolbar: ' casechange blocks | bold italic bullist  ',
  }
}
</script>

<style></style>
