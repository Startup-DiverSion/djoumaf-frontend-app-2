<template>
  <div
    class="inline-flex w-full h-[100vh] overflow-auto fixed inset-0 bg-white/50 z-40"
    @click="$emit('closeSlideMenu', false)"
    v-if="USER"
  >
    <!-- Side Menu for small screen -->
    <div
      class="flex flex-col divide-y-[1px] lg:hidden bg-gray-800 w-11/12 px-8 py-4 pb-8 h-[100%] overflow-auto"
      @click.stop
    >
      <div class="flex flex-col gap-3 pt-4 pb-8">
        <div class="w-14 h-14 bg-gray-100 rounded-full" v-if="USER?.profile">
          <img
            v-lazy="
              !USER?.profile.media_profile
                ? envConfig().DEFAULT_IMAGE_PROFILE
                : USER?.profile.media_profile[0]?.url
                ? `${envConfig().HOST_SERVER_IMAGE}${
                    USER?.profile.media_profile[0].url
                  }`
                : envConfig().DEFAULT_IMAGE_PROFILE
            "
            class="rounded-full object-cover w-full h-full"
            alt=""
          />
        </div>
        <XMarkIcon
          class="absolute right-0 top-8 cursor-pointer h-6 text-white"
          @click.stop="$emit('closeSlideMenu', false)"
        />

        <div class="flex flex-col text-white" v-if="USER?.profile">
          <TextQuery
            :class-name="'text-xl font-bold'"
            :title="USER?.profile?.full_name"
            :sm="30"
            :md="30"
            :lg="0"
            :xl="0"
          />

          <TextQuery
            :class-name="'text-base font-extralight'"
            :title="USER?.profile?.bio"
            :sm="30"
            :md="30"
            :lg="0"
            :xl="0"
          />
        </div>

        <div class="flex gap-2 text-white text-sm">
          <span> 0 Djoum </span>&#149;
          <RouterLink :to="'/' + USER?.profile?.slug + '/my-cercle?r=Abonner'">
            {{ abonneCount }} Abonné(s)</RouterLink
          >&#149;
          <RouterLink
            :to="'/' + USER?.profile?.slug + '/my-cercle?r=Abonnements'"
          >
            {{ abonnementCount }} Ab..ment(s)</RouterLink
          >
        </div>

        <a
          :href="'/' + USER?.profile?.slug"
          class="iniline-flex text-sm text-white underline underline-offset-2"
        >
          Mon profil
        </a>
      </div>

      <div class="flex flex-col gap-4 py-8">
        <div v-for="item in MenuLinks">
          <RouterLink :to="item.link == 'ProfileCv' ? '/' + USER?.profile?.slug + '/?content_page=cv' : { name: item.link }" class="flex w-full group">
            <div
              class="flex gap-2 w-full items-end text-white group-hover:text-gray-400"
            >
              <AvatarIcon
                :path="item.link"
                className="flex text-xl opacity-80 h-6 w-6"
              />
              <span class="text-xl top-[4px] pl-4"> {{ item.name }}</span>
            </div>
          </RouterLink>
        </div>
      </div>

      <div class="flex flex-col gap-4 py-8">
        <div v-for="item in profileConnexion">
          <div
            class="flex w-full group cursor-pointer"
            @click="FunProfileConnexion(item.mode, item.id)"
          >
            <div
              class="flex gap-2 w-full items-end text-white group-hover:text-gray-400"
            >
              <AvatarIcon
                :path="item.link"
                className="flex text-xl opacity-80 h-6 w-6"
              />
              <span class="top-[4px] text-xl pl-4"> {{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  defineAsyncComponent,
  onBeforeUpdate,
} from "vue";
// import { useUserComposition } from "@/composables/user.composition";
import TextQuery from "@/components/texts/text.query.vue";
import { envConfig } from "@/env.config";
import { useNavigationComposition } from "@/composables/navigation.composition";
import { useCerleComposition } from "@/composables/cerle.composition";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import AvatarIcon from "../avatar/avatarIcon.vue";

export default defineComponent({
  name: "",
  props: ["close", "USER", "jIsAuthenticate"],
  components: { TextQuery, XMarkIcon, AvatarIcon },
  setup(props) {
    const close = ref(false);
    onBeforeUpdate(async () => {
      if (props.jIsAuthenticate) {
        FOLLOWCount(props.USER?.id);
      }
    });
    const { MenuLinks, profileConnexion, FunProfileConnexion } =
      useNavigationComposition();
    const {
      abonneCount,
      abonnementCount,
      FOLLOWCount,
      FOLLOW,
      ISFOLLOW,
      isFollowUser,
    } = useCerleComposition();

    return {
      envConfig,
      close,
      MenuLinks,
      profileConnexion,
      FunProfileConnexion,
      abonnementCount,
      abonneCount,
    };
  },
});
</script>

<style scoped></style>
