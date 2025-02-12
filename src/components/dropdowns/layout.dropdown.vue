<template>
  <div
    class=" p-[0.50rem] cursor-pointer rounded-full relative df-dropdwon flex"
  >
    <div class="">
      <div
        class="flex h-5 w-5 z-10 absolute"
        @click.stop="OnClickToOpenOrClose"
        :data-dropdwon="refs"
      ></div>
      <EllipsisHorizontalIcon
        class="text-sm text-gray-700 h-5"
      ></EllipsisHorizontalIcon>
    </div>

    <div
      class="absolute bg-white rounded-lg border-2 right-0 top-6 py-3 w-[200px] z-10 hidden df-dropdwon-content"
      :class="'df-dropdwon-id-' + refs"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import NavigationHeader from "@/navigations/navigationHeader.vue";
import { defineComponent, defineAsyncComponent, reactive, ref } from "vue";
import InDeveloppmentApp from "@/components/inDeveloppment/in.developpment.app.vue";
import { useFeedComposition } from "@/composables/feed.composition";
import { useFeedStore } from "@/stores/feeds";
import {
  UserIcon,
  UserPlusIcon,
  UserMinusIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "",
  props: ["refs"],
  components: {
    NavigationHeader,
    InDeveloppmentApp,
    UserIcon,
    UserPlusIcon,
    UserMinusIcon,
    EllipsisHorizontalIcon,
    XMarkIcon,
  },
  setup(props) {
    const openMenuFeed = ref(false);

    const OnClickToOpenOrClose = (e: any) => {
      const reqID = e.target.dataset.dropdwon;
      console.log();
      const dropdownAll = document.querySelectorAll(".df-dropdwon-content");
      const dropdown = document.querySelector(".df-dropdwon-id-" + reqID);
      dropdownAll.forEach((el: any) => {
        !el.classList.contains("hidden") ? el.classList.add("hidden") : "";
      });

      dropdown?.classList.remove("hidden");
    };

    return {
      openMenuFeed,
      OnClickToOpenOrClose,
    };
  },
});
</script>

<style scoped></style>
