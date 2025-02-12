<template>
  
 <div
              class="lg:flex flex-col gap-2 pt-5 bg-white w-8/12 lg:w-4/12 xl:w-3/12 z-10 lg:h-auto h-[70vh] rounded-l-md py-2 top-20 absolute lg:sticky MenuDjMail "
            >
              <div class="flex mb-4 px-4">
                <RouterLink
                  :to="{ name: 'JobCreate' }"
                  class="flex items-center py-2 gap-2 bg-blue-700 rounded-md text-white px-4"
                >
                  <BriefcaseIcon class="flex fi fi-sr-briefcase relative bottom-[2px] h-5"></BriefcaseIcon>
                  <span class="font-bold"> Nouvelle offre d'emploi </span>
                </RouterLink>
              </div>

              <div class="flex flex-col overflow-y-auto gap-4 mt-4">
                <div
                  v-for="item in mailLinks"
                  @click.stop="$emit('navigateMail', item.id)"
                >
                  <div
                    class="flex gap-2 text-thin  cursor-pointer py-1 px-4"
                    :class="
                      navigateMail === item.id
                        ? 'border-blue-700 border-l-[4px] font-black text-blue-700'
                        : ''
                    "
                  >
                    <span class="w-10/12 " :class=" navigateMail === item.id ? 'text-blue-700 font-bold' : 'font-light'">{{ item.name }} </span>
                    <span
                      class="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs"
                      >{{ item.count }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
  </template>
  
  <script lang="ts">
  const BtnMoreCard= defineAsyncComponent(() =>
  import('@/components/buttons/btn.more.card.vue')
)
  const BtnSimple= defineAsyncComponent(() =>
  import('@/components/buttons/btn.simple.vue')
)
  const CardPostProfile= defineAsyncComponent(() =>
  import('@/components/cards/card.post.profile.vue')
)
  const CardBody= defineAsyncComponent(() =>
  import('@/components/cards/medias/card.body.vue')
)
  import { defineComponent, reactive, onMounted, ref, computed, defineAsyncComponent } from "vue";
  import { useProfileMailComposition} from "@/composables/profileMail.composition"
  import Editor from "@tinymce/tinymce-vue";
  import { useUserComposition } from "@/composables/user.composition";
  import LoadingMessageEmpty from "@/components/cards/loading/loading.message.empty.vue";
import { BriefcaseIcon } from "@heroicons/vue/24/solid";
  const TalkCard  = defineAsyncComponent(() =>
import('@/components/talkMessages/talk.card.vue')
)
  
  export default defineComponent({
    name: "profile-mail",
    props: ["mailLinks", 'navigateMail'],
    components: {
    CardBody,
    BtnSimple,
    BtnMoreCard,
    CardPostProfile,
    LoadingMessageEmpty,
    TalkCard,
    BriefcaseIcon
},
    setup(props) {
      const { GET_USER, USER } = useUserComposition();
  
      onMounted(async () => {
        await GET_USER();
      });
  
      const { envConfig } = useProfileMailComposition();
         const mailLinks = ref([
      {
        id: 0,
        name: "Toutes les condidactures",
        count: 0,
      },
      {
        id: 1,
        name: "Condidacture non vue(s)",
        count: 0,
      },
      // {
      //   id: 2,
      //   name: "Favories",
      //   count: 0,
      // },
      {
        id: 3,
        name: "Profile Selectionner",
        count: 0,
      },
      {
        id: 4,
        name: "Profile rejecter",
        count: 0,
      },
      // {
      //   id: 5,
      //   name: "Profile interesant",
      //   count: 0,
      // },
    ]);

 
  
      return {
        envConfig,
        USER,
      };
    },
  });
  </script>
  
  <style scoped></style>
  