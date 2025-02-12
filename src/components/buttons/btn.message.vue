<template>
  <button
    class="bg-orange-500 px-4 py-2 rounded-full text-xs text-white flex gap-1 items-center"
    @click="chatByUser"
  >
    <ChatBubbleBottomCenterTextIcon class="w-4"></ChatBubbleBottomCenterTextIcon>
    <span class="text-xs font-bold hidden lg:flex">Discutons</span>
  </button>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  defineAsyncComponent,
} from "vue";
import { useCerleComposition } from "@/composables/cerle.composition";
import { useUserComposition } from "@/composables/user.composition";
import { URL } from "@/router/url";
import axios from "axios";
import { useChatStore } from "@/stores/chat.store";
import { useRouter } from "vue-router";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
    name: "btn-Message",
    props: ["UserWitChat"],
    setup(props) {
        const router = useRouter();
        const chatByUser = async () => {
            
            const { data } = await axios.post(URL.CHAT_GROUP_CREATE, {
                to: props.UserWitChat,
            });
            if (data) {
                useChatStore().newChatID_Detect = data.chat_id;
                router.push({ name: "Messages" });
            }
        };
        return {
            chatByUser,
        };
    },
    components: { ChatBubbleBottomCenterTextIcon }
});
</script>

<style>
@import url("https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css");
</style>
