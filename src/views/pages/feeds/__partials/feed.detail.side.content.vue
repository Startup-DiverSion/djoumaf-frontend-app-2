<template>
  <!-- Info content post -->

  <section
    class="absolute right-0 lg:w-3/12 w-full bg-white h-screen overflow-auto flex-col"
    v-if="loading === false && post"
  >
    <!--  -->
    <FeedCardProfile :envConfig="envConfig" :USER="USER" :post="post" />

    <!-- Content Message -->
    <FeedCardContent :content="post?.description" :media-size="post?.media.length" />

    <div class="border-[1px] mt-8 p-4 flex justify-between text-sm">
      <span class="font-semibold">{{ post?.djoumer_count }} Djoum</span>
      <span class="font-semibold"> {{ post?.like_count }} Aime(s)</span>
      <span class="font-semibold">{{ post?.comment_count }} commantaire(s)</span>
    </div>

    <!-- All Comments -->
    <div class="w-full flex justify-end pt-6 px-4 p-8">
      <div class="w-full flex flex-col gap-2">
        <div v-for="comment in post.comments">
          <FeedCardCommentsPeople :USER="USER" :comment="comment" :post="post" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import Pagination from 'swiper'
import { URL } from '@/router/url'
import axios from 'axios'
import { defineComponent, onMounted, computed, ref, defineAsyncComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import FeedCardProfile from './feed.card.profile.vue'
import FeedCardCommentsPeople from './feed.card.comments.people.vue'
import FeedCardContent from './feed.card.content.vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import TextQuery from '@/components/texts/text.query.vue'
import { envConfig } from '@/env.config'

import LoadingSpiner from '@/components/cards/loading/loading.spiner.vue'

import moment from 'moment'

export default defineComponent({
  name: 'feed-details',
  props: ['USER', 'post'],
  components: {
    Swiper,
    SwiperSlide,
    TextQuery,
    LoadingSpiner,
    FeedCardProfile,
    FeedCardCommentsPeople,
    FeedCardContent,
  },
  setup() {
    const post = ref()
    const loading = ref(false)
    const isHide = ref(false)

    onMounted(() => {
      Show()
      HideSideInfo(false)
    })

    const HideSideInfo = (isHide_bool: any) => {
      const SideInfo = document.querySelector('.SideInfo')
      const otherSide = document.querySelector('.otherSide')
      if (isHide_bool) {
        SideInfo?.classList.add('hidden')
        otherSide?.classList.remove('lg:w-9/12')

        otherSide?.classList.add('w-full')

        isHide.value = false
      } else {
        SideInfo?.classList.remove('hidden')
        SideInfo?.classList.add('hidden')
        otherSide?.classList.add('lg:w-9/12')

        otherSide?.classList.remove('w-full')
        isHide.value = true
      }
    }

    const hideBody = (_router: any) => {
      _router.replace('/feeds')
      document.querySelector('body')?.classList.remove('overflow-y-hidden')
    }

    const Show = async () => {
      try {
        loading.value = true
        const route = useRoute()

        const { data } = await axios.post(URL.POST_SHOW, {
          slug: route.params.slug,
        })
        if (data) {
          post.value = data.post
          post.value.created_at = moment(post.value.created_at).fromNow()
          post.value.place = post.value.place ? JSON.parse(post.value.place) : null
          post.value.device = post.value.device ? JSON.parse(post.value.device) : null
          loading.value = false
        }
      } catch (error) {
        console.log(error)
        loading.value = false
      }
    }

    return { post, envConfig, hideBody, loading, HideSideInfo, isHide, modules: [Pagination] }
  },
})
</script>

<style scoped></style>
