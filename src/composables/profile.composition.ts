import { reactive, ref, computed } from "vue";
import { ProfileService } from "@/services/profile.services";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { AuthValidate } from "@/vendors/validators/auth.validate";
import { useProfileStore } from "./../stores/profile.store";
import ToastIndex from "@/toastifications/toast.index.vue";
import { createToast, withProps } from "mosha-vue-toastify";
import { NotifUtils } from "@/vendors/utils/notif.utils";

export const useProfileComposition = () => {
  // State Data
  const state = reactive({
    loading: false,
    loading_create_profile: false,
    step: 1,
  });
  const router = useRouter();
  const route = useRoute();
  const isError = ref({ path: "", message: "" });
  const checkedNames = ref([]);
  const slectedTypeUser: any = ref([]);
  const slectedFieldActivity: any = ref([]);
  const slectedCenter: any = ref([]);
  const slectedCarrier: any = ref([]);
  const profile = ref({});

  // Data input
  const inputData = reactive({
    first_name: "",
    last_name: "",
    bio: "",
    description: "",
    image: "",
  });

  const jStore = new LocalSotreUtils();
  const jUseStore: any = useProfileStore();
  const jCryto = new CryptUtils();
  const jPofileValidate = new AuthValidate();

  //
  const BASE_PROFILE = async (AuthService: any, callback: Function) => {
    const __base = await AuthService;
    if (__base?.error) {
      state.loading = false;
      return (isError.value = __base?.error[0]);
    }

    callback(__base);
  };

  const pylk: any = computed(() => {
    return {
      preferenceData_typeUser: jUseStore.preferenceData_typeUser,
      preferenceData_fieldActivity: jUseStore.preferenceData_fieldActivity,
      preferenceData_centerInteret: jUseStore.preferenceData_centerInteret,
      preferenceData_carrier: jUseStore.preferenceData_carrier,
    };
  });

  const profiles: any = ref();
  const profilesCompany = ref();
  const loading_profile = ref(false);
  const loading_profile_company = ref(false);

  const getAllProfile = async (args?: any) => {
    let defaults = { loading: loading_profile.value, data: profiles, query: null };
    let _ = Object.assign(defaults, args);

    _.loading.value = true;

    return await BASE_PROFILE(
      new ProfileService().index(_.query),
      (__base: any) => {
        if (__base?.data) {
          _.loading.value = false;
          _.data.value = __base?.data.reverse();
        }
      }
    );
  };

  // Created Profile user
  const ProfileCreate = async () => {
    try {
      const preferenceDataCheck = [
        "preferenceData_typeUser",
        "preferenceData_fieldActivity",
        "preferenceData_centerInteret",
        "preferenceData_carrier",
      ];

      var myData = Object.keys(pylk.value).map((key) => {
        return pylk.value[key];
      });

      const errorPreference: any = [];

      myData.forEach((el: any, index) => {
        if (el.length === 0) {
          errorPreference.push({
            path: preferenceDataCheck[index],
            message: "Veillez selectionner au moins une option",
          });

          return errorPreference;
        }
      });

      if (errorPreference.length !== 0) {
        new NotifUtils().simple(
          "Erreur",
          `Veillez selectionner au moins une option de chaque`,
          "danger"
        );
        isError.value = errorPreference[0];
        return { err: errorPreference[0] };
      } else {
        let preferenceData: any = [];
        myData.forEach((el: any, index) => {
          preferenceData = preferenceData.concat(el);
        });

        // Data In Meta
        const inputDataForm = new FormData();
        inputDataForm.append(
          "id",
          jCryto.qDecrypted(await jStore.get("jProfileID"))
        );
        inputDataForm.append(
          "userID",
          jCryto.qDecrypted(await jStore.get("jUserID"))
        );
        inputDataForm.append(
          "type_user",
          pylk.value.preferenceData_typeUser[0]
        );
        inputDataForm.append("first_name", inputData.first_name);
        inputDataForm.append("last_name", inputData.last_name);
        inputDataForm.append("bio", inputData.bio);
        inputDataForm.append("description", inputData.description);
        inputDataForm.append(
          "preferenceID",
          JSON.stringify({ pref: preferenceData })
        );
        const files: any = document.getElementById("id-files-profile");
        for (let i = 0; i < files?.files.length; i++) {
          inputDataForm.append("file", files?.files[i]);
        }

        state.loading_create_profile = true;

        return await BASE_PROFILE(
          new ProfileService().finalizeCreateProfil(inputDataForm),
          async (__base: any) => {
          
            if (__base?.data) {
              // Storage Termined configuration of profile
              jStore.set(
                "jProfileSetp",
                jCryto.qCrypt(`${__base?.data?.user?.profile?.lvl}`)
              );

              // Storage information on profile
              jStore.set(
                "jUser",
                jCryto.qCrypt(JSON.stringify(__base?.data.user))
              );

              state.loading_create_profile = false;


              jStore.clear()
              jStore.set("jNewProfileCreate", true);
              jStore.set("jNewProfileCreateForMail", true);
              window.location.assign("/auth/sign-in");
            }

            if(__base?.error){
              jStore.clear()
              state.loading_create_profile = false;
            }

            // router.replace({ name: "Jobs" });
          }
        );
      }
    } catch (error) {
      jStore.clear()
      state.loading_create_profile = false;
    }
  };

  // Verify The filed of first step
  const VerifyFiledStep__one = async () => {
    return await BASE_PROFILE(
      new ProfileService().validator(inputData),
      (__base: any) => {
        isError.value = { path: "", message: "" };
        jUseStore.setpOfCreation = jUseStore.setpOfCreation + 1;
      }
    );
  };

  // Get profile of user connected
  const loading_profile_slug = ref(false);
  const profileShow = async () => {
    loading_profile_slug.value = true;
    return await BASE_PROFILE(
      new ProfileService().show({
        id: jCryto.qDecrypted(await jStore.get("jProfileID")),
      }),
      (__base: any) => {
        if (__base?.data) {
          profile.value = __base?.data;
         
          loading_profile_slug.value = false;
        }
      }
    );
  };

  // Get profile of user connected
  const profileShowSlug = async (slug: any) => {
    loading_profile_slug.value = true;
    return await BASE_PROFILE(
      new ProfileService().showWihSlug({
        slug: slug,
      }),
      (__base: any) => {
        if (__base?.data) {
          profile.value = __base?.data;
          useProfileStore().dataProfile = __base?.data;
          console.log(useProfileStore().dataProfile)
          loading_profile_slug.value = false;
        }
      }
    );
  };

  return {
    state,
    router,
    route,
    isError,
    inputData,
    ProfileCreate,
    VerifyFiledStep__one,
    checkedNames,
    profileShow,
    profileShowSlug,
    profile,
    slectedTypeUser,
    slectedFieldActivity,
    slectedCenter,
    slectedCarrier,
    loading_profile_slug,
    getAllProfile,
    loading_profile,
    profiles,
    profilesCompany,
    loading_profile_company,
  };
};
