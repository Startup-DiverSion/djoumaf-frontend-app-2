<template>
  <div
    class=" animate-pulse"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-8 w-full">
        <div class="flex flex-col gap-3 bg-gray-50 px-4 py-8 rounded-t-lg">
          <span class="h-4 w-4/12 flex-inline rounded-full bg-gray-100"></span>
          <span class="h-4 w-3/12 rounded-full bg-gray-100"></span>
          <span class="h-8 w-2/12 rounded-full bg-gray-100"></span>
        </div>

        
        <div class="flex flex-col w-full gap-8 p-8">

            <div class="flex flex-col gap-4">
          <span class="h-6 w-4/12 rounded-full bg-gray-100"></span>

            <div class="flex flex-col gap-3">

                <div class="flex gap-2">
            <span class="h-4 w-5/12 rounded-full bg-gray-100"></span>
            <span class="h-4 w-3/12 rounded-full bg-gray-100"></span>
            <span class="h-4 w-6/12 rounded-full bg-gray-100"></span>
          </div>

          <div class="flex gap-2">
            <span class="h-4 w-6/12 rounded-full bg-gray-100"></span>
            <span class="h-4 w-4/12 rounded-full bg-gray-100"></span>
            <span class="h-4 w-2/12 rounded-full bg-gray-100"></span>
          </div>

          <div class="flex gap-2">
            <span class="h-4 w-3/12 rounded-full bg-gray-100"></span>
            <span class="h-4 w-6/12 rounded-full bg-gray-100"></span>
            <span class="h-4 w-5/12 rounded-full bg-gray-100"></span>
          </div>

            </div>

        </div>

        <div class="flex flex-col  py-4">
            <span class="h-8 w-2/12 rounded-full bg-gray-100"></span>
        </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";

export default defineComponent({
  name: "loading-post-detail-card",
  props: {
    sizeCard: {
      type: String,
      default: "w-full",
    },
  },
});
</script>

<style scoped></style>
