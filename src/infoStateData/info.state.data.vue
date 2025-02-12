<template>
  <div class="flex flex-col py-4 font-love">
    <!-- Display if error server -->
    <div class="flex flex-col items-center" v-if="state === true">
      <img
        src="/images/loading/error.svg"
        class="h-[150px] w-auto flex items-center justify-center opacity-50"
        alt=""
      />
      <span class="text-center text-sm font-love"
        >Oups, une erreur c'est produite, vieillez réessayer...</span
      >
      <button
        class="bg-blue-800 px-3 py-1 rounded-md text-white font-bold text-base mt-1"
      >
        Réessayer
      </button>
    </div>

    <!-- Display if data empty -->
    <div class="flex flex-col items-center" v-if="data.length === 0">
      <img
        src="/images/loading/empty.svg"
        class="h-[150px] w-auto flex items-center justify-center opacity-50"
        alt=""
      />
      <span class="text-center text-sm font-love"
        >Accune, offre d'emploi n'a été trouvé...</span
      >

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, computed, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "info-state",
  props: ["state", "data"],
  setup(props) {
    return {};
  },
  components: {},
});
</script>

<style scoped></style>
