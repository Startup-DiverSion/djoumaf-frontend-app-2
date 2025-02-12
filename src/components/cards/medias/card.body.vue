<template>
  <section class=" w-full" :class="sticky">
    <div class="font-love text-base font-bold border-b-[0px] py-4">
        <img src="" class="" alt="">
      <span class="font-love text-lg font-bold text-gray-700"> {{ label }} </span>
    </div>

    <div class=" mb-4">
      <slot />
    </div>

 
  </section>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";

export default defineComponent({
  name: "card-body",
  props: {
    label: String,
    sticky: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped></style>
