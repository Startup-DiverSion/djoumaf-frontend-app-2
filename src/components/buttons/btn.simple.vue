<template>
  
  <button type="submit"  :class="classeName" class="flex justify-center items-center bg-blue-700  rounded-full font-love text-sm font-bold text-white"> {{label}}</button>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'btn-simple',
  props: {
    label: String,
    classeName: {
      type: String,
      default: "px-4 py-1"
    }
  }
});
</script>

<style scoped>

</style>
