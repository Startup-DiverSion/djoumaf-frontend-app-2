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
import axios from "axios";
import { useModal } from "@/components/modals/modal.services";

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
  const {modal} = useModal()

  //
  const BASE_PROFILE = async (AuthService: any, callback: Function) => {
    const __base = await AuthService;
    if (__base?.error) {
      state.loading = false;
      return (isError.value = __base?.error[0]);
    }

    callback(__base);
  };

  const deleteInfoData = async(url:any, id:any, calback:any) => {

    try {
      
      const { data } = await axios.post(url, {id})
      if(data){

        calback()
         
      }

    } catch (error) {
      console.log(error)
    }

  }

 

  return {
    state,
    router,
    route,
    isError,
    inputData,
    checkedNames,
    profile,
    slectedTypeUser,
    slectedFieldActivity,
    slectedCenter,
    slectedCarrier,
    deleteInfoData
  };
};
