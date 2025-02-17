<template>
  <ModalLayout classe-name="modal-profile-description hidden " title="Modifier vos informations">
    <div class="flex flex-col gap-2 h-full w-full">
      <!-- Content -->
      <div class="h-full overflow-auto">
        <div class="w-11/12 m-auto py-4">
          <div class="flex flex-col gap-4">
            <!--  -->

            <div class="flex flex-col">
              <!-- <label class="text-sm font-light" for="id-title">Description</label> -->
              <textarea
                v-model="inputDataProfileDesc.description"
                name="description"
                id="description"
                class="w-full border-[0px] rounded-md p-4 text-base"
                placeholder="Que devons nous savoir à propos de vous?"
                rows="16"
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
      <!--  -->
      <div class="w-full flex flex-col h-[12%] border-t-[1px] py-3">
        <div class="flex items-center justify-between w-11/12 m-auto">
          <div :to="{ name: 'JobCreate' }" class="font-semibold text-gray-700/90 text-sm underline">
            Annuler
          </div>

          <div class="">
            <BtnSimple
              :label="state.loading ? 'Chargement...' : 'Modifer'"
              :disabled="state.loading"
              classe-name="py-2 px-4"
              @click="editProfileDescription"
            />
          </div>
        </div>
      </div>
    </template>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from '@/layouts/ModalLayout.vue'
import { defineComponent, onMounted, reactive, ref, defineAsyncComponent } from 'vue'
import OnlyForm from '../forms/onlyInput.vue'
import formDate from '../forms/form.date.vue'
import formSelect from '../forms/form.select.vue'
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
import { useEventStore } from '@/stores/event'
import { useProfileStore } from '@/stores/profile.store'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

//
onMounted(async () => {
  await getAllParameter()
})

const state = reactive({
  loading: false,
})

const _: any = props.data
const inputDataProfileDesc = reactive({
  id: _?.id,
  description: _?.description,
})

const isError: any = ref({
  path: '',
  message: '',
})

const { preferenceData, getAllParameter } = usePreferenceComposition()
const { modal } = useModal()

const editProfileDescription = async () => {
  state.loading = true

  try {
    const { error, context } = await new ProfileValidate().EditProfileDescription(
      inputDataProfileDesc,
    )
    if (error) {
      state.loading = false
      isError.value = context[0]
      return isError
    }

    //
    const { data } = await axios.post(URL.PROFILE_DESCRIPTION_EDIT, inputDataProfileDesc)
    if (data) {
      state.loading = false

      useProfileStore().description(data.description)

      // Close modal
      modal()

      //Send Notification
      new NotifUtils().success('Modifier', 'Info du profile modifier avec succès', 5000)
    }
  } catch (error) {
    state.loading = false
    console.log(error)
  }
}
</script>

<style></style>
