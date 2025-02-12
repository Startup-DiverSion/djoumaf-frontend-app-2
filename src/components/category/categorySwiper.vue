<template>
   <!-- Categories -->
   <div class="rCategories mt-8 flex flex-col gap-4">
      <div class="w-11/12 m-auto">
         <span>Categories</span>
      </div>
      
      <div class="mx-auto w-11/12 flex justify-start gap-2">

 <swiper
            :slides-per-view="3.3"
            :navigation="false"
            :modules="modules"
            class=""
         >
            <swiper-slide
               v-for="(categorie, index) in xCategories"
               :key="index"
            >
               <div class="bg-blue-50 px-4 py-2">
                  {{ categorie.name }}
               </div>
            </swiper-slide>
         </swiper>
      </div>
        
      
   </div>
</template>

<script lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { defineComponent, ref } from 'vue';

export default defineComponent({
   name: 'CategorySwiper',
   props: {},
   components: {
      Swiper,
      SwiperSlide,
   },

   setup() {
      const xCategories = ref([
         {
            name: 'Femmes',
         },
         {
            name: 'Hommes',
         },
         {
            name: 'Enfants',
         },
         {
            name: 'Maisons',
         },
      ]);
      return {
         xCategories,
         modules: [Navigation],
      };
   },
});
</script>

<style scoped></style>
