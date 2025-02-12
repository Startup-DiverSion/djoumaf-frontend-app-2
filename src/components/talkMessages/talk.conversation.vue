<template>
<div class="flex flex-col   gap-4">
    <div v-for="item in 6">
      <div class="flex flex-col gap-2 bg-white w-full h-auto p-4">
        <!-- Profile -->

        <div class="flex w-auto">
          <div class="flex w-full gap-2 border-b-[1px]">
            <div class="bg-gray-200 w-10 rounded-full h-10">
            <img src="" alt="" />
          </div>
          <div class="flex justify-between w-full">
            <div class="flex flex-col">
             <div class="flex gap-2">
              <TextQuery
              className="text-base font-black"
              :title="'Haba Ange Emmanuel Diomande Livreville'"
              :sm="20"
              :md="20"
              :lg="20"
              :xl="20"
            />
          
            
            <TextQuery
              className="text-sm opacity-60 font-black"
              :title="'<emmanuel.diomande@outlokk.com>'"
              :sm="20"
              :md="20"
              :lg="20"
              :xl="20"
            />
          
             </div>

             <span>A Emmanuel</span>
            </div>

            <div class="">
              trest
            </div>
          </div>
          </div>
        </div>

        <!-- Message -->
        <div class="">
        

          <div class="text-base leading-[1.2em]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Autem iste consequatur aspernatur alias error praesentium
            laudantium aliquam dolores deserunt tenetur.
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextQuery from '../texts/text.query.vue';

export default defineComponent({
    name: "",
    props: [],
    components: { TextQuery }
});
</script>

<style scoped>

</style>
