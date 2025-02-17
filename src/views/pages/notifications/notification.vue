<template>
  <SideLayout>
    <template #content>
      <NavigationHeader />

      <main class="flex flex-col w-full">
        <main
          class="flex flex-col lg:flex-row lg:mt-[80px] mt-[50px] lg:w-11/12 w-full m-auto gap-4"
        >
          <section class="w-[20%] hidden lg:flex items-start">
            <CardMedia label="Filtre sur cette page" sticky="sticky top-20 w-full" :more="false">
              <div class="flex flex-col gap-1 justify-center font-love text-base">
                <div v-for="(sfilter, index) in filterSearch">
                  <RouterLink
                    :to="{
                      name: 'Notifications',
                      query: { q: route.query?.q, ft: sfilter.code },
                    }"
                    class="flex gap-2 items-center cursor-pointer justify-between p-2 hover:bg-gray-50 hover:text-gray-700"
                    :class="
                      sfilter.actived
                        ? 'bg-gray-50 border-l-2 border-blue-700/30 text-blue-500 '
                        : ''
                    "
                  >
                    <!--  -->
                    <span class="font-love font-medium text-sm">{{ sfilter.name }}</span>
                    <span
                      class="font-love font-bold hidden rounded-full bg-gray-100 px-2 text-[10px]"
                    >
                      {{ sfilter.count }}
                    </span>
                  </RouterLink>
                </div>
              </div>
            </CardMedia>
          </section>

          <section
            class="w-full lg:w-[55%] lg:mb-16"
            :class="route.query?.ft ? 'mt-12 lg:mt-0' : ''"
          >
            <div class="flex flex-col bg-gray-50 lg:rounded-md py-4 divide-y-[0px]">
              <LadingSpinerBasic :loading="loading_notify" color="text-blue-700" class="h-[85vh]" />
              <div class="w-5/12 m-auto" v-if="G__notify">
                <LoadingMessage
                  :data="G__notify"
                  :message="'Aucune notification n\'est disponible'"
                  message-sub=""
                  :error="error_notify"
                  :loading="!loading_notify"
                  class="w-2/12"
                />
              </div>

              <div
                @click="SeeNotificate(notif)"
                v-if="!loading_notify"
                class="flex py-3 gap-2 px-4 cursor-pointer items-center justify-between"
                v-for="notif in G__notify"
                :class="notif.distribution === false ? 'bg-blue-200' : ''"
              >
                <AvatarProfile
                  v-if="notif"
                  :imageUrl="
                    notif?.user.profile.media_profile[0]?.url
                      ? notif?.user.profile.media_profile[0].original_url
                      : envConfig().DEFAULT_IMAGE_PROFILE
                  "
                  size="medium"
                />

                <div class="flex flex-col gap-0 w-8/12 lg:w-10/12">
                  <div class="flex flex-wrap items-center gap-x-1 text-sm">
                    <TextQuery
                      :title="notif?.user.profile.full_name"
                      class-name="font-semibold"
                      :sm="25"
                      :md="60"
                      :lg="38"
                      :xl="30"
                    />
                    {{ notif?.description }}
                    <TextQuery
                      :title="notif?.content"
                      class-name="font-semibold"
                      :sm="25"
                      :md="60"
                      :lg="35"
                      :xl="40"
                    />
                  </div>
                </div>

                <div class="text-[10px] font-medium w-[35px] justify-end flex">
                  {{ moment(notif?.created_at).fromNow() }}
                </div>
              </div>
            </div>
          </section>

          <section
            class="w-full lg:w-[25%] h-32 lg:flex flex-col gap-4 lg:sticky top-16 lg:top-20 hidden"
          >
            <CardSuggProfie />
          </section>
        </main>
      </main>
    </template>
  </SideLayout>
  <NavigationFooter />
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, reactive, computed, ref, onMounted } from 'vue'
const SideLayout = defineAsyncComponent(() => import('@/layouts/SideLayout.vue'))
import NavigationHeader from '@/navigations/navigationHeader.vue'
import { advertisementImage } from '@/advertisement/advertisement.image'
import CardMedia from '@/components/cards/medias/card.media.vue'
import BtnFollow from '@/components/buttons/btn.follow.vue'
import axios from 'axios'
import { URL } from '@/router/url'
import { useRoute, useRouter } from 'vue-router'
import TextQueryHtml from '@/components/texts/text.query.html.vue'
import { envConfig } from '@/env.config'
import moment from 'moment'
import { useCerleComposition } from '@/composables/cerle.composition'
import CardProfileHz from '@/components/cards/card.profile.hz.vue'
import LoadingMessage from '@/components/cards/loading/loading.message.vue'
import { useSearchComposition } from '@/composables/search.composition'
import TextQuery from '@/components/texts/text.query.vue'
import LadingSpinerBasic from '@/components/cards/loading/lading.spiner.basic.vue'
import CardSuggProfie from '@/components/cards/card.sugg.post.vue'
import { useNotificationComposition } from '@/composables/notification.composition'
import { useNotificateStore } from '@/stores/notificate.store'
import { LocalSotreUtils } from '@/vendors/utils/localStore.utils'
import NavigationFooter from '@/navigations/navigationFooter.vue'
import { useMeta } from 'vue-meta'
import AvatarProfile from '@/components/avatar/avatarProfile.vue'

const route = useRoute()

useMeta({ title: 'Notifications', StyleSheetList })
const { filterSearch, notify, getAllNotify, SeeNotificate, loading_notify, error_notify } =
  useNotificationComposition()

onMounted(() => {
  getAllNotify()
})

const G__notify = computed(() => {
  return useNotificateStore().userNotificate
})
</script>

<style scoped></style>
