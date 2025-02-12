import { reactive, ref, onMounted, computed, watch, onUnmounted } from "vue";
import { AuthService } from "@/services/auth.services";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import axios from "axios";
import { Device } from "@capacitor/device";
import { UserService } from "./../services/user.services";
import { defineAsyncComponent } from "vue";
import { useProfileStore } from "@/stores/profile.store";
import { io } from "socket.io-client";
import { URL, BASE_URL_APP } from "@/router/url";
import { useUserComposition } from "@/composables/user.composition";
import SideLayout from "@/layouts/SideLayout.vue";
import NavigationHeader from "@/navigations/navigationHeader.vue";
import { envConfig } from "@/env.config";
import TextQuery from "@/components/texts/text.query.vue";
import moment from "moment";
import NavigationFooter from "@/navigations/navigationFooter.vue";
import { useChatStore } from "@/stores/chat.store";
import { useNotificateStore } from "@/stores/notificate.store";
import { useNotificationComposition } from "./notification.composition";

export const useChatComposition = () => {
  const messages = ref();
  const current_user_chat = ref();
  const current_chat_id = ref();
  const newMessage = ref("");
  const areaMessageHt = ref(0);
  const socket = io(BASE_URL_APP);
  const currentDateTime = ref();
  const { GET_USER, USER } = useUserComposition();
  onMounted(() => {
    //
    loadMessages();
    GET_USER();
  });

  socket.on("message", (message, chatID, chatMessage) => {
    let send = 0;
    allChats.value.forEach((group: any, index: any) => {
      if (group.id == chatID) {
        message.created_at_y = moment(message.created_at).fromNow();
        message.time = momentDate(moment(message.created_at));
        group.last_message[0] = message;
        send = send + 1;
      }
    });

    if (chatID == current_chat_id.value) {
      messages.value.push(message);
      SrcollAreaMessage();
    }
  });

  socket.on("group", (chat) => {
    if (chat?.last_message !== 0 && chat?.last_message[0]) {
      allChats.value.unshift(chat);
    }
  });

  socket.on("chat_view", (chatID, senderUserID) => {
    allChats.value.forEach((group: any, index: any) => {
      if (group.id == chatID && senderUserID == USER.value.id) {
        allChats.value[index].no_view = 0;
      }
    });
  });

  socket.on("chat_view_message", (chatID, senderUserID) => {
    if (chatID != current_chat_id.value) {
      allChats.value.forEach((group: any, index: any) => {
        if (group.id == chatID) {
          if (
            senderUserID == USER.value.id &&
            current_chat_id.value == chatID
          ) {
            allChats.value[index].no_view = 0;
          } else if (
            senderUserID != USER.value.id &&
            current_chat_id.value != chatID
          ) {
            allChats.value[index].no_view = group.no_view + 1;
          } else {
            allChats.value[index].no_view = 0;
          }
        }
      });
    }
  });

  // All Message
  interface State {
    last_message: any; // change this to people's type
  }
  const allChats: any = ref([]);
  const loading_chat = ref(false);
  const isChatButHidden = ref(false);

  const setTimeChat = onMounted(() => {
    setInterval(() => {
      allChats.value.forEach((group: any) => {
        if (group.last_message !== 0 && group.last_message[0]) {
          group.last_message[0].created_at_y = moment(
            group.last_message[0].created_at
          ).fromNow();
        }
      });
    }, 1000);
  });

  const CheckedRecentMessage = computed(() => {
    if (allChats.value.length !== 0) {
      allChats.value.forEach((group: any) => {
        if (group.last_message !== 0 && group.last_message[0]) {
          let chatDate = moment(group.last_message[0].created_at);
          const nowDate = momentDate(chatDate);
          group.last_message[0].time = nowDate;
          group.last_message[0].created_at_y = chatDate.fromNow();
        } else {
          group.last_message[0] = {
            time: momentDate(moment(group.created_at)),
            created_at_y: moment().fromNow(),
            message: "Nouvelle conversation...",
            created_at: group.created_at,
          };
        }
      });

      allChats.value.sort((a: any, b: any) => {
        return b.last_message[0].time - a.last_message[0].time;
      });
    }
  });

  const loadMessages = async () => {
    loading_chat.value = true;
    const { data } = await axios.get(URL.CHAT_MESSAGE_INDEX);
    if (data) {
      allChats.value = data.getGroup;
      useNotificateStore().newNotifyMessage.count = 0;
      allChats.value.forEach((group: any) => {
        useNotificateStore().newNotifyMessage.count =
          useNotificateStore().newNotifyMessage.count + group.no_view;
      });
      loading_chat.value = false;
    }
  };

  const { SendNotification } = useNotificationComposition();
  const sendMessage = async () => {
    if (!newMessage.value) return;
    const { data } = await axios.post(URL.CHAT_MESSAGE_CREATE, {
      message: newMessage.value,
      to: current_user_chat.value?.id,
    });

    if (data) {
      newMessage.value = "";

      const notificationDATA = {
        type: 234,
        recevie_id:
          data.chatMessage?.userEmit.id == USER.value.id
            ? data.chatMessage?.userOn.id
            : data.chatMessage?.userEmit.id,
        content: `${data.chatMessage?.message.slice(-1)[0].message}`,
        redirect: "/messages/",
        provide_id: data.chatMessage?.id,
      };
      SendNotification(notificationDATA);
    }
  };

  const momentDate = (now: any) => {
    return Number(now.toDate().getTime());
  };

  // All Message Specific
  const loadMessageSpecific = async (chatID: any, no_view?:any) => {
    const { data } = await axios.post(URL.CHAT_MESSAGE_SHOW, { chatID });
    if (data) {
      current_chat_id.value = data?.getGroupSingle.id;
      messages.value = data?.getGroupSingle.message;
      current_user_chat.value = data?.getGroupSingle.display;
      console.log(no_view)
      useNotificateStore().newNotifyMessage.count = useNotificateStore().newNotifyMessage.count - no_view
      SrcollAreaMessage();
    }
  };

  const utilStore = new LocalSotreUtils();
  const loadMessageFromNotification = computed(async () => {
    if (await utilStore.get("seeNotificateMessage")) {
      loadMessageSpecific(await utilStore.get("seeNotificateMessage"));
      utilStore.remove("seeNotificateMessage");
    }
  });

  const newChatSarted = computed(() => {
    if (useChatStore().newChatID_Detect) {
      loadMessageSpecific(useChatStore().newChatID_Detect);
      useChatStore().newChatID_Detect = null;
    }
  });

  const auto_grow = computed(() => {
    const element: any = document.querySelector("#in-only-textarea-chat");

    if (newMessage.value.length < 50 && element?.scrollHeight < 50) {
      element?.classList.add("h-[50px]");
      element.style.height = element?.scrollHeight + "px";
      element?.classList.add(`overflow-hidden`);
    }

    if (newMessage.value.length > 50 && element?.scrollHeight < 50) {
      element?.classList.add("h-[15px]");
      element.style.height = element?.scrollHeight + "px";
    }

    if (newMessage.value.length > 50 && element?.scrollHeight > 50) {
      element?.classList.add(`h-[${element?.scrollHeight}]`);
      element?.classList.remove(`overflow-hidden`);
    }
  });

  const SrcollAreaMessage = () => {
    setTimeout(() => {
      // Zone Message  to Scroll bottom
      const areaMessage: any = document.getElementById("areaMessage");

      if (areaMessage) {
        areaMessage.scrollTop = areaMessage?.scrollHeight;

        // Display in hide to mobile
        const chatMessage = document.querySelector(".chatMessage");
        const chatList = document.querySelector(".chatList");

        chatList?.classList.add("hidden");
        chatList?.classList.remove("flex");

        chatMessage?.classList.remove("hidden");
        chatList?.classList.add("flex");
      }
    }, 1);
  };

  // Close Message
  const closeMessage = () => {
    const chatMessage = document.querySelector(".chatMessage");
    const chatList = document.querySelector(".chatList");

    chatList?.classList.remove("hidden");
    chatList?.classList.add("flex");

    chatMessage?.classList.remove("flex");
    chatMessage?.classList.add("hidden");
  };

  return {
    messages,
    newMessage,
    sendMessage,
    loadMessages,
    allChats,
    isChatButHidden,
    USER,
    envConfig,
    loadMessageSpecific,
    current_user_chat,
    auto_grow,
    areaMessageHt,
    closeMessage,
    newChatSarted,
    CheckedRecentMessage,
    currentDateTime,
    current_chat_id,
    loadMessageFromNotification,
    loading_chat,
    setTimeChat,
  };
};
