<template>
   <div v-for="sjob in jobs">
                  <div class="bg-white p-4 gap-2 rounded-md">
                    <RouterLink
                      :to="'/jobs/' + sjob.slug"
                      class="flex flex-col gap-2"
                    >
                      <TextQuery
                        class-name="text-lg font-bold uppercase"
                        :sm="50"
                        :xl="100"
                        :title="sjob?.title"
                      />
                      <TextQueryHtml
                        class-name="font-love text-sm opacity-90 wrap whitespace-wrap whites"
                        :title="
                          sjob.description.trim().replace(/\s+/g, ' ').trim()
                        "
                        :sm="125"
                        :lg="250"
                      />
                      <span class="">
                        {{ sjob.city }}, {{ sjob.country }}
                      </span>

                      <div class="text-xs flex gap-1">
                        <span class="text-red-500 font-bold"
                          >Délai ({{ sjob.deadLine }})</span
                        >
                        <span>&#149;</span>
                        <span class="">Pulier {{ sjob.timePost }} </span>
                      </div>
                    </RouterLink>

                    <RouterLink v-if="sjob?.user?.profile"
                      :to="'/' + sjob?.user?.profile?.slug"
                      class="hover:underline flex gap-1 pt-2 items-center"
                    >
                      <img
                        v-lazy="
                          sjob?.user.profile.media_profile[0]?.url
                            ? sjob.user.profile.media_profile[0].original_url
                            : envConfig().DEFAULT_IMAGE_PROFILE
                        "
                        class="w-[24px] h-[24px] rounded-full bg-gray-100 object-cover"
                        alt=""
                      />
                      <span class="text-xs font-bold opacity-80">
                        {{ sjob.user.profile.full_name }}
                      </span>
                    </RouterLink>
                  </div>
                </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, reactive } from "vue";
  import { useJobComposition } from "@/views/pages/jobs/job.compositoin";
  import CardMedia from "./medias/card.media.vue";
  import TextQuery from "../texts/text.query.vue";
  import TextQueryHtml from "../texts/text.query.html.vue";
  import LadingSpinerBasic from "./loading/lading.spiner.basic.vue";
  
  export default defineComponent({
    name: "",
    props: ['jobs', 'envConfig' ],
    setup() {
    
  
      return {
     
      };
    },
    components: { CardMedia, TextQuery, LadingSpinerBasic, TextQueryHtml },
  });
  </script>
  
  <style scoped></style>
  