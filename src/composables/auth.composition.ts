import { reactive, ref } from "vue";
import { AuthService } from "@/services/auth.services";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import axios from "axios";
import { Device } from "@capacitor/device";
import setAuthHheader from "@/app/setAuthHheader";

export const useAuthComposition = () => {
  // State Data
  const state = reactive({
    loading: false,
  });
  const router = useRouter();
  const route = useRoute();
  const isError = ref({});

  // Data input
  const inputData = reactive({
    email: "",
    password: "",
    signin_place: {},
    device: {},
  });

  const inputDataOnlyEmail = reactive({
    email: "",
  });
  const inputDataPassword = reactive({
    email: "",
    code: "",
    old_password: "",
    new_password: "",
  });
  const jStore = new LocalSotreUtils();
  const jCryto = new CryptUtils();

  // Log info
  const logInfo = async () => {
    try {
      const { data } = await axios.get("https://ipapi.co/json/");

      if (data.ip) {
        inputData.signin_place = data;
        inputData.device = await Device.getInfo();
      }
    } catch (error) {
      inputData.signin_place = {};
      inputData.device = await Device.getInfo();
    }
  };

  //
  const BASE_SIGN = async (AuthService: any, callback: Function) => {
    const __base = await AuthService;
    if (__base?.error) {
      state.loading = false;
      return (isError.value = __base?.error[0]);
    }

    callback(__base);
  };

  // Register
  const SignUp = async (e: any) => {
    state.loading = true;
    // Get the info on user
    await logInfo();

    return await BASE_SIGN(
      new AuthService().register(inputData),
      async (__base: any) => {
        if (__base?.data) {
          jStore.set("jToken", jCryto.qCrypt(__base?.data.user.token));
          jStore.set(
            "jProfileID",
            jCryto.qCrypt(`${__base?.data?.profile?.id}`)
          );
          jStore.set("jUserID", jCryto.qCrypt(`${__base?.data.user.id}`));
          state.loading = false;
        }

        router.replace({ name: "AuthProfileIndex" });
        
      }
    );
  };

  //Login
  const SignIn = async () => {
    state.loading = true;
    return await BASE_SIGN(
      new AuthService().login(inputData),
      async (__base: any) => {
        if (__base?.data) {
          jStore.set("jToken", jCryto.qCrypt(__base?.data.user.token));
          jStore.set("jUserID", jCryto.qCrypt(`${__base?.data.user.id}`));
          jStore.set(
            "jProfileID",
            jCryto.qCrypt(`${__base?.data.user.profile.id}`)
          );
          jStore.set(
            "jProfileSetp",
            jCryto.qCrypt(`${__base?.data.user.profile.lvl}`)
          );
          jStore.set("jUser", jCryto.qCrypt(JSON.stringify(__base?.data.user)));

          state.loading = false;
        }
        if(route.query.redirect){
          window.location.assign(`${route.query.redirect}`);
        }else{
          window.location.assign("/feeds");
        }
        
      }
    );
  };

  // Send Email
  const SignVerifyEmail = async () => {
    state.loading = true;
    return await BASE_SIGN(
      new AuthService().verifyEmail(inputDataOnlyEmail),
      () => {
        jStore.set("jEmail", jCryto.qCrypt(inputDataOnlyEmail.email));
        router.push({ name: "SignChangePassword" });
        state.loading = false;
      }
    );
  };

  // Change password
  const SignChangePassword = async (e: any) => {
    try {
      state.loading = true;
      await jStore.get("jEmail").then((el: any) => {
        if(el){
          inputDataPassword.email = jCryto.qDecrypted(el);
        state.loading = false;
        }
        
      });
  
      return await BASE_SIGN(
        new AuthService().changePassword(inputDataPassword),
        () => {jStore.clear();
          jStore.set("jPasswordChange", true);
          window.location.assign('/feeds');
        }
      );
    } catch (error) {
      state.loading = false;
    }
  };

  return {
    state,
    router,
    route,
    isError,
    inputData,
    inputDataPassword,
    inputDataOnlyEmail,
    SignUp,
    SignIn,
    SignVerifyEmail,
    SignChangePassword,
  };
};
