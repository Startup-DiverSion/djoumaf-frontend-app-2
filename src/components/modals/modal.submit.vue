<template>
  <!--  -->
  <div class="w-full flex flex-col py-3 bg-white rounded-b-lg border-t-[1px]">
    <div class="flex items-center justify-between w-11/12 m-auto">
      <div
        @click="[event ? Mdelete() :  modal()]"
        class="font-bold text-red-500/90 text-lg underline cursor-pointer"
      >
        {{ event ? "Suppriner" : "Annuler" }}
      </div>

      <div class="">
        <BtnSimple
          :label="
            state.loading ? 'Chargement...' : event ? 'Modifier' : 'Enregistrer'
          "
          :disabled="state.loading"
          classe-name="py-2 px-4"
          @click="[event ? update() : addNew()]"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ModalLayout from "@/layouts/ModalLayout.vue";
import { defineComponent, onMounted, reactive, ref, computed } from "vue";
import OnlyForm from "../forms/onlyInput.vue";
import formDate from "../forms/form.date.vue";
import formSelect from "../forms/form.select.vue";
import BtnSimple from "../buttons/btn.simple.vue";
import { usePreferenceComposition} from "@/composables/preference.composition";
import { useJobComposition} from "@/views/pages/jobs/job.compositoin";
import VueSelect from "vue-select";
import moment from "moment";
import axios from "axios";
import { URL} from "@/router/url";
import { ProfileValidate } from "@/vendors/validators/profile.validate";
import { useModal } from "./modal.services";
import { NotifUtils } from "@/vendors/utils/notif.utils";
import { useProfileStore } from "@/stores/profile.store"
import { useEventStore } from "@/stores/event";
import router from "@/router";

export default defineComponent({
  name: "modal-submit",
  props: ["state", "event", "addNew", "update", "Mdelete"],
  components: {
    BtnSimple,
  },
  setup(){
    const { modal } = useModal()

    return{
        modal
    }
  }
});
</script>

<style></style>
