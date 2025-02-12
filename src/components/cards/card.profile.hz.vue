<template>
  <div
    class="flex flex-col gap-2 bg-white divide-y-[1px] lg:rounded-md"
    v-if="data"
  >
    <div v-for="sprofile in data">
      <div
        class="bg-white flex gap-2 w-full py-3 mt-2 hover:bg-gray-50 px-2"
        v-if="sprofile.media_profile"
      >
      

        <AvatarProfile :imageUrl=" sprofile.media_profile[0]?.url
                ? sprofile.media_profile[0].original_url
                : envConfig().DEFAULT_IMAGE_PROFILE" size="medium" />

        <div class="flex justify-between w-10/12 items-center gap-1">
          <a :href="'/' + sprofile.slug" class="flex flex-col w-full">
            <TextQuery
              class-name="font-bold  text-sm  leading-[18px] "
              :md="25"
              :lg="23"
              :sm="20"
              :xl="xl"
              :title="sprofile.full_name"
            />
            <TextQuery
              class-name="font-normal text-xs   flex flex-wrap "
              :md="50"
              :lg="50"
              :sm="25"
              :xl="50"
              :title="sprofile?.bio"
            />
          </a>

          <div class="flex divide-x-[1px] gap-1">
            <btnFollow
              :label="'Suivre'"
              classe-name="w-full p-2"
              :data="sprofile"
              :isFollowUser="sprofile?.isProfileFollow"
              v-if="!sprofile?.isProfileFollow"
            />

            <BtnMessage :UserWitChat="sprofile?.user.id" />
          </div>
        </div>
      </div>
    </div>
    
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
import TextQuery from "../texts/text.query.vue";
import { envConfig } from "@/env.config";
import FollowAndDjoumer from "../follow/followAndDjoumer.vue";
import { useCerleComposition } from "@/composables/cerle.composition";
import btnFollow from "../buttons/btn.follow.vue";
import BtnMessage from "../buttons/btn.message.vue";
import AvatarProfile from "@/components/avatar/avatarProfile.vue";

export default defineComponent({
  name: "card-post-profile",
  props: ["data", "xl"],
  components: {
    TextQuery,
    FollowAndDjoumer,
    useCerleComposition,
    btnFollow,
    BtnMessage,
    AvatarProfile
  },
  setup() {
    const isFollow = ref(false);
    return {
      envConfig,
      isFollow,
    };
  },
});
</script>

<style scoped></style>
