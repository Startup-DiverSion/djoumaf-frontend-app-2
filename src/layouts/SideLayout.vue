<template>
  <section class="flex w-full justify-end">
    <NavigationSideMenu />

    <div class="flex justify-end w-full lg:w-[95%] contenaire">

        <slot name="content"/>

    </div>
  </section>
</template>

<script lang="ts">
const ChooseYourPreference= defineAsyncComponent(() =>
  import('@/components/toPages/Auth/chooseYourPreference.vue')
)
const NavigationFooter= defineAsyncComponent(() =>
  import('@/navigations/navigationFooter.vue')
)
const NavigationHeader = defineAsyncComponent(() =>
  import('@/navigations/navigationHeader.vue')
)
import { defineComponent, defineAsyncComponent } from "vue";

const NavigationSideMenu = defineAsyncComponent({
  loader: () => import("@/navigations/navigation.side.menu.vue"),
});


export default defineComponent({
  name: "side-layout",
  props: [],
  setup() {},
  components: { NavigationHeader, NavigationFooter, ChooseYourPreference, NavigationSideMenu },
});
</script>

<style scoped>
.wih {
  @apply w-11/12;
  @apply lg:w-[85%];
}
</style>
