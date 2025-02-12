<template>

  <!-- <ArrowUpIcon :class="className" v-if="path == 'dj-00' && actived"  />
  <noArrowUpIcon :class="className" v-if="path == 'dj-00' && !actived"  /> -->

  <i class="ri-arrow-up-line text-base" v-if="path == 'dj-00' && !actived" ></i>
  <i class="ri-arrow-up-fill  text-base" v-if="path == 'dj-00' && actived"></i>



  <HeartIcon :class="className" v-if="path == 'dj-01' && actived" />
  <noHeartIcon :class="className" v-if="path == 'dj-01' && !actived" />

  <!-- <ChatBubbleBottomCenterTextIcon :class="className" v-if="path == 'dj-02' && actived"  />
  <noChatBubbleBottomCenterTextIcon :class="className" v-if="path == 'dj-02' && !actived"  /> -->

  <i class="ri-message-3-fill flex text-base" :class="className" v-if="path == 'dj-02' && actived" ></i>
  <i class="ri-message-3-line flex text-base" :class="className" v-if="path == 'dj-02' && !actived"></i>

  <PaperAirplaneIcon
    :class="className"
    v-if="path == 'dj-04' && actived" class="transform -rotate-45"
  />
  <noPaperAirplaneIcon
    :class="className"
    v-if="path == 'dj-04' && !actived" class="transform -rotate-45"
  />



  <i class="ri-bar-chart-line text-base" v-if="path == 'dj-05' && !actived"></i>
  <!-- <noChartBarIcon :class="className" v-if="path == 'dj-05' && !actived" /> -->
 
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
 HeartIcon, ArrowUpCircleIcon, ChatBubbleBottomCenterTextIcon,ShareIcon, ChartBarIcon, ArrowUpIcon,PaperAirplaneIcon
} from "@heroicons/vue/24/solid";

import * as outline from "@heroicons/vue/24/outline";


export default defineComponent({
  name: "avatar-icon",
  props: {
    path: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "image form DjoumAf",
    },
    className: String,
    actived: Boolean
  },
  components: {
    HeartIcon,
    ArrowUpCircleIcon,
    ArrowUpIcon,
    ChatBubbleBottomCenterTextIcon,
    PaperAirplaneIcon,
    ShareIcon,
    ChartBarIcon,
    noHeartIcon: outline.HeartIcon,
    noArrowUpIcon: outline.ArrowUpIcon,
    noChatBubbleBottomCenterTextIcon: outline.ChatBubbleBottomCenterTextIcon,
    noShareIcon: outline.ShareIcon,
    noChartBarIcon: outline.ChartBarIcon,
    noPaperAirplaneIcon: outline.PaperAirplaneIcon
  },
  setup(props) {
    return {};
  },
});
</script>

<style scoped></style>
