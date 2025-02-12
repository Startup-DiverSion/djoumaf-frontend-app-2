<template>
  <div
    class="drop-profile fixed top-16 z-50  bg-white w-2/12 py-4 hidden  shadow-lg rounded-md text-base font-love left-[78%]"
  >
    <div class="flex flex-col gap-4 w-full">
      <a :href="'/'+ USER?.profile?.slug"> <NavigationProfileCard label="Profile" /></a>

      <!-- <span class="inline-flex border-b-[1px] mx-8"></span> -->

      <!-- <div class="flex flex-col">
        <div v-for="item in profileEdit">
          <NavigationProfileCard :label="item.name" />
        </div>
      </div> -->

      <span class="inline-flex border-b-[1px] mx-8"></span>

      <div class="flex flex-col">
        <div v-for="item in ProfileLinks">
          <RouterLink :to="'/'+ USER?.profile?.slug+ '' + item.link"> <NavigationProfileCard :label="item.name" /></RouterLink>
        </div>
      </div>

      <span class="inline-flex border-b-[1px] mx-8"></span>

      <div class="hover:bg-gray-200 px-8">
        <span class="text-yellow-300 font-bold text-sm"
          >Premium</span
        >
      </div>

      <span class="inline-flex border-b-[1px] mx-8"></span>

      <div class="flex flex-col">
        <div v-for="item in profileConnexion">
          <NavigationProfileCard
            @click="profileConnexionFunction(item.name)"
            :label="item.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import NavigationLinkComponent from "@/navigations/navigationLinkComponent.vue";
import NavigationProfileCard from "./navigation.profile.card.vue";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { useRouter } from "vue-router";
import { useUserComposition } from "@/composables/user.composition";
export default defineComponent({
  name: "navigation-profile",
  props: [],
  components: {
    NavigationLinkComponent,
    NavigationProfileCard,
  },

  setup(props) {
    const router = useRouter();
    const storeUtils = new LocalSotreUtils();

    const profileEdit = reactive([
      {
        name: "Modifier profile",
        action: "no-link",
      },
      {
        name: "Modifier preferences",
        action: "no-link",
      },
      {
        name: "Modifier experiences",
        action: "no-link",
      },
    ]);
    const profileConnexion = reactive([
      // {
      //   name: "Parametre de compte",
      //   action: "no-link",
      // },
      {
        name: "Deconnexion",
        action: "no-link",
      },
    ]);
    const ProfileLinks = reactive([
      
      {
        name: "Detail du profil",
        link: '?content_page=info',
        action: "no-link",
      },
      {
        name: "Mes offres d'emploi",
        link: '?content_page=offres_emploi',
        action: "no-link",
      },
      {
        name: "Mon cercle",
        link: '?content_page=connection',
        action: "no-link",
      },
      {
        name: "Mes cv",
        link: '?content_page=cv',
        action: "no-link",
      },
      
    ]);

    const {GET_USER, USER} = useUserComposition()

    onMounted(async() => {
      await GET_USER()
    })

    const profileConnexionFunction = async (name: string) => {
      if (name === "Deconnexion") {
        storeUtils.clear();
        router.push({ name: "SignIn" });
      }
    };

    return {
      profileEdit,
      profileConnexion,
      ProfileLinks,
      profileConnexionFunction,
      USER
    };
  },
});
</script>

<style scoped>


</style>
