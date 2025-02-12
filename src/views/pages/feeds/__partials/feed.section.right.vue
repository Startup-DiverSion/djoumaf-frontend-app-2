<template>
  <section class="w-full lg:w-3/12 flex flex-col gap-4">
    <div class="">
      <CardMedia label="Les profiles à suivre" sticky="sticky top-20">
        <LoadingMessage
          v-if="state_profile.profile"
          :data="state_profile.profile"
          :message="'Aucun abonnement pour le moment.'"
          :error="state_profile.error"
          :loading="!state_profile.loading"
        />
        <div
          class="flex flex-col px-2 justify-center font-love text-base divide-y"
        >
          <div v-for="item in 4" v-if="state_profile.loading">
            <LoadingProfileFeed />
          </div>
          <div
            v-for="profile in state_profile.profile"
            v-if="state_profile.profile && !state_profile.loading"
          >
            <CardProfileFeed :profileToFollow="profile" />
          </div>
        </div>
        <BtnMoreCard class="mt-4" label="Voir plus " :jRoute="'/networks'" />
      </CardMedia>
    </div>

    <div class="flex gap-8 flex-col sticky top-20">
      <CardSuggPost />
    

      <div class="w-11/12 m-auto font-love text-sm">
       <LegalFooter />
      </div>
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
import CardSuggPost from "@/components/cards/card.sugg.post.vue"
import LegalFooter from "@/components/footers/legal.footer.vue"

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
    CardSuggPost,
    LegalFooter
},
  setup() {
    const {
      MYCERCLE,
      getMyCercleAbonnement,
      getMyCercleAbonner,
      loading_getMyCercle,
      error_getMyCercle,
      ALLPROFILE,
      state_profile,
      statistic,
    } = useCerleComposition();

    const { USER, GET_USER } = useUserComposition();

    onMounted(() => {
      GET_USER();
      ALLPROFILE({limit: 10, page: 1});
    });

    return {
      envConfig,
      USER,
      state_profile
    };
  },
});
</script>

<style scoped></style>
