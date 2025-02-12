<template>
  <div :class="classeName"
    class=" modal-close w-full h-full bg-gray-700/50 fixed left-0 top-0 z-40  flex  items-center justify-center font-love "
  >
    <div class="bg-white lg:w-7/12 xl:w-6/12 w-full h-full lg:h-[90vh] lg:rounded-md ">
      <!-- Header Modal -->
      <div
        class="flex justify-between items-center py-4 px-5 m-auto border-b-[1px]"
      >
        <!-- Title Modal -->
        <span class="text-xl font-bold"> {{ title }} </span>

        <!-- Close Modal -->
        <div class="bg-gray-100 p-2 rounded-full cursor-pointer" @click="modal">
          <XMarkIcon class=" h-5" />
        </div>
      </div>

      <div class="h-[85%]">
        <slot />
      </div>

      <div class="absolute bottom-0 w-full bg-white rounded-b-md z-10">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";
import { useModal } from "@/components/modals/modal.services";
import { XMarkIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
    name: "modal-layout",
    props: {
        title: {
            type: String,
        },
        classeName: {
            type: String,
            default: "modal hidden "
        }
    },
    setup() {
        const { modal } = useModal();
        return { modal };
    },
    components: { XMarkIcon }
});
</script>

<style scoped></style>
