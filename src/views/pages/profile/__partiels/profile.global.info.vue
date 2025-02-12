<template>
  <!-- Information basic -->
  <div class="bg-gray-50 w-full h-16 rounded-t-md z-10" v-if="data && isImage">
    <div class="h-20 overflow-hidden rounded-t-md">
          <img
            class="min-h-full min-w-full  object-cover object-top rounded-t-md"
            v-lazy="
              data?.media_profile_cover[0]?.url
                ? `${envConfig().HOST_SERVER_IMAGE}${
                    data.media_profile_cover[0].url
                  }`
                : envConfig().DEFAULT_IMAGE_PROFILE_COVER
            "
            alt=""
          />
        </div>

    <div class="bg-blue-50 w-16 h-16 rounded-full relative -top-7 left-4 flex justify-center items-center">
      <img
        class="rounded-full object-cover  h-full w-full"
        v-lazy="
          data?.media_profile[0]?.url
            ? `${envConfig().HOST_SERVER_IMAGE}${data.media_profile[0].url}`
            : envConfig().DEFAULT_IMAGE_PROFILE
        "
        alt=""
      />
    </div>
  </div>

  <div class="" :class="isImage ? 'pt-12 px-4' : ''">
    <CardBody label="Detail" v-if="data?.bio">
    <div class="flex flex-col gap-2" >
      <CardProfileInfo
        icon="user"
        :title="data?.full_name"
        :sm="30"
        :md="30"
        :lg="25"
      />
      <CardProfileInfo
        icon="account"
        class="text-orange-500"
        :title="'Compte Gratuit'"
        :sm="30"
        :md="30"
        :lg="50"
        :xl="50"
      />
      <CardProfileInfo
        icon="bio"
        :title="data?.bio"
        :sm="30"
        :md="100"
        :lg="40"
        :xl="50"
      />
   
      <CardProfileInfo
        icon="marker"
        :title="
          data?.user?.signin_place
            ? JSON.parse(data?.user?.signin_place).city +
              ', ' +
              JSON.parse(data?.user?.signin_place).country_name
            : 'Pas define'
        "
        :sm="30"
        :md="30"
        :lg="25"
        :xl="25"
      />
      <!-- <CardProfileInfo icon="fi fi-sr-marker" :title="data?.user?.signin_place ? JSON.parse(data?.user?.signin_place).city + ', ' + JSON.parse(data?.user?.signin_place).country_name : 'Pas define'" :sm="30" :md="30" :lg="25" :xl="25" />
        <CardProfileInfo icon="fi fi-sr-marker" :title="data?.user?.signin_place ? JSON.parse(data?.user?.signin_place).city + ', ' + JSON.parse(data?.user?.signin_place).country_name : 'Pas define'" :sm="30" :md="30" :lg="25" :xl="25" /> -->
    </div>
  </CardBody>
  </div>
  

  <!-- Information of contact -->
  <!-- <CardBody label="Contacts" v-if="data?.bio">
    <div class="flex flex-col gap-2">
      <CardProfileInfo icon="fi fi-sr-envelope flex" :title="data?.user?.email" :sm="30" :md="30" :lg="15" :xl="25" />
    </div>
  </CardBody> -->

  {{ dt }}
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  onMounted,
  onBeforeMount, defineAsyncComponent
} from "vue";
const CardBody= defineAsyncComponent(() =>
  import('@/components/cards/medias/card.body.vue')
)
import { useProfileComposition} from "@/composables/profile.composition";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import TextQuery from "@/components/texts/text.query.vue";
import CardProfileInfo from "@/components/cards/card.profile.info.vue";
import { envConfig } from "@/env.config";

export default defineComponent({
  name: "profile-global-info",
  components: { CardBody, TextQuery, CardProfileInfo },
  props: {
    data: Object,
    isImage: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    default: () => {
      return {
        full_name: "",
        user: {
          email: "",
        },
      };
    },
  },
  setup(props) {
    const DetailProfile = ref();
    const jProfile: any = ref();
    const ContactProfile = ref();
    const dt = computed(() => {
      DetailProfile.value = [
        {
          name: props.data?.full_name,
          icon: "fi fi-sr-user ",
        },
        {
          name: "Compte Gratuit",
          icon: "fi fi-sr-money-check ",
        },
        {
          name: props.data?.bio,
          icon: "fi fi-sr-star ",
        },
        {
          name: props.data?.user?.signin_place
            ? JSON.parse(props.data?.user?.signin_place).city +
              ", " +
              JSON.parse(props.data?.user?.signin_place).country_name
            : "Pas define",
          icon: "fi fi-sr-marker ",
        },
      ];

      ContactProfile.value = [
        // {
        //   name: "+225 075 635 7748",
        //   icon: "fi fi-sr-phone-call",
        // },
        {
          name: props.data?.user?.email,
          icon: "fi fi-sr-envelope",
        },
      ];
    });

    // const {profileShowSlug, profile} = useProfileComposition()

    const __store = new LocalSotreUtils();
    const __Crypo = new CryptUtils();

    const USER: any = ref({ profile: {}, signin_place: {} });
    const slug = ref("");

    onMounted(async () => {
      USER.value = JSON.parse(__Crypo.qDecrypted(await __store.get("jUser")));
      slug.value = USER.value.profile.slug;
    });

    return { DetailProfile, ContactProfile, dt, jProfile, envConfig };
  },
});
</script>

<style scoped></style>
