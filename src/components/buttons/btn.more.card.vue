

<template>
  
  <button :disabled="!loading ? false : true" class="flex justify-center border-t-[1px] pt-2 mt-8 w-full"> 
    <span class=" text-thin cursor-pointer" v-if="!jRoute  && !loading"> {{label}}  &#8594;</span>
    <LadingSpinerBasic :loading="loading" color="text-blue-200" /> 
      <RouterLink v-if="jRoute" :to="jRoute? jRoute: ''" class=" text-thin cursor-pointer"> {{label}}  &#8594;</RouterLink>
       </button>
        
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import loadingSpinerBasic from "@/components/cards/loading/lading.spiner.basic.vue";
import LadingSpinerBasic from '@/components/cards/loading/lading.spiner.basic.vue';
export default defineComponent({
name: 'btn-more-card',
props: ['label', 'jRoute', 'loading'],
components: {
    loadingSpinerBasic,
    LadingSpinerBasic
},
setup(){
  return{}
}
});
</script>

<style scoped>

</style>
