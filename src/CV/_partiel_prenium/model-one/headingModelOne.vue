<template>
  <div class=" flex items-center border-b-[1px]" :class="className ? '' : 'text-gray-700'">
    <span class="text-[9px] font-bold uppercase headingCvBasic">
      {{ titleName }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import moment from "moment";
import AvatarIcon from "@/components/avatar/avatarIcon.vue";


export default defineComponent({
  name: "",
  props: ["titleName", 'className'],
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
