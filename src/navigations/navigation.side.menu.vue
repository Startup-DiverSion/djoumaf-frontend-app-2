<template>
  <div class="hidden lg:flex">
    <div
      class="fixed top-0 left-0 OOpen h-[100vh] shadow-xl overflow-y-auto bg-gray-800 openActiveMenu z-40 font-love"
    >
      <div class="flex flex-col w-10/12 py-4 m-auto">
        <div class="flex justify-between items-center" v-if="openMenu">
          <div class="flex toHideSide">
            <RouterLink
              :to="{ name: 'Home' }"
              class="flex justify-center items-center -left-2"
            >
              <div class="flex items-center w-full">
                <img
                  src="/images/logo.png"
                  class="h-8 object-cover"
                  alt="Djoumaf logo"
                />
              </div>
            </RouterLink>
          </div>
          <div class="cursor-pointer">
            <div
              class="flex border-2 border-white w-5 h-5 rounded-full items-center justify-center group"
              @click="openActiveMenu"
            >
              <div
                class="flex-inline border-2 border-white w-2 h-2 rounded-full group-hover:opacity-5 transition-all duration-75"
              ></div>
            </div>
          </div>
        </div>

        <div class="flex justify-between" v-if="!openMenu">
          <div class="cursor-pointer flex justify-center w-full">
            <div
              class="flex border-2 border-white w-5 h-5 rounded-full items-center justify-center group"
              @click="openActiveMenu"
            >
              <div
                class="flex-inline border-2 border-white w-2 h-2 rounded-full opacity-20 group-hover:opacity-90 transition-all duration-75"
              ></div>
            </div>
          </div>
        </div>

        <ContentSideMenu :openMenu="openMenu" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import ContentSideMenu from "./content.side.menu.vue";

export default defineComponent({
  name: "navigation-side-menu",
  props: [],
  setup() {
    const openMenu = ref(true);
    const MenuLinks = reactive([
      {
        name: "Fil d'actualité",
        icon: "fi fi-sr-home",
        link: "Feed",
      },
      {
        name: "Offre d'emploi",
        icon: "fi fi-sr-briefcase",
        link: "Feed",
      },
      {
        name: "Boite mail",
        icon: "fi fi-sr-envelope",
        link: "Feed",
      },
      {
        name: "CV",
        icon: "fi fi-sr-document",
        link: "Feed",
      },
    ]);
    const MenuLinksFooter = reactive([
      {
        name: "Publier",
        icon: "fi fi-sr-add",
        link: "Feed",
      },
      {
        name: "Profile",
        icon: "fi fi-sr-user",
        link: "Feed",
      },
    ]);
    onMounted(() => {
      openActiveMenu();
    });
    const openActiveMenu = () => {
      openMenu.value ? (openMenu.value = false) : (openMenu.value = true);
      const openActiveMenu = document.querySelector(".openActiveMenu");
      const contenaire = document.querySelector(".contenaire");
      const toHideSide = document.querySelectorAll(".toHideSide");
      const main_navigateur = document.querySelector(".main-navigateur");
     
      if (openMenu.value) {
        toHideSide.forEach((el: any) => {
          el.classList.remove("hidden");
          el.classList.add("flex");
        });
        openActiveMenu?.classList.remove("OClose");
        openActiveMenu?.classList.add("OOpen");
        main_navigateur?.classList.remove("lg:w-[95%]");
        main_navigateur?.classList.add("lg:w-full");
      } else {
        toHideSide.forEach((el: any) => {
          el.classList.add("hidden");
        });
        openActiveMenu?.classList.remove("OOpen");
        openActiveMenu?.classList.add("OClose");
        main_navigateur?.classList.remove("lg:w-full");
        main_navigateur?.classList.add("lg:w-[95%]");
      }
    };
    return { openActiveMenu, openMenu, MenuLinks, MenuLinksFooter };
  },
  components: { ContentSideMenu },
});
</script>

<style>
/* .OClose{
  @apply w-[5%];
  @apply transition;
  @apply duration-150;
  @apply ease-in-out;
}

.OOpen{
  @apply w-[15%];
  @apply transition;
  @apply  duration-150 ;
  @apply ease-in-out;
} */

.OOpen {
  display: block;
  @apply w-[15%];
  transition: width 0.3s, height 2s, background-color 2s, transform 0.3s;
}

.OClose {
  display: block;
  @apply w-[5%];
  transition: width 0.3s, height 0.5s, background-color 0.5s, transform 0.3s;
}
</style>
