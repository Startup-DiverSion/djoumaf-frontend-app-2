<template>
  <div class="flex flex-col w-full">
    <TextLabel :id="'in-' + name" :title="label" class-name="text-base" v-if="label" />

    <input
      class="w-full px-4 py-3 only-input  outline-none rounded-md font-love text-base border-[0.5px] placeholder:opacity-70 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:border-2"
      :class="[type === 'number' ? 'tracking-[0.5rem] text-center flex justify-center' : '', classIn]"
      :name="name"
      :value="modelValue"
      @input="
        (event:any) => {
          $emit('update:modelValue', event);
        }
      "
      :id="'in-' + name"
      :placeholder="placeholder"
      :type="type"
    />
    <span class="text-xs font-bold font-love text-red-500 mt-1 mx-1" v-if="errorInput.path === name"> {{ errorInput.message }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from "vue";
import TextLabel from "../texts/text.label.vue";

export default defineComponent({
  name: "SignUp",
  props: {
    classIn: String,
    modelValue: String,
    label: String,
    name: String,
    placeholder: String,
    errorInput: {
      type: Object,
      default: {},
    },
    type: {
      type: String,
      default: "text",
    },
  },
  setup(props, {}) {
    return {};
  },
  components: { TextLabel },
});
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
