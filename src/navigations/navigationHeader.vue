<template>
  <NavigationLayout
    className="fixed top-0 z-[35] h-14 bg-blue-700 font-love w-full main-navigateur"
  >
    <!--  -->
    <div
      v-if="jIsAuthenticate"
      class="w-11/12 lg:w-11/12 m-auto grid grid-cols-3 items-center justify-between"
    >
      <!-- Logo and search -->
      <div class="flex items-center justify-between lg:w-auto w-full">
        <!-- Menu header Left -->
        <div
          class="hidden lg:flex items-center w-full"
          v-if="!state.active_search"
        >
          <NavigationLink :links="headerFistPart" className="flex" />

          <div
            @click="DisplaySearch()"
            class="flex flex-col items-center justify-center cursor-pointer group gap-y-[4px]"
          >
            <MagnifyingGlassIcon
              class="fi fi-sr-search text-sm w-5 h-5 text-white flex group-hover:text-gray-600"
            />

            <span
              class="font-love text-xs font-semibold text-white group-hover:text-gray-600"
            >
              Rechercher
            </span>
          </div>

          <!-- <div class="flex w-full font-love">
            <select name="" id="" class="w-full p-2 rounded-md outline-none">
              <option value="">Liens rapides</option>
            </select>
          </div> -->
        </div>

        <!-- Input search -->
        <Transition>
          <SearchHeaderBar />
        </Transition>

        <!-- Menu SideBar -->
        <div class="lg:hidden">
          <Bars3BottomLeftIcon
            class="h-6 w-6 text-white"
            @click="SlideMenu = true"
          />
        </div>
      </div>

      <!-- Link to created Post Job -->
      <div class="flex justify-center">
        <RouterLink
          :to="{ name: 'Home' }"
          class="flex justify-center items-center h-14"
        >
          <div class="flex items-center w-full">
            <img
              src="/images/logo.png"
              class="h-10 object-cover"
              alt="logo djoumaf"
            />
            <!-- <span class="font-love font-black text-2xl text-white">Djoumaf</span> -->
          </div>
        </RouterLink>
      </div>

      <!-- Icons refer page -->
      <div class="lg:flex justify-end gap-2 hidden">
        <NavigationLink
          :links="headerSecondPart"
          className="flex justify-end  "
        />

        <div class="flex justify-center items-center left-3 hoverProfile">
          <div class="group relative left-0 rigth-0">
            <a
              @click.stop="openDropProfile"
              class="flex flex-col items-center justify-center text-center px-2 w-2/12 gap-y-[3px] group cursor-pointer"
            >
              <AvatarProfile
                custom="w-5 h-5"
                :imageUrl="
                    USER?.profile.media_profile[0]?.url
                    ? `${USER?.profile.media_profile[0].original_url}`
                    : envConfig().DEFAULT_IMAGE_PROFILE
                "
              />

              <TextQuery
                class-name="font-love text-xs font-semibold text-center text-white group-hover:text-gray-600"
                :xl="4"
                :title="USER?.profile.first_name"
              />
            </a>

            <NavigationProfile />
          </div>
        </div>
      </div>

      <!-- Icon JobsLink for Mobile -->
      <div
        class="flex justify-end w-full group items-center lg:hidden"
        @click="DisplaySearch()"
      >
        <MagnifyingGlassIcon
          class="h-6 w-6 text-white group-hover:text-gray-600"
        />
      </div>
    </div>

    <!-- If user is disconnected -->
    <div class="flex h-14 items-center m-auto justify-between w-11/12" v-else>
      <div class="hidden lg:flex"></div>

      <div class="flex justify-center">
        <RouterLink
          :to="{ name: 'Home' }"
          class="flex justify-center items-center h-14"
        >
          <div class="flex items-center w-full">
            <img
              src="/images/logo.png"
              class="h-8 lg:h-10 object-cover"
              alt="logo djoumaf"
            />
            <!-- <span class="font-love font-black text-2xl text-white">Djoumaf</span> -->
          </div>
        </RouterLink>
      </div>
      <div class="flex gap-4">
        <RouterLink class="px-0 py-1 text-white" :to="{ name: 'SignIn' }"
          >Connexion</RouterLink
        >
        <RouterLink
          class="bg-green-700 text-white px-4 py-1 rounded"
          :to="{ name: 'SignUp' }"
          >Inscription</RouterLink
        >
      </div>
    </div>
  </NavigationLayout>

  <!-- Sider Bar Menu -->
  <Transition name="slide-fade">
    <SlideMenu
      v-show="SlideMenu"
      :USER="USER"
      :jIsAuthenticate="jIsAuthenticate"
      @closeSlideMenu="(value:any) => (SlideMenu = value)"
    />
  </Transition>
  <!-- faster creation job  -->
  <!-- <ModalJob /> -->

  <span v-if="jIsAuthenticate">
    {{ isSlideMenu }}
    {{ startAppActiveLinks }}
    {{ DetectToDisplayNotuficate }}
  </span>
</template>

<script lang="ts">
import SearchHeaderBar from "@/components/search/searchHeaderBar.vue";
import {
  defineComponent,
  reactive,
  computed,
  onBeforeMount,
  ref,
  onMounted,
  defineAsyncComponent,
} from "vue";
import NavigationLink from "./navigationLink.vue";
import NavigationLinkComponent from "./navigationLinkComponent.vue";
import { useNavigationLinks } from "@/composables/global/navigations/index.navigation";
import NavigationLayout from "@/layouts/NavigationLayout.vue";
import {
  Bars3BottomLeftIcon,
  Bars3Icon,
  BriefcaseIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/solid";
import { envConfig } from "@/env.config";
const FormSelect = defineAsyncComponent(
  () => import("@/components/forms/form.select.vue")
);
const OnlyInput = defineAsyncComponent(
  () => import("@/components/forms/onlyInput.vue")
);

import { useSearchBar } from "@/components/search/search.services";
import NavigationSidebar from "./navigation.sidebar.vue";
import ModalJob from "@/components/modals/modal.job.vue";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import NavigationProfile from "./navigation.profile.vue";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import SlideMenu from "@/components/sildes/slide.menu.vue";
import { useUserComposition } from "@/composables/user.composition";
import TextQuery from "@/components/texts/text.query.vue";

import { useNotificateStore } from "@/stores/notificate.store";
import { io } from "socket.io-client";
import { BASE_URL_APP } from "@/router/url";
import { useNotificationComposition } from "@/composables/notification.composition";
import { useChatComposition } from "@/composables/chat.composition";
import AvatarProfile from "@/components/avatar/avatarProfile.vue";

export default defineComponent({
  name: "navigation-header-auth",
  props: {
    test: String,
  },
  setup(props) {
    const { header, headerFistPart, headerSecondPart, startAppActiveLinks } =
      useNavigationLinks();

    const __store = new LocalSotreUtils();
    const __Crypo = new CryptUtils();

    const jIsAuthenticate = ref(false);
    const slug = ref("");
    const SlideMenu = ref(false);
    const { USER, GET_USER } = useUserComposition();

    onBeforeMount(async () => {
      if (await __store.get("jUser")) {
        USER.value = __Crypo.qDecryptedJson(await __store.get("jUser"));

        slug.value = USER.value ? USER.value?.profile.slug : null;
        USER.value
          ? (jIsAuthenticate.value = true)
          : (jIsAuthenticate.value = false);

        await GET_USER();
      }
    });

    const isSlideMenu = computed(() => {
      if (SlideMenu.value) {
        document.querySelector("body")?.classList.add("overflow-hidden");
      } else {
        document.querySelector("body")?.classList.remove("overflow-hidden");
      }
    });

    const openMenu = () => {
      const MenuMobileHOL = document.querySelector(".MenuMobileHOL");
      const MenuMobile = document.querySelector(".MenuMobile");

      MenuMobile?.classList.remove("hidden");
      MenuMobileHOL?.classList.add("OOpen_mobile");
      MenuMobileHOL?.classList.remove("OOpen_close_mobile");
    };

    const openPublishJob = () => {
      document.querySelector(".modal-job")?.classList.remove("hidden");
      document.querySelector(".modal-job")?.classList.add("flex");
    };

    const openDropProfile = () => {
      document.querySelector(".drop-profile")?.classList.remove("hidden");
    };

    window.addEventListener("click", () => {
      document.querySelector(".drop-profile")?.classList.add("hidden");
    });

    const { DetectToDisplayNotuficate, getAllNotify, notify } =
      useNotificationComposition();

    // 
    const socket = io(BASE_URL_APP);
    const { loadMessages } = useChatComposition();

socket.on("chat-message-notification", async (notifyData) => {
  if (

  
    notifyData.receive.id == USER.value.id &&
    notifyData?.type == 234
  ) {
    
    loadMessages();
  }
});

    const oneTocall = ref(0);
    onMounted(async () => {
      if (oneTocall.value === 0 && (await __store.get("jUser"))) {
        getAllNotify();
        oneTocall.value++;
      }

     
    });

    const { DisplayAeraSearch, state } = useSearchBar();

    return {
      headerLinks: header,
      headerFistPart,
      headerSecondPart,
      startAppActiveLinks,
      openMenu,
      DisplaySearch: DisplayAeraSearch,
      state,
      openPublishJob,
      jIsAuthenticate,
      USER,
      slug,
      SlideMenu,
      isSlideMenu,
      openDropProfile,
      envConfig,
      DetectToDisplayNotuficate,
    };
  },
  components: {
    SearchHeaderBar,
    NavigationLink,
    NavigationLinkComponent,
    NavigationLayout,
    Bars3Icon,
    BriefcaseIcon,
    FormSelect,
    OnlyInput,
    NavigationSidebar,
    ModalJob,
    NavigationProfile,
    SlideMenu,
    TextQuery,
    Bars3BottomLeftIcon,
    MagnifyingGlassIcon,
    AvatarProfile,
  },
});
</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
