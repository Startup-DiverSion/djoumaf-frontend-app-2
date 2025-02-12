<template>
  <section class="flex lg:flex-row flex-col gap-4 w-full">
   
    <!-- Display the detail of user  -->
    <div
      class="lg:flex flex-col hidden w-full lg:w-[25%] bg-white rounded-lg h-full divide-y-2 px-4 lg:sticky lg:top-20"
    >
      <ProfileGlobalInfo :data="data" />
    </div>

    <!-- Display the description of user -->
   <div class="flex flex-col gap-4 w-full lg:w-[75%] relative overflow-auto">
      <ProfileContentInfo v-if="ProfileNavigationActifLink === 'x11-djoumad'" :data="data" />
      <ProfileCVContent v-if="ProfileNavigationActifLink === 'x12-djoumad'" :data="data" />
      <ProfileConnection v-if="ProfileNavigationActifLink === 'x13-djoumad'"  />
      <ProfileMail v-if="ProfileNavigationActifLink === 'x14-djoumad'" />
      <ProfileJob v-if="ProfileNavigationActifLink === 'x15-djoumad'" :data="data" />
   
   </div>
  </section>
</template>

<script lang="ts">
const CardBody= defineAsyncComponent(() =>
  import('@/components/cards/medias/card.body.vue')
)
import { useNavigationStore } from "@/stores/navigations";
import ProfileContentActivityCard from "@/views/pages/profile/__partiels/profile.content.activity.card.vue";
import { computed, defineComponent, reactive, defineAsyncComponent } from "vue";
import ProfileConnection from "./profile.connection.vue";
import ProfileContentInfo from "./profile.content.info.vue";
import ProfileCVContent from "./profile.cv.content.vue";
import ProfileGlobalInfo from "./profile.global.info.vue";
import ProfileJob from "./profile.job.vue";
import ProfileMail from "./profle.mail.vue";

export default defineComponent({
  name: "profile-content",
  props: ['data'],
  setup() {
    const ProfileNavigationActifLink = computed(() => {
      return useNavigationStore().ProfileToPage;
    });

    return {
      ProfileNavigationActifLink,
    };
  },
  components: {
    CardBody,
    ProfileContentActivityCard,
    ProfileContentInfo,
    ProfileCVContent,
    ProfileConnection,
    ProfileGlobalInfo,
    ProfileMail,
    ProfileJob
},
});
</script>

<style scoped></style>
