<template>
  <div
    class="flex flex-col lg:flex-row gap-2 p-4 rounded-md"
    :class="mail?.candidacy_see_profile ? 'bg-white' : 'bg-purple-100'"
  >
    <div class="w-12 h-12">
      <img
        :src="
          mail?.user?.profile?.media_profile?.url
            ? `${envConfig().HOST_SERVER_IMAGE}/` +
              mail?.user?.profile?.media_profile[0]?.url.filename
            : envConfig().DEFAULT_IMAGE_PROFILE
        "
        class="h-full rounded-full bg-blue-100 object-cover object-top"
        alt=""
      />
    </div>

    <div
      class="flex flex-col lg:flex-row lg:justify-between w-full gap-y-4 gap-x-2 lg:items-center"
    >
      <div class="flex flex-col">
        <div class="flex items-center gap-3">
          <span class="text-base font-black">
            {{ mail?.user?.profile?.full_name }}
          </span>
          &#149;
          <span class="text-xs"> {{ mail?.created_at }}</span>
        </div>

        <div class="w-full ">
          <span class="text-sm leading-[-10px]">
            Bonjour ! Mon nom est
            <strong>@{{ mail?.user?.profile?.full_name }}</strong> et
            je suis intéressé(e) par votre offre.
          </span>
        </div>

        <div class="flex text-xs items-center text-green-500 mt-1">
          <ChevronRightIcon class="h-4" />
          <TextQuery
            class-name="underline font-extrabold uppercase"
            :title="mail.subject.replace(/\s+/g, ' ').trim()"
            :sm="45"
            :md="30"
            :lg="38"
            :xl="40"
          />
        </div>
      </div>

      <div class="flex gap-2">
        <div
          class="flex items-center text-sm rounded-md"
          v-if="mail.candidacy_state === null"
        >
          <button
            @click="
              candidacy_state_defined(
                mail.id,
                false,
                candidacyGlobal,
                mail.candidacy_state
              )
            "
            class="bg-red-400 text-white p-2 text-xs rounded-l-md font-bold"
          >
            Refuser
          </button>
          <button
            @click="
              candidacy_state_defined(
                mail.id,
                true,
                candidacyGlobal,
                mail.candidacy_state
              )
            "
            class="bg-green-500 text-white p-2 text-xs rounded-r-md font-bold"
          >
            Favorie
          </button>
        </div>

        <button
          v-if="mail.candidacy_state !== null"
          @click="
            candidacy_state_defined(mail.id, null, candidacyGlobal, false)
          "
          class="bg-gray-400 text-white p-2 text-xs rounded-md font-bold flex flex-col relative"
        >
          Annuler
          <div
            class="inline-flex w-full h-1 bg-white absolute left-0 bottom-0 rounded-b-md"
            :class="mail.candidacy_state ? 'bg-green-300' : 'bg-red-300'"
          ></div>
        </button>

        <button
          @click="
            candidacy_see_profile(
              mail.id,
              mail?.user?.profile?.slug,
              candidacyGlobal,
              mail?.candidacy_see_profile
            )
          "
          class="bg-gray-200 px-4 py-2 text-sm rounded-md"
        >
          Voir
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { URL} from "@/router/url";
import axios from "axios";
import { defineComponent , defineAsyncComponent} from "vue";
import TextQuery from "../texts/text.query.vue";
import { useProfileMailComposition} from "@/composables/profileMail.composition"
import { ChevronRightIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "",
  props: ["mail", "envConfig", "candidacyGlobal"],
  components: { TextQuery, ChevronRightIcon },
  setup(props) {
    const { candidacy_see_profile, candidacy_state_defined } =
      useProfileMailComposition();
    return {
      candidacy_see_profile,
      candidacy_state_defined,
    };
  },
});
</script>

<style scoped></style>
