<template>
  <div class="bg-white rounded-md px-4">
    <CardBody label="Offres d'emplois">
      <LoadingMessageEmpty
        :isEmpty="true"
        v-if="data.job.length === 0"
        message="Publier une offre d'emploi."
      />
      

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2"
      >
        <div v-for="item in data.job">
          <div class="flex flex-col gap-4 border-[1px] rounded-md p-3">
            <RouterLink :to="'/jobs/' + data.slug" class="flex flex-col gap-1">
              <TextQuery
                class-name="font-love uppercase font-bold text-base text-blue-500 md:h-[40px] lg:h-[50px]   md:h-auto  leading-[1.3em]"
                :title="item.title.replace(/\s+/g, ' ').trim()"
                :sm="45"
                :md="30"
                :lg="38"
                :xl="38"
              />
              <TextQueryHtml
                class-name="font-love lowercase  text-thin  md:h-[50px]  leading-[1.3em]"
                :title="item.description.replace(/\s+/g, ' ').trim()"
                :sm="50"
                :md="50"
                :lg="50"
                :xl="55"
              />
              <div class="">
                <div class="flex gap-1 items-center">
                  <UserIcon class="fi fi-sr-user flex w-4"></UserIcon>
                  <span> {{ item?.to_apply }} </span>
                </div>
              </div>
            </RouterLink>

            <div
              v-if="USER?.id === data?.user?.id"
              class="grid grid-cols-2 bg-gray-50/20 items-center justify-start gap-4 cursor-pointer text-blue-500 divide-x-[1px] border-t-[1px] px-4 py-2 text-xs "
            >
              <RouterLink :to="'/jobs/edit/' + item.slug" class="flex items-center gap-1 justify-center"
                ><PencilIcon
                  class="flex fi fi-sr-pencil text-blue-500 cursor-pointer h-4"
                />
              <span class="flex">Modifer</span>
            </RouterLink>
              <div class="flex items-center text-xs gap-1 text-red-500 justify-center cursor-pointer">
                <TrashIcon
                @click="deleteJob({ id: item.id })"
                class="flex fi fi-sr-trash  text-red-500 cursor-pointer h-4" 
              ></TrashIcon>
              <span class="flex">Supprimer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardBody>
  </div>
</template>

<script lang="ts">
const BtnMoreCard = defineAsyncComponent(
  () => import("@/components/buttons/btn.more.card.vue")
);
const CardBody = defineAsyncComponent(
  () => import("@/components/cards/medias/card.body.vue")
);
import ProfileContentActivityCard from "@/views/pages/profile/__partiels/profile.content.activity.card.vue";
import ProfileContentSkills from "@/views/pages/profile/__partiels/profile.content.skills.vue";
import ProfileContentFormations from "@/views/pages/profile/__partiels/profile.content.formations.vue";
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  reactive,
  defineAsyncComponent,
} from "vue";
import ModalExperience from "@/components/modals/modal.experience.vue";
import ModalCourse from "@/components/modals/modal.course.vue";
import { useModalComposition } from "@/composables/modal.composition";
import axios from "axios";
import { URL } from "@/router/url";
import moment from "moment";
import AddComponent from "@/components/add/add.component.vue";
import { useProfileStore } from "@/stores/profile.store";
import LoadingMessageEmpty from "@/components/cards/loading/loading.message.empty.vue";
import EditCompoment from "@/components/edit/edit.compoment.vue";
import ModalProfileDescription from "@/components/modals/modal.profile.description.vue";
import { useEventStore } from "@/stores/event";
import { useUserComposition } from "@/composables/user.composition";
import { useJobComposition } from "../../jobs/job.compositoin";
import TextQuery from "@/components/texts/text.query.vue";
import TextQueryHtml from "@/components/texts/text.query.html.vue";
import { PencilIcon, TrashIcon, UserIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "profile-job",
  components: {
    CardBody,
    TextQuery,
    LoadingMessageEmpty,
    TextQueryHtml,
    PencilIcon,
    UserIcon,
    TrashIcon
},
  props: ["data"],
  setup(props) {
    const { GET_USER, USER } = useUserComposition();
    const { state, deleteJob } = useJobComposition();
    onMounted(async () => {
      await GET_USER();
    });
    return { USER, deleteJob };
  },
});
</script>

<style scoped></style>
