<template>
  <div class="">
    <!-- Prfile -->
    <div
      class="flex flex-col gap-4 bg-white0 py-4 lg:rounded-md0 cursor-pointer h-full text-gray-700"
      :class="[
        index % indexStart === 0 ? '' : 'lg:border-l-[1px]',
        jobCount - index >= jobResult
          ? 'border-b-[1px]'
          : jobCount - jobCount - 1 == 1
          ? 'border-b-[0px]'
          : 'lg:border-b-[0px] border-b-[1px]',
        sizeCard,
      ]"
    >
      <div class="flex flex-col border-b-[1px] mx-4 pb-2 gap-2">
        <div class="flex items-start gap-2 w-full">
          <AvatarProfile
            :imageUrl="
              data?.profile?.media_profile?.url
                ? data?.profile?.media_profile.original_url
                : envConfig().DEFAULT_IMAGE_PROFILE
            "
            size="small"
          />

          <div class="flex flex-col w-10/12" @click.prevent.stop>
            <RouterLink
              :to="'/' + data.profile.slug"
              class="flex items-center gap-1"
            >
              <TextQuery
                class-name="font-love text-thin font-bold hover:underline"
                :title="data.profile.full_name"
                :sm="25"
                :md="45"
                :lg="18"
                :xl="18"
              />
            </RouterLink>
            <div class="flex gap-1 w-full h-auto justify-between">
              <TextQuery
                class-name="flex font-love text-xs font-semibold first-letter:uppercase "
                :title="data.profile.bio.trim()"
                :sm="40"
                :md="40"
                :lg="35"
                :xl="30"
              />
            </div>
            <!-- &#149; -->

            <div class="flex justify-end"></div>
          </div>
        </div>

        <div class="flex flex-wrap gap-1">
          <BadgeRounded
            :bgColor="
              data.contract_type.title === 'Stage'
                ? 'bg-green-600'
                : data.contract_type.title === 'Emploi'
                ? 'bg-red-500'
                : 'bg-green-500'
            "
            text-color="text-white"
            :label="data.contract_type.title"
          />

          <BadgeRounded
            bg-color="bg-blue-500/50"
            text-color="text-white"
            :label="data?.field_activity?.title"
          />
        </div>
      </div>

      <RouterLink
        :to="{
          name: 'JobDetail',
          params: { slug: data.slug ? data.slug : null },
        }"
        class="flex flex-col gap-3 md:gap-2 px-4 h-[180px] lg:h-[180px]"
      >
        <TextQuery
          class-name="font-love uppercase font-bold text-base text-blue-500  md:h-[50px]  leading-[1.3em]"
          :title="data.title.replace(/\s+/g, ' ').trim()"
          :sm="45"
          :md="60"
          :lg="38"
          :xl="38"
        />

        <TextQueryHtml
          class-name="font-love text-sm opacity-90  h-[100%] md:h-[100px] lowercase first-letter:capitalize "
          :title="data.description.trim().replace(/\s+/g, ' ').trim()"
          :sm="130"
          :md="190"
          :lg="130"
          :xl="120"
        />

        <div class="px-0">
          <!-- <div v-for="item in detailOnCard">
            <div class="font-love text-base">
              <img src="" alt="" />
              <div class="">
                <span class="font-bold"> {{item.name}} :  </span>
                <span> {{item.label}} </span>
              </div>
            </div>
          </div> -->

          <div class="flex flex-col font-love text-sm">
            <span
              >{{ data.city ? data.city : "Abidjan" }},
              {{ data.country ? data.country : "Côte d’Ivoire" }}</span
            >

            <div class="flex gap-2">
              <span class="text-xs font-black text-red-400 uppercase">
                Délai ({{ data.deadLine }})
                <!-- <span class="text-sm font-bold">voir plus</span> -->
              </span>
              <span
                class="font-love font-medium flex items-end text-end text-xs"
              >
                &#149; Publier, {{ data.timePost }}
              </span>
            </div>
          </div>
        </div>
      </RouterLink>
      <!-- <div class="flex bg-blue-500 rounded-b-md justify-center items-center font-love py-2 text-white">
          <button> Voir plus </button>
        </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import BadgeRounded from "../buttons/badge/badge.rounded.vue";
import "@/vendors/utils/date.utils";
import moment from "moment";
import TextQuery from "../texts/text.query.vue";
import TextQueryHtml from "../texts/text.query.html.vue";
import { envConfig } from "@/env.config";
import AvatarProfile from "../avatar/avatarProfile.vue";
export default defineComponent({
  name: "card-post-super",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isNotPopular: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    sizeCard: {
      type: String,
      default: "w-full",
    },
    indexStart: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
    jobCount: {
      type: Number,
      default: 0,
    },
    jobResult: {
      type: Number,
      default: 0,
    },
    single:{
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const detailOnCard = [
      {
        icon: "",
        name: "Lieu",
        label: "Côte d'ivoire",
      },
      {
        icon: "",
        name: "Type de contrat",
        label: "Su site",
      },
      {
        icon: "",
        name: "Date limite",
        label: "17/11/2022",
      },
    ];

    const dateTopublish = ref();

    const dateUpdate = setInterval(() => {
      dateTopublish.value = moment(props.data.datedeCreations).fromNow();
      // console.log(dateTopublish.value)
    }, 1000);

    onBeforeUnmount(() => {
      clearInterval(dateUpdate);
    });

    return {
      detailOnCard,
      dateTopublish,
      envConfig,
    };
  },
  components: {
    BadgeRounded,
    RouterLink,
    TextQuery,
    TextQueryHtml,
    AvatarProfile,
  },
});
</script>

<style scoped></style>
