<template>
  <SideLayout>
    <template #content>
      <NavigationHeader />
      <main
        class="flex lg:w-11/12 w-full m-auto lg:mt-24 h-[100vh] lg:h-[80vh] overflow-hidden relative top-0 lg:top-0"
      >
        <div
          class="relative lg:w-full w-full lg:z-20 z-40 lg:h-[80vh] h-full bg-white lg:rounded-md"
        >
          <div class="flex gap-0 w-full h-full">
            <section
              class="lg:flex flex-col lg:w-4/12 w-full pt-4 chatList h-full"
            >
              <!--
                -
                Messageries -->
              <div
                class="flex justify-between m-auto w-11/12 items-center gap-4"
              >
                <div class="">
                  <ArrowLeftIcon class="fi fi-rr-arrow-small-left flex text-4xl hidden" />
                  <span class="text-xl font-bold">Messagerie</span>
                </div>

                <button class="p-2 bg-gray-50 rounded-full">
                  <PencilIcon class="text-gray-700 h-4"></PencilIcon>
                </button>
              </div>

              <!--
                -
                Zone de recherche -->
              <div class="flex items-center gap-2 w-full px-4 pt-2 pb-4">
                <div
                  class="flex items-center bg-gray-50 px-3 py-2 w-full rounded-md gap-2"
                >
                  <MagnifyingGlassIcon class="h-5"></MagnifyingGlassIcon>
                  <input
                    type="search"
                    class="bg-transparent w-full"
                    placeholder="Search..."
                  />
                </div>
              </div>

              <!--
                -
                Chat -->
              <div class="flex flex-col overflow-y-auto h-[80%]">
                <div v-for="chat in allChats" v-if="allChats.length !== 0">
                  <div
                    @click="loadMessageSpecific(chat.id, chat?.no_view)"
                    class="flex items-center w-full px-4 gap-x-2 cursor-pointer hover:bg-blue-50"
                    :class="current_chat_id == chat.id ? 'bg-blue-100/80' : ''"
                  >

                  <AvatarProfile :imageUrl="chat?.display?.profile?.media_profile[0]?.url
                          ? chat?.display?.profile?.media_profile[0]
                              .original_url
                          : envConfig().DEFAULT_IMAGE_PROFILE" size="small" />
                   

                    <div class="flex justify-between w-10/12 py-3">
                      <div class="flex flex-col w-full">
                        <div class="flex justify-between items-center">
                          
                            <TextQuery
                            class-name="lg:text-ms text-thin"
                            :class="
                              chat?.no_view > 0
                                ? 'font-semibold'
                                : 'font-medium'
                            "
                            :title="chat?.display?.profile?.full_name"
                            :xl="20"
                          />
                         

                          <span
                            class="text-[10px]"
                            :class="
                              chat?.no_view > 0
                                ? 'font-semibold'
                                : 'font-medium'
                            "
                            v-if="chat?.last_message.length !== 0"
                          >
                            {{ chat?.last_message[0].created_at_y }}
                          </span>
                        </div>

                        <div class="flex justify-between w-full">
                          <TextQuery
                            class-name="text-xs font-[200] relative -top-[1px] "
                            :title="chat?.last_message[0]?.message"
                            :sm="40"
                            :xl="40"
                          />
                          <div
                            v-if="chat?.no_view != 0"
                            class="bg-red-500 w-5 h-5 flex items-center text-xs font-light text-white text-center justify-center rounded-full"
                          >
                            <span class="">{{ chat?.no_view }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Loader -->

                <LadingSpinerBasic
                  :loading="loading_chat"
                  color="text-blue-500"
                />

                <div
                  class="flex flex-col justify-center items-center h-[80%] gap-2"
                  v-if="!loading_chat && allChats.length === 0"
                >
                  <img src="/images/loading/empty.svg" class="w-full h-32" alt="" />
                  <span class=""> Aucune conversation démarrer </span>
                </div>
              </div>

              <NavigationFooter class="z-[1000000000]" />
            </section>

            <!-- New Zone
              -
              -
              -
              -
              -
              Zone de recherche -->

            <section
              class="lg:flex hidden flex-col h-full lg:w-9/12 w-full chatMessage"
            >
              <!-- Header Chat -->
              <div
                class="bg-white px-4 lg:px-8 py-4 flex gap-2 items-center cursor-pointer fixed top-0 w-full z-40 lg:relative"
                v-if="current_user_chat"
              >
                <ArrowLeftIcon
                  @click="closeMessage"
                  class="p-1 lg:hidden h-8"
                ></ArrowLeftIcon>

                <AvatarProfile :imageUrl="current_user_chat?.profile.media_profile[0]?.url
                      ? current_user_chat?.profile.media_profile[0].original_url
                      : envConfig().DEFAULT_IMAGE_PROFILE" size="medium" />

               

                <div class="flex flex-col">
                  <a :href="'/'+current_user_chat?.profile?.slug" class=" underline-offset-2 hover:underline">
                  <TextQuery
                    class-name="font-bold text-base"
                    :title="current_user_chat?.profile.full_name"
                    :xl="50"
                  />
                </a>
                  <TextQuery
                    class-name="relative top-[-3px] text-xs"
                    :title="current_user_chat?.profile.bio"
                    :sm="40"
                    :xl="50"
                  />
                </div>
              </div>

              <!-- 
                -
                -
                -
                -
                -
                -
                -
                -
                -Display All messages -->
              <div
                class="flex flex-col w-full lg:h-[85%] h-[100vh] "
                v-if="current_user_chat"
              >
                <img
                  class="-z-20 absolute opacity-90 h-full w-full object-cover inset-0 "
                  src="/images/placeholder/inside_chat_message.png"
                  alt=""
                />
                <div
                  class="lg:p-8 px-4 py-12 h-full lg:h-[90%] overflow-auto flex flex-col gap-4 z-20 pt-24 lg:pt-4"
                  id="areaMessage"
                >
                  <div v-for="(message, index) in messages" v-if="messages">
                    <div
                      class="flex gap-2 w-full"
                      :class="
                        USER?.id == message.user.id
                          ? 'flex justify-end'
                          : 'flex justify-start'
                      "
                    >
                      <img
                        v-lazy="
                          message?.user.profile.media_profile[0]?.url
                            ? message?.user.profile.media_profile[0]
                                .original_url
                            : envConfig().DEFAULT_IMAGE_PROFILE
                        "
                        class="flex lg:h-[42px] lg:w-[42px] h-[32px] w-[32px] object-cover rounded-full"
                        :class="
                          USER?.id == message.user.id
                            ? 'order-last'
                            : 'order-first'
                        "
                        alt=""
                      />

                      <div
                        class="flex flex-col w-10/12"
                        :class="
                          USER?.id == message.user.id
                            ? 'flex items-end'
                            : ' flex items-start'
                        "
                      >
                        <TextQuery
                          :class-name="
                            USER?.id == message.user.id
                              ? 'text-xs font-bold opacity-90 '
                              : 'text-xs font-bold opacity-90'
                          "
                          :title="message.user.profile.full_name"
                          :xl="50"
                        />

                        <TextQuery
                          :class-name="[
                            'mt-1',
                            USER?.id == message.user.id
                              ? 'bg-blue-500 rounded-l-lg text-white  '
                              : 'bg-white rounded-r-lg   ',
                            ' rounded-br-lg text-sm border-[0px]  min-w-[20%] max-w-[90%] p-3 break-words ',
                          ]"
                          :title="message.message"
                          :xl="300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="lg:absolute fixed -bottom-2 w-full z-20">
                  <div
                    class="flex w-full justify-between px-4 h-auto lg:py-4 py-3  bg-white gap-4"
                  >
                    <!-- Input -->
                    <div class="flex items-center justify-center w-full gap-4">
                      <FaceSmileIcon class="h-6 relative"></FaceSmileIcon>
                      <!--  @keyup.enter="sendMessage" -->
                      <textarea
                        v-model="newMessage"
                        cols="1"
                        id="in-only-textarea-chat"
                        class="flex w-full p-2 border-[1px] h-[40px] rounded-lg z-20 bg-transparent outline-none resize-none overflow-hidden"
                        placeholder="Enter your message here"
                      />
                      {{ auto_grow }}
                    </div>

                    <!-- Button Actions -->
                    <div class="flex items-center gap-4">
                      <div class="border-r-[1px] flex items-center gap-4 pr-4">
                        
                      </div>
                      <button @click="sendMessage">
                        <PaperAirplaneIcon
                          class=" text-blue-700 h-8"
                        ></PaperAirplaneIcon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-full h-full" v-if="!current_user_chat">
                <div
                  class="absolute inset-0 bg-gray-100/50 w-full h-full z-20"
                ></div>
                <div
                  class="object-cover w-full h-full rounded-r-xl"
                  style="
                    background-image: url('/images/placeholder/chat_placeholder.jpg');
                  "
                ></div>
              </div>
            </section>
          </div>
        </div>

        <!-- <div class="hidden lg:flex"></div> -->
      </main>
    </template>
  </SideLayout>
  {{ newChatSarted }}
  {{ CheckedRecentMessage }}
  {{ loadMessageFromNotification }}
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
import axios from "axios";
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
import { useChatComposition } from "@/composables/chat.composition";
import { useMeta } from "vue-meta";
import LadingSpinerBasic from "@/components/cards/loading/lading.spiner.basic.vue";
import { PencilIcon, ArrowLeftIcon, MagnifyingGlassIcon, XMarkIcon, FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/vue/24/solid";
import AvatarProfile from "@/components/avatar/avatarProfile.vue";

interface Message {
  id: number;
  text: string;
  message: string;
}

export default defineComponent({
  components: {
    SideLayout,
    NavigationHeader,
    TextQuery,
    NavigationFooter,
    LadingSpinerBasic,
    ArrowLeftIcon,
    PencilIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    FaceSmileIcon,
    PaperAirplaneIcon,
    AvatarProfile
},
  setup() {
    useMeta({ title: "Messages", StyleSheetList });
    const {
      messages,
      newMessage,
      sendMessage,
      allChats,
      USER,
      envConfig,
      loadMessageSpecific,
      current_user_chat,
      current_chat_id,
      auto_grow,
      areaMessageHt,
      closeMessage,
      newChatSarted,
      CheckedRecentMessage,
      loadMessageFromNotification,
      currentDateTime,
      loading_chat,
      isChatButHidden,
      setTimeChat
    } = useChatComposition();

    onMounted(() => {
    });

    return {
      messages,
      newMessage,
      sendMessage,
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
      setTimeChat
    };
  },
});
</script>
<style>
.bgOrver {
  background-image: url("/images/placeholder/chat_placeholder.jpg");
  background-repeat: repeat;
}
</style>
