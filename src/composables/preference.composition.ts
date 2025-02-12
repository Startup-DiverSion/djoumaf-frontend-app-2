import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { PreferenceService } from "@/services/preference.services";

export const usePreferenceComposition = () => {
  // State Data
  const state = reactive({
    loading: false,
    step: 1,
  });
  const router = useRouter();
  const route = useRoute();
  const isError = ref({ path: "", message: "" });
  const parameter = reactive({
    all: [],
    userType: [],
    centerOfInterest: [],
  });
  const checkedNames:any = ref([])

  const jStore = new LocalSotreUtils();
  const jCryto = new CryptUtils();

  //
  const BASE_PROFILE = async (AuthService: any, callback: Function) => {
    state.loading = true;
    const __base = await AuthService;
    if (__base?.error) {
      state.loading = false;
      return (isError.value = __base?.error[0]);
    }

    callback(__base);
    state.loading = false;
  };

  const getAllParameter = async () => {
    return await BASE_PROFILE(
      new PreferenceService().getAll(),
      (__base: any) => {
        
        parameter.all = __base?.data.parameter;
        
      }
    );
  };

  // Get all type de user in the database
  let __userType:any = ref([]) 
  const preferenceData =  (query: number) => {
    let __parameter: any = [];
    __parameter = parameter.all.filter((parameter: any) => {
      return parameter.type_parameter.id === query;
    });

    __parameter.forEach((el:any) => {
        el.active = false
    })
    return __parameter;
  };

  const userType = () => __userType.value = preferenceData(4)


  return {
    state,
    router,
    route,
    isError,
    parameter,
    getAllParameter,
    preferenceData,
    userType,
    __userType,
    checkedNames
  };
};
