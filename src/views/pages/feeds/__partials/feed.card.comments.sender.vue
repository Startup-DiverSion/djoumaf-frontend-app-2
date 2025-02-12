<template>
  <div class="flex gap-1 justify-between items-start w-full m-auto mt-4">

    <AvatarProfile :imageUrl="USER?.profile.media_profile[0]?.url
          ? `${envConfig().HOST_SERVER_IMAGE}${
              USER?.profile.media_profile[0].url
            }`
          : envConfig().DEFAULT_IMAGE_PROFILE" size="small" />
    

    <div class="flex flex-col w-11/12 justify-start gap-2">
      <textarea
        class="w-full py-2 px-4 h-[40px] font-medium text-thin outline-none resize-none overflow-hidden border-[1px] rounded-lg"
        name=""
        rows="0"
        v-model="my_comment"
        id="in-only-textarea-sender"
        placeholder="Ecrivez un commentaire"
      ></textarea>
      {{ auto_grow }}

      <div class="flex">
        <button
          :disabled="loading_comment || my_comment.length > 0 ? false : true"
          @click="sendComment(post?.id, $emit)"
          :class="
            my_comment.length === 0 ? 'bg-gray-100' : 'bg-blue-500 text-white'
          "
          class="rounded-full px-2 py-1 text-xs font-bold"
        >
          {{ loading_comment ? "En cours..." : "Publier" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { envConfig } from "@/env.config";
import axios from "axios";
import { URL } from "@/router/url";
import { usePostCommentComposition } from "@/composables/postComments.composition";
import AvatarProfile from "@/components/avatar/avatarProfile.vue";

export default defineComponent({
    name: "feed-card-comments-sender",
    props: ["post", "USER"],
    setup(props) {
        const { sendComment, loading_comment, my_comment } = usePostCommentComposition();
        const auto_grow = computed(() => {
            const element: any = document.querySelector("#in-only-textarea-sender");
            // if (my_comment.value.length > 25) {
            //     element?.classList.remove("text-lg");
            //     element?.classList.add("text-base");
            // }
            // else {
            //     element?.classList.add("text-lg");
            //     element?.classList.remove("text-base");
            // }
            if (my_comment.value.length < 100 && element?.scrollHeight < 100) {
                element?.classList.add("h-[40px]");
                element.style.height = element?.scrollHeight + "px";
                element?.classList.add(`overflow-hidden`);
            }
            if (my_comment.value.length > 100 && element?.scrollHeight < 100) {
                element?.classList.add("h-[5px]");
                element.style.height = element?.scrollHeight + "px";
            }
            if (my_comment.value.length > 100 && element?.scrollHeight > 100) {
                element?.classList.add(`h-[${element?.scrollHeight}]`);
                element?.classList.remove(`overflow-hidden`);
            }
        });
        return {
            envConfig,
            my_comment,
            sendComment,
            loading_comment,
            auto_grow,
        };
    },
    components: { AvatarProfile }
});
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: transform 0.3s ease-out;
}
.list-enter {
  transform: scale(0);
}
.list-leave-to {
  transform: scale(1);
}
</style>
