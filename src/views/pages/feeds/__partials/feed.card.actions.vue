<template>
  <div v-for="(iconAndCount, index) in ActionsCard">
    <div
      class="flex gap-2 wfull justify-between m-auto pt-1 mt-2 px-4"
      :class="isBorder ? 'border-t-[0px] pt-1' : ''"
      v-if="iconAndCount[0].postID == data.id"
    >
      <div v-for="item in iconAndCount">
        <div
          @click="AllActions(item.id)"
          class="flex justify-center text-center items-center gap-[3px] cursor-pointer rounded-md group"
        >
          <div
            class="w-6 h-6 p-1 rounded-full flex items-center justify-center"
            :class="(item.allready ? item.iconActived : item.icon + ' '+ colorText)"
          >
            <AvatarIconFeed
              :path="item.id"
              :actived="item.allready"
              :class-name="'transform transition  h-[24px] w-[18px] duration-500'"
            />
          </div>

          <span
            class="text-[0.80rem] font-semibold transform transition duration-500 hidden lg:flex"
            :class="[
              `${item.allready ? item.colorActived : item.color}`,
              colorText,
            ]"
          >
            {{ item.count }}
          </span>

          <span
            class="text-[0.80rem] font-medium transform transition duration-500 lg:hidden flex"
            :class="[
              `${item.allready ? item.colorActived : item.color}`,
              colorText,
            ]"
          >
            {{ item.count }}
          </span>
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
  computed,
  onMounted,
  defineAsyncComponent,
} from "vue";
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
import axios from "axios";
import { URL } from "@/router/url";
import { useFeedStore } from "@/stores/feeds";
import AvatarIconFeed from "@/components/avatar/avatarIconFeed.vue";

export default defineComponent({
  count: "",
  props: ["data", "isBorder", "colorText"],
  components: {
    FeedCardCommentsSender,
    FeedCardCommentsPeople,
    TextQuery,
    FeedCardFiles,
    FeedCardContent,
    FeedCardDropmenu,
    AvatarIconFeed,
  },
  setup(props, { emit }) {
    const loading = reactive({
      like: false,
      djoumer: false,
    });

    const ActionsCard = computed(() => {
      return useFeedStore().actionsCount;
    });

    const AllActions = (valueID: any) => {
      let A_Count: any;
      useFeedStore().actionsCount.forEach((element: any, index: any) => {
        element.forEach((el: any) => {
          if (props.data.id == el.postID) {
            A_Count = index;
          }
        });
      });

      if (valueID === "dj-00" && loading.djoumer === false) {
        Actions(
          URL.POST_ACTION_DJOUMER,
          loading.djoumer,
          props.data?.is_djoumer,
          A_Count,
          "isDjoumer",
          0
        );
      }
      if (valueID === "dj-01" && loading.like === false) {
        Actions(
          URL.POST_ACTION_LIKE,
          loading.like,
          props.data?.is_liked,
          A_Count,
          "isLiked",
          1
        );
      }

      if (valueID === "dj-02") {
        emit("commentSender", props.data.id);
      }
    };

    const Actions = async (
      url: any,
      loading: Boolean,
      is: Boolean,
      count: number,
      _emit: string,
      index: number
    ) => {
      try {
        loading = true;
        const { data } = await axios.post(url, {
          postID: props.data?.id,
          userID: props.data?.user.id,
        });
        console.log(useFeedStore().actionsCount[count]);
        if (data) {
          if (!useFeedStore().actionsCount[count][index].allready) {
            useFeedStore().actionsCount[count][index].count =
              useFeedStore().actionsCount[count][index].count + 1;
            useFeedStore().actionsCount[count][index].allready = true;
          } else if (useFeedStore().actionsCount[count][index].allready) {
            useFeedStore().actionsCount[count][index].count =
              useFeedStore().actionsCount[count][index].count - 1;
            useFeedStore().actionsCount[count][index].allready = false;
          } else {
            useFeedStore().actionsCount[count][index].count =
              useFeedStore().actionsCount[count][index].count + 1;
            useFeedStore().actionsCount[count][index].allready = true;
          }
          loading = false;
        }
      } catch (error) {
        console.log(error);
        loading = false;
      }
    };

    return {
      ActionsCard,
      AllActions,
      loading,
    };
  },
});
</script>

<style scoped></style>
