import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { useProfileStore } from "./../stores/profile.store";
import { ApplyService } from "@/services/apply.sercices";
import { NotifUtils } from "@/vendors/utils/notif.utils";
import { useNotificationComposition } from "./notification.composition";

export const useApplyComposition = () => {
  const stateApply = reactive({
    apply_err: false,
    apply_loading: false,
    apply_limit: false,
    is: false
  });
  const countApply:any = ref()

  const to_apply: any = ref({});

  const jStore = new LocalSotreUtils();
  const jUseStore: any = useProfileStore();
  const jCryto = new CryptUtils();
  const router = useRouter();
  const route = useRoute();
  const isError = ref({ path: "", message: "" });

  //
  const BASE = async (AuthService: any, callback: Function, loading?:boolean) => {
    loading = true;
    const __base = await AuthService;
    if (__base?.error) {
     loading = false;
      return (isError.value = __base?.error[0]);
    }

    callback(__base);
    loading = false;
  };


  // Apply current job
  const { SendNotification } = useNotificationComposition()
  const applyCreate = async (id:any) => {
    stateApply.apply_loading = true
    return await BASE(
      new ApplyService().create({
        jobID: id,
      }),
      (__base: any) => {
        if (__base?.data) {
          stateApply.is = __base?.data.to_apply_job ? __base?.data.to_apply_job.is_apply : false ;
          countApply.value = countApply.value + 1
          stateApply.apply_loading = false
          //Send Notification
          new NotifUtils().success("Condidacture", "votre condidacture à été envoyer.");

          const notificationDATA = {
            type: 238,
            recevie_id:__base?.data.userOwnerOfPost.user.id,
            redirect: "/"+ __base?.data.userOwnerOfPost.slug,
            content: __base?.data.userOwnerOfPost.title,
            provide_id: __base?.data.userOwnerOfPost.id,
          };
          SendNotification(notificationDATA)
        }
      }
    );
  };

  // Apply current job
  const applyShow = async (id: any) => {
    return await BASE(
      new ApplyService().findOne({
        jobID: id,
        userID: await jStore.get("jUserID") ? jCryto.qDecrypted(await jStore.get("jUserID") ) : null
      }),
      (__base: any) => {
        
        if (__base?.data) {
          console.log(__base?.data)
          stateApply.is = __base?.data.to_apply_job ? __base?.data.to_apply_job.is_apply : false ;
          countApply.value = __base?.data.count
        }
      }
    );
  };

  return {
    stateApply,
    router,
    route,
    isError,
    applyShow,
    applyCreate,
    countApply
  };
};
