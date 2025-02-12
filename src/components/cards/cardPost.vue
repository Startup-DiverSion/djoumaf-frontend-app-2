<template>
  <div class="h-full">
    <!-- Prfile w-[95%] md:w-[270px]  -->
    <div
      class="flex flex-col gap-4 bg-white w-full py-4 rounded-md cursor-pointer h-full"
    >
      <div class="flex flex-col border-b-[1px] mx-4 py-2 gap-1">
        <div class="flex gap-1">
          <BadgeRounded
            bg-color="bg-red-500"
            text-color="text-white"
            label="Emploi"
          />
          <!-- <BadgeRounded
            bg-color="bg-blue-500/50"
            text-color="text-white"
            label="Informatique"
          /> -->
        </div>

        <div class="flex items-center gap-1">
          <!-- &#149; -->
          <span class="font-love text-base"
            >Par
            {{
              data.owner.fullname.length >= 15
                ? data.owner.fullname.substring(0, 15) + "...".trim()
                : data.owner.fullname
            }}
          </span>
          <span class="font-love text-sm font-medium">
            &#149; {{ data.timePost }}
          </span>
        </div>
      </div>

      <div class="flex flex-col gap-2 px-4 h-[100%]">
        <span class="font-love font-bold text-lg text-blue-500">
          {{
            data.titre.length >= 35
              ? data.titre.substring(0, 33) + "...".trim()
              : data.titre
          }}
        </span>
        <span class="font-love text-base opacity-90">
          {{
            data.descriptions.length >= 110
              ? data.descriptions.substring(0, 110) + "...".trim()
              : data.descriptions
          }}
        </span>
      </div>

      <div class="px-4">
        <!-- <div v-for="item in detailOnCard">
          <div class="font-love text-base">
            <img src="" alt="" />
            <div class="">
              <span class="font-bold"> {{item.name}} :  </span>
              <span> {{item.label}} </span>
            </div>
          </div>
        </div> -->

        <div class="flex flex-col font-love text-base">
          <span>{{ data.lieu }}, Côte d’Ivoire</span>
        </div>
      </div>

      <!-- <div class="flex bg-blue-500 rounded-b-md justify-center items-center font-love py-2 text-white">
        <button> Voir plus </button>
      </div> -->
    </div>
  </div>
</template>
<code></code>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";
import BadgeRounded from "../buttons/badge/badge.rounded.vue";

export default defineComponent({
  name: "CardPost",
  components: { BadgeRounded },
  props: {
    data: {
      type: Object,
      default: {},
    },
    isNotPopular: {
      type: Boolean,
      default: () => {
        return true;
      },
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
});
</script>

<style scoped></style>
