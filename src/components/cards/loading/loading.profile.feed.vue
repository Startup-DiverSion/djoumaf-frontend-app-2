<template>
  <div class="flex gap-2 py-2 w-full animate-pulse ">
    <div class=" h-12 w-12 lg:h-8 lg:w-8 rounded-full bg-gray-50 flex"></div>

    <div class="flex flex-col gap-2 w-11/12">
      <div class="inline-flex flex-col gap-1">
        <span class="h-3 w-3/12 lg:w-10/12 rounded-full bg-gray-50 inline-flex"></span>
        <span class="h-3 w-2/12 lg:w-8/12 rounded-full bg-gray-50"></span>
      </div>

      <div class="flex gap-1 w-full justify-start">
        <span class="h-6 w-4/12 rounded-full bg-gray-50"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";

export default defineComponent({
  name: "",
  props: {
    sizeCard: {
      type: String,
      default: "w-full",
    },
  },
});
</script>

<style scoped></style>
