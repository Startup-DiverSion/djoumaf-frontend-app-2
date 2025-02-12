<template>
  <div class="flex justify-between w-full px-2">
    <div v-for="item in dataPosterInfo" class="flex justify-center">
      <button
        :disabled="item.isNoOperate || post_loading"
        @click="openModalAside(item.name)"
        class="flex justify-center items-center gap-2"
        :class="
          item.isNoOperate || post_loading ? 'opacity-25' : 'cursor-pointer'
        "
      >
      <AvatarIcon :path="item.name" :className="item.icon + ' h-5'" />
        <span class="text-xs md:text-sm hidden md:flex font-medium top-[2px]">
          {{ item.name }}
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, defineAsyncComponent } from "vue";
import FeedCardCommentsSender from "./feed.card.comments.sender.vue";
import FeedCardCommentsPeople from "./feed.card.comments.people.vue";
import { useIndividualAction } from "@/composables/individual.action";
import TextQuery from "@/components/texts/text.query.vue";
import FeedCardFiles from "@/views/pages/feeds/__partials/feed.card.files.vue";
import FeedCardContent from "@/views/pages/feeds/__partials/feed.card.content.vue";
import { useModal } from "@/components/modals/modal.services";
import { useFeedComposition } from "@/composables/feed.composition";
import { envConfig } from "@/env.config";
import FeedCardDropmenu from "./feed.card.dropmenu.vue";
import AvatarIcon from "@/components/avatar/avatarIcon.vue";

export default defineComponent({
  name: "",
  props: ["post", "USER", "post_loading"],
  components: {
    FeedCardCommentsSender,
    FeedCardCommentsPeople,
    TextQuery,
    FeedCardFiles,
    FeedCardContent,
    FeedCardDropmenu,
    AvatarIcon
},
  setup() {
    // Data
    const { dataPosterInfo } = useModal();
    const { openModalAside } = useFeedComposition();

    return {
      dataPosterInfo,
      openModalAside,
    };
  },
});
</script>

<style scoped></style>
