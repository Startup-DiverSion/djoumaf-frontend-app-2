<template>
  <SideLayout>
    <template #content>
      <NavigationHeader />

      <main class="flex lg:flex-row flex-col w-11/12 m-auto py-24 gap-4">
        <section
          class="lg:flex flex-col hidden w-full lg:w-[25%] bg-white rounded-lg h-full divide-y-2 lg:sticky lg:top-20"
        >
          <ProfileGlobalInfo :data="USER.profile" :isImage="true" />
        </section>

        <section class="lg:w-[50%] w-full">
          <div class="bg-white px-4 py-4 flex flex-col gap-2 rounded-lg">
            <div class="">
              <span class="text-lg font-semibold">
                Activité de {{ USER.profile?.last_name }}</span
              >
            </div>

            <div class="flex gap-2 items-center">
              <div v-for="NA in NavigationActivity">
                <div
                  class="border-[1px] rounded-full px-3 py-1 cursor-pointer"
                  :class="
                    NA.actived
                      ? 'bg-blue-700 text-white'
                      : 'hover:bg-gray-100 opacity-80 hover:opacity-100'
                  "
                >
                  <span class="text-base"> {{ NA.name }} </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Content -->

          <div class="flex flex-col gap-2 mt-2">
            <LadingSpinerBasic
              class="h-[50vh]"
              :color="'text-blue-500'"
              :loading="post_index_loading"
            />
            <LoadingMessageEmpty
              :isEmpty="true"
              class="py-16 bg-gray-50 rounded-lg"
              v-if="posts.length == 0 && !post_index_loading"
              message="Aucune activité pour le moment."
            />
            <div class="" v-for="post in posts" v-if="!post_index_loading">
              <FeedCard :post="post" :USER="USER" />
            </div>
          </div>
        </section>

        <section class="lg:w-[25%] w-full">
          <LegalFooter />
        </section>
      </main>
    </template>
  </SideLayout>
</template>

<script lang="ts">
import NavigationHeader from "@/navigations/navigationHeader.vue";
import {
  defineComponent,
  defineAsyncComponent,
  onMounted,
  reactive,
  computed,
} from "vue";
import ProfileGlobalInfo from "./__partiels/profile.global.info.vue";
const SideLayout = defineAsyncComponent(
  () => import("@/layouts/SideLayout.vue")
);
import { useUserComposition } from "@/composables/user.composition";
import LegalFooter from "@/components/footers/legal.footer.vue";
import { useFeedComposition } from "@/composables/feed.composition";
import FeedCard from "../feeds/__partials/feed.card.vue";
import { useFeedStore } from "@/stores/feeds";
import LoadingSpiner from "@/components/cards/loading/loading.spiner.vue";
import LadingSpinerBasic from "@/components/cards/loading/lading.spiner.basic.vue";
import LoadingMessageEmpty from "@/components/cards/loading/loading.message.empty.vue";

export default defineComponent({
  name: "",
  props: [],
  components: {
    SideLayout,
    NavigationHeader,
    ProfileGlobalInfo,
    LegalFooter,
    FeedCard,
    LoadingSpiner,
    LadingSpinerBasic,
    LoadingMessageEmpty,
  },
  setup(props, ctx) {
    const { USER, GET_USER } = useUserComposition();
    const { postIndex, post_index_loading } = useFeedComposition();
    const NavigationActivity = reactive([
      // {
      //   name: "Toute l'activité",
      //   slug: "all_activity",
      //   actived: true,
      // },
      {
        name: "Posts",
        slug: "posts",
        actived: true,
      },
      // {
      //   name: "Emploi",
      //   slug: "emploi",
      //   actived: false,
      // },
    ]);

    const posts = computed(() => {
      return useFeedStore().posts;
    });

    onMounted(() => {
      GET_USER().then(() => {
        postIndex("/?owner_id=" + USER.value?.id);
      });
    });

    return {
      USER,
      NavigationActivity,
      posts,
      post_index_loading,
    };
  },
});
</script>

<style scoped></style>
