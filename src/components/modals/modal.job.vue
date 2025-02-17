<template>
  <ModalLayout classe-name="modal-job hidden " title="Qui recrutez-vous ?">
    <div class="flex flex-col gap-2 h-full w-full">
      <!-- Content -->
      <div class="py-4 h-full overflow-auto">
        <div class="w-11/12 m-auto pt-4 pb-8">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title"> du poste</label>
              <OnlyForm
                placeholder="eg: Developpeur d'application web"
                name="title"
                :modelValue="inputDataJob.title"
                @update:modelValue="inputDataJob.title = $event.target.value"
                :error-input="isError"
              />
            </div>

            <!--  -->
            <div class="grid grid-cols-2 gap-4 w-full">
              <div class="flex flex-col w-full">
                <label class="text-sm font-light" for="id-title">Domaine d'activité </label>
                <VueSelect
                  class="font-love text-base"
                  v-model="inputDataJob.field_activity"
                  :options="preferenceData(1)"
                  name="field_activity"
                  label="title"
                  placeholder="Choisir un domaine d'activité"
                />
                <span
                  class="text-xs font-bold font-love text-red-500 mt-1 mx-1"
                  v-if="isError.path === 'field_activity'"
                >
                  {{ isError.message }}
                </span>
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-light" for="id-title">Lieu de travail </label>

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
            <div class="grid grid-cols-2 gap-4 w-full">
              <div class="flex flex-col w-full">
                <label class="text-sm font-light" for="id-title">Type de contract</label>
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
                <label class="text-sm font-light" for="id-title">Date limite</label>
                <formDate
                  name="dead_line"
                  :model-value="inputDataJob.dead_line"
                  @update:modelValue="inputDataJob.dead_line = $event.target.value"
                  :error-input="isError"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 w-full">
              <div class="flex flex-col w-full">
                <label class="text-sm font-light" for="id-title">Pour quel pays?</label>
                <VueSelect
                  class="font-love text-base placeholder:text-base"
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
                <label class="text-sm font-light" for="id-title">Dans quelle ville?</label>

                <VueSelect
                  v-model="inputDataJob.localizaton_city"
                  :options="localizatonCity"
                  label="name"
                  class="font-love text-base placeholder:text-base"
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

            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title">Description</label>
              <textarea
                v-model="inputDataJob.description"
                name="description"
                id="description"
                class="w-full border-[1px] rounded-md p-4"
                placeholder="Pour rendre votre offre d'emploi plus informatif, il pourrait être judicieux de mettre à jour votre description."
                rows="5"
              ></textarea>
              <span
                class="text-sm font-love text-red-500 mt-1 mx-1"
                v-if="isError.path === 'description'"
              >
                {{ isError.message }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!--  -->
    </div>

    <template #footer>
      <div class="w-full flex flex-col py-3">
        <div class="flex items-center justify-between w-11/12 m-auto">
          <RouterLink
            :to="{ name: 'JobCreate' }"
            class="font-semibold text-gray-700/90 text-sm underline"
            >Recrutement avancer ?</RouterLink
          >

          <div class="">
            <BtnSimple
              :label="state.loading ? 'Chargement...' : 'Publier l\'offre'"
              :disabled="state.loading"
              classe-name="py-2 px-4"
              @click="createNewJob"
            />
          </div>
        </div>
      </div>
    </template>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from '@/layouts/ModalLayout.vue'
import { defineComponent, onMounted, defineAsyncComponent } from 'vue'
import OnlyForm from '../forms/onlyInput.vue'
import formDate from '../forms/form.date.vue'
import formSelect from '../forms/form.select.vue'
import BtnSimple from '../buttons/btn.simple.vue'
import { usePreferenceComposition } from '@/composables/preference.composition'
import { useJobComposition } from '@/views/pages/jobs/job.compositoin'
import VueSelect from 'vue-select'

let self: any

//
onMounted(async () => {
  await getAllParameter()
  await localizaton()
})

const { inputDataJob, isError, createNewJob, state, localizaton, localizatonCity, Places } =
  useJobComposition()
const { preferenceData, getAllParameter } = usePreferenceComposition()
</script>

<style scoped></style>
