<template>
  <div class="flex gap-1 ">
    <BtnDjoumer label="Djoumer" class="rounded-full " v-if="isDjoumer" />
  <BtnFollow
    :label="isFollowUser ? 'Suivis' : 'Suivre'" class="rounded-full " v-if="isFollow"
    @click="FOLLOW(id, data)"
    :isFollow="isFollowUser"
  />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, defineAsyncComponent } from "vue";
const BtnSimple= defineAsyncComponent(() =>
  import('@/components/buttons/btn.simple.vue')
)
const BtnFollow= defineAsyncComponent(() =>
  import('@/components/buttons/btn.follow.vue')
)
const BtnDjoumer= defineAsyncComponent(() =>
  import('@/components/buttons/btn.djoumer.vue')
)
import axios from "axios";
import { URL} from "@/router/url";
import { useCerleComposition} from "@/composables/cerle.composition";

export default defineComponent({
  name: "",
  props: ["id", "data", 'isDjoumer', 'isFollow'],
  components: {
    BtnDjoumer,
    BtnFollow,
  },
  setup(props) {
    const { FOLLOW, ISFOLLOW, isFollowUser } = useCerleComposition();

    onMounted(() => {
      ISFOLLOW(props.id);
    });

    return {
      FOLLOW,
      isFollowUser,
    };
  },
});
</script>

<style scoped></style>
