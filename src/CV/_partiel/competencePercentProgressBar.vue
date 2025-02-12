<template>
    <div class="flex items-center gap-x-2 w-full">
              <div class="flex w-[50%]">
                <span
                  class="text-[6px] uppercase font-bold break-all headingCvBasic"
                >
                  {{ item.libelle ? item.libelle : "xxxxx" }} 
                </span>
              </div>
              <div class="flex w-[50%] bg-gray-50 h-[3px]  relative">
                <p 
                  class=" h-[3px]  inline-flex absolute left-0" :class="color.bg"
                  :style="'width: ' + parseInt(item.per) + '%;'"
                ></p>
              </div>
            </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, defineAsyncComponent } from "vue";
  import moment from "moment";
  import AvatarIcon from "@/components/avatar/avatarIcon.vue";
  
  
  export default defineComponent({
    name: "",
    props: ["item", 'color'],
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
  