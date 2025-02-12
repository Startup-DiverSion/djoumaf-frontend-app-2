<template>
  <div class="flex flex-col">
    <div
      class="flex flex-col gap-2 justify-center font-love text-base divide-y h-full"
      v-if="JobCategories && JobCategories.length !== 0"
    >
      <RouterLink
        @click="closeMenu"
        :to="'/jobs/?search_by_domain=All'"
        class="flex gap-2 items-center justify-between cursor-pointer mt-2 py-2 hover:bg-gray-50 w-full px-4"
      >
        <!--  -->
        <span class="font-love font-medium text-thin lg:text-sm w-11/12">
          Tous
        </span>
        <span
          class="font-love font-bold lg:text-[10px] rounded-full flex place-content-center items-center bg-gray-100 px-2 text-xs h-5 w-5"
        >
          {{ totalJobs }}
        </span>
      </RouterLink>
      <div v-for="(item, index) in JobCategories">
        <RouterLink
          @click="closeMenu"
          :to="'/jobs/?search_by_domain=' + item.id"
          class="flex gap-2 items-center justify-between cursor-pointer mt-2  py-2 hover:bg-gray-50 w-full px-4"
        >
          <!--  -->
          <span class="font-love font-medium text-thin lg:text-sm w-11/12">{{
            item.title
          }}</span>
          <span
            class="font-love font-bold lg:text-[10px] rounded-full flex place-content-center items-center bg-gray-100 px-2 text-xs h-5 w-5"
          >
            {{ item.job }}
          </span>
        </RouterLink>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center"
      v-if="JobCategories && JobCategories.length === 0"
    >
      <img
        v-lazy="'/images/loading/empty.svg'"
        class="h-[150px] w-auto flex items-center justify-center opacity-50 object-cover"
        alt=""
      />
      <span class="text-center text-sm font-love"
        >Aucun, domaine d'activité n'a été trouvé...</span
      >
      <!-- <button class="bg-blue-800 px-3 py-1 rounded-md text-white font-bold text-base mt-1">Réessayer</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  computed,
  defineAsyncComponent,
} from "vue";
const CardMedia = defineAsyncComponent(
  () => import("@/components/cards/medias/card.media.vue")
);

import { useJobComposition } from "./job.compositoin";

export default defineComponent({
  name: "Jobs",
  metaInfo: {
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "my standard description",
      },
    ],
  },
  props: ["closeMenu", "totalJobs"],
  setup(props) {
    const { JobCategories, state, getAllCategory } = useJobComposition();

    onMounted(async () => {
      state.loading_jobs = true;
      getAllCategory();
      state.loading_jobs = false;
    });

    return { JobCategories, state };
  },
  components: {
    CardMedia,
  },
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.CATEGORY::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.CATEGORY {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
