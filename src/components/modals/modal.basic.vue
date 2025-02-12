<template>
<ModalLayout title="Créez une publication">

      <div class="h-[90%]" v-if="data">
        <div class="py-4 flex flex-col gap-4">
          <div class="w-11/12 m-auto flex gap-2">
           
            <img class="w-16 h-16 bg-slate-100 rounded-full object-cover" v-lazy="
        !data?.profile.media_profile
              ? envConfig().DEFAULT_IMAGE_PROFILE : data?.profile.media_profile[0]?.url ? `${envConfig().HOST_SERVER_IMAGE}${
                data?.profile.media_profile[0].url
                }`
              : envConfig().DEFAULT_IMAGE_PROFILE
          " alt="" />

            <div class="flex flex-col gap-1">
              <TextQuery
          class-name="text-sm lg:text-base font-bold"
          :md="50"
          :lg="50"
          :sm="20"
          :xl="50"
          :title="data?.profile.full_name"
        />
        <!-- data.profile.full_name -->
              
              <div>
                <button
                  class="bg-gray-100 text-gray-700 px-2 py-2 rounded-full text-sm flex items-center justify-between gap-1  "
                >
                  <GlobeAltIcon class="h-4"></GlobeAltIcon>
                  <span class="text-xs relative ">Public</span>
                  <ChevronDownIcon class="h-4"></ChevronDownIcon>
                </button>
              </div>
            </div>
          </div>

          <div class="InToText w-full lg:h-[23.5em] h-[35em] overflow-auto ">
            <textarea
              class="w-full h-full py-2 px-6 text-lg outline-none resize-none overflow-hidden"
              name=""
              rows="0"
              v-model="inputPost.description"
              id="in-only-textarea"
              placeholder="On discute de quoi aujourd’hui ?"
            ></textarea>
            {{ auto_grow }}

         
            <LoadingSpinerBasic :loading="testLoandigFile" color="text-black realtive -top-16" />
         

            <!-- Add Image or Video -->

            <div v-show="!testLoandigFile">
            <div
              class="border-[1px] p-2 w-11/12 m-auto rounded-md mt-4 mb-8"
              v-if="addToPublish "
            >
              <!-- Input To select Files -->
              <input
                type="file"
                name="filesPost"
                :multiple="postFileData.multi"
                @change="uploadImage"
                :accept="postFileData.accept"
                id="id-files-post"
                class="absolute hidden"
              />

              <!-- Content to add files -->
              <div
                class="bg-gray-700 flex justify-center items-center w-full py-8  rounded-md"
                v-if="toImageConvert.length === 0"
              >
                <!-- Ref to input -->
                
                <label
                  for="id-files-post"
                  class="flex flex-col gap-1 justify-center items-center h-[200px] lg:h-[110px]"
                >
                  <AvatarIcon :path="postFileData.name" :className="postFileData.icon + ' h-10'"></AvatarIcon>
                  <div class="flex flex-col justify-center items-center">
                    <span class="text-white text-base">{{
                      postFileData.content
                    }}</span>
                    <span class="text-[0.60rem] font-light text-gray-50">
                      Clique dans la zone
                    </span>
                  </div>
                </label>
              </div>

              <!-- Close Modal -->
              <div class="absolute top-3 right-3 z-10">
                <div class="flex items-center gap-1">
                  <div
                    class="bg-gray-100/70 p-2 rounded-full cursor-pointer"
                    @click="closeIntoMore"
                  >
                    <XMarkIcon class="h-4" />
                  </div>

                  <label
                    v-if="toImageConvert.length !== 0"
                    for="id-files-post"
                    class="bg-gray-100/70 p-2 rounded-full cursor-pointer"
                  >
                    <span class="text-sm font-bold">Modifier</span>
                  </label>
                </div>
              </div>

              <!-- Display the upload images -->
              <div
                class="flex flex-col gap-2"
                v-if="
                  toImageConvert.length !== 0 && postFileData.name === 'Images'
                "
              >
                <div v-for="item in toImageConvert">
                  <img class="rounded-md" :src="item" alt="" />
                </div>
              </div>

              <!-- Display the upload video -->
              <div
                class="flex flex-col gap-2"
                v-if="
                  toImageConvert.length !== 0 && postFileData.name === 'Video'
                "
              >
                <div v-for="item in toImageConvert">
                  <video controls :src="item"></video>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

     
        <div
        class="py-4 flex flex-col border-t-[1px]  z-10 bg-white rounded-b-md"
      >
        <div class="w-11/12 m-auto flex justify-between items-center gap-2">
          <div
            class="flex justify-start items-center  py-2 w-8/12 rounded-md"
          >
            <FeedPosterOptions :post_loading="post_loading" />
          </div>
          <div class="">
            <button @click="postCreate" :disabled="post_loading == false && (inputPost.description.length === 0) ? true : false"
              class=" w-full py-2 rounded-full  text-thin font-bold px-4 h-full" :class="inputPost.description.length > 0  || toImageConvert.length !== 0 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'"
            >
              {{post_loading ? '' :  'Publier'}}
              <LoadingSpinerBasic :loading="post_loading" />
            </button>
          </div>
        </div>
    
      </div>
    </ModalLayout>
</template>

<script lang="ts">
import ModalLayout from "@/layouts/ModalLayout.vue";
import { useFeedStore } from "@/stores/feeds";
import { defineComponent, reactive, ref, computed } from "vue";
import { useModal } from "./modal.services";
import { envConfig } from "@/env.config";
import { useFeedComposition } from "@/composables/feed.composition"
import FeedPosterOptions from "@/views/pages/feeds/__partials/feed.poster.options.vue";
import TextQuery from "../texts/text.query.vue";
import LoadingSpinerBasic from "../cards/loading/lading.spiner.basic.vue";
import { ChevronDownIcon, GlobeAltIcon,  XMarkIcon } from "@heroicons/vue/24/solid";
import AvatarIcon from "../avatar/avatarIcon.vue";

export default defineComponent({
    name: "modal-basic",
    props: ['data'],
    components: { ModalLayout, FeedPosterOptions, TextQuery, LoadingSpinerBasic, XMarkIcon, GlobeAltIcon, ChevronDownIcon, AvatarIcon },
    setup() {
        const { toImageConvert, dataPosterInfo, modal, closeIntoMore, } = useModal();
        const openAddToPublish = (name: any) => {
          toImageConvert.value = [];
          useFeedStore().openAddToPublish(name)
        }
        const addToPublish = computed(() => {
          
            return useFeedStore().addToPublish;
        });
        const postFileData = computed(() => {
            return useFeedStore().postFileData;
        });
        const auto_grow  = computed(() => {
          const element:any = document.querySelector('#in-only-textarea')

            if (inputPost.description.length > 25) {
                element?.classList.remove("text-lg");
                element?.classList.add("text-base");
            }
            else {
                element?.classList.add("text-lg");
                element?.classList.remove("text-base");
            }
            if (inputPost.description.length > 25) {
              element?.classList.add("h-[5px]");
            element.style.height = element?.scrollHeight + "px";
            }
            
        }
)
        // Upload Image
        const testLoandigFile = ref(false)
        const uploadImage = (event: any) => {
          testLoandigFile.value = true
            const images = event.target.files;
            toImageConvert.value = [];
            for (let i = 0; i < images.length; i++) {
                const reader = new FileReader();
                const el = images[i];
                reader.readAsDataURL(el);
                reader.onload = (event) => {
                    toImageConvert.value.push(event.target?.result);
                    
                };

                reader.onprogress = (event) => {
        if (event.lengthComputable) {
          testLoandigFile.value = false
        }
      };
            }
            document.querySelector(".InToText")?.classList.add("h-[240px]");
        };

        // 
        const { postCreate, inputPost, post_loading } = useFeedComposition()
        return {
            dataPosterInfo,
            auto_grow,
            modal,
            closeIntoMore,
            addToPublish,
            openAddToPublish,
            postFileData,
            uploadImage,
            toImageConvert,
            envConfig,
            postCreate,
            inputPost,
            post_loading,
            testLoandigFile
        };
    },
});
</script>

<style scoped>
textarea {
  resize: none;
  overflow: hidden;
  min-height: 0px;
  max-height: 1500px;
  height: 100px;
}
</style>
