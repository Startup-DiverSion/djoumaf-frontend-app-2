<template>
  <section class="flex rounded-md py-2 mx-4 lg:mx-0 overflow-scroll  scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-none">
    <div class="flex gap-2 items-center w-full m-auto" v-if="data">
      <div
        v-for="item in data?.user?.id === USER.id
          ? NavigationLinks
          : [NavigationLinks[0]]"
      >
        <RouterLink
          :to="'?content_page=' + item.link"
          class="border-[1px] px-4 py-2 rounded-full font-love font-medium text-base  flex w-full"
          :class="item.active ? 'border-none bg-blue-700 text-white' : ''"
        >
        {{ item.name }}
        </RouterLink>
      </div>

      <!-- Candidacy -->
     
      <RouterLink v-if="data?.user?.id === USER.id && data?.job?.length !== 0"
          :to="{name: 'ProfileCandidacy'}"
          class="border-[1px] px-4 py-2 rounded-full font-love font-medium text-base"
          :class="''"
        >
        Candidactures
        </RouterLink>
       
        
    </div>

    {{ onProfileToChangeNavigation }}
  </section>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigations";
import { defineComponent, reactive, computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useUserComposition } from "@/composables/user.composition";

export default defineComponent({
  name: "profile-navigation",
  props: ["data"],
  setup(props) {
    const NavigationLinks = reactive([
      {
        name: "Profil",
        active: true,
        id: "x11-djoumad",
        link: "info",
      },
      {
        name: "CV",
        active: false,
        id: "x12-djoumad",
        link: "cv",
      },
      {
        name: "Cercle",
        active: false,
        id: "x13-djoumad",
        link: "connection",
      },

      {
        name: "Emplois",
        active: false,
        id: "x15-djoumad",
        link: "offres_emploi",
      },
    ]);

    const { GET_USER, USER } = useUserComposition();

    onMounted(async () => {
      await GET_USER();
    });

    const route = useRoute();
    const onProfileToChangeNavigation = computed(() => {
      NavigationLinks.forEach((el: any) => {
        el.active = false;
        if (el.link === route.query?.content_page) {
          useNavigationStore().ProfileToPageChange(el.id);
          el.active = true;
        } else if (!route.query?.content_page) {
          NavigationLinks[0].active = true;
        }
      });
    });

    return {
      onProfileToChangeNavigation,
      NavigationLinks,
      USER,
    };
  },
});
</script>

<style scoped></style>
