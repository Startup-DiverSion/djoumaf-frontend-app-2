<template>
  <div class="flex flex-col gap-2 py-4 font-love">
    <div class="flex justify-between items-center">
      <div class="flex gap-1">
        <BadgeRounded bg-color="bg-red-500" label="Emploi" />
      </div>

      <div class="">
        <img class="h-4 w-4 object-cover" src="/public/cards/save.svg" alt="" />
      </div>
    </div>

    <div class="flex gap-4 w-full">
      <div class="w-20 h-20 bg-gray-50">
        <img src="" alt="" />
      </div>

      <div class="flex flex-col gap-2 w-10/12">
        <div class="flex flex-col">
          <span class="text-lg font-bold text-blue-500"
            >ANALYSTE SOC N2 - MI-TEMPS</span
          >
          <span>Société Générale African Business Services</span>
        </div>

        <div class="flex flex-col">
          <span class="text-base font-light"
            >Abidjan, Côte d’Ivoire (Hybride) &#149; il y a 1 semaine</span
          >
        </div>

        <span class="font-love text-sm opacity-90">
          {{
            `Urgence signalée Je cherche un comptable Taches clés : – Suivi et
contrôle de la facturation de nos fournisseurs, et des paiements –
Suivi et contrôle de la comptabilisation avec le cabinet comptable
(Ruelle) – Suivi documentaires – Clôtures mensuelles (FNC, FNP…)
profil: Bac+4/5 en comptabilité ou équivalent avec 5 a 10 ans
d’expérience Logiciel : Excel et connaissance Sage (logiciel du
Cabinet comptable) serait un plus… cv : soustraitance@rmo.ci Mettre en
objet de votre mail « comptable expérimenté »`.substring(0, 120)
          }}...
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";
import BadgeRounded from "../buttons/badge/badge.rounded.vue";

export default defineComponent({
  name: "card-post-full",
  props: {
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
  },
  setup() {
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
    return {
      detailOnCard,
    };
  },
  components: { BadgeRounded },
});
</script>

<style scoped></style>
