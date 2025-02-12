<template>
  <div class="flex flex-col gap-2 w-full">
    <!--  -->
    <div class="flex flex-col lg:flex-row w-full gap-4">
      <div class="flex flex-col gap-4 w-full lg:w-8/12 pb-4">
        <!--  -->
        <div
          class="bg-white sticky rounded-md top-0 z-10 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 w-full border-t-[1px] border-b-[1px] lg:border-[1px]"
        >
          <div class="grid grid-cols-2 divide-x-[1px]">
            <div v-for="(direction, index) in CercleDirections">
              <div
                @click="Fn_CercleDirections(index, direction.id)"
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
              </div>
            </div>
          </div>
        </div>

        <!-- All Cerles infos -->
        <div class="flex flex-col gap-8 bg-white rounded-md">
          <!-- Mes abonnements -->
          <div class="flex flex-col gap-4" v-if="cercleActived === 0">
            <div
              class="flex w-10/12 lg:w-6/12 m-auto py-8"
              v-if="getMyCercleAbonnement && getMyCercleAbonnement.length == 0"
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
              <div>
                <LadingSpinerBasic :loading="loading_getMyCercle" />
              </div>

              <div class="px-4 py-2" v-if="getMyCercleAbonnement">
                <CardProfileHz
                  :data="getMyCercleAbonnement.slice(0, endAbonnement)"
                  class-name="w-full"
                  btn-name="Voir"
                />
                <BtnMoreCercle
                  :data="getMyCercleAbonnement"
                  :endData="endAbonnement"
                  @click="endAbonnement = endAbonnement + 15"
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
              <div>
                <LadingSpinerBasic :loading="loading_getMyCercle" />
              </div>

              <div class="px-4">
                <CardProfileHz
                  :data="getMyCercleAbonner.slice(0, endAbonner)"
                  class-name="w-full"
                  btn-name="Voir"
                />
              </div>

              <BtnMoreCercle
                  :data="getMyCercleAbonner"
                  :endData="endAbonner"
                  @click="endAbonner = endAbonner + 15"
                />
            </div>
          </div>
        </div>
      </div>

      <!-- SUGGESTION -->
      <div class="w-full lg:w-5/12 rounded-md sticky top-32">
        <CardSuggPost />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const BtnMoreCard = defineAsyncComponent(
  () => import("@/components/buttons/btn.more.card.vue")
);
const BtnSimple = defineAsyncComponent(
  () => import("@/components/buttons/btn.simple.vue")
);
const CardPostProfile = defineAsyncComponent(
  () => import("@/components/cards/card.post.profile.vue")
);
import LoadingProfileCard from "@/components/cards/loading/loading.profile.card.vue";
const CardBody = defineAsyncComponent(
  () => import("@/components/cards/medias/card.body.vue")
);
import { URL } from "@/router/url";
import axios from "axios";
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  defineAsyncComponent,
} from "vue";
import { useCerleComposition } from "@/composables/cerle.composition";
import LoadingMessage from "@/components/cards/loading/loading.message.vue";
import LadingSpinerBasic from "@/components/cards/loading/lading.spiner.basic.vue";
import CardProfileHz from "@/components/cards/card.profile.hz.vue";
import CardMedia from "@/components/cards/medias/card.media.vue";
import CardSuggPost from "@/components/cards/card.sugg.post.vue";
import BtnMoreCercle from "@/components/buttons/btn.more.cercle.vue";

export default defineComponent({
  name: "profile-connection",
  props: ["data"],
  components: {
    CardBody,
    BtnSimple,
    BtnMoreCard,
    CardPostProfile,
    LoadingProfileCard,
    LoadingMessage,
    LadingSpinerBasic,
    CardProfileHz,
    CardMedia,
    CardSuggPost,
    BtnMoreCercle,
  },
  setup() {
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

    const cercleActived = ref(0);
    const endAbonner = ref(15);
    const endAbonnement = ref(15);

    const CercleDirections = reactive([
      {
        id: 0,
        name: "Abonnements",
        actvied: true,
      },
      {
        id: 1,
        name: "Abonner",
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

    const Fn_CercleDirections = (cercle_index: any, ID: any) => {
      cercleActived.value = cercle_index;
      CercleDirections.forEach((el: any) => {
        if (el.id === ID) {
          el.actvied = true;
        } else {
          el.actvied = false;
        }
      });
    };

    return {
      getMyCercleAbonnement,
      getMyCercleAbonner,
      loading_getMyCercle,
      error_getMyCercle,
      CercleDirections,
      cercleActived,
      Fn_CercleDirections,
      endAbonner,
      endAbonnement,
    };
  },
});
</script>

<style scoped></style>
