import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { useProfileStore } from "../stores/profile.store";
import { ApplyService } from "@/services/apply.sercices";


export const useModalComposition = () => {


  const jStore = new LocalSotreUtils();
  const jUseStore: any = useProfileStore();
  const jCryto = new CryptUtils();
  const router = useRouter();
  const route = useRoute();
  const isError = ref({ path: "", message: "" });

  const openMenu = (whoWillOpen:any) => {
    document.querySelector('body')?.classList.add('overflow-hidden')
    const getModalToOpen = document.querySelector('.' + whoWillOpen);
    getModalToOpen?.classList.remove('hidden')
 

  }

 

  return {
    openMenu
  };
};
