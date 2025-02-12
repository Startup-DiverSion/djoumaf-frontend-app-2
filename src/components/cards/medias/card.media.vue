<template>
  <section class="bg-white rounded-md border-[1px] " :class="sticky">
    <div class=" font-love  font-bold border-b p-4 ">
      <span class="font-love text-base font-semibold text-gray-700"> {{ label }} </span>
    </div>

    
    <div class=" py-4 h-full">
        <slot />
    </div>

  

    <div v-if="more" class="font-love font-boldhover:bg-gray-100 border-t-[1px]  w-full text-xs text-center py-2 cursor-pointer">
        Voir plus &#8594;
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";

export default defineComponent({
  name: "card-media",
  props: {
    label: String,
    sticky: {
        type: String,
        default: ''
    },
    more: {
        type: Boolean,
        default: false
    }
  },
});
</script>

<style scoped></style>
