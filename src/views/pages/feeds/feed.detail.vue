<template>
  <main class="fixed flex bg-gray-700/90 z-40 w-screen h-screen">
    <LoadingSpiner :loading="loading_show" />
    <section class="w-full lg:w-9/12 otherSide flex flex-col" v-if="loading_show === false && post">
      <div class="bg-gray-700/90 w-full py-3 z-40">
        <div class="text-white w-11/12 m-auto flex justify-between items-center">
          <ArrowLeftIcon
            @click="hideBody($router)"
            class="fi fi-rr-arrow-small-left cursor-pointer p-1 h-6 font-black"
          ></ArrowLeftIcon>

          <div class="">Detail</div>

          <div @click="HideSideInfo(isHide)" class="cursor-pointer">
            <ChevronDoubleRightIcon v-if="isHide" class="h-5"></ChevronDoubleRightIcon>
            <ChevronDoubleLeftIcon v-if="!isHide" class="h-5"></ChevronDoubleLeftIcon>
          </div>
        </div>
      </div>

      <div
        class="flex h-[80vh] top-0 relative lg:items-start items-center"
        v-if="loading_show === false && post"
      >
        <swiper
          :slides-per-view="1"
          :modules="modules"
          :space-between="50"
          navigation
          :pagination="{ dynamicBullets: true }"
        >
          <swiper-slide v-for="(media, index) in post?.media" :key="index">
            <div class="w-full h-[80vh] flex justify-center items-center">
              <img class="min-h-auto max-h-[80vh] object-cover" :src="media.original_url" alt="" />
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div class="flex w-full pb-2 fixed lg:absolute lg:bottom-0 bottom-3 right-0 left-0">
        <div class="w-full lg:w-7/12 m-auto h-full" v-if="post">
          <FeedCardActions :data="post" colorText=" text-white" />
        </div>
      </div>
    </section>

    <!-- Info content post -->
    <Transition>
      <FeedDetailSideContent
        v-show="isHide"
        :post="post"
        :USER="USER"
        class="SideLg hidden lg:flex z-10 pt-16 lg:pt-0"
      />
    </Transition>
  </main>
</template>

<script lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import Pagination from 'swiper'
import { URL } from '@/router/url'
import axios from 'axios'
import { defineComponent, onMounted, computed, ref, defineAsyncComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import FeedCardActions from './__partials/feed.card.actions.vue'
import TextQuery from '@/components/texts/text.query.vue'
import { envConfig } from '@/env.config'
import FeedCardContent from './__partials/feed.card.content.vue'
import FeedCardCommentsPeople from './../feeds/__partials/feed.card.comments.people.vue'
import LoadingSpiner from '@/components/cards/loading/loading.spiner.vue'
import FeedCardProfile from './../feeds/__partials/feed.card.profile.vue'
import moment from 'moment'
import FeedDetailSideContent from './__partials/feed.detail.side.content.vue'
import { useFeedComposition } from '@/composables/feed.composition'
import {
  ArrowSmallLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/24/solid'

export default defineComponent({
  name: 'feed-details',
  props: ['USER'],
  components: {
    Swiper,
    SwiperSlide,
    FeedCardActions,
    TextQuery,
    FeedCardContent,
    FeedCardCommentsPeople,
    LoadingSpiner,
    FeedCardProfile,
    FeedDetailSideContent,
    ChevronDoubleRightIcon,
    ArrowSmallLeftIcon,
    ChevronDoubleLeftIcon,
    ArrowLeftIcon,
  },
  setup() {
    const isHide = ref(false)
    const route = useRoute()

    onMounted(() => {
      postShow(route.params.slug)
      HideSideInfo(false)
      document.querySelector('body')?.classList.add('overflow-y-hidden')
    })

    const HideSideInfo = (isHide_bool: any) => {
      const SideLg = document.querySelector('.SideLg')
      const otherSide = document.querySelector('.otherSide')
      if (isHide_bool) {
        otherSide?.classList.remove('lg:w-9/12')
        otherSide?.classList.add('lg:w-full')

        SideLg?.classList.remove('flex')
        SideLg?.classList.add('hidden')

        SideLg?.classList.remove('lg:flex')
        SideLg?.classList.add('lg:hidden')
        isHide.value = false
      } else {
        otherSide?.classList.add('lg:w-9/12')
        otherSide?.classList.remove('lg:w-full')

        SideLg?.classList.remove('lg:hidden')
        SideLg?.classList.add('lg:flex')

        SideLg?.classList.remove('hidden')
        SideLg?.classList.add('flex')
        isHide.value = true
      }
    }

    const hideBody = (_router: any) => {
      _router.replace('/feeds')
      document.querySelector('body')?.classList.remove('overflow-y-hidden')
    }

    const { postShow, loading_show, post } = useFeedComposition()

    return {
      post,
      envConfig,
      hideBody,
      loading_show,
      postShow,
      HideSideInfo,
      isHide,
      modules: [Pagination],
    }
  },
})
</script>

<style scoped></style>
