<template>
  <!-- border-b-[1px]  lg:border-[1px] -->
  <div class="* bg-white p-4 flex flex-col gap-4 font-love lg:rounded-md0 w-full border-t-[0px] " v-if="USER.profile">
    <div class="flex gap-2 border-b-[1px] py-3">
      
      <img class="w-10 h-10 rounded-full bg-slate-100 object-cover"  v-lazy="
        !USER?.profile.media_profile
              ? envConfig().DEFAULT_IMAGE_PROFILE : USER?.profile.media_profile[0]?.url ? `${envConfig().HOST_SERVER_IMAGE}${
                USER?.profile.media_profile[0].url
                }`
              : envConfig().DEFAULT_IMAGE_PROFILE
          " alt="" />

          

      <div class="w-11/12" @click="toPoster">
        <input
          class="border-[1px] w-full h-full rounded-full px-4 cursor-pointer"
          type="text"
          disabled
          placeholder="Commencez maintement à poster"
          
        />
      </div>
    </div>

    <FeedPosterOptions />

    
  </div>
  <ModalBasic :data="USER" v-if="USER.profile" />
  <ModalJob />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, defineAsyncComponent } from "vue";
import ModalBasic from "@/components/modals/modal.basic.vue";
import { useFeedStore } from "@/stores/feeds";
import { useModal } from "@/components/modals/modal.services";
import ModalJob from "@/components/modals/modal.job.vue";
import {useUserComposition} from "@/composables/user.composition"
import { envConfig } from "@/env.config";
import { useFeedComposition} from "@/composables/feed.composition";
import FeedPosterOptions from "./feed.poster.options.vue";

export default defineComponent({
  name: "feed-poster",
  components: { ModalBasic, ModalJob, FeedPosterOptions },
  props: ['USER'],
  setup(props) {
    
    



    const {toPoster} = useFeedComposition()
 
    return { envConfig, toPoster };
  },
});
</script>

<style scoped></style>
