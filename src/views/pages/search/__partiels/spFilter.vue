<template>
  <div class="flex flex-col gap-2 h-[63vh] py-2 overflow-auto px-4 relative w-full">
    <Sp__post :inputDataFilterProfile="inputDataFilterProfile" :activite="preferenceData"></Sp__post>
    <Sp__diplome
      :inputDataFilterProfile="inputDataFilterProfile"
      :diplomes="preferenceData"
    />
    <sp__experience :inputDataFilterProfile="inputDataFilterProfile" />
  </div>

  <div class="w-full pt-4 px-4">
    <button
      class="bg-green-500 w-full px-3 py-2 text-white font-bold rounded-lg flex items-center justify-between gap-1"
      @click="sendToSearchProfile"
    >
    
      <span class="text-sm font-bold">Rechercher</span>
      <MagnifyingGlassIcon class="h-4 font-bold" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Sp__post from "./sp__post.vue";
import Sp__diplome from "./sp__diplome.vue";
import sp__experience from "./sp__experience.vue";
import { usePreferenceComposition } from "@/composables/preference.composition";
import { useProfileSearchComposition } from "@/composables/profile.search.composition";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "",
  props: ["inputDataFilterProfile", "sendToSearchProfile"],
  components: { Sp__post, Sp__diplome, sp__experience, MagnifyingGlassIcon },
  setup() {
    const { preferenceData, getAllParameter } = usePreferenceComposition();
    onMounted(() => {
      getAllParameter();
    });

    return {
      preferenceData,
    };
  },
});
</script>

<style scoped></style>
