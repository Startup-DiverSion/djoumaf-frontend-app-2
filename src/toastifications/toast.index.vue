<template>
  
    <div  class=" flex gap-2 rounded-md font-love">
      <div class="">
        <AvatarIcon :path="icon" :className="'text-'+color + 'h-5'"></AvatarIcon>
      </div>

      <div class="flex flex-col">
        <span class="text-base font-bold" :class="'text-'+color"> {{ statut }} </span>
        <span class="text-sm font-semibold"> {{ message }} </span>
      </div>

    </div>
 
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from "vue";
import {useJobStore } from "@/stores/jobs";
import { useToastStore } from "@/stores/toast";
import AvatarIcon from "@/components/avatar/avatarIcon.vue";

export default defineComponent({
    name: "toast",
    props: ["statut", "message", "icon", "color"],
    setup(props) {
    },
    components: { AvatarIcon }
});
</script>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
