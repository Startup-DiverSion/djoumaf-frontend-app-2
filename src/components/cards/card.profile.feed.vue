<template>
  <div class="flex flex-col gap-2 py-2 w-full hover:bg-gray-50 px-2">
    <RouterLink
      :to="{ name: 'Profile', params: { slug: profileToFollow.slug } }"
      class="flex gap-2"
    >

    <AvatarProfile :imageUrl="profileToFollow?.media_profile[0]?.url
          ? profileToFollow?.media_profile[0].original_url
          : envConfig().DEFAULT_IMAGE_PROFILE" size="small" />
   
      <div class="flex flex-col">
        <TextQuery
          class-name="text-sm font-bold"
          :title="profileToFollow.full_name"
          :xl="18"
        />
        <TextQuery class-name="text-xs" :title="profileToFollow.bio" :xl="30" />
      </div>
    </RouterLink>

    <div class="flex gap-1 w-full justify-start">
      <BtnFollow
        classeName="py-0 px-2"
        classe-text="text-[10px]"
        label="Suivre"
        :data="profileToFollow"
        v-if="profileToFollow?.isProfileFollow === false"
      />
      <!-- <BtnDjoumer
                        classeName="py-0 px-2"
                        classe-text="text-[10px]"
                        label="Djoumer"
                      /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";
import { envConfig } from "@/env.config";
import TextQuery from "../texts/text.query.vue";
import BtnFollow from "../buttons/btn.follow.vue";
import AvatarProfile from "../avatar/avatarProfile.vue";

export default defineComponent({
  name: "",
  props: ["profileToFollow"],
  setup() {
    return { envConfig };
  },
  components: { TextQuery, BtnFollow, AvatarProfile },
});
</script>

<style scoped></style>
