<template>
  <SideLayout>
    <template #content>
      <div class="mt-4 mb-16 w-full flex justify-end">
        <NavigationHeader />
        <NavigationSidebar />

        <section class="flex w-full m-auto gap-4 mt-20 relative">
          <div class="flex flex-col gap-8 w-full lg:w-11/12 m-auto">
            <!-- Banner -->
            <div class="flex gap-4 h-full">
              <div
                class="h-[260px] lg:h-[435px] xl:h-[460px] md:h-[460px] lg:rounded-md w-full lg:w-8/12 bg-white"
              >
                <iframe
                  class="w-full h-full lg:rounded-md"
                  src="https://www.youtube.com/embed/BvAJ5BoGLMQ"
                  title='DjoumAf " Réseau social professionnel africain d&#39;offre d&#39;emploi"'
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>

              <div class="lg:w-4/12 h-[100%] hidden lg:flex flex-col">
                <LoadingMessage
                  :data="state_job.jobs"
                  :message="'Aucune Offres est disponible.'"
                  :error="state_job.error"
                  :loading="!state_job.loading"
                />

                <div class="lg:grid grid-cols-1 flex flex-col gap-2 items-start">
                  <div v-for="item in 4" v-if="state_job.loading === true">
                    <LoadingSimpleCard />
                  </div>

                  <div
                    v-for="jobBooster in state_job.jobs?.length >= 4
                      ? state_job.jobs.slice(0, 4)
                      : state_job.jobs"
                    v-else
                  >
                    <CardPostSimple :data="jobBooster" />
                  </div>
                </div>
              </div>
            </div>

            <!--  -->
            <section class="flex flex-col gap-12">
              <!-- First section -->
              <div class="w-full m-auto flex flex-col gap-4">
                <div class="flex justify-between items-center">
                  <div class="w-11/12 lg:w-full m-auto">
                    <span class="font-love text-xl text-gray-700 font-bold">
                      Nos recommandations
                    </span>
                  </div>

                  <!-- <BtnMore /> -->
                </div>

                <LoadingMessage
                  :data="state_job.jobs"
                  :message="'Aucune Offres d\'emplois récents est disponible.'"
                  :error="state_job.error"
                  :loading="!state_job.loading"
                />

                <div class="bg-white lg:rounded-md">
                  <swiper
                    :options="swiperOptions__CardPostSuper"
                    :breakpoints="swiperOptions__CardPostSuper.breakpoints"
                    :navigation="true"
                    :modules="modules"
                    class="w-full h-full"
                  >
                    <swiper-slide v-for="item in 8" v-if="state_job.loading === true">
                      <LoadingAllCard sizeCard="w-[95%] md:w-[300px]" />
                    </swiper-slide>

                    <swiper-slide
                      v-for="(job, index) in state_job.jobs?.length >= 4
                        ? state_job.jobs.slice(0, 8)
                        : state_job.jobs"
                      v-else
                      :key="index"
                    >
                      <CardPostSuper
                        sizeCard="w-full border-l-[1px]"
                        :data="job"
                        :index="index"
                        :indexStart="8"
                        :jobCount="state_job.jobs?.slice(0, 8).length"
                        :jobResult="100"
                        :single="true"
                      />
                    </swiper-slide>
                  </swiper>
                </div>
              </div>

              <!--  -->
              <div class="w-full m-auto flex flex-col gap-4">
                <div class="flex justify-between items-center">
                  <div class="w-11/12 lg:w-full m-auto">
                    <span class="font-love text-xl text-gray-700 font-bold">
                      Offres d'emploi et stages
                    </span>
                  </div>
                </div>
                <LoadingMessage
                  :data="state_job.jobs"
                  :message="'Aucune Offres d\'emploi et stages est disponible.'"
                  :error="state_job.error"
                  :loading="!state_job.loading"
                />
                <div class="flex bg-white rounded-md">
                  <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-0 lg:gap-2"
                  >
                    <div v-for="item in 8" v-if="state_job.loading === true">
                      <LoadingAllCard />
                    </div>

                    <div
                      v-for="(job, index) in state_job.jobs?.length >= 4
                        ? state_job.jobs.slice(0, 8)
                        : state_job.jobs"
                      :key="index"
                      v-if="state_job.loading === false"
                      class=""
                    >
                      <!-- {{ job }} -->
                      <CardPostSuper
                        v-if="state_job.jobs"
                        :data="job"
                        :index="index"
                        :indexStart="4"
                        :jobCount="state_job.jobs?.slice(0, 8).length"
                        :jobResult="5"
                      />
                    </div>
                  </div>
                </div>

                <a href="/jobs" class="w-11/12 lg:w-full m-auto mt-4">
                  <BtnMore />
                </a>
              </div>

              <!-- Particulier user -->
              <div class="w-11/12 lg:w-full m-auto flex flex-col gap-4" v-if="jIsAuthenticate">
                <div class="flex justify-between items-center">
                  <div class="w-full">
                    <span class="font-love text-xl text-gray-700 font-bold">
                      Profils intéressants
                    </span>
                  </div>
                  <!-- <BtnMore /> -->
                </div>

                <div class="">
                  <swiper
                    :options="swiperOptions"
                    :breakpoints="swiperOptions.breakpoints"
                    :navigation="true"
                    :modules="modules"
                    class="w-full h-full"
                  >
                    <swiper-slide
                      v-for="(profile, index) in state_profile.profile"
                      :key="index"
                      v-if="!state_profile.loading"
                    >
                      <CardPostProfile :data="profile" />
                    </swiper-slide>

                    <swiper-slide v-for="(profile, index) in 6" v-else>
                      <LoadingProfileCard />
                    </swiper-slide>
                  </swiper>
                </div>
              </div>

              <!-- Entreprise user -->
              <div class="w-11/12 lg:w-full m-auto flex flex-col gap-4" v-if="jIsAuthenticate">
                <div class="flex justify-between items-center">
                  <div class="w-full">
                    <span class="font-love text-xl text-gray-700 font-bold">
                      Les entreprises disponible sur Djoumaf
                    </span>
                  </div>
                  <!-- <BtnMore /> -->
                </div>

                <LoadingMessage
                  v-if="state_profile_compagny.profile"
                  :data="state_profile_compagny.profile"
                  :message="'Aucune entreprises n\'est disponible.'"
                  :error="false"
                  :loading="state_profile_compagny.loading"
                />

                <div class="">
                  <swiper
                    :options="swiperOptions"
                    :breakpoints="swiperOptions.breakpoints"
                    :navigation="true"
                    :modules="modules"
                    class="w-full h-full"
                  >
                    <swiper-slide
                      v-for="(profile, index) in state_profile_compagny.profile"
                      :key="index"
                      v-if="!state_profile_compagny.loading"
                    >
                      <CardPostProfile :data="profile" />
                    </swiper-slide>

                    <swiper-slide v-for="(profile, index) in 6" v-else>
                      <LoadingProfileCard />
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </template>
  </SideLayout>
  <ModalInfo :USER="USER" />
  <!-- <FouterAuth /> -->
  <NavigationFooter v-if="jIsAuthenticate" />
</template>

<script lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import CardPost from '@/components/cards/cardPost.vue'
import CardPostSimple from '@/components/cards/card.post.simple.vue'
import CardText from '@/components/cards/card.text.vue'
const CardPostSuper = defineAsyncComponent(() => import('@/components/cards/card.post.super.vue'))
import FouterAuth from '@/navigations/footers/footerAuth.vue'

import {
  defineComponent,
  reactive,
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  defineAsyncComponent,
  ref,
} from 'vue'
import NavigationHeader from '@/navigations/navigationHeader.vue'
const BtnMore = defineAsyncComponent(() => import('@/components/buttons/btn.more.vue'))
const NavigationFooter = defineAsyncComponent(() => import('@/navigations/navigationFooter.vue'))
const NavigationSidebar = defineAsyncComponent(() => import('@/navigations/navigation.sidebar.vue'))
import { useCerleComposition } from '@/composables/cerle.composition'
import { useJobComposition } from '@/views/pages/jobs/job.compositoin'
import axios from 'axios'
import { URL } from '@/router/url'
import LoadingProfileCard from '@/components/cards/loading/loading.profile.card.vue'
import LoadingMessage from '@/components/cards/loading/loading.message.vue'
import LoadingFasterCard from '@/components/cards/loading/loading.simple.card.vue'
import LoadingSimpleCard from '@/components/cards/loading/loading.faster.card.vue'
import LoadingAllCard from '@/components/cards/loading/loading.all.card.vue'
import { useProfileComposition } from '@/composables/profile.composition'
const SideLayout = defineAsyncComponent(() => import('@/layouts/SideLayout.vue'))

const CardPostProfile = defineAsyncComponent({
  loader: () => import('@/components/cards/card.post.profile.vue'),
})
import { LocalSotreUtils } from '@/vendors/utils/localStore.utils'
import { CryptUtils } from '@/vendors/utils/crypt.utils'
import { useUserComposition } from '@/composables/user.composition'
import { useMeta } from 'vue-meta'
import ModalInfo from '@/components/modals/modal.info.vue'

export default defineComponent({
  name: '',
  props: {},
  components: {
    CardPost,
    Swiper,
    SwiperSlide,
    CardPostSimple,
    NavigationHeader,
    CardText,
    CardPostSuper,
    CardPostProfile,
    BtnMore,
    NavigationFooter,
    NavigationSidebar,
    FouterAuth,
    LoadingAllCard,
    LoadingFasterCard,
    LoadingSimpleCard,
    LoadingProfileCard,
    LoadingMessage,
    SideLayout,
    ModalInfo,
  },
  setup() {
    useMeta({ title: 'Accueil', StyleSheetList })
    const { jobIndex, state_job } = useJobComposition()
    const { getAllProfile, profiles, loading_profile, loading_profile_company, profilesCompany } =
      useProfileComposition()
    const {
      MYCERCLE,
      getMyCercleAbonnement,
      getMyCercleAbonner,
      loading_getMyCercle,
      error_getMyCercle,
      ALLPROFILE,
      ALLPROFILE_COMPANY,
      state_profile,
      state_profile_compagny,
      statistic,
    } = useCerleComposition()

    const jIsAuthenticate = ref(false)
    const { USER, GET_USER } = useUserComposition()

    onBeforeMount(async () => {})
    onMounted(async () => {
      //
      jobIndex({ limit: 20, page: 1 })

      if (await __store.get('jUser')) {
        await GET_USER().then(() => {
          ALLPROFILE({ limit: 30, page: 1 })
          ALLPROFILE_COMPANY({ limit: 30, page: 1 })
          USER.value ? (jIsAuthenticate.value = true) : (jIsAuthenticate.value = false)
        })
      }

      //
      let button_next: any = document.querySelectorAll('.swiper-button-next')
      let button_prev: any = document.querySelectorAll('.swiper-button-prev')
      button_next.forEach((el: any) => {
        el.innerHTML = `<img src="/icons/navigations/angle-petit-droit.svg" alt="">`
      })

      button_prev.forEach((el: any) => {
        el.innerHTML = `<img src="/icons/navigations/angle-petit-gauche.svg" alt="">`
      })
    })
    const __store = new LocalSotreUtils()
    const __Crypo = new CryptUtils()
    const _USER = ref()

    // Check if user connected

    const swiperOptions = reactive({
      slidesPerView: 'auto', //Set the number of slides that the slider can display simultaneously
      slidesPerGroup: 1, //Defines the number of slides as a group
      slidesPerGroupAuto: true, //Automatic grouping
      speed: 500, //sliding speed
      spaceBetween: 0, //Distance between slides (px)
      centeredSlides: false, //When set to true, the active block is centered, not left as the default
      loopFillGroupWithBlank: false, //For groups of less than 6, the remaining slice will be filled with blanks
      preloadImages: true,
      // Enable lazy loading
      lazy: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: '',
      },
      breakpoints: {
        320: {
          slidesPerView: 1.1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 10,
        },

        850: {
          slidesPerView: 3,
          spaceBetween: 10,
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 10,
        },

        1280: {
          slidesPerView: 3.5,
          spaceBetween: 10,
        },
      },

      autoplay: true,
      allowTouchMove: true, //Allows manual drag and slide
      observer: true, //Swiper is automatically initialized when you modify its own or child elements
      observeParents: true, //Swiper is automatically initialized when the parent element of swiper is modified
      preventLinksPropagation: false, //Block the click event when dragging Swiper. This option is required if dragging is not prohibited
    })

    const swiperOptions__CardPostSuper = reactive({
      slidesPerView: 'auto', //Set the number of slides that the slider can display simultaneously
      slidesPerGroup: 1, //Defines the number of slides as a group
      slidesPerGroupAuto: true, //Automatic grouping
      speed: 500, //sliding speed
      spaceBetween: 0, //Distance between slides (px)
      centeredSlides: false, //When set to true, the active block is centered, not left as the default
      loopFillGroupWithBlank: false, //For groups of less than 6, the remaining slice will be filled with blanks
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: '',
      },
      breakpoints: {
        320: {
          slidesPerView: 1.1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },

        850: {
          slidesPerView: 2.7,
          spaceBetween: 10,
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 10,
        },

        1280: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      },

      autoplay: true,
      allowTouchMove: true, //Allows manual drag and slide
      observer: true, //Swiper is automatically initialized when you modify its own or child elements
      observeParents: true, //Swiper is automatically initialized when the parent element of swiper is modified
      preventLinksPropagation: false, //Block the click event when dragging Swiper. This option is required if dragging is not prohibited
    })

    return {
      modules: [Navigation],
      swiperOptions,
      state_job,
      swiperOptions__CardPostSuper,
      profiles,
      loading_profile,
      loading_profile_company,
      profilesCompany,
      state_profile,
      state_profile_compagny,
      jIsAuthenticate,
      USER,
    }
  },
})
</script>

<style>
.swiper-button-next::after {
  content: '';
}
.swiper-button-prev::after {
  content: '';
}
.wD {
  @apply lg:w-8/12;
  @apply w-full;
}
</style>
