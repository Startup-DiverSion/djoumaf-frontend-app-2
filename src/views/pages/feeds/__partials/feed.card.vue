<template>
  <!--  border-b-[0px] lg:border-[1px] -->
  <div class="w-full bg-white lg:rounded-md0 font-love pb-4 border-t-[1px]">
    <FeedCardProfile :envConfig="envConfig" :USER="USER" :post="post" />

    <!-- Content Message -->
    <FeedCardContent
      :content="post?.description"
      :media-size="post?.media.length"
    />
    <!-- Content Media -->
    <FeedCardFiles
      :media="post?.media"
      :slug="post?.slug ? post?.slug : 'test'"
    />

    <!-- <div class="flex justify-between w-11/12 m-auto mt-4 py-1">
      <div class="flex items-center gap-1">
       
        <span class="text-[0.80rem] font-medium text-green-600">  103  </span>
      </div>
      <span class="text-[0.75rem] hover:underline cursor-pointer font-medium">
        53 Commentaire
      </span>
    </div> -->

    <FeedCardActions
      @isLiked="(value:any) => (post.is_liked = value)"
      @isDjoumer="
        (value:any) => {
          post.is_djoumer = value;
        }
      "
      @commentSender="
        (value:any) => {
          Fun__displaySender(value);
        }
      "
      :data="post"
      :isBorder="true"
    />

    <FeedComments
      :post="post"
      :USER="USER"
      :displaySenderComment="displaySenderComment"
      :postCommentData="postCommentData"
      :moreCommentsCount="moreCommentsCount"
    />
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
import FeedComments from "./feed.comments.vue";

export default defineComponent({
  name: "",
  props: ["post", "USER"],
  components: {
    FeedCardCommentsSender,
    FeedCardCommentsPeople,
    TextQuery,
    FeedCardFiles,
    FeedCardContent,
    FeedCardActions,
    FeedCardProfile,
    FeedComments,
  },
  setup(props) {
    // Data
    const commentsAll: any = ref(props.post.comments);
    const comments: any = reactive({
      data: [],
      toShow: [],
      senderActive: false,
      pepoleActive: false,
    });

    const moreCommentsCount =ref(10)
    const Fun_moreCommentsCount = () => {
       moreCommentsCount.value = moreCommentsCount.value + 10
    };

    const displaySenderComment: any = ref([]);

    onMounted(() => {
      props.post.comments.reverse().slice(0, moreCommentsCount);
    });

    const Fun__displaySender = (postID: any) => {
      if (displaySenderComment.value != 0) {
        const isExist = displaySenderComment.value.find((el: any) => {
          return el.id == postID;
        });
        if (isExist) {
          displaySenderComment.value = displaySenderComment.value.filter(
            (el: any) => {
              return el.id !== postID;
            }
          );
        } else {
          displaySenderComment.value.push({ id: postID });
        }
      } else {
        displaySenderComment.value.push({ id: postID });
      }
    };

    const postCommentData = computed(() => {
      return props.post.comments;
    });
    return {
      comments,
      displaySenderComment,
      envConfig,
      Fun__displaySender,
      commentsAll,
      moreCommentsCount,
      postCommentData,
      Fun_moreCommentsCount
    };
  },
});
</script>

<style scoped></style>
