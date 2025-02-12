<template>
  <SideLayout>
    <template #content>
      <HomeLayout>
        <template #small>
          <CardMedia
            label="Les domaines d'activites"
            sticky="sticky h-[80vh]  mb-16 overflow-y-auto top-20  CATEGORY "
            :more="false"
          >
            <JobActivityDomain :totalJobs="state_job.totalCount" />
          </CardMedia>
        </template>

        <template #large>
          <div class="w-full md:h-[200px] mb-4">
            <img
              class="w-full h-full object-cover lg:rounded-md"
              v-lazy="'/images/couverture.png'"
              alt=""
            />
          </div>

          <div class="w-full m-auto lg:bg-white flex flex-col">
            <div
              class="flex justify-between items-center w-full m-auto bg-white z-20 p-4 sticky top-14 shadow-sm"
            >
              <span class="font-love text-lg text-gray-700 font-bold">
                Toutes les opportunités
              </span>

              <div class="flex items-center gap-1 lg:hidden">
                <AdjustmentsHorizontalIcon
                  class="h-5"
                />
                <span @click="FDomainActivityMenu">Filtre</span>
              </div>
            </div>

            <div class="flex flex-col lg:p-4 pb-4 font-love bg-white">
              <LoadingMessage
                v-if="state_job.jobs"
                :data="state_job.jobs"
                :message="'Accune, offre d\'emploi n\'a été trouvé.'"
                :error="state_job.error"
                :loading="!state_job.loading"
              />

              <!-- Display all jobs -->
              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full gap-0 lg:gap-2 "
              >
                <!-- Display if info data in not ready -->
                <div v-for="(item, index) in 6" v-if="state_job.loading === true" >
                  <LoadingAllCard />
                </div>

                <div
                  v-else
                  v-for="(job, index) in state_job.jobs" 
                  :key="index"
                  class="lg:rounded-md"
                >


              
                  <CardPostSuper :data="job" :index="index" :indexStart="3" :jobCount="state_job.jobs.length" :jobResult="4" />

                </div>
              </div>

              <BtnMoreCard
                @click="SeeMoreJob()"
                v-if="state_job.paginted.current < state_job.totalCount"
                label="Voir Plus"
                :loading="state_job.loading_paginied"
              />
            </div>
          </div>
        </template>
      </HomeLayout>
    </template>
  </SideLayout>
  {{ SEARCH }}
  <Transition name="slide-fade">
    <div class="h-[100vh] w-full bg-gray-400/90 fixed top-0 z-20" v-show="DomainActivityMenu == true">
    <div
      class="h-[80vh] w-full bg-white fixed bottom-0 rounded-t-xl z-50 lg:hidden shadow-2xl"
      
    >
      <div class="px-4 py-4 border-b-[1px] flex justify-between items-center">
        <span class="text-lg font-bold">Les domaines d'activites</span>
        <XMarkIcon class="h-5" @click="FDomainActivityMenu" />
      </div>
      <div class="h-full pb-20 pt-2 overflow-y-auto px-4">
        <JobActivityDomain
          :closeMenu="FDomainActivityMenu"
          :totalJobs="state_job.totalCount"
        />
      </div>
    </div>
  </div>
  </Transition>
</template>

<script lang="ts">
const BadgeRounded = defineAsyncComponent(
  () => import("@/components/buttons/badge/badge.rounded.vue")
);
import HomeLayout from "@/layouts/HomeLayout.vue";
const CardPostFull = defineAsyncComponent(
  () => import("@/components/cards/card.post.full.vue")
);
import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  computed,
  defineAsyncComponent,
} from "vue";
const CardMedia = defineAsyncComponent(
  () => import("@/components/cards/medias/card.media.vue")
);
const CardPostSuper = defineAsyncComponent(
  () => import("@/components/cards/card.post.super.vue")
);
import { useJobComposition } from "./job.compositoin";
import LoadingAllCard from "@/components/cards/loading/loading.all.card.vue";
import { useJobStore } from "@/stores/jobs";
import { useRoute } from "vue-router";
const NavigationSideMenu = defineAsyncComponent(
  () => import("@/navigations/navigation.side.menu.vue")
);
import { useMeta } from "vue-meta";
import JobActivityDomain from "./job.activityDomain.vue";
import LoadingMessage from "@/components/cards/loading/loading.message.vue";
import LadingSpinerBasic from "@/components/cards/loading/lading.spiner.basic.vue";
const NavigationBGlobal = defineAsyncComponent(
  () => import("@/navigations/navigation.b.global.vue")
);
const SideLayout = defineAsyncComponent(
  () => import("@/layouts/SideLayout.vue")
);
const BtnSimple = defineAsyncComponent(
  () => import("@/components/buttons/btn.simple.vue")
);
import { useRouter } from "vue-router";
import { useUserComposition } from "@/composables/user.composition";
import BtnMoreCard from "@/components/buttons/btn.more.card.vue";

export default defineComponent({
  name: "state_job.jobs",
  metaInfo: {
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "my standard description",
      },
    ],
  },
  props: {
    test: String,
  },
  setup(props) {
    useMeta({ title: "Emploi", StyleSheetList });

    const DomainActivityMenu = ref(false);
    const FDomainActivityMenu = () => {
      if (DomainActivityMenu.value) {
        DomainActivityMenu.value = false;
        document.querySelector("body")?.classList.remove("overflow-hidden");
      } else {
        DomainActivityMenu.value = true;
        document.querySelector("body")?.classList.add("overflow-hidden");
      }
    };
    const route = useRoute();
    const { JobCategories, jobIndex, state_job, SEARCH, SeeMoreJob } =
      useJobComposition();

    onMounted(async () => {
      if (!route.query.search_by_domain) {
        jobIndex({'limit': state_job.paginted.limit, 'page': state_job.paginted.page}).then(() => {
          state_job.paginted.current = state_job.count;
        });
      }
    });

    return {
      JobCategories,
      SEARCH,
      DomainActivityMenu,
      FDomainActivityMenu,
      state_job,
      SeeMoreJob,
    };
  },
  components: {
    HomeLayout,
    BadgeRounded,
    CardPostFull,
    CardMedia,
    CardPostSuper,
    LoadingAllCard,
    NavigationSideMenu,
    NavigationBGlobal,
    SideLayout,
    BtnSimple,
    JobActivityDomain,
    LoadingMessage,
    LadingSpinerBasic,
    BtnMoreCard,
    AdjustmentsHorizontalIcon,
    XMarkIcon
  },
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.CATEGORY::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.CATEGORY {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(500px);
  opacity: 1;
}
</style>
