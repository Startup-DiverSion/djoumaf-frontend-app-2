<template>
  <div class="flex absolute left-48 z-10 top-3">
    <!-- Display Color choose -->
    <div class="border-[1px] px-2 py-1 w-14 rounded-full flex items-center justify-between" @click="open ? open = false : open = true">
        <div class="inline-flex w-4 h-4 rounded-sm" :class="CooColor.bg" ></div>
        <i class="ri-arrow-down-s-line flex"></i>
    </div>

    <!-- Select Color -->
    <div class="grid grid-cols-4 absolute top-8 z-10 bg-gray-50 rounded-md p-2 w-44" v-if="open">
      
        <div v-for="color in OptionColorDataCv" class="inline-flex w-full h-8" :class="color.bg" @click="ChooseColorCv(color)" ></div>
    
    </div>
  </div>
</template>

<script lang="ts">
const OnlyInput = defineAsyncComponent(
  () => import("@/components/forms/onlyInput.vue")
);
const HomeTwoLayout = defineAsyncComponent(
  () => import("@/layouts/HomeTwoLayout.vue")
);
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  defineAsyncComponent,
} from "vue";

const formSelect = defineAsyncComponent(
  () => import("@/components/forms/form.select.vue")
);
const formDate = defineAsyncComponent(
  () => import("@/components/forms/form.date.vue")
);

const CvIndex = defineAsyncComponent(() => import("@/CV/cv.index.vue"));
import { usePreferenceComposition } from "@/composables/preference.composition";
import VueSelect from "vue-select";
import BtnRemove from "@/components/buttons/btn.remove.vue";
import BtnAdd from "@/components/buttons/btn.add.vue";
import AvatarIcon from "@/components/avatar/avatarIcon.vue";

export default defineComponent({
  name: "",
  components: {
    HomeTwoLayout,
    OnlyInput,
    formSelect,
    formDate,
    CvIndex,
    VueSelect,
    BtnRemove,
    BtnAdd,
  },
  props: ["OptionColorDataCv", "ChooseColorCv", 'CooColor'],
  setup(props) {
    
    const open = ref(false)
    return {
        open
    };
  },
});
</script>

<style scoped>
label {
  @apply text-[13px];
  @apply font-bold;
  @apply opacity-80;
}
.triangle {
  width: 0;
  height: 0;
  border: 0 solid transparent;
  border-right-width: 10px;
  border-left-width: 10px;
  border-bottom: 12px solid;
}
</style>
