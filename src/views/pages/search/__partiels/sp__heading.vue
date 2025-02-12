<template>

  <div class="py-1 border-t-[1px] text-lg"> 
    <span> {{ title }} </span>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '',
  props: ['title']
});
</script>

<style scoped>

</style>
