<template>
  <!--  -->
  <section class="flex flex-col w-full lg:w-3/12 gap-4">
    <div
      class="flex flex-col  h-auto bg-white rounded-lg divide-y-2"
      v-if="USER?.profile"
    >
      <ProfileGlobalInfo :data="USER?.profile" :isImage="true" />
    </div>

    <div class="sticky top-20 " >
      <CardMedia label="Les entreprises sur DjoumAf" sticky="sticky top-20">
        <LoadingMessage
          v-if="state_profile_compagny.profile"
          :data="state_profile_compagny.profile"
          :message="'Aucun abonnement pour le moment.'"
          :error="state_profile_compagny.error"
          :loading="!state_profile_compagny.loading"
        />
        <div
          class="flex flex-col px-2 justify-center font-love text-base divide-y-[1px]"
        >
          <div v-for="item in 4" v-if="state_profile_compagny.loading">
            <LoadingProfileFeed />
          </div>
          <div v-for="profile in state_profile_compagny.profile.slice(0, 4)" v-if="state_profile_compagny.profile && !state_profile_compagny.loading">
            <CardProfileFeed :profileToFollow="profile" />
          </div>
        </div>
        <BtnMoreCard class="mt-4" label="Voir plus " :jRoute="'/networks'" />
      </CardMedia>
    </div>
  </section>
</template>

<script lang="ts">
const BtnDjoumer= defineAsyncComponent(() =>
  import('@/components/buttons/btn.djoumer.vue')
)
const BtnFollow= defineAsyncComponent(() =>
  import('@/components/buttons/btn.follow.vue')
)
const CardMedia= defineAsyncComponent(() =>
  import('@/components/cards/medias/card.media.vue')
)
const ChooseYourPreference= defineAsyncComponent(() =>
  import('@/components/toPages/Auth/chooseYourPreference.vue')
)
const LegalAuthCompoment= defineAsyncComponent(() =>
  import('@/components/toPages/Auth/legalAuthCompoment.vue')
)
const NavigationFooter= defineAsyncComponent(() =>
  import('@/navigations/navigationFooter.vue')
)
import NavigationHeader from "@/navigations/navigationHeader.vue"
import { defineComponent, onMounted, defineAsyncComponent } from "vue";
import InDeveloppmentApp from "@/components/inDeveloppment/in.developpment.app.vue";
import { useCerleComposition} from "@/composables/cerle.composition";
import TextQuery from "@/components/texts/text.query.vue";
import { envConfig } from "@/env.config";
import ProfileGlobalInfo from "../../profile/__partiels/profile.global.info.vue";
import { useUserComposition } from "@/composables/user.composition";
const BtnMoreCard= defineAsyncComponent(() =>
  import('@/components/buttons/btn.more.card.vue')
)
import CardProfileFeed from "@/components/cards/card.profile.feed.vue";
import LoadingProfileFeed from "@/components/cards/loading/loading.profile.feed.vue";
import LoadingMessage from "@/components/cards/loading/loading.message.vue";

export default defineComponent({
  name: "",
  props: [],
  components: {
    NavigationHeader,
    NavigationFooter,
    ChooseYourPreference,
    CardMedia,
    BtnFollow,
    BtnDjoumer,
    LegalAuthCompoment,
    InDeveloppmentApp,
    TextQuery,
    ProfileGlobalInfo,
    BtnMoreCard,
    CardProfileFeed,
    LoadingProfileFeed,
    LoadingMessage,
  },
  setup() {
    const {
      MYCERCLE,
      getMyCercleAbonnement,
      getMyCercleAbonner,
      loading_getMyCercle,
      error_getMyCercle,
      ALLPROFILE_COMPANY,
      state_profile_compagny,
      statistic,
    } = useCerleComposition();

    const { USER, GET_USER } = useUserComposition();

    onMounted(() => {
      GET_USER();
      ALLPROFILE_COMPANY({'limit': 4, 'page': 1});
    });

    return {
      envConfig,
      USER,
      state_profile_compagny
    };
  },
});
</script>

<style scoped></style>
