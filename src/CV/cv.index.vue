<template>
  <div
    class="flex gap-2 w-[105%] h-[60vh] overflow-auto main_cv_card font-love"
  >
    <CvDefault
      :experience="experience"
      :formation="formation"
      :competence="competence"
      :info="info"
      v-if="$route.params.id && $route.params.id == 'cv-gratuit-model-1'"
    />
    <CvPreniumFirrst
      :experience="experience"
      :formation="formation"
      :competence="competence"
      :references="references"
      :info="info"
      :quality="quality"
      v-if="$route.params.id && $route.params.id == 'cv-prenium-model-1'"
      :color="color"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CvDefault from "./cv.default.vue";
import CvPreniumFirrst from "./cv.prenium.frist.vue";

export default defineComponent({
  name: "",
  props: ["experience", "formation", "competence", "info", 'references', 'quality', 'color'],
  components: { CvDefault, CvPreniumFirrst },
});
</script>

<style scoped></style>
