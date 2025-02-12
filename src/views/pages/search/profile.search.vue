<template>
  <SideLayout>
    <template #content>
      <HomeLayout>
        <template #small>
          <CardMedia
            label="Trouvez des profils locaux"
            sticky="sticky top-20"
            :more="false"
          >
            <SpFilter :inputDataFilterProfile="inputDataFilterProfile" :sendToSearchProfile="sendToSearchProfile"/>
          </CardMedia>
        </template>

        <template #large v-if="USER?.profile">
          <div class="flex flex-col gap-4 font-love">
            <div class="flex flex-col gap-4 rounded-md">
              <div class="bg-white px-4 lg:rounded-lg">
                <CardBody
                  label="Des profils locaux disponible"
                >
                  <div
                    class="flex items-center gap-1 lg:hidden w-full justify-end mb-2 absolute -top-10 right-0"
                    @click="close = false"
                  >
                    <AdjustmentsHorizontalIcon class="h-5" />
                    <span>Filtre</span>
                  </div>
                  <div class="flex flex-col gap-8">
                    <!-- Les personnes les plus Djoumer -->
                    <div class="flex flex-col gap-4">
                      <LoadingMessage
                        v-if="state_profile_search.data"
                        :data="state_profile_search.data"
                        :message="'Aucun profile disponible.'"
                        :error="state_profile_search.error"
                        :loading="!state_profile_search.loading"
                      />

                      <div
                        class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2"
                      >
                        <div
                          v-for="item in 8"
                          v-if="state_profile_search.loading === true"
                        >
                          <LoadingProfileCard />
                        </div>
                        <div v-for="item in state_profile_search.data?.slice(0, endsearch)" class="">
                          <CardPostProfile :data="item" class-name="w-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <BtnMoreCard @click="endsearch = endsearch + 30" v-if="
                      endsearch <
                        state_profile_search.data.length
                    " label="Voir Plus"  />
                  
                </CardBody>
              </div>
            </div>

        

          </div>
        </template>
      </HomeLayout>
    </template>
  </SideLayout>

  <Transition name="slide-fade">
    <div class="h-[100vh] w-full bg-gray-400/90 fixed top-0 z-20" v-show="close === false">
      <div
      class="h-[80vh] w-full bg-white fixed bottom-0 rounded-t-xl  lg:hidden shadow-2xl"
      
    >
      <div class="px-4 py-4 border-b-[1px] flex justify-between items-center">
        <span class="text-lg font-bold">Recherche de profile</span>
        <XMarkIcon class="h-5" @click="close = true" />
      </div>

      <SpFilter :inputDataFilterProfile="inputDataFilterProfile" :sendToSearchProfile="sendToSearchProfile" />

    </div>
    </div>
  </Transition>
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
import {
  ArrowRightIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/vue/24/solid";
import SpFilter from "./__partiels/spFilter.vue";
import { useProfileSearchComposition } from "@/composables/profile.search.composition";

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
    ArrowRightIcon,
    SpFilter,
    XMarkIcon,
    AdjustmentsHorizontalIcon,
  },
  props: [],
  setup() {
    useMeta({ title: "Recherche avancer des profiles", StyleSheetList });

    const { GET_USER, USER } = useUserComposition();
    const {
      sendToSearchProfile,
      state_profile_search,
      inputDataFilterProfile,
    } = useProfileSearchComposition();

    const close = ref(true);
    const endsearch = ref(21)

    onMounted(async () => {
      //
      await GET_USER();
    });

    return {
      state_profile_search,
      USER,
      close,
      sendToSearchProfile,
      inputDataFilterProfile,
      endsearch
    };
  },
});
</script>

<style scoped>
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
