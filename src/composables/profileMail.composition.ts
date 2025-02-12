import { reactive, ref, computed } from "vue";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { TalkMailService } from "./../services/talkMail.services";
import { envConfig } from "../env.config";
import { NotifUtils } from "@/vendors/utils/notif.utils";

export const useProfileMailComposition = () => {
  const stateProfileMail = reactive({
    loading: false,
  });
  const talkMailsData: any = ref([]);
  const isError = ref([]);
  const candidacySelected = ref()
  const candidacyReject = ref()
  const candidacyNoRead = ref()

  const jStore = new LocalSotreUtils();
  const jCryto = new CryptUtils();

  //
  const BASE_PROFILE_MAIL = async (Service: any, callback: Function) => {
    const __base = await Service;
    if (__base?.error) {
      stateProfileMail.loading = false;
      return (isError.value = __base?.error[0]);
    }

    callback(__base);
  };

  // 
  const talkMails = async () => {
    return await BASE_PROFILE_MAIL(
      new TalkMailService().find(),
      (__base: any) => {
        console.log(talkMailsData.value);
        talkMailsData.value = __base?.data.reverse();
      }
    );
  };

  const candidacy_see_profile = async (id:any, userSlug:any, candidacyGlobal:any, isSee:any) => {
    if(!isSee){
      return await BASE_PROFILE_MAIL(
        new TalkMailService().candidacy_see_profile(id, userSlug, candidacy_see_profile, candidacyGlobal),
        (__base: any) => {
          candidacyGlobal.forEach((el:any) => {
            if(el.id === id){
              el.candidacy_see_profile = true
            }
          })
          window.open('/'+userSlug, '_blank');
        }
      );
    }else{
      window.open('/'+userSlug, '_blank');
    }
    
  };


  const candidacy_state_defined = async (id:any, state:any, candidacyGlobal:any, is:any) => {
    if(!is){
      return await BASE_PROFILE_MAIL(
        new TalkMailService().candidacy_state(id, state),
        (__base: any) => {
          candidacyGlobal.forEach((el:any) => {
            if(el.id === id){
              el.candidacy_state = state
              
             if(state){
              new NotifUtils().custom('Félicitation', 'Vous venez de mettre ce profile en favorie.', 'bio', 'green-400')
             }else if(state === false){
              new NotifUtils().custom('Oups! Rejecter', 'Ce profile ne vous interesse pas.', 'reject', 'red-400')
             }
            }
          })

        

          
        }
      );
    }
    
  };





  return { talkMails, talkMailsData, envConfig, candidacy_see_profile, candidacy_state_defined, candidacySelected, candidacyReject, candidacyNoRead };
};
