<template>
  <!-- Test -->

  <div class="w-[30%] h-[96vh] bg-gray-700 text-white flex flex-col  px-2 gap-6">
    <div class="flex w-full justify-center p-1">
      <div class="flex w-20 h-20 justify-center rounded-full p-[2px]" :class="`${color.bg}`">
        <img
          class="w-full h-full bg-slate-500 rounded-full   object-cover" 
          v-lazy="info.image[0]"
          alt=""
        />
      </div>
    </div>

    <!-- Contacter moi -->
    <div class="flex flex-col">
      <HeadingModelOne
        titleName="Contact"
        className="text-white border-white"
      />

      <div class="flex flex-col gap-1 mt-2">
        <div v-for="(item, index) in Object.keys(info.me)">
          <div class="flex flex-col gap-0" v-if="info.me[item]">
            <span :class="'text-'+color" class="text-[8px] font-extrabold first-letter:uppercase">{{ item == 'place' ? 'Localisation' : item }}:</span>
            <span class="text-[8px] break-all">
              {{ info.me[item] ? info.me[item] : "" }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Competence-->
    <div class="flex flex-col gap-3">
      <HeadingModelOne
        titleName="Competences"
        className="text-white border-white"
      />

      <div class="grid grid-cols-1 gap-1">
        <div v-for="compToHtml in competence">
          <CompetencePercentProgressBar :item="compToHtml" :color="color" />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <HeadingModelOne
        titleName="Qualites"
        className="text-white border-white"
      />

      <div class="grid grid-cols-1 gap-1">
        <div v-for="qualityToHtml in quality">
          <CompetencePercentProgressBar :item="qualityToHtml" :color="color" />
        </div>
      </div>
    </div>
  </div>

  <!-- 
  
  
                  - - -  
                  -
                  -
                  -
                  -
  
               -->
  <div class="w-[70%] flex flex-col gap-8">
    <!-- Nom & fonction -->
    <div class="flex flex-col gap-1">
      <div class="flex flex-col">
        <div class="flex flex-wrap flex-row gap-1">
          <span class="text-xl font-black " :class="color.text">
            {{ info.firstname ? info.firstname : "xxxxx" }}
          </span>
          <span class="text-xl font-black">
            {{ info.lastname ? info.lastname : "xxxxx" }}
          </span>
        </div>
        <span class="text-[8px] font-bold">{{
          info.profession ? info.profession : "xxxxx xxxxx"
        }}</span>
      </div>

      <!-- Nom & fonction -->
      <div class="flex flex-col gap-1">
        <span class="text-[8px]">
          {{
            info.about
              ? info.about
              : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas officiis,
          hic suscipit eligendi est reprehenderit debitis sapiente.`
          }}
        </span>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <!-- Defined All Experience -->
      <SameModelExp :color="color" :data="experience" title-name="Experiences"  :inData="['date_start', 'date_fin', 'place', 'type_exp', 'compagny', 'description' ]" />

      <!-- Defined All Experience -->
      <SameModelExp :color="color" :data="formation" title-name="Educations"  :inData="['date_start', 'date_fin', 'place', 'domaine', 'school', 'description']" />

      <!-- References -->
      <div class="flex flex-col gap-3 pt-2">
        <HeadingModelOne titleName="References" />

        <div class="grid grid-cols-2 h-auto gap-4">
          <div v-for="refrs in references">
            <div class="flex flex-col">
              <div class="flex">
                <span class="text-[10px] uppercase font-bold break-all">
                  {{ refrs.fullname ? refrs.fullname : "xxxxx xxxxx xxxxx" }}
                </span>
              </div>
              <span class="text-[8px]">{{
                refrs.domaine ? refrs.domaine : `Web Designer`
              }}</span>

              <div
                class="flex text-[8px] gap-1"
                v-for="conts in refrs.contacts"
              >
                <span v-if="conts.value" class="font-extrabold">
                  {{ conts.type }} :
                </span>
                <span v-if="conts.value" class="break-all">
                  {{ conts.value }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import moment from "moment";
import AvatarIcon from "@/components/avatar/avatarIcon.vue";
import SameModelExp from "./_partiel_prenium/model-one/sameModelExp.vue";
import HeadingModelOne from "./_partiel_prenium/model-one/headingModelOne.vue";
import CompetencePercentProgressBar from "./_partiel/competencePercentProgressBar.vue";

export default defineComponent({
  name: "",
  props: [
    "experience",
    "formation",
    "competence",
    "info",
    "references",
    "quality",
    'color'
  ],
  setup() {
    return {
      moment,
    };
  },
  components: {
    AvatarIcon,
    SameModelExp,
    HeadingModelOne,
    CompetencePercentProgressBar,
  },
});
</script>

<style scoped>
.about {
  line-height: 1.5em;
}
.main_cv_card * {
  box-sizing: border-box;
}
</style>
