<template>
  <span
    class="md:hidden lg:hidden"
    :class="className"
    v-html="title.length >= sm ? title.trim().replace(/\s+/g, ' ').trim().substring(0, sm) + '...'.trim() : title.trim().replace(/\s+/g, ' ').trim()"
  >
  </span>
  <span
    class="md:flex lg:hidden hidden"
    :class="className"
    v-html="title.length >= md ? title.trim().replace(/\s+/g, ' ').trim().substring(0, md) + '...'.trim() : title.trim().replace(/\s+/g, ' ').trim()"
  ></span>
  <span
    class="md:hidden lg:flex hidden"
    :class="className"
    v-html="title.length >= lg ? title.trim().replace(/\s+/g, ' ').trim().substring(0, lg) + '...'.trim() : title.trim().replace(/\s+/g, ' ').trim()"
  >
  </span>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";

export default defineComponent({
  name: "text-query-html",
  props: ["title", "id", "className", "sm", "md", "lg"],
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
