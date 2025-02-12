<template>
  
    <RouterLink
      v-if="link.path !== ''"
      :to="{ name: link.path }"
      class="flex flex-col justify-center items-center gap-y-[1px] lg:px-3  h-12 lg:h-14 group transition-all duration-300 ease-out hover:ease-in"
      :class="[
        link.active
          ? 'border-t-2 lg:border-t-0 border-b-0 lg:border-b-2 lg:border-white border-blue-700 opacity-100'
          : '',
        className,
        ,
      ]"
    >
    
      <div class="flex justify-center items-center">
        <div
          class="flex justify-center items-center absolute -top-1 left-3 w-4 h-4 z-40 rounded-full text-[10px] text-white bg-red-400"
          v-if="link.title == 'Notifications' && newNotify.actived || link.title == 'Messages' && newNotifyMessage.count > 0 "
        >
          {{ link.title == 'Notifications' && newNotify.actived ? newNotify.count : link.title == 'Messages' && newNotifyMessage.count > 0 ? newNotifyMessage.count : '' }} 
        </div>

        <AvatarIcon
        :path="link.path"
          :class-name="`${
            link.icon
          } w-6 h-6 group-hover:text-gray-600 transition-all duration-150 ease-out group-hover:ease-in opacity-70 lg:opacity-100  ${
            link.active ? ' lg:text-white text-blue-700 lg:opacity-100' : ' '
          }`"
        />
      </div>
      <span
        :class="link.active ? 'lg:border-white text-blue-700  font-bold' : ''"
        class="font-love text-[10px] md:text-xs font-semibold lg:text-white group-hover:text-gray-600 transition-all duration-300 ease-out group-hover:ease-in"
        v-if="isTitle === false"
      >
        {{ link.title }}
      </span>
    </RouterLink>

   
 
 
</template>

<script lang="ts">
import AvatarIcon from "@/components/avatar/avatarIcon.vue";
import AvatarImageSmall from "@/components/avatar/avatarImageSmall.vue";
import { useToastStore } from "@/stores/toast";
import ToastIndex from "@/toastifications/toast.index.vue";
import { createToast, withProps } from "mosha-vue-toastify";
import ToastBuild from "@/toastifications/toast.buildApp.vue";
import { NotifUtils } from "@/vendors/utils/notif.utils";

import {
  defineComponent,
  defineAsyncComponent,
  ref,
  computed,
  reactive,
  onMounted,
} from "vue";
import { useNotificateStore } from "@/stores/notificate.store";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { URL } from "@/router/url";
import { useNotificationComposition } from "@/composables/notification.composition";
import { io } from "socket.io-client";
import { BASE_URL_APP } from "@/router/url";
import { useUserComposition } from "@/composables/user.composition";

let self: any;

export default defineComponent({
  name: "navigation-link-compoment",
  props: {
    link: {
      type: Object,
      default: {},
    },
    isTitle: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    className: String,
  },
  created() {
    self = this;
  },
  setup(props, context) {
    const rouuter = useRouter();
    const route = useRoute();
    
    const inDev = () => {
      new NotifUtils().buildApp();
    };
    const { USER, GET_USER } = useUserComposition();

    const newNotify = computed(() => {
      return useNotificateStore().newNotify
    })

    const newNotifyMessage = computed(() => {
      return useNotificateStore().newNotifyMessage
    })
    onMounted(() => {
      
      GET_USER();
     
    
    });

   
   

    

    

    return { inDev, newNotify, newNotifyMessage };
  },
  components: {
    AvatarIcon,
    AvatarImageSmall,
    ToastIndex,
    ToastBuild,
  },
});
</script>

<style></style>
