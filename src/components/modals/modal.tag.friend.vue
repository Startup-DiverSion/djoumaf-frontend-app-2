<template>
  <section
    class="bg-gray-500/10 fixed top-0 w-screen h-screen justify-center items-end lg:items-center flex font-love" v-if="openModal"
  >
    <div class="flex flex-col w-full md:w-4/12 bg-white h-[70%] rounded-md shadow-2xl">
      <div class="flex flex-col">
        <div class="flex justify-between items-center border-b-[1px] py-2 px-3">
          <span class="font-love font-semibold">Tag vos ami(es)</span>

          <div class="bg-gray-100 w-8 h-8 rounded-full flex justify-center items-center cursor-pointer" @click="qModalToTag__close">
            <i class="fi fi-sr-cross-small text-xl text-gray-500 flex"></i>
          </div>
        </div>

        <div class="px-2 border-b-[1px] py-2">
          <div
            class="flex gap-2 bg-white border-[1px] justify-between items-center rounded-full px-3 py-1"
          >
            <input
              class="w-11/12 outline-none bg-transparent placeholder:text-base"
              placeholder="Rechercher un(e) ami(e)..."
              type="text"
            />
            <i class="fi fi-sr-search text-xl text-gray-500 flex"></i>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2 divide-y-2 px-3 overflow-auto mb-4">
        
        <div v-for="item in 16" class="">

          <div class="flex items-center w-full gap-2 justify-between pt-3 cursor-pointer">
          <label :for="'tag'+item" class="flex gap-2 items-center cursor-pointer">
            <!-- Avatar -->
            <div class="flex items-center w-12 h-12">
              <img
                class="bg-gray-100 rounded-full w-full h-full flex"
                src=""
                alt=""
              />
            </div>

            <div class="flex flex-col gap-[1px]">
              <span>Bash'man Sarah</span>
              <span class="text-sm">Developpeur web & web master...</span>
            </div>
          </label>

          <div class="">
            <input type="checkbox" name="" :id="'tag'+item" />
          </div>
        </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from "vue";
import {useJobStore } from "@/stores/jobs";

export default defineComponent({
  name: "Modal-tag-friend",
  props: [],
  setup(){

    const openModal = computed(() =>{
      return useJobStore().openModal
    })

    const qModalToTag__close = () =>{
      useJobStore().openModal = false
    }

    return {openModal , qModalToTag__close}
  }
});
</script>

<style>
/* body {
  overflow: hidden !important;
} */

/* ===== Scrollbar CSS ===== */
  /* Firefox 
  * {
    scrollbar-width: auto;
    scrollbar-color: #291d948c #ffffff;
  }

  /* Chrome, Edge, and Safari 
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #291d948c;
    border-radius: 16px;
    border: 3px solid #ffffff;
  }
  */
</style>
