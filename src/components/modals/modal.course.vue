<template>
  <ModalLayout classe-name="modal-course  " title="Ajouter une nouvelle formation">
    <div class="flex flex-col gap-2 h-full w-full">
      <!-- Content -->
      <div class="h-full pb-32 overflow-auto">
        <div class="w-11/12 m-auto py-4">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title">Etablissement</label>
              <OnlyForm
                placeholder="eg: Startup Diversion"
                name="etablishment"
                :modelValue="inputDataCourse.etablishment"
                @update:modelValue="inputDataCourse.etablishment = $event.target.value"
                :error-input="isError"
              />
            </div>
            <!--  -->
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
              <div class="flex flex-col w-full">
                <label class="text-sm font-light" for="id-title">Diplôme </label>
                <formSelect
                  :modelValue="inputDataCourse.diploma"
                  @update:modelValue="inputDataCourse.diploma = $event.target.value"
                  name="diploma"
                  :data="preferenceData(8)"
                  placeholder="Choix votre diplôme"
                  :error-input="isError"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-light" for="id-title">Dans quel domaine?</label>
                <OnlyForm
                  placeholder="eg: Startup Diversion"
                  name="domain"
                  :modelValue="inputDataCourse.domain"
                  @update:modelValue="inputDataCourse.domain = $event.target.value"
                  :error-input="isError"
                />
              </div>
            </div>

            <!--  -->
            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title">Où avez-vous etudiez?</label>
              <OnlyForm
                placeholder="eg: Abidjan, Côte d'ivoire"
                name="work_place"
                :modelValue="inputDataCourse.work_place"
                @update:modelValue="inputDataCourse.work_place = $event.target.value"
                :error-input="isError"
              />
            </div>

            <!--  -->
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
              <div class="flex flex-col">
                <label class="text-sm font-light" for="id-title">Date de debut</label>
                <formDate
                  name="date_start"
                  :model-value="inputDataCourse.date_start"
                  @update:modelValue="inputDataCourse.date_start = $event.target.value"
                  :error-input="isError"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-light" for="id-title">Date de fin</label>
                <formDate
                  name="date_finish"
                  :model-value="inputDataCourse.date_finish"
                  @update:modelValue="inputDataCourse.date_finish = $event.target.value"
                  :error-input="isError"
                  :disabled="true"
                  :to-day="true"
                />
              </div>
            </div>

            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title">Description</label>
              <textarea
                v-model="inputDataCourse.description"
                name="description"
                id=""
                class="w-full border-[1px] rounded-md p-4"
                placeholder="Donner un description rapide l'offre"
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
    </div>

    <template #footer>
      <ModalSubmit
        :event="event"
        :state="state"
        :add-new="addNewCourse"
        :update="updateCourse"
        :Mdelete="deleteCourse"
      />
    </template>
  </ModalLayout>
  {{ EditMusi }}
</template>

<script setup lang="ts">
import ModalLayout from '@/layouts/ModalLayout.vue'
import { defineComponent, onMounted, reactive, ref, computed, defineAsyncComponent } from 'vue'
import OnlyForm from '../forms/onlyInput.vue'
import formDate from '../forms/form.date.vue'
import BtnSimple from '../buttons/btn.simple.vue'
import { usePreferenceComposition } from '@/composables/preference.composition'
import { useJobComposition } from '@/views/pages/jobs/job.compositoin'
import VueSelect from 'vue-select'
import moment from 'moment'
import { ProfileValidate } from '@/vendors/validators/profile.validate'
import axios from 'axios'
import { URL } from '@/router/url'
import { useModal } from './modal.services'
import { NotifUtils } from '@/vendors/utils/notif.utils'
import { useProfileStore } from '@/stores/profile.store'
import ModalSubmit from './modal.submit.vue'
import { useEventStore } from '@/stores/event'

const props = defineProps(['event', 'data'])
//
onMounted(async () => {
  await getAllParameter()
  let currently_working: any = document.querySelector('#date_finish')
  if (props.event) {
    const _ = props.data
    inputDataCourse.etablishment = _.etablishment
    inputDataCourse.id = _.id
    inputDataCourse.currently_working = _.currently_working
    currently_working.checked = inputDataCourse.currently_working
    inputDataCourse.description = _.description
    inputDataCourse.date_start = moment(_.date_start).toISOString()
    inputDataCourse.date_finish = moment(_.date_finish).toISOString()
    inputDataCourse.work_place = _.workplace
    inputDataCourse.diploma = _.diploma?.id
    inputDataCourse.domain = _.domain
  }
})

const EditMusi = computed(() => {
  if (useEventStore().editCourse) {
    if (props.event) {
      const _ = props.data

      if (_) {
        inputDataCourse.date_start = _.date_start
        inputDataCourse.date_finish = moment(_.date_finish).toISOString()
      }
    }
    useEventStore().editCourse = true
  }
})

const state = reactive({
  loading: false,
})

const inputDataCourse = reactive({
  id: null,
  etablishment: '',
  domain: '',
  diploma: '77',
  date_start: moment.utc().subtract(1, 'years').toLocaleString(),
  date_finish: moment.utc().toLocaleString(),
  work_place: '',
  description: '',
  currently_working: false,
})

const isError: any = ref({
  path: '',
  message: '',
})

const { preferenceData, getAllParameter } = usePreferenceComposition()
const { modal } = useModal()

const addNewCourse = async () => {
  state.loading = true
  let currently_working: any = document.querySelector('#date_finish')

  try {
    const { error, context } = await new ProfileValidate().Course(inputDataCourse)
    if (error) {
      state.loading = false
      isError.value = context[0]
      return isError
    }

    //
    inputDataCourse.currently_working = currently_working.checked

    //
    const { data } = await axios.post(URL.PROFILE_COURSE_CREATED, inputDataCourse)
    if (data) {
      state.loading = false
      document.querySelectorAll('.only-input').forEach((el: any) => {
        el.value = ''
      })

      const AllCourse = useProfileStore().dataProfileCourse
      data.course.date_start_y = moment(data.course.date_start).format(' Y')
      data.course.date_finish_y = !data.course.currently_working
        ? moment(data.course.date_finish).format(' Y')
        : 'En cours'
      AllCourse.unshift(data.course)
      useProfileStore().dataProfileCourse = AllCourse

      // Close modal
      modal()

      //Send Notification
      new NotifUtils().success('Ajouter', 'Formation ajouter avec succès', 5000)
    }
  } catch (error) {
    state.loading = false
    console.log(error)
  }
}

const updateCourse = async () => {
  state.loading = true
  let currently_working: any = document.querySelector('#date_finish')

  const { error, context } = await new ProfileValidate().Course(inputDataCourse)
  if (error) {
    state.loading = false
    isError.value = context[0]
    return isError
  }

  //

  inputDataCourse.currently_working = currently_working.checked

  //
  const { data } = await axios.post(URL.PROFILE_COURSE_UPDATE, inputDataCourse)
  if (data) {
    state.loading = false

    data.course.date_start_y = moment(data.course.date_start).format(' Y')
    data.course.date_finish_y = !data.course.currently_working
      ? moment(data.course.date_finish).format(' Y')
      : 'En cours'

    const rt: any = [...useProfileStore().dataProfileCourse]
    rt.forEach((el: any, index: any) => {
      if (el.id === data.course.id) {
        rt[index] = data.course
      }
    })
    useProfileStore().dataProfileCourse = rt

    // Close modal
    modal()

    //Send Notification
    new NotifUtils().success('Modifier', 'Formation modifier avec succès', 5000)
  }

  state.loading = false
}

const deleteCourse = async () => {
  try {
    const { data } = await axios.post(URL.PROFILE_COURSE_DELETE, {
      id: inputDataCourse.id,
    })
    if (data) {
      const rt = [...useProfileStore().dataProfileCourse]
      useProfileStore().dataProfileCourse = rt.filter((el: any) => {
        return el.id !== inputDataCourse.id
      })
      modal()

      //Send Notification
      new NotifUtils().success('Supprimer', 'Formation suprimer avec succès', 5000)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style></style>
