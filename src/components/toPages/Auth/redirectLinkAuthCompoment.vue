<template>
<div class="flex gap-x-2 justify-center items-center font-love transition-all duration-1000" >
          <span class="text-sm font-light">
            {{
                quiz
            }}
          </span>
          <RouterLink :to="{
            name: routeLink,
          }" class=" text-xs font-bold rounded-full text-green-600 hover:underline font-love uppercase">
            {{
    routeLabel
            }}
          </RouterLink>
        </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "SignIn",
  props: ["routeName", "quiz", 'routeLink', 'routeLabel'],
  setup() {
    const router = useRouter();
    const route = useRoute();
    return {
      router,
      route,
    };
  },
});
</script>

<style scoped></style>
