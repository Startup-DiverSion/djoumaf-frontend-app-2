<template>
  
    <div class="w-full h-full flex flex-col gap-2 pb-16" v-if="talkMailsData">
      <div
        class="w-full h-full flex items-center justify-center"
        v-if="talkMailsData.length === 0"
      >
        <LoadingMessageEmpty
          :isEmpty="true"
          message="Accune candidacture selectionner."
        />
      </div>
  
      <div v-for="mail in talkMailsData">
        <TalkCard
          :mail="mail"
          :envConfig="envConfig"
          :candidacy-global="talkMailsData"
        />
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
  import { defineComponent, reactive, onMounted, ref, defineAsyncComponent } from "vue";
  import { useProfileMailComposition} from "@/composables/profileMail.composition"
  import Editor from "@tinymce/tinymce-vue";
  import { useUserComposition } from "@/composables/user.composition";
  import LoadingMessageEmpty from "@/components/cards/loading/loading.message.empty.vue";
  const TalkCard  = defineAsyncComponent(() =>
import('@/components/talkMessages/talk.card.vue')
)
  
  export default defineComponent({
    name: "profile-mail",
    props: ["talkMailsData"],
    components: {
      CardBody,
      BtnSimple,
      BtnMoreCard,
      CardPostProfile,
      LoadingMessageEmpty,
      TalkCard
    },
    setup() {
      const { GET_USER, USER } = useUserComposition();
  
      onMounted(async () => {
        await GET_USER();
      });
  
      const { envConfig } = useProfileMailComposition();
  
      return {
        envConfig,
        USER,
      };
    },
  });
  </script>
  
  <style scoped></style>
  