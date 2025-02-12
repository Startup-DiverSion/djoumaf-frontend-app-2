<template>
  <button
    type="submit"
    class="bg-blue-800 w-full p-3 rounded-full text-base font-love font-semibold text-white" :disabled="isLoading"
  >
  <loadingSpinerBasic :loading="isLoading" /> 
    {{ isLoading ? '' : label }}
  </button>
</template>

<script lang="ts">
import loadingSpinerBasic from "@/components/cards/loading/lading.spiner.basic.vue";
import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "Btn-auth",
  props: {
    label: {
      type: String,
    },
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  components:{loadingSpinerBasic},
  setup(props) {},
});
</script>

<style scoped></style>
