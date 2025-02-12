<template>
  <!--  -->
  <div class="flex flex-col gap-4 relative w-full">
    <div class="flex w-full relation">
      <!--  -->
      <div
        class="lg:flex flex-col gap-4 bg-white w-10/12 lg:w-4/12 xl:w-3/12 z-10 h-full rounded-l-md p-4 top-20 absolute lg:sticky MenuDjMail hidden"
      >
        <div class="">
          <button
            class="flex items-center py-2 gap-1 bg-blue-700 rounded-md text-white px-4"
          >
           
            <span>Nouveau message</span>
          </button>
        </div>

        <div v-for="item in mailLinks" @click="[navigateMail = item.id, MenuDjMail(true)]">
          <div class="text-base cursor-pointer" :class="navigateMail === item.id ? 'text-blue-500 font-bold' : '' ">{{ item.name }} ({{ item.count }})</div>
        </div>
      </div>

      <!--  -->
      <div
        class="flex flex-col w-full lg:w-9/12 rounded-r-md relative h-[70vh]"
      >
        <div class="bg-white flex justify-between px-4 py-6 absolute w-full">
        <div class="flex items-center gap-2">
          <span class="text-lg font-bold">DjMail</span>
        </div>

          <!-- <div class="">Recherche</div> -->
        </div>

        <!--  -->

        <!--  -->

        <div
          class="mt-20 py-2 px-4 flex flex-col gap-2 overflow-auto font-love bg-white/50 h-full" v-if="talkMailsData"
        >
       
     <!-- Boite de reception -->
     <div class="w-full h-full" v-if="navigateMail === 0">
          <div class="w-full h-full flex items-center justify-center " >
          <LoadingMessageEmpty
          :isEmpty="true"
          
          message="Rien pour le moment."
        />
        </div>
        </div>


        <!-- Message envoyé -->
        <div class="w-full h-full" v-if="navigateMail === 1">
          <div class="w-full h-full flex items-center justify-center " >
          <LoadingMessageEmpty
          :isEmpty="true"
          
          message="Rien pour le moment."
        />
        </div>
        </div>

        <!-- Condicature -->
        
       
        <div class="w-full h-full  "  v-if="navigateMail === 2 && talkMailsData">
        
          <div class="w-full h-full flex items-center justify-center " v-if="talkMailsData.length === 0">
          <LoadingMessageEmpty
          :isEmpty="true"
          
          message="Accune candidacture pour le moment."
        />
        </div>

        <!-- <TalkCard /> -->

          <div v-for="mail in talkMailsData">
           
            <div class="flex gap-2 bg-white p-4 rounded-md" >
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
              
              <div class="flex flex-col lg:flex-row lg:justify-between w-full gap-2 lg:items-center">

                <div class="flex flex-col">
                <span class="text-base font-black">
                   {{ mail?.user?.profile?.full_name }}
                </span>
                <span>
                  {{ mail?.subject }} &#11037; {{ mail?.created_at }}</span
                >
              </div>

              <div class="">
                <a class=" bg-gray-200 p-2 text-sm rounded-md" :href="'/'+ mail?.user?.profile?.slug "> Voir le profil</a>
              </div>

              </div>

            </div>
          </div>
        </div>

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
  props: [],
  components: {
    CardBody,
    BtnSimple,
    BtnMoreCard,
    CardPostProfile,
    editor: Editor,
    LoadingMessageEmpty,
    TalkCard
},
  setup() {

    const { GET_USER, USER } = useUserComposition();

onMounted(async () => {
  await GET_USER();
});

const navigateMail = ref(0)

    const mailLinks = ref([
      {
        id:0,
        name: "Boite de reception",
        count: 0
      },
      {
        id:1,
        name: "message envoyé",
        count: 0
      },
      {
        id: 2,
        name: "Candidactures",
        count: 0
      },
    ]);

    // initilization area
    const initilization = () => {
      return {
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar: " casechange blocks | bold italic bullist  ",
      };
    };

    const { talkMails, talkMailsData, envConfig } = useProfileMailComposition();
    const MenuDjMailBoll = ref(false);

    const MenuDjMail = (dor:boolean) => {
      const MenuDjMail = document.querySelector('.MenuDjMail')
      if(dor === true ){
        MenuDjMail?.classList.remove('flex')
        MenuDjMail?.classList.add('hidden')
      }else{
        MenuDjMail?.classList.remove('hidden')
        MenuDjMail?.classList.add('flex')
      }
    }

    onMounted( () => {
   if(USER){
    talkMails().then(() => {
      mailLinks.value[2].count = talkMailsData.value.length
    console.log(mailLinks.value[2].count, talkMailsData.value.length)
    });
    
   }
       
      
    });

    return { mailLinks, talkMailsData, envConfig, initilization, USER, navigateMail, MenuDjMail, MenuDjMailBoll };
  },
});
</script>

<style>
.senderMail .tox-tinymce {
  height: 120px !important;
  width: 100%;
}
.senderMail .tox-statusbar {
  display: hidden !important;
}
</style>
