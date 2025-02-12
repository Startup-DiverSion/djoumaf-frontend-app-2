<template>
  <div
    class="absolute -top-10 right-0 cursor-pointer"
    @click="openMenu(type)"
    v-if="USER?.id === data?.user?.id"
  >
    <PlusCircleIcon class=" h-6"></PlusCircleIcon>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from "vue";
import { useUserComposition } from "@/composables/user.composition";
import { useModalComposition } from "@/composables/modal.composition";
import { PlusCircleIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
    name: "add-compoments",
    props: ["type", "data"],
    setup() {
        const { openMenu } = useModalComposition();
        const { GET_USER, USER } = useUserComposition();
        onMounted(async () => {
            await GET_USER();
        });
        return {
            USER,
            openMenu,
        };
    },
    components: { PlusCircleIcon }
});
</script>

<style scoped></style>
