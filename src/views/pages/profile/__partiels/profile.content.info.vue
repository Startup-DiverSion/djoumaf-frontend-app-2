<template>
  <div class="bg-white rounded-md px-4">
    <CardBody label="Description">
      <EditCompoment
        name="description"
        :data="data"
        classname="-top-8 right-0"
        @click="openMenu('modal-profile-description')"
      />
      <article
        class="whitespace-pre-wrap text-base"
        v-html="data.description"
      ></article>
    </CardBody>
  </div>

  <!-- Display the activites recent of  -->
  <div
    class="flex flex-col gap-4 bg-white rounded-md"
    v-if="dataActivityLog && USER?.id === data?.user?.id"
  >
    <div class="px-4">
      <CardBody label="Activité recente">
        <!--  -->

        <LoadingMessageEmpty
          :isEmpty="true"
          v-if="dataActivityLog.length === 0"
          message="Accune activité pour le moment."
        />

        <div
          class="flex flex-col PROFILE_CARD overflow-auto"
          :class="dataActivityLog.length > 4 ? 'h-[400px]' : 'h-auto'"
        >
          <div v-for="item in dataActivityLog">
            <ProfileContentActivityCard :data="item" />
            <span
              v-if="item === 2"
              class="inline-flex border-[1px] w-3 h-3 rounded-full absolute buttom-0 -left-[0.35rem]"
            ></span>
          </div>
        </div>
      </CardBody>
    </div>

    <RouterLink class="" :to="'/' + USER?.profile?.slug + '/recent-activity'">
      <BtnMoreCard class="py-4 mt-0" label="Voir plus d'activité" />
    </RouterLink>
  </div>

  <!-- Display the skills of profile -->
  <div class="flex flex-col gap-4 bg-white rounded-md" v-if="dataExperiences">
    <div class="px-4">
      <CardBody label="Expériences">
        <AddComponent
          @click="useEventStore().OPEN_Experience = true"
          :type="'modal-experience'"
          :data="data"
        />

        <LoadingMessageEmpty
          :isEmpty="true"
          v-if="dataExperiences.length === 0"
          message="Ajouter une nouvelle experience."
        />
        <!--  -->

        <div
          class="flex flex-col divide-y-[1px] gap-2 PROFILE_CARD overflow-auto"
          :class="dataExperiences.length > 4 ? 'h-[500px]' : 'h-auto'"
          v-else
        >
          <div v-for="item in dataExperiences">
            <EditCompoment
              name="experience"
              :data="data"
              classname="top-4 right-0 edit-id"
              @click="[openMenu('modal-experience'), isEdit(item)]"
            />

            <ProfileContentSkills :data="item" />
          </div>
        </div>
      </CardBody>
    </div>
    <!-- <BtnMoreCard label="Voir plus d'experience" /> -->
  </div>

  <!-- Display the accademy of profile  -->
  <div class="flex flex-col gap-4 bg-white rounded-md" v-if="dataCourse">
    <div class="px-4">
      <CardBody label="Formations">
        <AddComponent
          :type="'modal-course'"
          @click="useEventStore().OPEN_Course = true"
          :data="data"
        />
        <!--  -->

        <LoadingMessageEmpty
          :isEmpty="true"
          v-if="dataCourse.length === 0"
          message="Ajouter une nouvelle formation."
        />

        <div
          class="flex flex-col divide-y-[1px] gap-2 PROFILE_CARD overflow-auto"
          :class="dataCourse.length > 4 ? 'h-[500px]' : 'h-auto'"
          v-else
        >
          <div v-for="item in dataCourse">
            <EditCompoment
              name="course"
              :data="data"
              classname="top-4 right-0 edit-id"
              @click="[openMenu('modal-course'), isEditCourse(item)]"
            />

            <ProfileContentFormations :data="item" />
          </div>
        </div>
      </CardBody>
    </div>
    <!-- <BtnMoreCard label="Voir plus de formations" /> -->
  </div>

  <ModalExperience
    v-if="useEventStore().OPEN_Experience === true"
    :event="editExperience"
    :data="dataToEdit.experience"
  />
  <ModalProfileDescription :data="data" />
  <ModalCourse
    v-if="useEventStore().OPEN_Course === true"
    :event="editCourse"
    :data="dataToEdit.course"
  />
</template>

<script lang="ts">
const BtnMoreCard = defineAsyncComponent(
  () => import("@/components/buttons/btn.more.card.vue")
);
const CardBody = defineAsyncComponent(
  () => import("@/components/cards/medias/card.body.vue")
);
import ProfileContentActivityCard from "@/views/pages/profile/__partiels/profile.content.activity.card.vue";
import ProfileContentSkills from "@/views/pages/profile/__partiels/profile.content.skills.vue";
import ProfileContentFormations from "@/views/pages/profile/__partiels/profile.content.formations.vue";
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  reactive,
  defineAsyncComponent,
} from "vue";
import ModalExperience from "@/components/modals/modal.experience.vue";
import ModalCourse from "@/components/modals/modal.course.vue";
import { useModalComposition } from "@/composables/modal.composition";
import axios from "axios";
import { URL } from "@/router/url";
import moment from "moment";
import AddComponent from "@/components/add/add.component.vue";
import { useProfileStore } from "@/stores/profile.store";
import LoadingMessageEmpty from "@/components/cards/loading/loading.message.empty.vue";
import EditCompoment from "@/components/edit/edit.compoment.vue";
import ModalProfileDescription from "@/components/modals/modal.profile.description.vue";
import { useEventStore } from "@/stores/event";
import { useUserComposition } from "@/composables/user.composition";

export default defineComponent({
  name: "profile-content-info",
  components: {
    CardBody,
    ProfileContentActivityCard,
    ProfileContentSkills,
    ProfileContentFormations,
    BtnMoreCard,
    ModalExperience,
    ModalCourse,
    AddComponent,
    LoadingMessageEmpty,
    EditCompoment,
    ModalProfileDescription,
  },
  props: ["data"],
  setup(props) {
    const dataActivityLog: any = ref();
    const dataExperiencesRef: any = ref([]);
    const dataCourseRef: any = ref([]);
    const { openMenu } = useModalComposition();
    const dataToEdit: any = reactive({
      experience: {},
      course: {},
    });
    const { GET_USER, USER } = useUserComposition();

    onMounted(async () => {
      await GET_USER();
      await getActivityLog();
      await getProfileExperience();
      await getProfileCourse();
    });

    // If Edit Actions
    const editExperience = computed(() => {
      return useEventStore().editExperience;
    });
    const editCourse = computed(() => {
      return useEventStore().editCourse;
    });
    // Edit function
    const isEdit = (data: any) => {
      useEventStore().editExperience = true;
      useEventStore().OPEN_Experience = true;
      dataToEdit.experience = data;
    };

    const isEditCourse = (data: any) => {
      useEventStore().editCourse = true;
      useEventStore().OPEN_Course = true;
      dataToEdit.course = data;
    };

    // Display data onMonted
    const dataExperiences = computed(() => {
      return useProfileStore().dataProfileExperiences;
    });
    const dataCourse = computed(() => {
      return useProfileStore().dataProfileCourse;
    });

    // Get Data
    const getActivityLog = async () => {
      if (USER.value?.id === props.data?.user?.id) {
        try {
          const { data } = await axios.get(URL.ACTIVITY_LOG_INDEX);
          if (data) {
            dataActivityLog.value = data.activity_log;
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const getProfileExperience = async () => {
      try {
        const { data } = await axios.post(URL.PROFILE_EXPERIENCE_INDEX, {
          user: props.data?.user.id,
        });

        if (data) {
          dataExperiencesRef.value = data.experiences;
          dataExperiencesRef.value.forEach((el: any) => {
            const years_experience = el.years_experience ? el.years_experience.split('.') : ''
            el.date_many =years_experience && el.years_experience != '0.0' ?  `${years_experience[0] == 0 ? '': years_experience[0]} an ${years_experience[1] == 0 ? '': years_experience[1]} mois` : ''
            el.date_start_y = moment(el.date_start).format("MMMM Y");
            el.date_finish_y = !el.currently_working
              ? moment(el.date_finish).format("MMMM Y")
              : "En cours";
          });
          useProfileStore().dataProfileExperiences = dataExperiencesRef;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getProfileCourse = async () => {
      try {
        const { data } = await axios.post(URL.PROFILE_COURSE_INDEX, {
          user: props.data?.user.id,
        });
        if (data) {
          dataCourseRef.value = data.courses;
          dataCourseRef.value.forEach((el: any) => {
            el.date_start_y = moment(el.date_start).format(" Y");
            el.date_finish_y = !el.currently_working
              ? moment(el.date_finish).format(" Y")
              : "En cours";
          });
          useProfileStore().dataProfileCourse = dataCourseRef;
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      dataExperiences,
      dataCourse,
      openMenu,
      dataActivityLog,
      useEventStore,
      editExperience,
      dataToEdit,
      isEdit,
      USER,
      editCourse,
      isEditCourse,
    };
  },
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.PROFILE_CARD::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.PROFILE_CARD {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
