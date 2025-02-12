<template>
  <button type="button"
    
    class="text-red-500 text-xs first-letter:uppercase hover:underline flex items-center gap-1 py-2"
  >
  <TrashIcon class="h-3" />
    <span>{{ label }} (#{{ index + 1 }})</span>
  </button>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  defineAsyncComponent,
} from "vue";
import { PlusIcon, PlusSmallIcon, CheckIcon, TrashIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "btn-remove",
  props: ["removeData", "label", "index"],
  components: { PlusIcon, CheckIcon, PlusSmallIcon, TrashIcon },
  setup(props) {
    return {};
  },
});
</script>

<style></style>
