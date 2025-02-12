<template>
  <div class="flex flex-col bg-white rounded-md " v-if="state_cv.data && state_cv.data.length != 0">
    <div class="flex flex-col gap-4 px-4">
      <CardBody label="Mes Cv">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <div v-for="(item, index) in state_cv.data">
            <div class="flex gap-2 items-center  px-2 py-2 bg-blue-100 rounded-lg w-full">

              <div class="h-12 w-16 ">
                <img  :src="cvData.find((el:any) => el.slug == item.model)?.link" alt="" class="h-full w-full rounded-md">
              </div>
              <div class="flex items-center justify-between w-[80%] " >
              <TextQuery :title="'EmmanuelDiocvOvitsdsdssqdsq'" :sm="30" :md="25" :xl="17" />
              <LayoutDropdown >
                <div class="flex gap-1 px-2 w-full hover:bg-blue-700/20" @click="DeleteCV(item.id)">
                  <TrashIcon class="h-5" />
                  <span class="font-sembold">Supprimer</span>
                </div>
              </LayoutDropdown>
            </div>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  </div>

  <div class="flex flex-col bg-white rounded-md">
    <div class="flex flex-col gap-4 px-4">

      <ProfileCvContentCompon :data="data" :cv-data="cvData" title="Découvrez nos CV personnalisés gratuits." :isfree="true" />
      <ProfileCvContentCompon :data="data" :cv-data="cvData" title="Découvrez nos CV premium avec toute la puissance du design." :isfree="false" />

    </div>
  </div>
</template>

<script lang="ts">
const CardBody = defineAsyncComponent(
  () => import("@/components/cards/medias/card.body.vue")
);
import { envConfig } from "@/env.config";
import { EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, EllipsisVerticalIcon, StarIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { defineComponent, ref, reactive, defineAsyncComponent, onMounted } from "vue";
import ProfileCvContentCompon from "./profile.cv.content.compon.vue";
import { useCvComposition } from "@/composables/cv.composition";
import TextQuery from "@/components/texts/text.query.vue";
import LayoutDropdown from "@/components/dropdowns/layout.dropdown.vue";

export default defineComponent({
  name: "profile-cv-content",
  props: ["data"],
  components: { CardBody, StarIcon, ProfileCvContentCompon, TextQuery, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, EllipsisVerticalIcon, LayoutDropdown, TrashIcon },
  setup() {
    const showInfoCard = ref(false);
    const cvData = reactive([
      {
        name: "Cv Gratuit",
        slug: "cv-gratuit-model-1",
        link: "https://djoumaf.com/images/placeholder/cv.png",
        premiun: false,
        available: true,
      },
      {
        name: 'Pour developpeur',
        link: 'https://img.freepik.com/psd-gratuit/modele-conception-cv-cv-propre_237398-210.jpg?size=626&ext=jpg&ga=GA1.2.401016479.1673963877&semt=sph',
        premiun: false,
        available: false
      },

      {
        name: 'Pour developpeur',
        link: 'https://img.freepik.com/vecteurs-libre/modele-curriculum-vitae-moderne_23-2148674426.jpg?size=626&ext=jpg&ga=GA1.2.401016479.1673963877&semt=sph',
        premiun: false,
        available: false
      },
      


      {
        name: "Pour developpeur",
        slug: "cv-prenium-model-1",
        link: "https://img.freepik.com/psd-premium/cv-moderne_1435-855.jpg?w=740",
        premiun: true,
        available: true,
      },
      {
        name: "Pour developpeur",
        slug: "cv-prenium-model-2",
        link: "https://img.freepik.com/psd-gratuit/modele-cv-cv-propre-moderne_237398-297.jpg?w=740&t=st=1668785134~exp=1668785734~hmac=c2a92f1bcf4071fd21379ff7e1898a42e249e916ebb74b2f7a7128b7cbc117f2",
        premiun: true,
        available: false,
      },
      {
        name: "Pour developpeur",
        slug: "cv-prenium-model-3",
        link: "https://img.freepik.com/psd-gratuit/modele-conception-cv-cv-moderne_237398-213.jpg?w=740&t=st=1668787869~exp=1668788469~hmac=ec876105b1e5c1a5f32de08459e24ee24c438d7eb1eceb974077f9d74444132b",
        premiun: true,
        available: false,
      },
      {
        name: "Pour developpeur",
        slug: "cv-prenium-model-4",
        link: "https://img.freepik.com/psd-premium/modele-cv-curriculum-vitae-simple-minimaliste-moderne_592487-152.jpg?w=740",
        premiun: true,
        available: false,
      },

      {
        name: "Pour developpeur",
        slug: "cv-prenium-model-5",
        link: "https://img.freepik.com/psd-gratuit/modele-cv-blanc-details-bleu-gris_1435-74.jpg?w=740&t=st=1668788475~exp=1668789075~hmac=2a9f18eedf8aa7cf8a9ce2fd49e8e6e60073f8025e82a55706831814414f78bd",
        premiun: true,
        available: false,
      },
      {
        name: "Pour developpeur",
        link: "https://img.freepik.com/psd-gratuit/modele-cv-gris-details-bleus_1435-72.jpg?w=740&t=st=1668788478~exp=1668789078~hmac=d0d512a85758a51f3a04b3863a691bc18f43b3aad4214d01ed03dfaf0187dc6c",
        premiun: true,
        available: false,
      },
      {
        name: "Pour developpeur",
        slug: "cv-prenium-model-6",
        link: "https://img.freepik.com/psd-gratuit/modele-cv-cv-propre-moderne_237398-294.jpg?w=740&t=st=1668788481~exp=1668789081~hmac=30c06c29c6f82787b50a146c2007945155bceb74d00d72af7ba5d172db3e7ec4",
        premiun: true,
        available: false,
      },
      {
        name: 'Pour developpeur',
        link: 'https://img.freepik.com/psd-premium/conception-minimale-cv-modele-cv_301521-199.jpg?w=740',
        premiun: true,
        available: false
      }
    ]);

      const { findCV, DeleteCV, state_cv } = useCvComposition()
      onMounted(() => {
        findCV()
      })

    return {
      showInfoCard,
      cvData,
      state_cv,
      DeleteCV
    };
  },
});
</script>

<style scoped></style>
