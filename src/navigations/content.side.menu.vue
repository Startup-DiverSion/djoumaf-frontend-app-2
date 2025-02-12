<template>

  <!-- Side Menu for big screen -->
  <div class="hidden flex-col gap-6 py-8 w-full lg:h-[75vh] lg:flex" >
    <!-- <div v-for="item in 8">
              <span class="toHideSide"> {{ item }} </span> -->

    <div v-for="item in MenuLinks">
      <RouterLink
        :to="item.link == 'ProfileCv' ? '/' + USER?.profile?.slug + '/?content_page=cv' : { name: item.link }"
        class="flex w-full group"
      >
        <div
          class="flex gap-2 w-full items-end text-white group-hover:text-gray-400"
          v-if="openMenu"
        >
        <AvatarIcon :path="item.link"
          :class-name="'w-6 h-6 opacity-90'" />
          <span class="text-base top-[3px]"> {{ item.name }}</span>
        </div>

        <div class="flex gap-2 w-full items-center text-white" v-if="!openMenu">
          <div class="flex w-full justify-center items-center group-hover:text-gray-400">
            <AvatarIcon :path="item.link"
          :class-name="'w-6 h-6 opacity-90'" />
          </div>
        </div>
      </RouterLink>
    </div>

    <!--  -->
    <div class="border-t-[1px] py-8 flex w-full lg:hidden flex-col gap-6">
      <div class="flex gap-2 items-center">
        <img
          src="/images/profile.jpg"
          class="bg-white w-8 h-8 rounded-full"
          alt=""
        />
        <span class="text-white text-lg"> {{ USER?.profile?.full_name.length >= 15? USER?.profile?.full_name?.substring(0, 15) + '...' : USER?.profile?.full_name }} </span>
      </div>

      <div v-for="item in profileConnexion">
        <div @click="FunProfileConnexion(item.mode, item.id)">
          <span class="text-white text-base cursor-pointer"> {{ item.name }} </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Side Menu for small screen -->
  <div class="flex flex-col divide-y-[1px] lg:hidden">

    <a :href="'/'+ USER?.profile?.slug" class="flex flex-col gap-3 pt-4 pb-8">
      <div class="w-14 h-14 bg-gray-100 rounded-full">
        <img v-lazy="envConfig().DEFAULT_IMAGE_PROFILE" class="rounded-full" alt="">
      </div>

      <div class="flex flex-col text-white" v-if="USER?.profile">
        <TextQuery :class-name="'text-xl font-bold'" :title="USER?.profile?.full_name " :sm="30" :md="30" :lg="0" :xl="0"/>
        <TextQuery :class-name="'text-base font-extralight'" :title="USER?.profile?.bio " :sm="30" :md="30" :lg="0" :xl="0"/>
      </div>

      <div class="flex gap-4 text-white">
        <span> 0 Suivis</span>
        <span> 0 Djoumé </span>
      </div>
    </a>


    <div class="flex flex-col gap-4 py-8">
      <div v-for="item in MenuLinks">
      <div
        class="flex w-full group"
      >
        <div
          class="flex gap-2 w-full items-end text-white group-hover:text-gray-400"
        >
        <AvatarIcon :path="item.link"
          :class-name="'w-6 h-6 opacity-50'" />
          <span class="text-2xl top-[4px] pl-4"> {{ item.name }}</span>
        </div>

       
      </div>
    </div>
    </div>


    <div class="flex flex-col gap-4 py-8">
    <div v-for="item in profileConnexion">
      <div
        class="flex w-full group cursor-pointer" @click="FunProfileConnexion(item.mode, item.id)"
      >
        <div
          class="flex gap-2 w-full items-end text-white group-hover:text-gray-400"
          v-if="openMenu === true"
        >
    
          <span class=" top-[4px] text-2xl pl-4"> {{ item.name }}</span> 
        </div>

   
      </div>
    </div>
  </div>

  </div>

  <!--  -->
  <div class="flex-col gap-4 justify-end h-[12vh] hidden lg:flex">
    <div v-for="item in MenuLinksFooter">
      <RouterLink
        :to="item.link === '/' ? '/' + USER?.profile?.slug : item.link "
        class="flex w-full group cursor-pointer"
      >
        <div
          class="flex gap-2 w-full items-end text-white group-hover:text-gray-400"
          v-if="openMenu === true"
        >
        <AvatarIcon :path="item.link"
          :class-name="'w-6 h-6 opacity-90'" />

          <span class="toHideSide top-[3px]"> {{ item.name }}</span> 
        </div>

        <div
          class="flex gap-2 w-full items-center text-white"
          v-if="openMenu === false"
        >
          <div class="flex w-full justify-center items-center">
            
            <AvatarIcon :path="item.link"
          :class-name="'w-6 h-6 opacity-90 group-hover:text-gray-400'" />
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { defineComponent, ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { UserService } from "@/services/user.services";
import { useUserComposition } from "@/composables/user.composition";
import TextQuery from "@/components/texts/text.query.vue";
import { envConfig } from "@/env.config";
import { useNavigationComposition } from "@/composables/navigation.composition";
import AvatarIcon from "@/components/avatar/avatarIcon.vue";

export default defineComponent({
    name: "content-side-menu",
    props: {
        openMenu: {
            type: Boolean,
            default: true,
        },
    },
    setup() {
        const { GET_USER, USER } = useUserComposition();
        onMounted(async () => {
            await GET_USER();
        });
       
  const {MenuLinks, profileConnexion, MenuLinksFooter, FunProfileConnexion, load} = useNavigationComposition()

       
        return {
            MenuLinks,
            MenuLinksFooter,
            profileConnexion,
            FunProfileConnexion,
            USER,
            load,
            envConfig
        };
    },
    components: { TextQuery, AvatarIcon }
});
</script>

<style></style>
