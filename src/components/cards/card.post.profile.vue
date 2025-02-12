<template>
  <div class="flex flex-col bg-white rounded-md w-full border-[1px]">
    <a :href="'/' + data?.slug" class="flex flex-col w-full">
      <div class="bg-gray-50 w-full h-16 rounded-t-md">
        <div class="h-20 overflow-hidden rounded-t-md">
          <img
            class="min-h-full min-w-full  object-cover object-top rounded-t-md"
            v-lazy="
              data?.media_profile_cover[0]?.url
                ? `${envConfig().HOST_SERVER_IMAGE}${
                    data.media_profile_cover[0].url
                  }`
                : envConfig().DEFAULT_IMAGE_PROFILE_COVER
            "
            alt=""
          />
        </div>

        <div
          class="rounded-full relative -top-7 lg:left-4 flex lg:justify-start justify-center w-full"
        >
          <AvatarProfile
            custom="w-16 h-16"
            :imageUrl="
              data?.media_profile[0]?.url
                ? `${envConfig().HOST_SERVER_IMAGE}${data.media_profile[0].url}`
                : envConfig().DEFAULT_IMAGE_PROFILE
            "
          />
        </div>
      </div>

      <div class="flex flex-col px-4 gap-8 pt-16 pb-4">
        <div
          class="flex flex-col gap-1 font-love h-[70px] lg:items-start items-center"
        >
          <TextQuery
            class-name="font-bold  text-sm lg:text-thin leading-[18px] lg:text-start text-center"
            :md="25"
            :lg="23"
            :sm="12"
            :xl="23"
            :title="data?.full_name"
          />
          <TextQuery
            class-name="font-normal text-xs lg:text-sm lg:text-start text-center"
            :md="50"
            :lg="50"
            :sm="30"
            :xl="50"
            :title="data?.bio"
          />
          <!-- <span class="text-sm">Developper Application web</span> -->
        </div>

        <div class="font-love text-sm hidden" v-if="skill">
          <span>
            Conpetence de predilection : c/Developpement d'application,
            c/Developpement Web, c/Creation media
          </span>
        </div>
      </div>
    </a>

    <div class="flex  px-4 w-full lg:w-auto pb-4 lg:absolute lg:right-0 lg:top-[5.5rem]">
      <btnFollow
        :label="'Suivre'"
        classe-name="w-full p-2"
        :data="data"
        v-if="data?.isProfileFollow === false"
      />
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
import { useUserComposition } from "@/composables/user.composition";
import AvatarProfile from "../avatar/avatarProfile.vue";

export default defineComponent({
  name: "card-post-profile",
  props: {
    data: {
      type: Object,
    },
    className: {
      type: String,
      default: "w-[95%] md:w-[270px]",
    },
    btnName: {
      type: String,
      default: "Voir le profile",
    },
    skill: {
      type: Boolean,
      default: true,
    },
    djoumer: Boolean,
    follow: Boolean,
  },
  components: {
    TextQuery,
    FollowAndDjoumer,
    useCerleComposition,
    btnFollow,
    AvatarProfile,
  },
  setup(props) {
    // const { isFollowUser, FOLLOW, ISFOLLOW } = useCerleComposition();
    // const {USER} = useUserComposition()

    return {
      envConfig,
    };
  },
});
</script>

<style scoped></style>
