<template>
  <ModalLayout
    classe-name="modal-experience flex "
    :title="
      event ? 'Modification d\'experience' : 'Ajouter une nouvelle expreience'
    "
  >
    <div class="flex flex-col gap-2 h-full w-full">
      <!-- Content -->
      <div class="h-full pb-16 overflow-auto">
        <div class="w-11/12 m-auto py-4">
          <div class="flex flex-col gap-4">

            

            <div class="flex flex-col w-full">
              <label class="text-sm font-light" for="id-title">Intitulé de poste </label>
              <OnlyForm
                placeholder="eg: Abidjan, Angrès chateau, Côte d'ivoire"
                name="title"
                :modelValue="inputDataExperience.poste"
                @update:modelValue="
                  inputDataExperience.poste = $event.target.value
                "
                :error-input="isError"
              />
            </div>


            <!--  -->
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
              <div class="flex flex-col w-full">
                <label class="text-sm font-light" for="id-title"
                  >Type d'expérience
                </label>
                <formSelect
                  :modelValue="inputDataExperience.type_experience"
                  @update:modelValue="
                    inputDataExperience.type_experience = $event.target.value
                  "
                  name="type_experience"
                  :data="preferenceData(6)"
                  placeholder="Choix un domaine d'activité"
                  :error-input="isError"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-light" for="id-title"
                  >Entreprise</label
                >
                <OnlyForm
                  placeholder="eg: Startup Diversion"
                  name="company"
                  :modelValue="inputDataExperience.company"
                  @update:modelValue="
                    inputDataExperience.company = $event.target.value
                  "
                  :error-input="isError"
                />
              </div>
            </div>

            <!--  -->
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
              <div class="flex flex-col">
                <label class="text-sm font-light" for="id-title"
                  >Date de debut</label
                >
                <formDate
                  name="date_start"
                  :model-value="inputDataExperience.date_start"
                  @update:modelValue="
                    inputDataExperience.date_start = $event.target.value
                  "
                  :error-input="isError"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-light" for="id-title"
                  >Date de fin</label
                >
                <formDate
                  name="date_finish"
                  :model-value="inputDataExperience.date_finish"
                  @update:modelValue="
                    inputDataExperience.date_finish = $event.target.value
                  "
                  :to-day="true"
                  :error-input="isError"
                  :disabled="true"
                />
              </div>
            </div>

            <div class="flex flex-col w-full">
              <label class="text-sm font-light" for="id-title">Lieu</label>
              <OnlyForm
                placeholder="eg: Abidjan, Angrès chateau, Côte d'ivoire"
                name="title"
                :modelValue="inputDataExperience.work_place"
                @update:modelValue="
                  inputDataExperience.work_place = $event.target.value
                "
                :error-input="isError"
              />
            </div>

            <div class="flex flex-col">
              <label class="text-sm font-light" for="id-title"
                >Description</label
              >
              <textarea
                v-model="inputDataExperience.description"
                name=""
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

            <div class="flex flex-col w-full">
              <label class="text-sm font-light" for="id-title"
                >Competence aquise</label
              >
              <VueSelect
                class="font-love text-base placeholder:text-xs"
                v-model="inputDataExperience.skills"
                :options="preferenceData(7)"
                name="localizaton_country"
                label="title"
                multiple="true"
                placeholder="Chosisez vos compétences"
              />
              <span
                class="text-sm font-love text-red-500 mt-1 mx-1"
                v-if="isError.path === 'skills'"
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
        :add-new="addNewExprerience"
        :update="updateExprerience"
        :Mdelete="deleteExperience"
      />
    </template>
  </ModalLayout>
  {{ EditMusi }}
</template>

<script lang="ts">
import ModalLayout from "@/layouts/ModalLayout.vue";
import { defineComponent, onMounted, reactive, ref, computed } from "vue";
import OnlyForm from "../forms/onlyInput.vue";
import formDate from "../forms/form.date.vue";
import formSelect from "../forms/form.select.vue";
import BtnSimple from "../buttons/btn.simple.vue";
import { usePreferenceComposition } from "@/composables/preference.composition";
import { useJobComposition } from "@/views/pages/jobs/job.compositoin";
import VueSelect from "vue-select";
import moment from "moment";
import axios from "axios";
import { URL } from "@/router/url";
import { ProfileValidate } from "@/vendors/validators/profile.validate";
import { useModal } from "./modal.services";
import { NotifUtils } from "@/vendors/utils/notif.utils";
import { useProfileStore } from "@/stores/profile.store";
import { useEventStore } from "@/stores/event";
import ModalSubmit from "./modal.submit.vue";

export default defineComponent({
  name: "modal-job",
  props: ["globalData", "event", "data"],
  components: {
    ModalLayout,
    OnlyForm,
    formSelect,
    formDate,
    BtnSimple,
    VueSelect,
    ModalSubmit,
  },
  setup(props, {}) {
    //
    onMounted(async () => {
      await getAllParameter();
      let currently_working: any = document.querySelector("#date_finish");
      if (props.event) {
        const _ = props.data;
        inputDataExperience.company = _.company_name;
        const skill = _.skill.map((el: any) => {
          return el.parameter;
        });
        
        inputDataExperience.id = _.id;
        inputDataExperience.poste = _.poste
        inputDataExperience.skills = skill;
        inputDataExperience.currently_working = _.currently_working;
        currently_working.checked = inputDataExperience.currently_working;
        inputDataExperience.description = _.description;
        // inputDataExperience.date_start = _ ? '' m oment(_.date_start).toISOString();
        // inputDataExperience.date_finish = moment(_.date_finish).toISOString();
        inputDataExperience.work_place = _.workplace;
        inputDataExperience.type_experience = _.type_contract?.id.toString();
      }
    });

    const state = reactive({
      loading: false,
    });


    const EditMusi = computed(() => {

      if(useEventStore().editExperience){
        if (props.event) {
        const _ = props.data;
      
        if (_) {
          inputDataExperience.date_start =_.date_start;
          inputDataExperience.date_finish = moment(_.date_finish).toISOString();
        }
      }
      useEventStore().editCourse = true

      }
    })

    const inputDataExperience = reactive({
      poste: '',
      type_experience: "70",
      company: "",
      date_start: "",
      date_finish: "",
      work_place: "",
      id: null,
      description: "",
      currently_working: false,
      skills: [],
    });
    const { modal } = useModal();

    const isError: any = ref({
      path: "",
      message: "",
    });

    
    const getOneProfileExperience = async (id:any) => {
      try {
        const { data } = await axios.post(URL.PROFILE_EXPERIENCE_SHOW, {
          id
        });
        if (data) {
          
          data.experience.date_start_y = moment(data.experience.date_start).format("MMMM Y");
          data.experience.date_finish_y = !data.experience.currently_working
              ? moment(data.experience.date_finish).format("MMMM Y")
              : "En cours";
         
          const AllExperience = useProfileStore().dataProfileExperiences;
          AllExperience.unshift(data.experience);
          useProfileStore().dataProfileExperiences = AllExperience;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const addNewExprerience = async () => {
      state.loading = true;
      let currently_working: any = document.querySelector("#date_finish");

      try {
        const { error, context } = await new ProfileValidate().Experience(
          inputDataExperience
        );
        if (error) {
          state.loading = false;
          isError.value = context[0];
          return isError;
        }

        //

        inputDataExperience.currently_working = currently_working.checked;
        console.log(inputDataExperience)
        //
        const { data } = await axios.post(
          URL.PROFILE_EXPERIENCE_CREATED,
          inputDataExperience
        );
        if (data) {
          state.loading = false;

          getOneProfileExperience(data.experience.id)

          // Close modal
          modal();

          //Send Notification
          new NotifUtils().success(
            "Ajouter",
            "Experience ajouter avec succès",
            5000
          );
        }
      } catch (error) {
        state.loading = false;
        console.log(error);
      }
    };

    const updateExprerience = async () => {
      state.loading = true;
      let currently_working: any = document.querySelector("#date_finish");

      try {
        const { error, context } = await new ProfileValidate().Experience(
          inputDataExperience
        );
        if (error) {
          console.log(context);
          state.loading = false;
          isError.value = context[0];
          return isError;
        }

        //

        inputDataExperience.currently_working = currently_working.checked;
        

        //
        const { data } = await axios.post(
          URL.PROFILE_EXPERIENCE_UPDATE,
          inputDataExperience
        );
        if (data) {
          state.loading = false;
          data.experience.date_start_y = moment(data.experience.date_start).format("MMMM Y");
          data.experience.date_finish_y = !data.experience.currently_working
              ? moment(data.experience.date_finish ).format("MMMM Y")
              : "En cours";
          const rt: any = [...useProfileStore().dataProfileExperiences];
          rt.forEach((el: any, index: any) => {
            if (el.id === data.experience.id) {
              rt[index] = data.experience;
              console.log(rt[index] )
            }
          });
          useProfileStore().dataProfileExperiences = rt;

          // Close modal
          modal();

          //Send Notification
          new NotifUtils().success(
            "Modifier",
            "Experience modifier avec succès",
            5000
          );
        }
      } catch (error) {
        state.loading = false;
        console.log(error);
      }
    };

    const deleteExperience = async () => {
      try {
        const { data } = await axios.post(URL.PROFILE_EXPERIENCE_DELETE, {
          id: inputDataExperience.id,
        });
        if (data) {
          const rt = [...useProfileStore().dataProfileExperiences];
          useProfileStore().dataProfileExperiences = rt.filter((el: any) => {
            return el.id !== inputDataExperience.id;
          });
          modal();

          //Send Notification
          new NotifUtils().success(
            "Supprimer",
            "Experience suprimer avec succès",
            5000
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    const { preferenceData, getAllParameter } = usePreferenceComposition();

    return {
      preferenceData,
      inputDataExperience,
      isError,
      state,
      addNewExprerience,
      updateExprerience,
      deleteExperience,
      EditMusi
    };
  },
});
</script>

<style></style>
