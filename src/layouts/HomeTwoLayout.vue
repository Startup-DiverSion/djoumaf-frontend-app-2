<template>

  <SideLayout >
<template #content>
  <navigationHeader />

<section class="flex flex-col lg:flex-row gap-4 py-24 lg:w-11/12 w-full m-auto">
  <!--  -->
  <div
    class="flex flex-col gap-8 pb-16 w-full lg:w-[65%] bg-white font-love lg:rounded-lg"
  >
    <slot name="small" />
  </div>

  <!--  -->
  <div class=" flex-col w-full  flex lg:w-[35%] rounded-md">
    <slot name="middle" />
  </div>
</section>
</template>
</SideLayout>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";
import navigationHeader from "@/navigations/navigationHeader.vue"
import SideLayout from "./SideLayout.vue";

export default defineComponent({
  name: "home-two-layout",
  components: {
    navigationHeader,
    SideLayout
},
  props: [],
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
