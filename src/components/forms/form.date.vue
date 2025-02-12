<template>
  <div class="w-full flex relative top-0  flex-col">
    <flat-pickr
    :name="name"
      :value="modelValue"
      :config="config"
      v-model="date"
      @input="(event:any) => {
          $emit('update:modelValue', event);
        }
      "
      class="w-full px-4 py-3 outline-none rounded-md font-love text-base border-[0.5px] focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:border-2 first-letter:capitalize"
    />

    <label v-if="toDay" class="inline-flex items-center absolute right-0 top-0 gap-1 font-love font-bold bg-slate-200/90 h-[3.2rem] rounded-r-md px-2">
      <span class="ml-2 text-sm font-bold">En cours</span>
      <input type="checkbox" :id="name" class="w-4 h-4 rounded"  >
    </label>

    <span class="text-sm font-love text-red-500 mt-1 mx-1" v-if="errorInput.path === name"> {{ errorInput.message }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import flatPickr from "vue-flatpickr-component";
import flatpickr from "flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";

export default defineComponent({
  name: "form-date",
  components: { flatPickr },
  props: {
    modelValue: {
      type: String,
      default: moment().add(1, "month"),
    },
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
    data: Array,
    toDay: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {}) {
    const datePassOneMonth: any = props.modelValue;
    const date = ref(new Date(datePassOneMonth));
    const config = {
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      locale: French,
    };

    onMounted(() => {});
    return {
      date,
      config,
    };
  },
});
</script>

<style>
.dp__pointer {
  border: none !important;
}
</style>
