<template>

  <NavigationHeader />

  

  <main class="my-20 lg:w-11/12 w-full flex gap-4 lg:gap-4 m-auto flex-col lg:justify-end lg:flex-row  ">

    <!--  -->
    <section class=" w-full hidden lg:flex flex-col lg:w-[23%]">
      <slot name="small" />
    </section>

    <!--  -->
    <section class="w-full lg:w-[82%]">
      <slot name="large" />
    </section>

    <!--  -->
    <!-- <section class="w-full lg:w-3/12">
      <slot name="middle" />
    </section> -->


  </main>

  <NavigationFooter />

<!-- <ChooseYourPreference /> -->
</template>
  
<script lang="ts">

const ChooseYourPreference= defineAsyncComponent(() =>
  import('@/components/toPages/Auth/chooseYourPreference.vue')
)
const NavigationFooter= defineAsyncComponent(() =>
  import('@/navigations/navigationFooter.vue')
)
import NavigationHeader from "@/navigations/navigationHeader.vue"
import { defineComponent , defineAsyncComponent, onBeforeMount, ref} from "vue";
import { useUserComposition } from "@/composables/user.composition"
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";


export default defineComponent({
  name: "auth-layout",
  props: [],
  setup() {
    const { USER, GET_USER } = useUserComposition();
    const jIsAuthenticate = ref(false);

onBeforeMount(async () => {
  const __store = new LocalSotreUtils();
  if (await __store.get("jUser")) {
    await GET_USER().then(() => {
      USER.value
        ? (jIsAuthenticate.value = true)
        : (jIsAuthenticate.value = false);
    });
  }
});
  },
  components: { NavigationHeader, NavigationFooter, ChooseYourPreference }
});
</script>
  
<style scoped>
.wih {
  @apply w-11/12;
  @apply lg:w-[90%]
}
</style>
  