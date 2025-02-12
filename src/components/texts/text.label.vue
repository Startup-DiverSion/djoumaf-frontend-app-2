<template>
  <label :for="id" :class="className"> {{title}} </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'text-label',
  props: ['title', 'id', 'className'],
  setup(){
    return {

    }
  }
});
</script>

<style scoped>

</style>
