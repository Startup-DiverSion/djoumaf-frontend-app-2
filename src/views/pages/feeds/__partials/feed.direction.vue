<template>
  <!-- border-t-[1px] border-b-[1px] lg:border-[1px] -->
  <div
    class="bg-white sticky top-14 z-10 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 w-full border-b-[1px] "
  >
    <div class="grid grid-cols-2 divide-x-[1px]">
      <div v-for="direction in FeedDirections">
        <div
          class="flex justify-center items-center m-auto relative cursor-pointer py-3 hover:bg-gray-100"
        >
          <span class="text-sm" :class="direction.actvied ? 'font-bold' : ''">
            {{ direction.name }}
          </span>
          <div
            v-if="direction.actvied" 
            class="top-[95%] absolute inline-flex w-12 h-[2px] rounded-full bg-blue-500"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  defineAsyncComponent,
} from "vue";
import ModalBasic from "@/components/modals/modal.basic.vue";
import { useFeedStore } from "@/stores/feeds";
import { useModal } from "@/components/modals/modal.services";
import ModalJob from "@/components/modals/modal.job.vue";
import { useUserComposition } from "@/composables/user.composition";
import { envConfig } from "@/env.config";
import { useFeedComposition } from "@/composables/feed.composition";
import FeedPosterOptions from "./feed.poster.options.vue";

export default defineComponent({
  name: "feed-poster",
  components: { ModalBasic, ModalJob, FeedPosterOptions },
  props: [],
  setup(props) {
    const FeedDirections = [
      {
        name: "Juste pour vous",
        actvied: true,
      },
      {
        name: "Abonnements",
        actvied: false,
      },
    ];

    return {
      FeedDirections,
    };
  },
});
</script>

<style scoped></style>
