<template>
  <!-- Send Comments -->
  <div class="w-11/12 m-auto">
    <div v-for="item in displaySenderComment">
      <FeedCardCommentsSender
        :USER="USER"
        :post="post"
        @addToComment="
              (value:any) => {
                post.comments.unshift(value);
              }
            "
      />

      <!-- All Comments -->
      <div
        class="w-full flex justify-end pt-6"
        v-if="item.id === post?.id && post?.comments.length != 0"
      >
        <div class="w-full flex flex-col gap-2">
          <div v-for="comment in postCommentData.slice(0, commentsCount)">
            <FeedCardCommentsPeople
              :USER="USER"
              :comment="comment"
              :post="post"
            />
          </div>

          <div
            class="w-full m-auto flex justify-end"
            v-if="post.comments.length > commentsCount"
          >
            <button
              class="text-xs p-[2px] font-semibold bg-blue-500 text-white rounded-full px-3"
              @click="commentsCount = commentsCount + 10"
            >
              Plus de commentaires
            </button>
          </div>
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
  defineAsyncComponent,
  onMounted,
  computed,
} from "vue";
import FeedCardCommentsSender from "./feed.card.comments.sender.vue";
import FeedCardCommentsPeople from "./feed.card.comments.people.vue";
import { useIndividualAction } from "@/composables/individual.action";
import TextQuery from "@/components/texts/text.query.vue";
import FeedCardFiles from "@/views/pages/feeds/__partials/feed.card.files.vue";
import FeedCardContent from "@/views/pages/feeds/__partials/feed.card.content.vue";

import { envConfig } from "@/env.config";
import FeedCardActions from "./feed.card.actions.vue";
import FeedCardProfile from "./feed.card.profile.vue";

export default defineComponent({
  name: "",
  props: [
    "post",
    "USER",
    "displaySenderComment",
    "postCommentData",
    "moreCommentsCount",
    "Fun_moreCommentsCount"
  ],
  components: {
    FeedCardCommentsSender,
    FeedCardCommentsPeople,
    TextQuery,
    FeedCardFiles,
    FeedCardContent,
    FeedCardActions,
    FeedCardProfile,
  },
  setup(props) {
    // Data
    const commentsCount = ref(10)
  
  
    return {
      envConfig,
      commentsCount
    };
  },
});
</script>

<style scoped></style>
