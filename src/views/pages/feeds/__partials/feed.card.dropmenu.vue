<template>


<LayoutDropdown :refs="post?.id" >
  <div class="py-2 flex items-center gap-2 px-3 hover:bg-gray-100">
        <UserPlusIcon
          class="h-5"
          v-if="isUser"
        ></UserPlusIcon>

        <UserMinusIcon
          class="h-5"
          v-if="isFollow"
        ></UserMinusIcon>

        <span class="">
          {{ isFollow ? "Se desabonner" : isUser ? "Vous" : "Suivre" }}
        </span>
      </div>

      <div class=" " v-if="isUser">
        <div
          @click="toUserPosts_Fun(toUserPost.id, post?.id)"
          class="py-2 flex items-center gap-2 hover:bg-gray-100 px-3"
          v-for="toUserPost in toUserPosts"
        >
          <!-- <i :class="toUserPost.icon"></i> -->
          <span class="font-sembold">{{ toUserPost.name }}</span>
        </div>
      </div>

</LayoutDropdown>

</template>

<script lang="ts">
const BtnDjoumer = defineAsyncComponent(
  () => import("@/components/buttons/btn.djoumer.vue")
);
const BtnFollow = defineAsyncComponent(
  () => import("@/components/buttons/btn.follow.vue")
);
const CardMedia = defineAsyncComponent(
  () => import("@/components/cards/medias/card.media.vue")
);
const ChooseYourPreference = defineAsyncComponent(
  () => import("@/components/toPages/Auth/chooseYourPreference.vue")
);
const LegalAuthCompoment = defineAsyncComponent(
  () => import("@/components/toPages/Auth/legalAuthCompoment.vue")
);
const NavigationFooter = defineAsyncComponent(
  () => import("@/navigations/navigationFooter.vue")
);
import NavigationHeader from "@/navigations/navigationHeader.vue";
import { defineComponent, defineAsyncComponent, reactive, ref } from "vue";
import InDeveloppmentApp from "@/components/inDeveloppment/in.developpment.app.vue";
import { useFeedComposition } from "@/composables/feed.composition";
import { useFeedStore } from "@/stores/feeds";
import { UserIcon, UserPlusIcon, UserMinusIcon, EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import LayoutDropdown from "@/components/dropdowns/layout.dropdown.vue";

export default defineComponent({
  name: "",
  props: ["isFollow", "isUser", "post"],
  components: {
    NavigationHeader,
    NavigationFooter,
    ChooseYourPreference,
    CardMedia,
    BtnFollow,
    BtnDjoumer,
    LegalAuthCompoment,
    InDeveloppmentApp,
    UserIcon,
    UserPlusIcon,
    UserMinusIcon,
    EllipsisHorizontalIcon,
    XMarkIcon,
    LayoutDropdown
},
  setup(props) {
    const openMenuFeed = ref(false);
    const { postDelete, loading_delete } = useFeedComposition();
    const toUserPosts = reactive([
      {
        name: "Suprimer",
        icon: "fi fi-rr-trash flex",
        id: 0,
      },
      {
        name: "Modifer",
        icon: "fi fi-rr-pencil flex",
        id: 1,
      },
    ]);

    const toUserPosts_Fun = (currentID: any, dataID: any) => {
      if (currentID == 0) {
        postDelete(dataID).then(() => {
          useFeedStore().posts.forEach((post: any, index: any) => {
            if (post.id == dataID) {
              useFeedStore().posts.splice(index, 1);
              openMenuFeed.value = false
            }
          });
        });
      }
    };

    return {
      toUserPosts,
      openMenuFeed,
      toUserPosts_Fun,
    };
  },
});
</script>

<style scoped></style>
