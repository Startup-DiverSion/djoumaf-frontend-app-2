<template>
  <div class="flex flex-col bg-white lg:rounded-md w-full m-auto relative">
    <div
      class="bg-blue-100 w-full h-[170px] md:h-[270px] lg:rounded-t-md relative overflow-hidden"
    >
      <LadingSpinerBasic :loading="loading_mediaCover" />


      
          <img
            class="min-h-full min-w-full  object-cover object-top rounded-t-md"
            v-lazy="mediaProfileCover.length !== 0
            ? mediaProfileCover[0]
            :
              data?.media_profile_cover[0]?.url
                ? `${envConfig().HOST_SERVER_IMAGE}${
                    data.media_profile_cover[0].url
                  }`
                : envConfig().DEFAULT_IMAGE_PROFILE_COVER
            "
            alt=""
          />
      
      

      <EditCompoment
        name="mediaProfileCover"
        :data="data"
        classname="top-4 right-4"
      />
    </div>

    <div class="flex flex-col lg:flex-row w-full">
      <div
        class="absolute md:-top-12 -top-12 left-4 "
      >

      <div class="w-28 h-28 md:w-40 md:h-40 bg-blue-100 rounded-full overflow-hidden">
        <LadingSpinerBasic :loading="loading_media" />
        <img
          v-if="!loading_media"
          class="bg-blue-50 min-h-full min-w-full rounded-full absolute object-cover "
          v-lazy="
            mediaProfile.length !== 0
              ? mediaProfile[0]
              : data.media_profile?.url
              ? `${data.media_profile.original_url}`
              : envConfig().DEFAULT_IMAGE_PROFILE
          "
          alt=""
        />
      </div>
       
        <EditCompoment
          name="mediaProfile"
          :data="data"
          classname="bottom-4 -right-2 "
        />
      </div>

      <div class="flex justify-end w-full py-14 md:pt-28 lg:py-8">
        <div
          class="flex flex-col gap-4 lg:flex-row justify-start lg:justify-between xl:px-8 lg:px-14 items-center w-full top-4 lg:top-0 lg:w-10/12 xl:w-10/12"
        >
          <div class="flex flex-col w-10/12 lg:w-10/12 xl:w-9/12">
            <div class="flex flex-col font-love">
              <span class="font-bold text-2xl"> {{ data.full_name }} </span>
              <span class="text-base">{{ data.bio }}</span>
            </div>

            <div class="font-love text-sm mt-4">
              <span v-if="data?.user?.signin_place">
                {{ JSON.parse(data?.user?.signin_place).city }},
                {{ JSON.parse(data?.user?.signin_place).country_name }}
              </span>
              <span v-else> Pas definie </span>
              &#149;
              <span>
                Rejoint le
                {{ new Date(data?.user?.created_at).toLocaleDateString() }}
              </span>
            </div>

            <div class="font-love text-sm text-blue-700 mt-1">
              <span class="font-bold">0 Djoum</span> &#149;

              <RouterLink
                :to="
                  data?.slug == USER?.profile?.slug
                    ? '/' + data?.slug + '/my-cercle?r=Abonner'
                    : ''
                "
                class="font-bold"
              >
                {{ abonneCount }} Abonné(s)
              </RouterLink>
              &#149;
              <RouterLink
                :to="
                  data?.slug == USER?.profile?.slug
                    ? '/' + data?.slug + '/my-cercle?r=Abonnements'
                    : ''
                "
                class="font-bold"
              >
                {{ abonnementCount }} Ab..ment(s)
              </RouterLink>
            </div>
          </div>

          <div
            class="flex gap-2 justify-start lg:justify-end w-10/12"
            v-if="USER?.id !== data?.user?.id"
          >
            <button
              class="bg-orange-500 px-4 rounded-full text-xs text-white flex gap-1 items-center"
              @click="chatByUser"
            >
            <ChatBubbleBottomCenterTextIcon class="w-4"></ChatBubbleBottomCenterTextIcon>
              <span class="text-sm font-bold">Discutons</span>
            </button>
            <!-- <BtnDjoumer label="Djoumer" /> -->
            <BtnFollow
              label="Suivre"
              :is-follow-user="isFollowUser"
              :data="data"
            />
          </div>
          <div class="flex gap-2 justify-start lg:justify-end w-10/12" v-else>
            <button
              @click="openMenu('modal-profile')"
              class="flex justify-center items-center bg-blue-700 px-4 py-2 rounded-full gap-1 font-love text-sm font-bold text-white"
            >
              <PencilIcon class="fi fi-sr-pencil flex h-4"></PencilIcon>
              <span class="font-bold">Modifer profil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--  -->
  <input
    type="file"
    :name="'mediaProfile'"
    :id="'mediaProfile' + 'in-input'"
    class="hidden clear-both"
    @change="uploadImageMediaProfile"
  />
  <input
    type="file"
    :name="'mediaProfileCover'"
    :id="'mediaProfileCover' + 'in-input'"
    class="hidden clear-both"
    @change="uploadImageMediaProfileCover"
  />
  <ModalProfile :data="data" />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  onUpdated,
  defineAsyncComponent,
} from "vue";
const BtnDjoumer = defineAsyncComponent(
  () => import("@/components/buttons/btn.djoumer.vue")
);
const BtnFollow = defineAsyncComponent(
  () => import("@/components/buttons/btn.follow.vue")
);
import EditCompoment from "@/components/edit/edit.compoment.vue";
import { useMediaComposition } from "@/composables/media.composition";
import moment from "moment";
import { useUserComposition } from "@/composables/user.composition";
const BtnSimple = defineAsyncComponent(
  () => import("@/components/buttons/btn.simple.vue")
);
import { envConfig } from "@/env.config";
import { useModalComposition } from "@/composables/modal.composition";
import ModalProfile from "@/components/modals/modal.profile.vue";
import { useEventStore } from "@/stores/event";
import { useCerleComposition } from "@/composables/cerle.composition";
import LadingSpinerBasic from "@/components/cards/loading/lading.spiner.basic.vue";
import { useChatStore } from "@/stores/chat.store";
import { useRouter } from "vue-router";
import { URL } from "@/router/url";
import axios from "axios";
import { io } from "socket.io-client";
import { ChatBubbleBottomCenterTextIcon, PencilIcon } from "@heroicons/vue/24/solid";
import { usePaymentComposition } from "@/composables/payment.composition";

export default defineComponent({
  name: "profile-banner",
  components: {
    BtnDjoumer,
    BtnFollow,
    EditCompoment,
    BtnSimple,
    ModalProfile,
    LadingSpinerBasic,
    ChatBubbleBottomCenterTextIcon,
    PencilIcon
},
  props: ["data"],
  setup(props) {
    // Get and setter image
    const {
      uploadImageMediaProfile,
      uploadImageMediaProfileCover,
      mediaProfile,
      mediaProfileCover,
      loading_media,
      loading_mediaCover,
    } = useMediaComposition();

    const { GET_USER, USER } = useUserComposition();
    const {PAYMENT} = usePaymentComposition()
    const {
      abonneCount,
      abonnementCount,
      FOLLOWCount,
      isFollowUser,
    } = useCerleComposition();
    const { openMenu } = useModalComposition();

    const dj_event = computed(() => {
      return useEventStore().editProfile;
    });

    onMounted(async () => {
      if (dj_event.value) {
        await GET_USER();
      }
      await GET_USER();
      FOLLOWCount(props.data?.user.id);
      PAYMENT()
    });

    const router = useRouter();
    const chatByUser = async () => {
      const { data } = await axios.post(URL.CHAT_GROUP_CREATE, {
        to: props.data?.user.id,
      });
      if (data) {
        useChatStore().newChatID_Detect = data.chat_id;
        console.log(props.data);
        router.push({ name: "Messages" });
      }
    };

    return {
      uploadImageMediaProfile,
      mediaProfile,
      uploadImageMediaProfileCover,
      mediaProfileCover,
      USER,
      envConfig,
      openMenu,
      dj_event,
      abonneCount,
      abonnementCount,
      isFollowUser,
      loading_media,
      loading_mediaCover,
      chatByUser,
    };
  },
});
</script>

<style scoped></style>
