<template>
  <button
    @click="FOLLOW(data?.user.id, data)"
    :disabled="loading__follow"
    :class="[
      classeName,
      isFollowUser ? 'bg-red-400 ' : 'border-green-400 border-[1px] ',
    ]"
    class="font-love gap-0 font-bold flex items-center justify-center rounded-full"
  >
    <PlusSmallIcon
      v-if="!isFollowUser"
      class="h-4 text-green-400"
    />
    <!-- <CheckIcon
      v-else
      class="h-4 text-green-400"
    /> -->
    <span
      :class="[classeText, isFollowUser ? 'text-white ' : 'text-green-400']"
      class="font-bold"
    >
      {{ isFollowUser ? "Se désabonner" : "Suivre" }}
    </span>
  </button>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  defineAsyncComponent,
} from "vue";
import { useCerleComposition } from "@/composables/cerle.composition";
import { useUserComposition } from "@/composables/user.composition";
import { PlusIcon, PlusSmallIcon, CheckIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "btn-follow",
  props: {
    data: Object,
    label: String,
    classeName: {
      type: String,
      default: "px-2 py-2  ",
    },
    classeText: {
      type: String,
      default: "text-xs ",
    },
    isFollow: Boolean,
  },
  setup(props) {
    const isFollow = ref(false);
    const { FOLLOW, loading__follow, ISFOLLOW, isFollowUser } =
      useCerleComposition();
    const {} = useUserComposition();
    onMounted(() => {
      // ISFOLLOW(props.data?.user.id);
    });
    return {
      isFollow,
      FOLLOW,
      ISFOLLOW,
      loading__follow,
      isFollowUser,
    };
  },
  components: { PlusIcon, CheckIcon, PlusSmallIcon },
});
</script>

<style>

</style>
