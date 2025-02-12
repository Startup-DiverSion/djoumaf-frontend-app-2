<template>
  <SideLayout>
    <template #content>
      <navigationHeader />

      <section
        class="flex flex-col lg:flex-row gap-4 pt-20 pb-[37em] lg:py-24 w-full lg:w-11/12 m-auto relative"
      >
        <!--  -->

        <!-- Edit -->

        <div class="lg:w-8/12 bg-white font-love rounded-lg">
          <div class="flex flex-col gap-8 pb-16 w-full h-full" v-if="!loading">
            <div
              class="flex flex-col px-4 lg:px-8 py-4 bg-gray-700 text-white lg:rounded-t-md  border-b-[1px]"
            >
              <!-- User poster -->
              <div class="flex flex-col">
                <span
                  class="text-2xl font-black uppercase w-full lg:w-10/12 font-love"
                >
                  {{ JobOne.title }}
                </span>
              </div>

              <div class="flex flex-col gap-1 mt-4">
                <div class="flex items-center text-lg">
                  <span class="flex items-center gap-1 font-bold">
                    <MapPinIcon class="h-5"></MapPinIcon>
                    {{ JobOne.country }}, {{ JobOne.city }} ({{
                      JobOne.work_place.title
                    }})
                  </span>
                </div>

                <div class="flex gap-1 items-center flex-wrap text-lg hidden">
                  <div class="flex gap-1 items-center group cursor-pointer">
                    <img
                      :src="JobOne.image"
                      alt=""
                      class="w-6 h-6 bg-white object-cover rounded-full"
                    />
                    <span class="text-base font-bold group-hover:underline">
                      {{ JobOneProfile.full_name }}</span
                    >
                  </div>
                </div>

                <!-- Detail on job -->
                <div class="flex flex-wrap gap-2">
                  <div class="flex gap-1 text-base">
                    <span class="flex items-center gap-1">
                      <BriefcaseIcon class="h-5"></BriefcaseIcon>
                      <span>{{ JobOne.contract_type.title }}</span>
                    </span>
                    &#11037;

                    <span class="flex items-center gap-1">
                      <BoltIcon class="h-5"></BoltIcon>
                      {{ JobOne.field_activity.title }}
                    </span>
                  </div>
                  &#11037;
                  <span class="text-base">{{ JobOne.created_at_from }}</span>
                </div>

                <div class="flex flex-wrap text-base">
                  Delai : {{ JobOne.dead_line_format }} &#11037;
                  <span class="flex gap-1 items-center"
                    ><CalendarIcon class="h-5"></CalendarIcon>
                    {{ countApply }} candidat{{
                      countApply > 1 ? "s" : ""
                    }}</span
                  >
                </div>
              </div>

              <!-- Display button - For actions on post -->
              <div class="mt-4 flex flex-wrap gap-2">
                <BtnSimple
                  v-if="USER?.id !== JobOne?.user?.id"
                  @click="
                    USER?.id
                      ? applyCreate(JobOne.id)
                      : $router.push(`/auth/sign-in/redirect=${$route.path}`)
                  "
                  :label="
                    stateApply.apply_loading
                      ? 'En cours...'
                      : stateApply.is
                      ? 'Candidature envoyée'
                      : 'Postuler'
                  "
                  :disabled="stateApply.is || stateApply.apply_loading"
                  :classe-name="
                    stateApply.is === false
                      ? ' bg-blue-800 px-4 py-2 text-base'
                      : ' bg-gray-300 px-4 py-2 text-base'
                  "
                />
                <RouterLink
                  :to="`/${JobOne?.user?.profile?.slug}?content_page=djmail`"
                >
                  <BtnSimple
                    v-if="USER?.id === JobOne?.user?.id"
                    label="Voir les condidactures"
                    classe-name="bg-purple-800 px-4 py-2 text-base"
                  />
                </RouterLink>
                <div class="hidden" @click="qModalToTag()">
                  <BtnSimple
                    label="Tag un(e) ami(e)"
                    classe-name="px-4 py-2 text-base"
                  />
                </div>

                <div
                  v-if="USER?.id === JobOne?.user?.id"
                  class="flex bg-gray-50/20 items-center gap-4 divide-x-[1px] p-4 hidden rounded-full"
                >
                  <RouterLink :to="'/jobs/edit/' + JobOne.slug"
                    ><PencilIcon
                      class="h-5 text-blue-500 cursor-pointer"
                    ></PencilIcon
                  ></RouterLink>
                  <TrashIcon
                    @click="deleteJob({ id: JobOne?.id })"
                    class="h-5 pl-4 text-red-500 cursor-pointer"
                  ></TrashIcon>
                </div>
              </div>
            </div>

            <!-- Description de l'offre -->
            <div class="px-4 lg:px-10">
              <div class="flex flex-col gap-4">
                <div class="flex text-lg">
                  <span class="font-bold">Description de l'offre</span>
                </div>

                <!-- <RenderToIFrame :css="css">
                  <article
                    v-html="JobOne.description"
                    class="flex flex-col text-base whitespace-pre-wrap text-love h-[500px]"
                  ></article>
                </RenderToIFrame> -->

                <!-- <div>
                  <h1>Ma page principale</h1>
                  <p>Ceci est le contenu de la page principale.</p>
                  <teleport to="body">
                    <iframe ref="iframeRef" class="my-iframe"></iframe>
                  </teleport>
                </div> -->

                <article
                  v-html="JobOne.description"
                  class="flex flex-col text-base whitespace-pre-wrap text-love h-[500px] overflow-y-auto list-disc list-circle"
                ></article>

                <!-- <iframe
            name="iframeRef"
            ref="iframeRef"
            src="about:blank"
            class="my-iframe"
          ></iframe>
          <Teleport v-if="iframeRef" :to="iframeRef.contentDocument.body">
            <article
                    v-html="JobOne.description"
                    class="flex flex-col text-base whitespace-pre-wrap text-love h-[500px]"
                  ></article>
                </Teleport> -->
              </div>

              <!-- Information sur l'auteur -->
              <div class="border-[1px] p-4 rounded-md mt-8">
                <div class="flex mb-6">
                  <span class="text-lg font-bold">Infos sur l'auteur</span>
                </div>

                <div class="flex flex-col gap-4">
                  <div class="flex flex-col lg:flex-row justify-between gap-2">
                    <div class="flex items-strat w-full lg:w-10/12 gap-2">
                      <div class="rounded-full flex w-12 h-12">
                        <img
                          class="w-full h-full object-cover rounded-full"
                          :src="JobOne.image"
                          alt=""
                        />
                      </div>

                      <div class="flex flex-col w-10/12 gap-[0.15rem]">
                        <span class="text-thin font-bold">
                          {{ JobOneProfile.first_name }}
                          {{ JobOneProfile.last_name }}
                        </span>
                        <span class="text-xs lg:text-sm leading-4">
                          {{ JobOneProfile.bio }}
                        </span>
                        <span class="text-xs text-blue-700 font-bold">
                          {{ abonneCount }} Abonné(s)</span
                        >
                      </div>
                    </div>

                    <div
                      class="flex items-center justify-end gap-1 w-full lg:w-4/12"
                      v-if="USER?.id !== JobOne?.user?.id"
                    >
                    <BtnFollow
        :label="'Suivre'"
        classe-name="w-full p-2"
        :data="JobOne"
      />

                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <LoadingPostDetail v-else />
        </div>

        <!--  -->
        <div class="w-full lg:w-4/12 h-[40px] sticky top-16 mb-4 lg:mb-0">
          <CardMedia label="Ceci pourrait vous intéressez" sub="" :more="false">
            <div v-for="item in 4" v-if="loading">
              <LoadingSimpleCard />
            </div>

            <div v-for="(intg, index) in JobsInterestingData" v-else>
              <CardPostSimple
                :data="intg"
                :class="
                  index === JobsInterestingData.length - 1
                    ? ''
                    : 'border-b-[1px]'
                "
              />
            </div>
          </CardMedia>
        </div>
      </section>
    </template>
  </SideLayout>

  <ModalTagFriend />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  onMounted,
  reactive,
  defineAsyncComponent,
} from "vue";
import HomeLayout from "@/layouts/HomeLayout.vue";
const navigationHeader = defineAsyncComponent(
  () => import("@/navigations/navigationHeader.vue")
);
const BtnSimple = defineAsyncComponent(
  () => import("@/components/buttons/btn.simple.vue")
);
const BtnFollow = defineAsyncComponent(
  () => import("@/components/buttons/btn.follow.vue")
);
const BtnDjoumer = defineAsyncComponent(
  () => import("@/components/buttons/btn.djoumer.vue")
);
import CardPostSimple from "@/components/cards/card.post.simple.vue";
const CardMedia = defineAsyncComponent(
  () => import("@/components/cards/medias/card.media.vue")
);
import { JobService } from "@/services/job.services";
import { useRoute } from "vue-router";
import { useJobComposition } from "./job.compositoin";
import LoadingSimpleCard from "@/components/cards/loading/loading.simple.card.vue";
import LoadingPostDetail from "@/components/cards/loading/loading.post.detail.vue";
import ModalTagFriend from "@/components/modals/modal.tag.friend.vue";
import { useJobStore } from "@/stores/jobs";
import { URL } from "@/router/url";
import axios from "axios";
import { useApplyComposition } from "@/composables/apply.composition";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { UserService } from "@/services/user.services";
import { useUserComposition } from "@/composables/user.composition";
import EditCompoment from "@/components/edit/edit.compoment.vue";
const SideLayout = defineAsyncComponent(
  () => import("@/layouts/SideLayout.vue")
);
import FollowAndDjoumer from "@/components/follow/followAndDjoumer.vue";
import IframeDesc from "@/views/pages/jobs/created/iframeDesc.vue";
import { useCerleComposition } from "@/composables/cerle.composition";
import { BoltIcon, BriefcaseIcon, CalendarIcon, MapPinIcon, PencilIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "job-detail",
  components: {
    HomeLayout,
    navigationHeader,
    BtnSimple,
    CardPostSimple,
    CardMedia,
    BtnFollow,
    BtnDjoumer,
    LoadingSimpleCard,
    LoadingPostDetail,
    ModalTagFriend,
    EditCompoment,
    SideLayout,
    FollowAndDjoumer,
    IframeDesc,
    MapPinIcon,
    BriefcaseIcon,
    BoltIcon,
    CalendarIcon,
    PencilIcon
},
  props: [],

  setup(props, {}) {
    const JobDetail: any = ref({
      field_activity: {},
      localization: { country: {}, city: {} },
      work_place: {},
      contract_type: {},
    });

    const { abonneCount, FOLLOWCount } = useCerleComposition();

    const JobDetailProfile: any = ref({});
    const JobsInterestingData = ref();
    const loading = ref(false);
    const css = ref(
      `
      @import url('https://fonts.googleapis.com/css?family=Cabin:100,200,300,400,500,600,700,800&display=swap');
      body {
  background-color: white;
  color: #2c3e50;
  line-height: 1.4;
  font-family: 'Cabin', 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  scroll-behavior: smooth;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
 
`
    );

    const iframeRef: any = ref();

    const { applyCreate, applyShow, stateApply, countApply } =
      useApplyComposition();
    const { USER, GET_USER } = useUserComposition();

    onMounted(async () => {
      Job__findone().then(() => {
        applyShow(JobDetail.value.id);
        FOLLOWCount(JobDetailProfile.value.id);
      });

      await GET_USER();
    });

    // Get specify job
    const Job__findone = async () => {
      loading.value = true;
      const route = useRoute();
      const { JobOne, profile, JobsInteresting, e } =
        await new JobService().findOne(route.params?.slug);

      if (JobOne && profile) {
        JobDetail.value = JobOne;
        JobDetailProfile.value = profile;
        JobsInterestingData.value = JobsInteresting;
        console.log(JobsInterestingData.value);

        loading.value = false;
      }
    };

    const qModalToTag = () => {
      useJobStore().openModal = true;
    };

    const { state, deleteJob } = useJobComposition();

    return {
      JobOne: JobDetail,
      css,
      JobOneProfile: JobDetailProfile,
      state,
      loading,
      qModalToTag,
      applyCreate,
      stateApply,
      countApply,
      iframeRef,
      USER,
      deleteJob,
      JobsInterestingData,
      abonneCount,
    };
  },
});
</script>

<style scoped>
/* iframe{
    height: 350px;
    width: 100%;
  } */
</style>
