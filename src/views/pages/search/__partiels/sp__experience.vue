<template>

  <div class="">
   <sp__heading title="Experiences" />
 
   <div class="flex flex-col gap-1">
 
     <div v-for="xp in Experiences">
       <label :for="xp.value" class="flex gap-2">
       <input type="checkbox" v-model="inputDataFilterProfile.experience" :value="xp.value" :id="xp.value"  />
       <span class="text-sm font-bold"> {{ xp.name }} </span>
     </label>
     </div>
 
   </div>
  </div>
 
   
 </template>
 
 <script lang="ts">
 import { defineComponent, reactive, ref } from 'vue';
 import sp__heading from './sp__heading.vue';
 
 export default defineComponent({
     name: "",
     props: ['inputDataFilterProfile'],
     components: { sp__heading },
     setup(){
      const xpValue = ref()
      const Experiences = reactive([
        {
          name: 'XP -1 an',
          value: '0.0to0.99'
        },
        {
          name: 'XP 1 an - 2 ans',
          value: '1.0to2.0'
        },
        {
          name: 'XP 2 ans - 4 ans',
          value: '2.0to4.0'
        },
        {
          name: 'XP 4 ans - 6 ans',
          value: '4.0to6.0'
        },
      ])

      return{
        Experiences,
        xpValue
      }
     }
 });
 </script>
 
 <style scoped>
 
 </style>
 