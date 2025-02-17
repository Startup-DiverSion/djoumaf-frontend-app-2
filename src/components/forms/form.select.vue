<template>
  <div class="flex flex-col w-full relative select group transition duration-300 ease-out">
    <TextLabel :id="'in-' + name" :title="label" v-if="label" />

    <!--     

    <input
      class="w-full px-4 py-3 outline-none rounded-md font-love text-base border-[0.5px] focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:border-2"
      :name="name"
      :id="'in-' + name"
      :placeholder="placeholder"
      :type="type"
      @click.stop="selectFunc"
    />

    <div
      :class="'in-' + name"
      class="select-options h-[100px] w-full shadow-lg absolute hidden top-14 z-10 bg-white rounded-md "
    >
      <span></span>
    </div> -->
    <!-- <v-select  @input="select" :options="data" label="title" ></v-select> -->

    <select
      :value="modelValue"
      @input="
        (event) => {
          $emit('update:modelValue', event)
        }
      "
      :name="name"
      :id="'in-' + name"
      class="w-full px-4 py-3 outline-none rounded-md font-love text-base border-[0.5px] focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:border-2"
    >
      <!-- <option value="placeholder"> {{placeholder}} </option> -->
      <option :value="item.id" v-for="(item, index) in data">{{ item.title }}</option>
    </select>
    <span v-if="errorInput.path === name"> {{ errorInput.message }} </span>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from 'vue'
import TextLabel from '../texts/text.label.vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
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
    default: 'search',
  },
  data: Array<any>,
})
const select = (event: any) => {
  console.log(event)
  emit('update:modelValue', event)
}
const selectFunc = (e: any) => {
  const e_target_id = document.querySelectorAll('.' + e.target.id)

  console.log(e.target.id)
  const select_options = document.querySelectorAll('.select-options')
  select_options.forEach((el: any) => {
    el.classList.add('hidden')
  })
  e_target_id.forEach((el) => {
    el.classList.remove('hidden')
  })
}

window.addEventListener('click', () => {
  const select_options = document.querySelectorAll('.select-options')
  select_options.forEach((el: any) => {
    el.classList.add('hidden')
  })
})
</script>

<style scoped></style>
