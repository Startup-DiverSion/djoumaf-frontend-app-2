<template>

  
    <div class="fixed bg-gray-700/50 flex items-center justify-center inset-0 z-20  " v-if="USER?.profile  && openOrClose">
        <div class="bg-white lg:w-6/12 w-11/12 h-[75vh] shadow-3xl rounded-lg overflow-auto px-8 py-4">
            <XMarkIcon class="h-6" @click="closeInfo" />
  
          <div class="h-44 flex justify-center items-center">
            <img src="/images/newfeature.png" class="h-full" alt="">
          </div>
  
        <div class="flex flex-col  text-sm gap-4 ">
          <span class="flex flex-wrap text-xl font-black">Heureux de vous revoir <span class="text-blue-700 ml-1">{{ USER?.profile.first_name }}</span>, sur DjoumAf ! </span>
          <div class="text-base">
            <span
              >Pour vous permettre de bénéficier de toute la puissance de votre
              réseau social professionnel Africain nous vous suggérons les étapes
              suivantes :</span
            >
          </div>
  
          <div class="flex flex-col gap-1">
            <span class="font-bold opacity-90"
              >- Veuillez bien renseigner votre profil, pour une meilleure
              expérience afin de vous faire remarquer pas nos cabinets de
              Recrutements et nos partenaires.
            </span>
            <a :href="USER?.profile.slug" class="text-green-500 underline underline-offset-1 font-bold">Modifier mon profil</a>
          </div>
  
          <div class="flex flex-col gap-1">
            <span class="font-bold opacity-90"
              >- Créer votre votre CV et télécharger le simplement sur notre
              plateforme en renseignant juste vos informations
            </span>
            <a :href="USER?.profile.slug + '?content_page=cv'" class="text-green-500 underline underline-offset-1 font-bold">En Savoir plus</a>
          </div>
        </div>
  
      </div>
      </div>
  </template>
  
  <script lang="ts">

  
  import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from "vue";

  


  
  export default defineComponent({
    name: "auth-layout",
    props: ['USER'],
    components: {
    XMarkIcon
},
    setup() {
     
        const utilsStore = new LocalSotreUtils()
    
      onMounted(async () => {
       
        if(await utilsStore.get("jInfo") && await utilsStore.get("jInfo") == '1'){
            openOrClose.value = true
        }

      });

      const openOrClose = ref(false)

      const closeInfo = async() => {

        if(await utilsStore.get("jInfo") && await utilsStore.get("jInfo") == '1'){
            await utilsStore.remove("jInfo")
            await utilsStore.set("jInfo", '0')
            openOrClose.value = false
        }

       

      }
  
      return {
        openOrClose,
        closeInfo
      };
    },
  });
  </script>
  
  <style scoped></style>
  