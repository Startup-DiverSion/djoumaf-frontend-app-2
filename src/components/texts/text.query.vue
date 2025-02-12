<template>
  <span class="md:hidden lg:hidden flex xl:hidden" :class="className"
    >{{ title.length >= sm ? title.trim().replace(/\s+/g, ' ').trim().substring(0, sm) + "...".trim() : title.trim().replace(/\s+/g, ' ').trim() }}
  </span>
  <span class="md:flex lg:hidden hidden xl:hidden" :class="className"
    >{{ title.length >= md ? title.trim().replace(/\s+/g, ' ').trim().substring(0, md) + "...".trim() : title.trim().replace(/\s+/g, ' ').trim() }}
  </span>
  <span class="md:hidden lg:hidden hidden xl:flex" :class="className"
    >{{ title.length >= xl ? title.trim().replace(/\s+/g, ' ').trim().substring(0, xl) + "...".trim() : title.trim().replace(/\s+/g, ' ').trim() }}
  </span>
  <span class="md:hidden lg:flex hidden xl:hidden" :class="className"
    >{{ title.length >= lg ? title.trim().replace(/\s+/g, ' ').trim().substring(0, lg) + "...".trim() : title.trim().replace(/\s+/g, ' ').trim() }}
  </span>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";

export default defineComponent({
  name: "text-query",
  props: ["title", "id", "className", "sm", "md", "lg", "xl"],
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
