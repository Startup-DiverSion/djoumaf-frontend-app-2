<template>
  <!-- Test -->

  <div class="w-[25%] h-[96vh] bg-gray-100 flex flex-col gap-2">
    <div class="flex w-full justify-center p-1">
      <div class="flex w-20 h-20 justify-center p-1">
        <img
          class="w-full h-full bg-slate-500 rounded-full object-cover"
          v-lazy="info.image[0]"
          alt=""
        />
      </div>
    </div>

    <!-- Contacter moi -->
    <div class="flex flex-col px-2">
      <span
        class="text-[8px] font-bold underline uppercase mt-1 underline-offset-2 break-all"
        >Contactez moi</span
      >

      <div class="flex flex-col gap-1 mt-2">
        <div v-for="(item, index) in Object.keys(info.me)">
          <div class="flex" v-if="info.me[item]">
            <!-- <AvatarIcon :path="item" className="h-3" /> -->
            <span class="text-[8px] break-all">
              {{ info.me[item] ? info.me[item] : "" }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- A Propos -->
    <div class="flex flex-col px-2">
      <span
        class="text-[8px] font-bold underline uppercase underline-offset-2 break-all"
        >A propos</span
      >

      <div class="flex mt-2">
        <span class="flex text-[8px] about break-all"
          >{{
            info.about
              ? info.about
              : "xxxxx xxxxx xxxxx  xxxxxxxx xxxxxxxxx xxxxx xxxxxxxxxxxxxx xxxxxxxxxxx"
          }}
        </span>
      </div>
    </div>

    <!-- Centre d'interêt -->
    <div class="fex flex-col px-2" v-if="info.hobit">
      <span
        class="text-[8px] font-bold underline uppercase underline-offset-2 break-all"
        >Centre d'interêt</span
      >

      <div v-for="item in info.hobit">
        <div class="flex">
          <span class="text-[8px]"> {{ item.title }} </span>
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
  <div class="w-[75%] pt-2 flex flex-col gap-2 divide-y-2">
    <!-- Nom & fonction -->
    <div class="flex flex-col">
      <span class="text-xl font-black">
        {{ info.lastname || info.firstname ? `${info.firstname} ${info.lastname}` : "xxxxx xxxxx" }}
      </span>
      <span class="text-[8px]">{{
        info.profession ? info.profession : "xxxxx xxxxx"
      }}</span>
    </div>

    <!-- Nom & fonction -->
    <div class="flex flex-col gap-1 pt-2 hidden">
      <div class="bg-blue-800 flex">
        <div
          class="flex text-[10px] font-bold px-2 uppercase tracking-widest text-white headingCvBasic"
        >
          Profile
        </div>
      </div>
      <span class="text-[8px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas officiis,
        hic suscipit eligendi est reprehenderit debitis sapiente.
      </span>
    </div>

    <!-- Nom & fonction -->
    <div class="flex flex-col gap-3 pt-2" v-if="experience">
      <div class="bg-blue-800 flex items-center">
        <span
          class="text-[10px] font-bold px-2 uppercase text-white headingCvBasic"
        >
          Experience
        </span>
      </div>

      <!-- Defined All Experience -->
      <div class="flex flex-col" >
        <div v-for="expToHtml in experience">
          <div class="flex items-start gap-2">
            <div class="flex items-center bg-blue-800 relative px-2">
              <span
                class="text-[8px] uppercase font-bold text-white headingCvBasic"
              >
                {{ moment(expToHtml.date_start).format("YYYY") }}
              </span>
            </div>

            <div class="flex flex-col px-1 border-l-[2px] border-blue-800 pb-2">
              <!-- Bullet -->
              <span
                class="flex w-2 h-2 absolute top-0 -left-[5px] bg-blue-800 rounded-full"
              ></span>
              <span class="text-[10px]"
                >{{ moment(expToHtml.date_start).format("YYYY") }} -
                {{ moment(expToHtml.date_fin).format("YYYY") }}</span
              >
              <span class="text-[10px] uppercase font-bold break-all">
                {{
                  expToHtml.type_exp ? expToHtml.type_exp : "xxxxx xxxxx xxxxx"
                }}
              </span>
              <span class="text-[8px]">
                {{
                  expToHtml.description
                    ? expToHtml.description
                    : `Lorem ipsum dolor sit amet consectetur adipisicing um dolor
                  sit ameum dolor sit ame elit`
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nom & formation -->
    <div class="flex flex-col gap-3 pt-2" v-if="formation">
      <div class="bg-blue-800 flex">
        <div
          class="flex text-[10px] font-bold px-2 uppercase tracking-widest text-white headingCvBasic"
        >
          Formation
        </div>
      </div>

      <div class="grid grid-cols-2 h-auto gap-4">
        <div v-for="forToHtml in formation">
          <div class="flex flex-col">
            <div class="flex border-b-2 py-1">
              <span class="text-[10px] uppercase font-bold break-all">
                {{ forToHtml.school ? forToHtml.school : "xxxxx xxxxx xxxxx" }}
              </span>
            </div>
            <span class="text-[8px]">{{
              forToHtml.description
                ? forToHtml.description
                : `Lorem ipsum dolor sit amet consectetur adipisicing um dolor
                  sit ameum dolor sit ame elit`
            }}</span>
            <span class="text-[8px] font-semibold">
              {{ moment(forToHtml.date_start).format("YYYY") }} -
              {{ moment(forToHtml.date_fin).format("YYYY") }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Competence-->
    <div class="flex flex-col gap-3 pt-2" v-if="competence">
      <div class="bg-blue-800 flex">
        <div
          class="flex text-[10px] font-bold px-2 uppercase tracking-widest text-white headingCvBasic"
        >
          Competence
        </div>
      </div>

      <div class="grid grid-cols-2 h-auto gap-4">
        <div v-for="compToHtml in competence">
          <div class="flex items-start gap-x-2">
            <div class="flex max-w-[50%]">
              <span
                class="text-[8px] uppercase font-bold break-all headingCvBasic"
              >
                {{ compToHtml.libelle ? compToHtml.libelle : "xxxxx" }}
              </span>
            </div>
            <div class="flex w-[50%] bg-gray-50 h-2 rounded-full relative">
              <p
                class="bg-blue-500 h-2 rounded-full inline-flex absolute left-0"
                :style="'width: ' + parseInt(compToHtml.per) + '%;'"
              ></p>
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

export default defineComponent({
  name: "",
  props: ["experience", "formation", "competence", "info"],
  setup() {
    return {
      moment,
    };
  },
  components: { AvatarIcon },
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
