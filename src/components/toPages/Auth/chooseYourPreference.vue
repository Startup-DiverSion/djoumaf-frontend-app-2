<template>
  <div
    class="w-full h-screen fixed top-0 flex justify-center items-center bg-gray-50/80"
  >
    <div
      class="bg-white flex flex-col relative h-auto w-5/12 shadow-sm rounded-md font-love"
    >
      <!--  -->
      <div class="">
        <div class="items-start w-8/12 m-auto flex flex-col pt-8 gap-2">
          <span class="text-4xl font-light"
            >Que recherchez vous sur DjoumAf ?</span
          >
          <span class="text-base"
            >Pour une meilleure expérience sur DjoumAf, veuillez sélectionner
            vos différents choix !</span
          >
        </div>

        <div class="h-[250px] w-full my-8 overflow-y-scroll">
          <div class="w-8/12 m-auto flex flex-col gap-6">
            <CardToChoose title="Qui êtes vous ?" :data="YouData" />
            <CardToChoose
              title="Quel est votre domaine d'activité ?"
              :data="DomaineActivite"
            />
            <CardToChoose
              title="Quel sont vos centre d'interêt ?"
              :data="CentreInteret"
            />
            <CardToChoose
              title="Pourquoi vous êtes sur DjoumAf ?"
              :data="whatMakeOnDjoumafData"
            />
          </div>
        </div>
      </div>

      <div class="flex border-t-[1px] justify-between p-6">
        <div class="text-sm">1 sur 3 Page(s)</div>

        <BtnNext />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const BtnNext= defineAsyncComponent(() =>
import('@/components/buttons/btn.next.vue')
)
import CardToChoose from "@/components/cards/card.to.choose.vue";
const CardMedia= defineAsyncComponent(() =>
  import('@/components/cards/medias/card.media.vue')
)
import { defineComponent, onMounted, computed, ref, defineAsyncComponent, reactive } from "vue";

export default defineComponent({
  name: "choose-your-preference",
  props: [],
  components: { BtnNext, CardToChoose, CardMedia },
  setup() {
    const YouData = reactive(["Particlier", "Entreprise"]);
    const DomaineActivite = reactive(["Informatique", "Missions", "Real"]);
    const CentreInteret = reactive([
      "Lecture",
      "Music",
      "Sport",
      "Biens & services",
    ]);
    const whatMakeOnDjoumafData = reactive([
      "Emploi",
      "Stage",
      "Consultance",
      "Freelance",
      "Affaire & Business",
      "Partenariat",
      "Nouvelle opportunité",
      "autres",
    ]);

    return { YouData, DomaineActivite, CentreInteret, whatMakeOnDjoumafData };
  },
});
</script>

<style scoped></style>
