<template>

  
    <Transition name="slide-fade">
      <NavigationLayout className="fixed bottom-0 h-12 shadow-2xl lg:hidden bg-white w-full" v-show="show">

        <RouterLink :to="{name: 'JobCreate'}" class="fixed bottom-16 right-4 bg-blue-700/80 flex justify-center items-center w-14 h-14 rounded-full text-white">
    <BriefcaseIcon class="h-6" ></BriefcaseIcon>
    <PlusSmallIcon class="absolute bg-white rounded-full text-gray-700 text-xs top-7 left-7 font-bold h-4 border-2 border-blue-700/80" ></PlusSmallIcon>
  </RouterLink>
    
    <div class="w-full m-auto flex justify-between h-12 bg-white  items-center" >
      <NavigationLink
        :links="footerLinks"
        className="grid grid-cols-5 w-full justify-center "
      />
    </div>
  </NavigationLayout>

  
  

</Transition>
  {{ startAppActiveLinks }}
</template>

<script lang="ts">
import { defineComponent, reactive, ref, defineAsyncComponent } from "vue";
import NavigationLink from "./navigationLink.vue";
import { useNavigationLinks } from "@/composables/global/navigations/index.navigation";
import NavigationLayout from "@/layouts/NavigationLayout.vue";
import { BriefcaseIcon, PlusSmallIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "navigation-link",
  props: {
    test: String,
  },
  components: {
    NavigationLink,
    NavigationLayout,
    BriefcaseIcon,
    PlusSmallIcon
},
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  setup(props) {
    const { footer, startAppActiveLinks } = useNavigationLinks();
    const scrollPosition = ref(0);
    const show = ref(true)

    const handleScroll = () => {
      var currentScrollPosition = window.scrollY;

      if (currentScrollPosition < scrollPosition.value) {
        show.value = true
      } else {
        show.value = false
      }

      scrollPosition.value = window.scrollY;
    };

    return {
      footerLinks: footer,
      startAppActiveLinks,
      handleScroll,
      show
    };
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
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
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
