<template>
  <SideLayout>
    <template #content>
      <HomeLayout >
        <template #small v-if="statistic && USER?.profile">
          <CardMedia
            label="Gérer votre cerle"
            sticky="sticky top-20"
            :more="false"
          >
            <div class="flex flex-col gap-1 justify-center font-love text-base">
              <div v-for="(item, index) in statistic">
                <RouterLink
                  :to="'/' + USER?.profile?.slug + '' + item.link"
                  class="flex gap-2 items-center cursor-pointer justify-between px-4 py-2 hover:bg-gray-50"
                >
                  <!--  -->
                  <span class="font-love font-medium text-sm">{{
                    item.name
                  }}</span>
                  <span
                    class="font-love font-bold rounded-full bg-gray-100 px-2 text-[10px]"
                  >
                    {{ item.count }}
                  </span>
                </RouterLink>
              </div>
            </div>
          </CardMedia>
        </template>

        <template #large v-if="USER?.profile">
          <div class="flex flex-col gap-4 font-love">
            <div class="flex flex-col gap-4 rounded-md">
              <div class="bg-white px-4 lg:rounded-lg">
                <CardBody label="Developper votre cercle">

                  <RouterLink :to="'/'+USER?.profile.slug+'/my-cercle'" class="border-y-[0px] py-3 mb-4 flex justify-between items-center text-base text-white bg-blue-600/70 px-4 rounded-md">
                    <span class=" font-bold">Mon Cercle</span>
                    <button class="bg-"> <ArrowRightIcon class="fi fi-sr-arrow-right h-5"></ArrowRightIcon> </button>
                  </RouterLink>

                  <div class="flex flex-col gap-8">
                    <!-- Les personnes les plus Djoumer -->
                    <div class="flex flex-col gap-4">
                      <div class="flex justify-between">
                        <span class="text-thin font-bold opacity-90"
                          >Les profils que vous prouriez suivre</span
                        >
                      </div>

                      <LoadingMessage
                        v-if="state_profile.profile"
                        :data="state_profile.profile"
                        :message="'Aucun profile disponible.'"
                        :error="state_profile.error"
                        :loading="!state_profile.loading"
                      />

                      <div
                        class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2"
                      >
                        <div
                          v-for="item in 8"
                          v-if="state_profile.loading === true"
                        >
                          <LoadingProfileCard />
                        </div>
                        <div
                          v-else
                          v-for="item in state_profile.profile"
                          class=""
                        >
                          <CardPostProfile
                          
                            :data="item"
                            class-name="w-full"
                            :follow="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <BtnMoreCard @click="MoreSeeProfile" v-if="
                      state_profile.paginted.current <
                        state_profile.totalCount
                    " label="Voir Plus" :loading="state_profile.loading_paginied" />
                  

                 
                </CardBody>
              </div>

          

              <div class="bg-white px-4 lg:rounded-lg">
                <!-- Les entreprises -->
                <CardBody label="Les entreprises sur DjoumAf">
                  <div class="flex flex-col gap-4">
                    <div class="flex justify-between">
                      <span class="text-thin font-bold opacity-90"
                        >Les entreprises à suivre...</span
                      >
                    </div>
                    <LoadingMessage
                      v-if="state_profile_compagny.profile"
                      :data="state_profile_compagny.profile"
                      :message="'Aucune entreprise disponible.'"
                      :error="state_profile_compagny.error"
                      :loading="!state_profile_compagny.loading"
                    />

                    <div
                      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2"
                    >
                      <div
                        v-for="item in 8"
                        v-if="state_profile_compagny.loading === true"
                      >
                        <LoadingProfileCard />
                      </div>
                      <div
                        v-for="item in state_profile_compagny.profile"
                      >
                        <CardPostProfile
                          :data="item"
                          class-name="w-full"
                          btn-name="Rejoindre"
                          :follow="true"
                        />
                      </div>
                    </div>

                    <BtnMoreCard @click="MoreSeeProfileCompagny" v-if="
                      state_profile_compagny.paginted.current <
                      state_profile_compagny.totalCount
                    " label="Voir Plus"  />
                  

                  </div>
                </CardBody>
              </div>
            </div>
          </div>
        </template>
      </HomeLayout>
    </template>
  </SideLayout>
</template>

<script lang="ts">
import HomeLayout from "@/layouts/HomeLayout.vue";
const BtnMoreCard = defineAsyncComponent(
  () => import("@/components/buttons/btn.more.card.vue")
);
const BtnSimple = defineAsyncComponent(
  () => import("@/components/buttons/btn.simple.vue")
);
const CardPostProfile = defineAsyncComponent(
  () => import("@/components/cards/card.post.profile.vue")
);

import {
  defineComponent,
  onMounted,
  defineAsyncComponent,
  ref,
  reactive,
} from "vue";
const CardMedia = defineAsyncComponent(
  () => import("@/components/cards/medias/card.media.vue")
);
const NavigationSideMenu = defineAsyncComponent(
  () => import("@/navigations/navigation.side.menu.vue")
);
const SideLayout = defineAsyncComponent(
  () => import("@/layouts/SideLayout.vue")
);
const CardBody = defineAsyncComponent(
  () => import("@/components/cards/medias/card.body.vue")
);
import { useProfileComposition } from "@/composables/profile.composition";
import { useCerleComposition } from "@/composables/cerle.composition";
import LoadingMessage from "@/components/cards/loading/loading.message.vue";
import LoadingProfileCard from "@/components/cards/loading/loading.profile.card.vue";
import { useUserComposition } from "@/composables/user.composition";
import { useMeta } from "vue-meta";
import { ArrowRightIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "",
  components: {
    HomeLayout,
    BtnMoreCard,
    BtnSimple,
    CardPostProfile,
    CardBody,
    CardMedia,
    NavigationSideMenu,
    SideLayout,
    LoadingMessage,
    LoadingProfileCard,
    ArrowRightIcon
},
  props: [],
  setup() {
    useMeta({ title: "Cercles", StyleSheetList });
    const {
      getAllProfile,
      profiles,
      loading_profile,
      loading_profile_company,
      profilesCompany,
    } = useProfileComposition();
    const {
      MYCERCLE,
      getMyCercleAbonnement,
      getMyCercleAbonner,
      loading_getMyCercle,
      error_getMyCercle,
      ALLPROFILE,
      ALLPROFILE_COMPANY,
      statistic,
      state_profile,
      state_profile_compagny,
      MoreSeeProfile,
      MoreSeeProfileCompagny
    } = useCerleComposition();
    const { GET_USER, USER } = useUserComposition();
    onMounted(() => {
      //
      GET_USER();
      MYCERCLE();
      ALLPROFILE(
        {'limit': state_profile.paginted.limit, 'page': state_profile.paginted.page}
      ).then(() => {
        state_profile.paginted.current = state_profile.count;
      });
      ALLPROFILE_COMPANY(`?limit=${state_profile_compagny.paginted.limit}&page=${state_profile_compagny.paginted.page}`).then(() => {
        state_profile_compagny.paginted.current = state_profile_compagny.count;
      });
    });

   

    return {
      loading_profile,
      loading_profile_company,
      profiles,
      profilesCompany,
      getMyCercleAbonnement,
      getMyCercleAbonner,
      loading_getMyCercle,
      error_getMyCercle,
      statistic,
      USER,
      MoreSeeProfile,
      state_profile,
      state_profile_compagny,
      MoreSeeProfileCompagny
    };
  },
});
</script>

<style scoped></style>
