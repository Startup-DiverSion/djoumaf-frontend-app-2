<template>
  <ModalLayout classe-name="modal-profile hidden " title="Modifier votre profil">
    <div class="flex flex-col gap-2 h-full w-full">
      <!-- Content -->
      <div class="h-full pb-12 overflow-auto">
        <div class="w-11/12 m-auto py-4">
          <div class="flex flex-col gap-4">
            <!--  -->

            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title"> Prenoms</label>
              <OnlyForm
                placeholder="Emmanuel"
                name="first_name"
                :modelValue="inputDataProfile.first_name"
                @update:modelValue="inputDataProfile.first_name = $event.target.value"
                :error-input="isError"
              />
            </div>

            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title">Nom</label>
              <OnlyForm
                placeholder="Yao"
                name="last_name"
                :modelValue="inputDataProfile.last_name"
                @update:modelValue="inputDataProfile.last_name = $event.target.value"
                :error-input="isError"
              />
            </div>

            <!--  -->
            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title">Bio</label>
              <OnlyForm
                placeholder="Developpeur at Startup Diversion"
                name="bio"
                :modelValue="inputDataProfile.bio"
                @update:modelValue="inputDataProfile.bio = $event.target.value"
                :error-input="isError"
              />
            </div>
            <!--  -->
            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title">Contact</label>
              <OnlyForm
                placeholder="eg: 07 00 01 00 02"
                name="contact"
                :modelValue="inputDataProfile.contact"
                @update:modelValue="inputDataProfile.contact = $event.target.value"
                :error-input="isError"
              />
            </div>

            <!--  -->
            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title">Anniversaire</label>
              <formDate
                placeholder=""
                name="born"
                :modelValue="inputDataProfile.born"
                @update:modelValue="inputDataProfile.born = $event.target.value"
                :error-input="isError"
              />
            </div>
            <!--  -->
            <div class="flex flex-col w-full">
              <label class="text-sm font-light" for="id-title">sex </label>
              <formSelect
                :modelValue="inputDataProfile.sex"
                @update:modelValue="inputDataProfile.sex = $event.target.value"
                name="sex"
                :data="[{ title: 'Homme' }, { title: 'Femme' }]"
                placeholder="Choix votre diplôme"
                :error-input="isError"
              />
            </div>

            <!--  -->
            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title">Adresse</label>
              <OnlyForm
                placeholder="Abidjan, cote d'ivoire"
                name="adresse"
                :modelValue="inputDataProfile.adresse"
                @update:modelValue="inputDataProfile.adresse = $event.target.value"
                :error-input="isError"
              />
            </div>

            <!--  -->
            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title">Site web</label>
              <OnlyForm
                placeholder="https://startupDiversion.com"
                name="Bio"
                :modelValue="inputDataProfile.site_web"
                @update:modelValue="inputDataProfile.site_web = $event.target.value"
                :error-input="isError"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <!--  -->
      <div class="w-full flex flex-col border-t-[1px] py-3">
        <div class="flex items-center justify-between w-11/12 m-auto">
          <div :to="{ name: 'JobCreate' }" class="font-semibold text-gray-700/90 text-sm underline">
            Annuler
          </div>

          <div class="">
            {{ state.loading }}
            <BtnSimple
              :label="state.loading ? 'Chargement...' : 'Modifer'"
              :disabled="state.loading"
              classe-name="py-2 px-4"
              @click="editProfile"
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

onMounted(async () => {
  await getAllParameter()
})

const state = reactive({
  loading: false,
})

const _: any = props.data
const inputDataProfile = reactive({
  id: _?.id,
  first_name: _?.first_name,
  last_name: _?.last_name,
  bio: _?.bio,
  contact: _?.contact,
  born: _?.born,
  sex: _?.sex,
  adresse: _?.adresse,
  site_web: _?.site_web,
})

const isError: any = ref({
  path: '',
  message: '',
})

const { preferenceData, getAllParameter } = usePreferenceComposition()
const { modal } = useModal()

const editProfile = async () => {
  try {
    state.loading = true

    const { error, context } = await new ProfileValidate().EditProfile(inputDataProfile)
    if (error) {
      state.loading = false
      isError.value = context[0]
      return isError
    }

    //
    const { data } = await axios.post(URL.PROFILE_EDIT, inputDataProfile)
    if (data) {
      useProfileStore().dataProfile = data.profile

      // Close modal

      modal()

      // //Send Notification
      new NotifUtils().success('Modifier', 'Resumer du profile modifer avec succès', 5000)
      useEventStore().editProfile = true
      state.loading = false
    }
  } catch (error) {
    state.loading = false
    console.log(error)
  }
}
</script>

<style></style>
