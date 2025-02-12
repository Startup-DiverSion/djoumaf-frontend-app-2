<template>

 <div class="">
  <sp__heading title="Diplômes" />

  <div class="flex flex-col gap-1">

    <div v-for="diplome in diplomes(8)">
      <label :for="diplome.id" class="flex gap-2">
      <input type="checkbox" class="" v-model="inputDataFilterProfile.diplome" :value="diplome.title" :id="diplome.id" />
      <span class="text-sm font-bold"> {{ diplome.title }} </span>
    </label>
    </div>

  </div>
 </div>

  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import sp__heading from './sp__heading.vue';

export default defineComponent({
    name: "",
    props: ['diplomes', 'inputDataFilterProfile'],
    components: { sp__heading }
});
</script>

<style scoped>

</style>
