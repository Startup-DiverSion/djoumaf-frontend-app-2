<template>
  <div class="flex flex-col py-2 gap-4 font-love">
    <div class="flex flex-col">
      <span class="text-lg font-bold"> {{ data?.poste }} </span>

      <div class="flex gap-1 text-base">
       
        <span class=""> {{ data.company_name }} </span>
        &#149;
        <span class=""> {{ data.type_contract.title }} </span>
      </div>

      <div class="flex items-center  gap-1 text-sm">
        <div class="flex items-center gap-2">
          <CalendarIcon class="h-4 opacity-40" />
        <span class="text-gray-600 capitalize"
          >{{ data.date_start_y }} - {{ data.date_finish_y }}</span
        >
        
        </div>
        <span v-if="data.date_many && data.date_many != '0.0'">&#149; {{ data.date_many }}</span>
      </div>

      <div class="flex items-center gap-2">
        <MapPinIcon class="h-4 opacity-40" />
        <span class="text-gray-600 capitalize">{{ data.workplace }} </span>
      </div>
    </div>

    <div class="text-sm font-light">
      {{ data.description }}
    </div>

    <div class="flex gap-2">
      <div v-for="skill in data.skill">
        <div class="border-[1px] rounded-full px-2 py-1 text-xs">
          {{ skill?.parameter?.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { CalendarIcon, MapPinIcon } from "@heroicons/vue/24/outline";

export default defineComponent({
  name: "profile-content-skills",
  props: ["data"],
  components: { CalendarIcon, MapPinIcon },
  setup() {},
});
</script>

<style scoped></style>
