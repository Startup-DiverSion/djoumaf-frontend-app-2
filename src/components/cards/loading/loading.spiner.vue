<template>
<div class="z-20 absolute w-full h-full flex justify-center items-center" v-if="loading">
  <div class="flex items-center justify-center " >
  <div
    class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span
    >
  </div>
</div>
</div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '',
  props: ['loading']
});
</script>

<style scoped>

</style>
