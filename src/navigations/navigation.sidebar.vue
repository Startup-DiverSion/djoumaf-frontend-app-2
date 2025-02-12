<template>

<Transition name="slide-fade">
  <div class="hidden MenuMobile lg:hidden " v-if="openMenu">
    <!-- <div class="absolute top-0 left-0 w-screen h-screen bg-gray-50/50 z-40"></div> -->
    <div
      class="fixed top-0 left-0  h-[100vh] shadow-xl overflow-y-auto bg-gray-800 MenuMobileHOL openActiveMenu z-40 font-love  "
    >
    
      <div class="flex flex-col w-10/12 py-4 m-auto">
        <div class="flex justify-between items-center " @click="closeMenu" >
          <div class="flex">
            <RouterLink
          :to="{ name: 'Home' }"
          class=" justify-center items-center -left-2 lg:flex hidden"
        >
          <div class="flex items-center w-full">
            <img
              src="/images/logo.png"
              class="h-10 object-cover"
              alt="h-5"
            />
          </div>
        </RouterLink>
          </div>
          <div class="cursor-pointer ">
            <div class="flex border-2 border-white w-5 h-5 rounded-full  items-center justify-center group" > 
              <div class="flex-inline border-2 border-white w-2 h-2 rounded-full group-hover:opacity-5 transition-all duration-75"></div>
             </div>
          </div>
        </div>
  
  
  
        
  
          <ContentSideMenu :openMenu="true"/>
        
      </div>
    </div>

  </div>
</Transition>

  
  
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
import ContentSideMenu from "./content.side.menu.vue";
  
  export default defineComponent({
    name: "navigation-side-menu",
    props: [],
    setup() {
        const openMenu = ref(true);
        onMounted(() => {
        });
        const openActiveMenu = () => {
            openMenu.value ? (openMenu.value = false) : (openMenu.value = true);
            const openActiveMenu = document.querySelector(".openActiveMenu");
            const contenaire = document.querySelector(".contenaire");
            const toHideSide = document.querySelectorAll(".toHideSide");
            const main_navigateur = document.querySelector(".main-navigateur");
            console.log(openMenu.value);
            if (openMenu.value) {
                toHideSide.forEach((el: any) => {
                    el.classList.remove("hidden");
                    el.classList.add("flex");
                });
                openActiveMenu?.classList.remove("OClose_mobile");
                openActiveMenu?.classList.add("OOpen_mobile");
                main_navigateur?.classList.remove("lg:w-[95%]");
                main_navigateur?.classList.add("lg:w-full");
                
            }
            else {
                toHideSide.forEach((el: any) => {
                    el.classList.add("hidden");
                });
                openActiveMenu?.classList.remove("OOpen_mobile");
                openActiveMenu?.classList.add("OClose_mobile");
                main_navigateur?.classList.remove("lg:w-full");
                main_navigateur?.classList.add("lg:w-[95%]");
               
            }
        };
        const closeMenu = () => {
            const MenuMobile = document.querySelector(".MenuMobileHOL");
            MenuMobile?.classList.remove("OOpen_mobile");
            MenuMobile?.classList.add("OOpen_close_mobile");
        };
        return { openActiveMenu, openMenu, closeMenu };
    },
    components: { ContentSideMenu }
});
  </script>
  
  <style >
  
  /* .OClose_mobile{
    @apply w-[5%];
    @apply transition;
    @apply duration-150;
    @apply ease-in-out;
  }
  
  .OOpen_mobile{
    @apply w-[15%];
    @apply transition;
    @apply  duration-150 ;
    @apply ease-in-out;
  } */

  .slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
  
  .OOpen_mobile {
    display: block;
    @apply w-[90%];
    transition: all 0.3s;
  }

  .OOpen_close_mobile {
    display: block;
    @apply w-[0%];
    transition: all 0.3s;
  }
  
  /* .OClose_mobile {
    display: block;
    @apply w-[500%];
    transition: width 0.3s, height 0.5s, background-color 0.5s, transform 0.3s;
  } */
  
  </style>
  










