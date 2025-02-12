<template>

  <div class="flex flex-col gap-4 w-full " v-if="comment?.user">
    <!-- First Comment -->
    <div class="parent-comment flex w-full gap-2">
      <AvatarProfile  :imageUrl="comment?.user.profile.media_profile[0]?.url
                      ? comment?.user.profile.media_profile[0].original_url
                      : envConfig().DEFAULT_IMAGE_PROFILE" size="small"  />

     

      <div class="flex flex-col w-10/12">
        <div
          class=" w-full p-2 rounded-b-lg rounded-tr-lg flex flex-col gap-1" :class="USER?.id == comment?.user.id ? 'bg-gray-50' : 'bg-gray-200'"
        >
          <div class="flex flex-col">
            <div class="flex gap-1 items-center">
              
              <TextQuery
                      :title="comment?.user.profile.full_name"
                      class-name="text-sm font-semibold"
                      :sm="30"
                      :md="50"
                      :lg="35"
                    />
              <span>&#149</span>
              
              <span class="text-[10px]">  {{ moment(comment?.created_at).fromNow() }} </span>
            </div>
          
              <TextQuery
                      :title="comment?.user.profile.bio"
                      class-name="text-xs opacity-90"
                      :sm="70"
                      :md="50"
                      :lg="35"
                    />
            
           
          </div>

          <div class="">
            <span class=" flex flex-col">
              {{ comment.message.substring(0, MoreCommentsCount) }}{{ comment.message.length > MoreCommentsCount ? '...' : ''  }}
              <span class="text-xs cursor-pointer  font-semibold underline underline-offset-1" v-if="comment.message.length > MoreCommentsCount" @click="MoreCommentsCount = comment.message.length" >Voir plus</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Other Comments -->
  </div>

</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  defineAsyncComponent,
} from "vue";
import FeedCardCommentsSender from "./feed.card.comments.sender.vue";
import { envConfig } from "@/env.config";
import moment from "moment";
import AvatarProfile from "@/components/avatar/avatarProfile.vue";
import TextQuery from "@/components/texts/text.query.vue";

export default defineComponent({
  name: "",
  props: ['comment', 'USER'],
  setup() {
    const displayComments: any = ref([]);
    const MoreCommentsCount = ref(220)
    return { displayComments, envConfig, moment , MoreCommentsCount};
  },
  components: { FeedCardCommentsSender, AvatarProfile, TextQuery },
});
</script>

<style scoped></style>
