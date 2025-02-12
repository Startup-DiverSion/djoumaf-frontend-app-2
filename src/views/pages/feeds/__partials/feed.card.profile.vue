<template>
  <div class="flex gap-2 p-4 w-full  justify-between">

    
   

    <div class="flex gap-2 w-[95%] ">


      <AvatarProfile :imageUrl="post?.user.profile.media_profile[0]?.url
          ? post?.user.profile.media_profile[0].original_url
          : envConfig().DEFAULT_IMAGE_PROFILE" size="medium" />

  
      <!-- Infos on user -->
      <div class="flex flex-col  w-9/12 lg:w-10/12 ">
        <div class="flex gap-2 items-center">
          <a :href="'/'+post?.user?.profile.slug" class="hover:underline underline-offset-2">
            <TextQuery
            class-name="text-[14px] font-bold"
            :title="post?.user?.profile.full_name"
            :sm="18"
            :md="25"
            :lg="45"
            :xl="45"
          />
          </a>
          <span>&#149</span>
          <button
            :disabled="
              post?.user.id == USER?.id || post?.user.isProfileFollow === true
                ? true
                : false
            "
            @click="FOLLOW(post?.user.id, post)"
            class="text-xs"
            :class="
              post?.user.id == USER?.id
                ? 'text-gray-500'
                : !post?.user.isProfileFollow
                ? 'font-bold text-green-500 hover:underline'
                : 'text-gray-500'
            "
          >
            {{
              post?.user.id == USER?.id
                ? "Vous"
                : post?.user.isProfileFollow
                ? "Abonné"
                : "Suivre"
            }}
          </button>
        </div>

        <TextQuery
          class-name="text-xs font-medium lg:text-[12px] lg:mb-[2px]"
          :title="post?.user?.profile.bio"
          :sm="35"
          :md="30"
          :lg="45"
          :xl="55"
        />
        <TextQuery
          class-name="text-[10px] font-light relative -top-[1.5px]"
          :title="
            post?.place
              ? `${post?.place?.region} •  ${post?.created_at}`
              : ` ${post?.created_at}`
          "
          :sm="50"
          :md="50"
          :lg="50"
          :xl="50"
        />
      </div>

    </div>
    <FeedCardDropmenu :isFollow="post?.user.isProfileFollow" :isUser="post?.user.id == USER?.id" :post="post" />

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useCerleComposition } from "@/composables/cerle.composition";
import FeedCardDropmenu from "./feed.card.dropmenu.vue";
import TextQuery from "@/components/texts/text.query.vue";
import AvatarProfile from "@/components/avatar/avatarProfile.vue";

export default defineComponent({
  name: "",
  props: ["post", "USER", "envConfig"],
  components: { FeedCardDropmenu, TextQuery, AvatarProfile },
  setup() {
    const isFollow = ref(false);
    const { isFollowUser, FOLLOW } = useCerleComposition();
    return {
      FOLLOW,
    };
  },
});
</script>

<style scoped></style>
