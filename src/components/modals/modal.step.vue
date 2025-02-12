<template>
  <div
    class="w-full h-screen fixed top-0 flex justify-center items-center bg-gray-50/80"
  >

    <!-- Background auth page -->
    <BackgroundIndex />

    <form
      @submit.prevent="submit"
      class="bg-white flex flex-col justify-between  h-[100vh] lg:h-auto ww-full  lg:w-7/12 xl:w-5/12  lg:rounded-md font-love"
    >
      <!--  -->
      <div class="flex ">
       
        <div class="lg:h-[80vh] h-[90vh] w-full pt-4 pb-16 overflow-y-scroll PROFILE_AUTH">
          <slot />
        </div>
      </div>

      
      
        <slot name="footer"></slot>
     
     
    </form>
  </div>
</template>

<script lang="ts">
const BtnNext= defineAsyncComponent(() =>
import('@/components/buttons/btn.next.vue')
)
import CardToChoose from "@/components/cards/card.to.choose.vue";
const CardMedia= defineAsyncComponent(() =>
  import('@/components/cards/medias/card.media.vue')
)
import { defineComponent, reactive, computed, defineAsyncComponent } from "vue";
import BtnSimple from "../buttons/btn.simple.vue";
import { useProfileStore } from "@/stores/profile.store"
import BackgroundIndex from "../background/background.index.vue";

export default defineComponent({
  name: "modal-step",
  props: ["headTitle", "headSub", "submit"],
  components: { BtnNext, CardToChoose, CardMedia, BtnSimple, BackgroundIndex },
  setup() {
    const setpOfCreation = computed(() => {
      return useProfileStore().setpOfCreation;
    });
    const goback = () => {
      useProfileStore().setpOfCreation = useProfileStore().setpOfCreation - 1;
    };
    return { setpOfCreation, goback };
  },
});
</script>

<style>
* {
  scrollbar-width: auto;
  scrollbar-color: #1b03f725 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: #1b03f725;
  border-radius: 34px;
  border: 8px solid #ffffff;
}
</style>
