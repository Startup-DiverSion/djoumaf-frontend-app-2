<template>
  <label
    v-if="USER?.id === data?.user?.id"
    :for="name + 'in-input'"
    class="absolute z-10 bg-white rounded-full w-8 h-8 flex place-content-center place-items-center cursor-pointer"
    :class="classname"
  >
    <PencilIcon class="fi fi-sr-pencil text-base flex h-5"></PencilIcon>
  </label>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from "vue";
import { useUserComposition } from "@/composables/user.composition";
import { PencilIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
    name: "edit-compoments",
    props: ["classname", "name", "data"],
    setup() {
        const { GET_USER, USER } = useUserComposition();
        onMounted(async () => {
            await GET_USER();
        });
        return {
            USER,
        };
    },
    components: { PencilIcon }
});
</script>

<style scoped></style>
