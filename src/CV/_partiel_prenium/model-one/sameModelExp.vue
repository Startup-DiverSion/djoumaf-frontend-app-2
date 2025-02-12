<template>
    

      <div class="flex flex-col gap-3 ">
       

        <HeadingModelOne :titleName="titleName"/>
  
        <!-- Defined All Experience -->
        <div class="flex flex-col">
          <div v-for="(item, index) in data">
            <div class="flex items-start gap-2">
              <div class="flex flex-col  relative px-2 w-[25%]">
                <span
                  class="text-[6px] uppercase font-bold text-gray-700 headingCvBasic"
                >
                {{ moment(item[inData[0]]).format("YYYY") }} -
                {{ moment(item[inData[1]]).format("YYYY") }}
                </span>
                <span class="text-[6px] uppercase font-bold headingCvBasic"
                  >{{ item[inData[2]] ? item[inData[2]] : "xxxxx" }}</span
                >
              </div>
  
              <div class="flex flex-col px-1 border-l-[2px] border-gray-400 pl-2 w-[75%]" :class="data.length == index+1 ? ' ' : 'pb-2 '">
                <!-- Bullet -->
                <span
                  class="flex w-2 h-2 absolute top-0 -left-[5px]  rounded-full" :class="'bg-'+color"
                ></span>
                <span class="text-[10px] uppercase font-extrabold"
                  >{{ item[inData[3]] ? item[inData[3]] : "xxxxx xxxxx xxxxx" }}</span
                >
                <span class="text-[8px] font-bold opacity-80 break-all">
                  {{
                    item[inData[4]] ? item[inData[4]] : "xxxxx xxxxx xxxxx"
                  }}
                </span>
                <span class="text-[8px]">
                  {{
                    item[inData[5]]
                      ? item[inData[5]]
                      : `Lorem ipsum dolor sit amet consectetur adipisicing um dolor
                    sit ameum dolor sit ame elit`
                  }}
                </span>
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
import HeadingModelOne from "./headingModelOne.vue";
  
  export default defineComponent({
    name: "",
    props: ["data", "titleName", 'inData', 'color'],
    setup() {
      return {
        moment,
      };
    },
    components: { AvatarIcon, HeadingModelOne },
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
  