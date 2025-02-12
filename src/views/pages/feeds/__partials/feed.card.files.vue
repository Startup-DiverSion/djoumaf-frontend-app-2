<template>
  <!-- Type video -->
  <div
    class="mt-4 h-auto"
    v-if="media.length >= 1 && media[0].type.search('video') == 0"
  >
    <div
      @click="VideoPlay"
      class="absolute z-10 w-full flex justify-center items-center h-full hidden"
      v-if="!controls_video"
    >
      <PlayIcon
        class="flex text-xl fi fi-sr-play bg-blue-500/50 text-white p-6 rounded-full cursor-pointer h-6"
      />
    </div>
    <video
      :controls="!controls_video"
      id="videoSocialDjID"
      @click="VideoPlay"
      class="w-full h- max-h-[35em] min-h-full"
      :src="media[0].original_url"
    ></video>
  </div>

  <!-- Images -->
  <RouterLink
    :to="{ name: 'FeedDetail', params: {slug: slug} }" @click="hideBody"
    class=""
    v-if="media.length >= 1 && media[0].type.search('video') == -1"
  >
    <!-- If Image is 1 -->

    <div
      class="mt-4  h-auto w-full bg-gray-200 flex flex-col"
      v-if="media.length > 0 && media.length < 2"
    >
      <div
        class="h-[100%] bg-gray-50/20 flex justify-center flex-col"
        v-for="imedia in media"
      >
        <img class="max-h-[40em] min-h-full min-w-full object-contain" v-lazy="imedia.original_url" alt="" />
      </div>
    </div>

    <!-- If Image is 2 -->

    <div
      class="mt-4 h-[15em] w-full bg-gray-300 flex gap-[2px]"
      v-if="media.length > 1 && media.length < 3"
    >
      <div
        class="h-full w-full bg-gray-50/20 flex justify-center flex-col"
        v-for="imedia in media"
      >
        <img class="h-full w-full object-cover " v-lazy="imedia.original_url" alt="" />
      </div>
    </div>

    <!-- If Image is 3 -->

    <div
      class="mt-4  w-full bg-gray-300 flex flex-col h-[25em] gap-[2px]"
      v-if="media.length > 2 && media.length < 4"
    >
      <div class="w-full h-[12.5em] flex">
        <img
          class="h-[12.42em] w-full object-cover"
          v-lazy="media[0].original_url"
          alt=""
        />
      </div>
      <div class="grid grid-cols-2  gap-[2px] h-[12.5] w-full">
        <img
          class="h-[12.4em] w-full object-cover"
          v-lazy="media[1].original_url"
          alt=""
        />
        <img
          class="h-[12.4em] w-full object-cover"
          v-lazy="media[2].original_url"
          alt=""
        />
      </div>
    </div>
    <!-- If Image >= 4 -->

    <div
      class="mt-4 h-[25em] bg-gray-300 flex flex-col gap-[2px]"
      v-if="media.length > 3 && media.length < 90"
    >

   


    <div class="grid grid-cols-3 gap-[0.15rem]  h-[20em]" >
      
        <div v-for="(imedia, index) in media" :class="' w-full ' + `${index == 0 ? 'col-span-3 h-[15em]' : 'col-span-1 h-[10em]'}`">
          <img
        :class="'h-full w-full relative object-cover '"
          v-lazy="imedia.original_url"
          alt=""
          v-if=" index < 4"
        />
        </div>
      
    </div>
 
      

      <!--  -->
      <div
        class="absolute flex  justify-center items-center text-white right-0 -bottom-[3px] w-[33%] h-[10em] bg-gray-900/80"
        v-if="media.length > 4"
      >
        <span class="text-4xl">+{{ media.length - 4 }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts">
const BtnDjoumer= defineAsyncComponent(() =>
  import('@/components/buttons/btn.djoumer.vue')
)
const BtnFollow= defineAsyncComponent(() =>
  import('@/components/buttons/btn.follow.vue')
)
const CardMedia= defineAsyncComponent(() =>
  import('@/components/cards/medias/card.media.vue')
)
const ChooseYourPreference= defineAsyncComponent(() =>
  import('@/components/toPages/Auth/chooseYourPreference.vue')
)
const LegalAuthCompoment= defineAsyncComponent(() =>
  import('@/components/toPages/Auth/legalAuthCompoment.vue')
)
const NavigationFooter= defineAsyncComponent(() =>
  import('@/navigations/navigationFooter.vue')
)
import NavigationHeader from "@/navigations/navigationHeader.vue"
import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from "vue";
import InDeveloppmentApp from "@/components/inDeveloppment/in.developpment.app.vue";
import { PlayIcon } from "@heroicons/vue/24/solid"

export default defineComponent({
  name: "",
  props: ["media", 'slug'],
  components: {
    NavigationHeader,
    NavigationFooter,
    ChooseYourPreference,
    CardMedia,
    BtnFollow,
    BtnDjoumer,
    LegalAuthCompoment,
    InDeveloppmentApp,
    PlayIcon
},
  setup() {
    const controls_video = ref(false);

    const hideBody = () => {
      document.querySelector('body')?.classList.add('overflow-y-hidden')
    }

    const VideoPlay = () => {
      const media: any = document.querySelector("#videoSocialDjID");

      if (media.paused) {
        // play.setAttribute('data-icon','u');
        media.play();
        controls_video.value = true;
      } else {
        // play.setAttribute('data-icon','P');
        media.pause();
        controls_video.value = false;
      }
    };
    return { VideoPlay, controls_video, hideBody };
  },
});
</script>

<style scoped></style>
