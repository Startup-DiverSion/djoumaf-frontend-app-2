<template>
  <SideLayout>
    <template #content>
      <NavigationHeader />

      <main class="flex flex-col w-full">
        <main class="flex flex-col lg:flex-row my-[80px] lg:w-11/12 w-full m-auto gap-4">
          <section class="w-[20%] hidden lg:flex items-start">
            <CardMedia label="Filtre sur cette page" sticky="sticky top-20 w-full" :more="false">
              <div class="flex flex-col gap-1 justify-center font-love text-base">
                <div v-for="(sfilter, index) in filterSearch">
                  <RouterLink
                    :to="{
                      name: 'Search',
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
            class="w-full lg:w-[55%] lg:mb-16 bg-gray-50 lg:rounded-md"
            :class="route.query?.ft ? 'mt-6 lg:mt-0' : ''"
          >
            <!-- Emploi -->
            <div class="" v-show="filterActived === 'jobs'">
              <div
                class="w-full lg:w-5/12 h-[50vh] flex items-center justify-center m-auto text-center"
                v-if="state_job.jobs && state_job.jobs.length === 0"
              >
                <LoadingMessage
                  :data="state_job.jobs"
                  :message="'Aucun emploi n\'est disponible'"
                  message-sub=""
                  :error="state_job.error"
                  :loading="!state_job.loading"
                  class="w-2/12"
                />
              </div>

              <LadingSpinerBasic :loading="state_job.loading" />

              <div
                class="flex flex-col gap-2 lg:p-2 bg-white divide-y-[1px] lg:rounded-md"
                v-if="state_job.jobs && state_job.jobs.length !== 0 && state_job.loading === false"
              >
                <CradJobSearch
                  v-if="state_job.jobs"
                  :jobs="state_job.jobs"
                  :envConfig="envConfig"
                />

                <BtnMoreCard
                  @click="SeeMoreJob"
                  v-if="state_job.paginted.current < state_job.totalCount"
                  label="Voir Plus"
                  :loading="state_job.loading_paginied"
                />
              </div>
            </div>

            <!-- Personnes -->
            <div v-show="filterActived === 'person'" class="">
              <div
                class="w-full lg:w-5/12 h-[50vh] flex items-center justify-center m-auto text-center"
                v-if="state_profile.profile && state_profile.profile.length === 0"
              >
                <LoadingMessage
                  v-if="state_profile.profile"
                  :data="state_profile.profile"
                  :message="'Aucune personne n\'est disponible'"
                  message-sub=""
                  :error="state_profile.error"
                  :loading="!state_profile.loading"
                  class="w-8/12"
                />
              </div>

              <LadingSpinerBasic :loading="state_profile.loading" />

              <CardProfileHz class="px-4 py-4" :data="state_profile.profile" />

              <BtnMoreCard
                @click="MoreSeeProfile"
                v-if="state_profile.paginted.current < state_profile.totalCount"
                label="Voir Plus"
                :loading="state_profile.loading_paginied"
              />
            </div>

            <!-- Entreprise -->
            <div class="w-full" v-show="filterActived === 'company'">
              <CardProfileHz class="px-4 py-4" :data="state_profile_compagny.profile" />
              <div
                class="w-full lg:w-5/12 h-[50vh] flex items-center justify-center m-auto text-center"
                v-if="state_profile_compagny.profile && state_profile_compagny.profile.length === 0"
              >
                <LoadingMessage
                  v-if="state_profile_compagny.profile"
                  :data="state_profile_compagny.profile"
                  :message="'Aucune entreprise n\'est disponible'"
                  message-sub=""
                  :error="state_profile_compagny.error"
                  :loading="!state_profile_compagny.loading"
                  class="w-8/12"
                />
              </div>
              <LadingSpinerBasic :loading="state_profile_compagny.loading" />
              <BtnMoreCard
                @click="MoreSeeProfileCompagny"
                v-if="state_profile_compagny.paginted.current < state_profile_compagny.totalCount"
                label="Voir Plus"
                :loading="state_profile_compagny.loading_paginied"
              />
            </div>
          </section>

          <section class="w-full lg:w-[25%] flex flex-col gap-4 lg:sticky lg:top-20">
            <CardSuggProfie />
          </section>
        </main>
      </main>
    </template>
  </SideLayout>
  <NavigationFooter />
  {{ verify_to_search }}
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
import NavigationFooter from '@/navigations/navigationFooter.vue'
import { useUserComposition } from '@/composables/user.composition'
import BtnMoreCard from '@/components/buttons/btn.more.card.vue'
import CradJobSearch from '@/components/cards/card.job.serach.vue'

const {
  filterSearch,
  verify_to_search,
  SeeMoreJob,
  state_job,
  filterActived,
  state_profile,
  state_profile_compagny,
  MoreSeeProfileCompagny,
  MoreSeeProfile,
} = useSearchComposition()

const route = useRoute()
const router = useRouter()

onMounted(() => {
  GET_USER()
})

const { USER, GET_USER } = useUserComposition()
</script>

<style scoped></style>
