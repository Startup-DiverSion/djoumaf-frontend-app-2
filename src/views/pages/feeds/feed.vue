<template>
  <SideLayout>
    <template #content>
      <NavigationHeader />
      <main
        class="my-20 lg:w-11/12 xl:w-[88%] w-full flex gap-4 lg:gap-2 m-auto flex-col lg:flex-row"
      >
        <!--  -->
        <FeedSectionLeft class="hidden lg:flex" />

        <!--  -->
        <section class="w-full lg:w-6/12">
          <div
            class="flex flex-col lg:w-[95%] w-full m-auto bg-white border-[1px]"
          >
            <FeedDirection />
            <div class="flex flex-col gap-2 pb-2">
              <FeedPoster :USER="USER" />
            </div>

            <!--  -->
            <LadingSpinerBasic
              class="h-[80vh]"
              color="text-blue-700"
              :loading="post_index_loading"
            />
            <div v-for="post in posts" v-if="post_index_loading == false">
              <FeedCard :post="post" :USER="USER" />
              
            </div>
          </div>
        </section>


        

        <!--  -->
        <FeedSectionRight class="hidden lg:flex" />
      </main>

      <!-- Details of post -->
      <FeedDetail :USER="USER" v-if="FeedDetailView__Val" />

      <NavigationFooter />
    </template>
  </SideLayout>
  {{ FeedDetailView }}

  <ModalInfo :USER="USER" />
  
</template>

<script lang="ts">
const BtnDjoumer = defineAsyncComponent(
  () => import("@/components/buttons/btn.djoumer.vue")
);
const BtnFollow = defineAsyncComponent(
  () => import("@/components/buttons/btn.follow.vue")
);
const CardMedia = defineAsyncComponent(
  () => import("@/components/cards/medias/card.media.vue")
);
const ChooseYourPreference = defineAsyncComponent(
  () => import("@/components/toPages/Auth/chooseYourPreference.vue")
);
const LegalAuthCompoment = defineAsyncComponent(
  () => import("@/components/toPages/Auth/legalAuthCompoment.vue")
);
const NavigationFooter = defineAsyncComponent(
  () => import("@/navigations/navigationFooter.vue")
);
import NavigationHeader from "@/navigations/navigationHeader.vue";
import ModalInfo from "@/components/modals/modal.info.vue";

import {
  defineComponent,
  onMounted,
  computed,
  ref,
  defineAsyncComponent,
} from "vue";
import ProfileGlobalInfo from "../profile/__partiels/profile.global.info.vue";
import FeedCard from "./__partials/feed.card.vue";
import FeedPoster from "./__partials/feed.poster.vue";
import FeedComments from "./__partials/feed.comments.vue";
import InDeveloppmentApp from "@/components/inDeveloppment/in.developpment.app.vue";
import FeedSectionLeft from "./__partials/feed.section.left.vue";
import FeedSectionRight from "./__partials/feed.section.right.vue";
import { useFeedComposition } from "@/composables/feed.composition";
import { useUserComposition } from "@/composables/user.composition";

const SideLayout = defineAsyncComponent(
  () => import("@/layouts/SideLayout.vue")
);
import FeedDetail from "./feed.detail.vue";
import { useRouter, useRoute } from "vue-router";
import LoadingSpiner from "@/components/cards/loading/loading.spiner.vue";
import FeedDirection from "./__partials/feed.direction.vue";
import { useFeedStore } from "@/stores/feeds";
import { useMeta } from "vue-meta";
import LadingSpinerBasic from "@/components/cards/loading/lading.spiner.basic.vue";

export default defineComponent({
  name: "auth-layout",
  props: [],
  components: {
    NavigationHeader,
    NavigationFooter,
    ChooseYourPreference,
    ProfileGlobalInfo,
    CardMedia,
    BtnFollow,
    BtnDjoumer,
    LegalAuthCompoment,
    FeedPoster,
    FeedCard,
    InDeveloppmentApp,
    FeedSectionLeft,
    FeedSectionRight,
    SideLayout,
    FeedDetail,
    LoadingSpiner,
    FeedDirection,
    LadingSpinerBasic,
    ModalInfo,
    FeedComments
  },
  setup() {
    useMeta({ title: "Feed", StyleSheetList });
    const isDeveloppment = true;
    const { postIndex, post_index_loading } = useFeedComposition();
    const posts = computed(() => {
      return useFeedStore().posts;
    });
    const { USER, GET_USER } = useUserComposition();
    const router = useRouter();
    const route = useRoute();
    const FeedDetailView__Val = ref(false);

    const FeedDetailView = computed(() => {
      if (route.name === "FeedDetail") {
        FeedDetailView__Val.value = true;
        document.querySelector("body")?.classList.add("overflow-hidden");
      } else {
        FeedDetailView__Val.value = false;
        document.querySelector("body")?.classList.remove("overflow-hidden");
      }
    });

    onMounted(async () => {
      await postIndex();
      await GET_USER();
    });

    return {
      post_index_loading,
      isDeveloppment,
      postIndex,
      posts,
      USER,
      FeedDetailView,
      FeedDetailView__Val,
    };
  },
});
</script>

<style scoped></style>
