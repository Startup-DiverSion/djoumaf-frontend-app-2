import { reactive, ref } from "vue";
import { AuthService } from "@/services/auth.services";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import axios from "axios";
import { Device } from "@capacitor/device";
import { UserService } from "./../services/user.services";
import {defineAsyncComponent} from 'vue'
import { useProfileStore} from "@/stores/profile.store";

export const useUserComposition = () => {
  const stateUser = reactive({
    loading: false,
  });

  const isError = ref([]);
  const USER: any = ref({});

  const BASE_SIGN = async (Service: any, callback: Function) => {
    const __base = await Service;
    if (__base?.error) {
      stateUser.loading = false;
      return (isError.value = __base?.error[0]);
    }

    callback(__base);
  };

  // Change password
  const GET_USER = async () => {
    if(useProfileStore().userCurent){
       USER.value = useProfileStore().userCurent
    }
    
  };

  const GET_USER_GLOBAL = async () => {
       await BASE_SIGN(
        new UserService().findOne(),
        (__base: any) => {
          if (__base?.user) {
            USER.value = __base?.user;
            useProfileStore().userCurent = USER.value;
          }
        }
      );
    
    
  };

  return {
    stateUser,
    isError,
    USER,
    GET_USER,
    GET_USER_GLOBAL
  };
};
