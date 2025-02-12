import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import axios from "axios";
import { URL } from "@/router/url";
import moment from "moment";
import { useCerleComposition } from "./cerle.composition";
import { useJobComposition } from "@/views/pages/jobs/job.compositoin";

export const usePaymentComposition = () => {
  // State Data

  const router = useRouter();
  const route = useRoute();

  const jStore = new LocalSotreUtils();
  const jCryto = new CryptUtils();

  const state_cv = reactive({
    data: ref(),
  });

  const PAYMENT = async () => {
    try {
      const { data } = await axios.post(URL.PAYMENT_CV);
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    router,
    route,
    PAYMENT,
  };
};
