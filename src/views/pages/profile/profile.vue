<template>
  <section class="flex w-full justify-end">
    <NavigationSideMenu />

    <section class="flex justify-end w-full lg:w-[95%] contenaire">
      <NavigationHeader />

      <section class="lg:w-11/12 w-full m-auto py-24 font-love" id="">
        <LoadingProfile v-if="loading_profile_slug" />

        <div class="flex flex-col gap-4" v-else>
          <ProfileBanner :data="profile" v-if="profile?.id" />

          <!--  -->
          <ProfileNavigation :data="profile" v-if="profile?.id" />

          <!--  -->
          <ProfileContent :data="profile" v-if="profile?.id" />
        </div>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
const CardBody= defineAsyncComponent(() =>
  import('@/components/cards/medias/card.body.vue')
)
import NavigationHeader from "@/navigations/navigationHeader.vue"
import { defineComponent, reactive, onMounted, computed, defineAsyncComponent } from "vue";
import ProfileBanner from "./__partiels/profile.banner.vue";
import ProfileContent from "./__partiels/profile.content.vue";
import ProfileNavigation from "./__partiels/profile.navigation.vue";
import { useProfileComposition} from "@/composables/profile.composition";
import { useRoute } from "vue-router";
import LoadingProfile from "@/components/cards/loading/loading.profile.vue";
const NavigationSideMenu= defineAsyncComponent(() =>
  import('@/navigations/navigation.side.menu.vue')
)
import { useProfileStore } from "@/stores/profile.store"
import { useMeta } from "vue-meta";

export default defineComponent({
  name: "",
  props: [],
  components: {
    CardBody,
    NavigationHeader,
    ProfileBanner,
    ProfileNavigation,
    ProfileContent,
    LoadingProfile,
    NavigationSideMenu,
  },
  setup(props, ctx) {
    useMeta({ title: "Profil", StyleSheetList });
    const { profileShowSlug, loading_profile_slug } = useProfileComposition();
    const route = useRoute();

    const profile = computed(() => {
      return useProfileStore().dataProfile;
    });

    onMounted(() => {
      profileShowSlug(route.params.slug);
      console.log(profile.value);
    });

    return {
      profile,
      loading_profile_slug,
    };
  },
});
</script>

<style scoped></style>
