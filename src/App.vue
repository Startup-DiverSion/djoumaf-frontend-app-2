<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { onMounted, computed, defineComponent } from "vue";
import { useToastStore } from "./stores/toast";
import { LocalSotreUtils } from "./vendors/utils/localStore.utils";
import ToastIndex from "@/toastifications/toast.index.vue";
import { createToast, withProps } from "mosha-vue-toastify";
import { useNavigationStore } from "./stores/navigations";
import { NotifUtils } from "./vendors/utils/notif.utils";
import { useRoute } from "vue-router";
import { envConfig } from "./env.config";
import { useUserComposition } from "./composables/user.composition";
import { getCurrentInstance } from "vue";
import { useProgress } from "@marcoschulte/vue3-progress";
let self: any;

export default defineComponent({
  name: "app",
  props: [],
  created() {
    self = this;

    //  hook the progress bar to start before we move router-view
    self.$router.beforeEach((to: any, from: any, next: any) => {
      //  start the progress bar
      self.progress = useProgress().start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    self.$router.afterEach((to: any, from: any) => {
      //  finish the progress bar
      setTimeout(() => {
        self.progress.finish();
      }, 3500);
    });
  },
  setup() {
    let progress: any;

    const starter_app = computed(() => {
      return useNavigationStore().starter_app;
    });

    onMounted(async () => {
      window.scrollTo(0, 0);

      //  [App.vue specific] When App.vue is first loaded start the progress bar

      progress = useProgress().start();

      setTimeout(async () => {
        progress.finish();
      }, 3500);

      const StoreUtil = new LocalSotreUtils();
      const { GET_USER_GLOBAL } = useUserComposition();
      const route = useRoute();

      GET_USER_GLOBAL();

      // Profile create and user is new on Djoumaf
      if (await StoreUtil.get("jNewProfileCreate")) {
        new NotifUtils().newUser(20000);
        StoreUtil.remove("jNewProfileCreate");
      }
      if (
        (await StoreUtil.get("jNewProfileCreateForMail")) &&
        !window.location.pathname.includes("auth")
      ) {
        new NotifUtils().emailComfirm(20000);
        StoreUtil.remove("jNewProfileCreateForMail");
      }
      if (await StoreUtil.get("jEmailComfirm")) {
        new NotifUtils().emailComfirmTrue(10000);
        StoreUtil.remove("jEmailComfirm");
      }

      // Password Change
      if (await StoreUtil.get("jPasswordChange")) {
        new NotifUtils().custom(
          "Succès",
          "Mot de password modifier avec succès.",
          "lock",
          "green-400"
        );
        StoreUtil.remove("jPasswordChange");
      }

      // Defined Update app
      if (
        (await StoreUtil.get("jVersion_app")) &&
        (await StoreUtil.get("jVersion_app")) != envConfig().VERSION_APP
      ) {
        await StoreUtil.remove("jVersion_app");
        window.location.reload();
      } else {
        await StoreUtil.set("jVersion_app", envConfig().VERSION_APP);
      }

      // Info Display
      if (!(await StoreUtil.get("jInfo"))) {
        await StoreUtil.set("jInfo", "1");
      }
    });

    //Quit All dropdown
    window.addEventListener("click", () => {
      const dropdownAll = document.querySelectorAll(".df-dropdwon-content");
      dropdownAll.forEach((el: any) => {
        !el.classList.contains("hidden") ? el.classList.add("hidden") : "";
      });
    });

    window.addEventListener("load", () => {
      setTimeout(() => {
        useNavigationStore().starter_app = false;
      }, 3000);
    });

    return { starter_app, progress };
  },
});
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content} | DjoumAf` : `SITE_NAME`
    }}</template>
    <template v-slot:StyleSheetList="{ content }">{{ content }}</template>
  </metainfo>
  <header />

  <main class="start_app_djoumaf">
    <div class="fixed bg-gray-100 w-screen h-screen"></div>
    <RouterView v-if="!starter_app" />

    <div class="fixed bg-white w-screen h-screen" v-if="starter_app">
      <div class="flex w-full h-full justify-center items-center">
        <div class="h-16">
          <img class="w-full h-full" src="/images/logo.png" alt="" />
        </div>
      </div>
    </div>
  </main>

  <footer />
  <vue3-progress-bar></vue3-progress-bar>
</template>

<style></style>
