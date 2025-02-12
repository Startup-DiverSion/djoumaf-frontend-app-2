<template>
  <div :class="className" class="w-full lg:w-auto">
    <div v-for="(link, index) in links">
    
      <NavigationLinkComponent :link="link" class="w-full"  />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from "vue";
import NavigationLinkComponent from "@/navigations/navigationLinkComponent.vue";
import NavigationProfile from "./navigation.profile.vue";
export default defineComponent({
  name: "navigation-link",
  props: ["links", "className"],
  components: {
    NavigationLinkComponent,
    NavigationProfile
},

  setup(props) {
    const test = () => {
      alert("test");
    };

    return {
      test,
    };
  },
});
</script>

<style scoped></style>
