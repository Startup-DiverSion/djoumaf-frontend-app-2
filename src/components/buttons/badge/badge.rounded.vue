<template>
  <div
    @click="fun()"
    class="flex px-2 py-1 rounded-full font-love text-[0.65rem] font-bold items-center justify-center"
    :class="[bgColor, textColor]"
  >
   <TextQuery :title="label" :sm="40"
          :md="30"
          :lg="30"
          :xl="30" />
  </div>
</template>

<script lang="ts">
import TextQuery from "@/components/texts/text.query.vue";
import { defineComponent , defineAsyncComponent} from "vue";

export default defineComponent({
    name: "Badge-rounded",
    props: {
        bgColor: String,
        textColor: {
            type: String,
            default: "text-white",
        },
        label: String,
        func: {
            type: Function,
            default: () => { },
        },
    },
    setup(props) {
        const fun = () => {
            props.func();
        };
        return {
            fun,
        };
    },
    components: { TextQuery }
});
</script>

<style scoped></style>
