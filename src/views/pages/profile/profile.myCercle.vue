<template>
  <SideLayout>
    <template #content>
      <NavigationHeader />

      <main class="flex flex-col w-full">
        <main
          class="flex flex-col lg:flex-row mt-[80px] lg:w-11/12 w-full m-auto gap-4"
        >
          <section class="w-full lg:w-[75%] lg:mb-16">
            <div class="flex flex-col gap-4 w-full pb-4">
              <!--  -->
              <div
                class="bg-white sticky rounded-md top-0 z-10 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 w-full border-t-[1px] border-b-[1px] lg:border-[1px]"
              >
                <div class="grid grid-cols-2 divide-x-[1px]">
                  <div v-for="(direction, index) in CercleDirections">
                    <RouterLink
                      :to="direction.link"
                      class="flex justify-center items-center m-auto relative cursor-pointer py-3 hover:bg-gray-100"
                    >
                      <span
                        class="text-sm"
                        :class="direction.actvied ? 'font-bold' : ''"
                      >
                        {{ direction.name }}
                      </span>
                      <div
                        v-if="direction.actvied"
                        class="top-[95%] absolute inline-flex w-12 h-[2px] rounded-full bg-blue-500"
                      ></div>
                    </RouterLink>
                  </div>
                </div>
              </div>

              <!-- All Cerles infos -->
              <div class="flex flex-col gap-8 bg-white rounded-md">
                <!-- Mes abonnements -->
                <div class="flex flex-col gap-4" v-if="cercleActived === 0">
                  <div
                    class="flex w-10/12 lg:w-6/12 m-auto py-8"
                    v-if="
                      getMyCercleAbonnement && getMyCercleAbonnement.length == 0
                    "
                  >
                    <LoadingMessage
                      v-if="getMyCercleAbonnement"
                      :data="getMyCercleAbonnement"
                      :message="'À la recherche d\'abonnés ?'"
                      message-sub="Lorsqu'une personne suivra ce compte, il sera ajouté à cette liste. Pour augmenter votre nombre d'abonnés, n'oubliez pas d'interagir avec les autres utilisateurs."
                      :error="error_getMyCercle"
                      :loading="!loading_getMyCercle"
                      class="w-full lg:w-8/12 py-8"
                    />
                  </div>

                  <div class="flex flex-col gap-2">
                    <LadingSpinerBasic
                      color="text-blue-500"
                      class="py-8"
                      :loading="loading_getMyCercle"
                    />

                    <div
                      class="flex flex-col px-4 py-2"
                      v-if="getMyCercleAbonnement"
                    >
                      <CardProfileHz
                        :data="getMyCercleAbonnement.slice(0, endAbonnements)"
                        class-name="w-full"
                        btn-name="Voir"
                      />

                      <BtnMoreCercle
                        :data="getMyCercleAbonnement"
                        :endData="endAbonnements"
                        @click="endAbonnements = endAbonnements + 15"
                      />
                    </div>
                  </div>
                </div>

                <!-- Mes Abonner -->
                <div class="flex flex-col gap-4" v-if="cercleActived === 1">
                  <div
                    class="flex w-10/12 lg:w-6/12 m-auto py-8"
                    v-if="getMyCercleAbonner && getMyCercleAbonner.length == 0"
                  >
                    <LoadingMessage
                      v-if="getMyCercleAbonner"
                      :data="getMyCercleAbonner"
                      :message="'vous n\'avez pas d\'abonnés?'"
                      message-sub="Il est important de prendre soin de votre profil en le complétant avec des informations intéressantes et attrayantes."
                      :error="error_getMyCercle"
                      :loading="!loading_getMyCercle"
                      class="w-full lg:w-8/12 py-8"
                    />
                  </div>

                  <div class="flex flex-col gap-2">
                    <LadingSpinerBasic
                      color="text-blue-500"
                      class="py-8"
                      :loading="loading_getMyCercle"
                    />

                    <div
                      class="flex flex-col gap-2 px-4"
                      v-if="getMyCercleAbonner"
                    >
                      <CardProfileHz
                        :data="getMyCercleAbonner.slice(0, endAbonner)"
                        class-name="w-full"
                        btn-name="Voir"
                      />

                      <BtnMoreCercle
                        :data="getMyCercleAbonner"
                        :endData="endAbonner"
                        @click="endAbonner = endAbonner + 15"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            class="w-full lg:w-[25%] h-32 flex flex-col gap-4 lg:sticky top-16 lg:top-20"
          >
            <CardSuggProfie />
          </section>
        </main>
      </main>
    </template>
  </SideLayout>
  <NavigationFooter />

  {{ cercleDirectionActived }}
</template>

<script lang="ts">
import {
  defineComponent,
  defineAsyncComponent,
  reactive,
  computed,
  ref,
  onMounted,
} from "vue";
const SideLayout = defineAsyncComponent(
  () => import("@/layouts/SideLayout.vue")
);
import NavigationHeader from "@/navigations/navigationHeader.vue";
import { advertisementImage } from "@/advertisement/advertisement.image";
import CardMedia from "@/components/cards/medias/card.media.vue";
import BtnFollow from "@/components/buttons/btn.follow.vue";
import axios from "axios";
import { URL } from "@/router/url";
import { useRoute, useRouter } from "vue-router";
import TextQueryHtml from "@/components/texts/text.query.html.vue";
import { envConfig } from "@/env.config";
import moment from "moment";
import { useCerleComposition } from "@/composables/cerle.composition";
import CardProfileHz from "@/components/cards/card.profile.hz.vue";
import LoadingMessage from "@/components/cards/loading/loading.message.vue";
import { useSearchComposition } from "@/composables/search.composition";
import TextQuery from "@/components/texts/text.query.vue";
import LadingSpinerBasic from "@/components/cards/loading/lading.spiner.basic.vue";
import CardSuggProfie from "@/components/cards/card.sugg.post.vue";
import { useNotificationComposition } from "@/composables/notification.composition";
import { useNotificateStore } from "@/stores/notificate.store";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import NavigationFooter from "@/navigations/navigationFooter.vue";
import { useMeta } from "vue-meta";
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
import BtnMoreCercle from "@/components/buttons/btn.more.cercle.vue";

export default defineComponent({
  name: "",
  props: [],
  components: {
    SideLayout,
    NavigationHeader,
    CardMedia,
    BtnFollow,
    TextQueryHtml,
    CardProfileHz,
    LoadingMessage,
    TextQuery,
    LadingSpinerBasic,
    CardSuggProfie,
    NavigationFooter,
    ArrowRightIcon,
    BtnMoreCercle,
  },
  setup() {
    useMeta({ title: "Notifications", StyleSheetList });
    const {
      MYCERCLE,
      getMyCercleAbonnement,
      getMyCercleAbonner,
      loading_getMyCercle,
      error_getMyCercle,
      ALLPROFILE,
      statistic,
    } = useCerleComposition();
    onMounted(() => {
      //
      MYCERCLE().then((el: any) => {
        getMyCercleAbonnement.value = getMyCercleAbonnement.value.map(
          (abn: any) => {
            abn.profile.isProfileFollow = abn.isProfileFollow;
            return abn.profile;
          }
        );
      });
    });

    const router = useRouter();
    const route = useRoute();
    const cercleActived = ref(0);
    const endAbonnements = ref(15);
    const endAbonner = ref(15);

    const cercleDirectionActived = computed(() => {
      if (route.query && route.query.r == "Abonnements") {
        cercleActived.value = 0;
      } else if (route.query && route.query.r == "Abonner") {
        cercleActived.value = 1;
      } else {
        cercleActived.value = 0;
      }

      CercleDirections.forEach((cercle) => {
        cercle.actvied = false;
        if (cercle.name === route.query.r) {
          cercle.actvied = true;
        } else if (!route.query.r) {
          CercleDirections[0].actvied = true;
        }
      });
    });

    const CercleDirections = reactive([
      {
        id: 0,
        name: "Abonnements",
        link: "?r=Abonnements",
        actvied: true,
      },
      {
        id: 1,
        name: "Abonner",
        link: "?r=Abonner",
        actvied: false,
      },
      // {
      //   id: 2,
      //   name: "Djoumer",
      //   actvied: false,
      // },
      // {
      //   id: 3,
      //   name: "Entreprise",
      //   actvied: false,
      // },
    ]);

    return {
      getMyCercleAbonnement,
      envConfig,
      getMyCercleAbonner,
      loading_getMyCercle,
      error_getMyCercle,
      CercleDirections,
      cercleActived,
      cercleDirectionActived,
      endAbonnements,
      endAbonner,
    };
  },
});
</script>

<style scoped></style>
