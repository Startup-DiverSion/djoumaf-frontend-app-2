<template>
  <div class="flex gap-4 border-l px-4 pb-4 relative">
    <span
      class="inline-flex bg-blue-800 w-3 h-3 rounded-full absolute top-0 -left-[0.45rem]"
    ></span>

    <RouterLink :to="data.source" class="flex flex-col  relative -top-1">
      <span class="text-sm font-bold opacity-70">{{ data?.tag }}  : </span>
      <div class="flex flex-col gap-2">
        <!-- <div class="flex items-center gap-2">
          <img
            class="flex w-6 h-6 rounded-full"
            src="https://img.icons8.com/bubbles/512/guest-male.png"
            alt=""
          />
          <span class="text-sm font-bold opacity-90">Dymon alin Frinc</span>
        </div> -->

        <span class="text-thin">
         {{ data.title }}
        </span>
      </div>
      <span class="text-xs"> {{ moment(data.created_at).fromNow() }} </span>
    </RouterLink>

   
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { defineComponent , defineAsyncComponent} from "vue";

export default defineComponent({
  name: "profile-content-activity-card",
  props: ['data'],
  setup(){
    return {
      moment
    }
  }
});
</script>

<style scoped></style>
