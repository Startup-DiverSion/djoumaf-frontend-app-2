<template>
  <section class="flex flex-col gap-4">
    <div class="flex border-b-[1px] py-1 gap-2">
      <span class="font-love text-base font-medium"> {{ title }} </span>
      <span v-if="isError.path === name" class="text-red-500">
        {{ isError.message }}
      </span>
    </div>

    <div class="flex flex-col px-0">
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(item, index) in DisplayData.slice(0, upCount)"
          :key="index"
        >
          <input
            type="checkbox"
            :id="name + index"
            :name="name + index"
            :value="item.id"
            class="hidden"
            @input="preferenceFun"
          />

          <label
            :for="name + index"
            class="flex items-end w-auto h-auto rounded-full text-center border-[1px] p-2 opacity-70"
            :class="
              modelValue.includes(item.id) === true
                ? 'border-blue-800 bg-blue-800/20'
                : ''
            "
          >
            <span class="text-sm font-medium"> {{ item.title }} </span>
          </label>
        </div>
      </div>

      <div class="mt-2 font-bold flex justify-between" v-if="isSearch == true">
        <div class="">
          <button
            v-if="DisplayData.length >= upCount"
            type="button"
            class="bg-gray-100 rounded-full text-xs p-2"
            @click="upCount = upCount + 5"
          >
            <span> Voir Plus </span>
          </button>
        </div>

        <div
          class="bg-gray-100 rounded-full text-xs p-2 lg:w-5/12 w-7/12 flex items-center"
        >
          <input
            type="search"
            @input="SearchInData"
            class="w-11/12 h-5 px-1 bg-gray-100 rounded-full"
            placeholder="Rechercher..."
          />
          <MagnifyingGlassIcon class="h-4" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import {
  defineComponent,
  reactive,
  ref,
  defineAsyncComponent,
  computed,
  onMounted,
} from "vue";

export default defineComponent({
  name: "card-to-choose",
  props: [
    "title",
    "data",
    "id",
    "type",
    "modelValue",
    "name",
    "preferenceFun",
    "isError",
    "isSearch",
  ],
  setup(props) {
    const selectPreference: any = reactive({
      one: [],
    });
    const ths = ref("");
    const upCount = ref(10);
    const selectPreferenceUser = (select: any, type: any) => {
      if (selectPreference.one.length !== 0) {
        selectPreference.one.forEach((el: any, index: any) => {
          select.active = false;
          if (el.id === select.id) {
            selectPreference.one.splice(index, 1);
          }
        });
      } else {
        select.active = true;
        selectPreference.one.push(select);
      }
    };

    const DisplayData: any = ref([]);

   
      setTimeout(() => {
        DisplayData.value = props.data;
      }, 500);
   

    const SearchInData = (e: any) => {
      DisplayData.value = props.data.filter((el: any) => {
        return el.title
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase());
      });
    };
    return { selectPreferenceUser, ths, upCount, SearchInData, DisplayData };
  },
  components: { MagnifyingGlassIcon },
});
</script>

<style scoped></style>
