import { reactive, ref, computed } from "vue";
import { ProfileService } from "@/services/profile.services";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { AuthValidate } from "@/vendors/validators/auth.validate";
import { useProfileStore } from "./../stores/profile.store";
import { useUploadLocalFile } from "@/composables/uploadLocalFile";
import { MediaService } from "@/services/media.services";
import { NotifUtils } from "@/vendors/utils/notif.utils";

export const useMediaComposition = () => {
  const stateMedia = reactive({
    loading: false,
  });
  const isError = ref({ path: "", message: "" });
  const media = ref();

  const jStore = new LocalSotreUtils();
  const jUseStore: any = useProfileStore();
  const jCryto = new CryptUtils();
  const jPofileValidate = new AuthValidate();

  const mediaProfile = ref([]);
  const mediaProfileCover = ref([]);
  const loading_media = ref(false)
  const loading_mediaCover = ref(false)

  //
  const BASE_MEDIA = async (AuthService: any, callback: Function, ) => {
    const __base = await AuthService;
    if (__base?.error) {
      stateMedia.loading = false;
      return (isError.value = __base?.error[0]);
    }

    callback(__base);
  };

  const { toImageConvert, image, binaryImage } = useUploadLocalFile();

  //
  const uploadImageMediaProfile = (event: any) => {
    loading_media.value = true
    
    updateMedia('profile', 'mediaProfilein-input').then(() => {
      useProfileStore().binaryImageToInput = binaryImage;
    image(event);
      mediaProfile.value = toImageConvert.value;
      loading_media.value = false
    }).catch( ()=> {
      loading_media.value = false
    })
  };

  //
  const uploadImageMediaProfileCover = (event: any) => {
    loading_mediaCover.value = true
    updateMedia('cover', 'mediaProfileCoverin-input').then(() => {
      useProfileStore().binaryImageToInput = binaryImage;
      image(event);
      mediaProfileCover.value = toImageConvert.value;
      loading_mediaCover.value = false
    }).catch( ()=> {
      loading_mediaCover.value = false
    })
  };

  // Update image of profile user
  const updateMedia = async (type:any, inputID: any) => {
    const files: any = document.querySelector("#"+inputID);
    console.log(files)
    return await BASE_MEDIA(
      new MediaService().update({
        id: jCryto.qDecrypted(await jStore.get('jProfileID')),
        file: files.files[0],
        type
      }),
      (__base: any) => {
        if (__base?.data) {
          media.value = __base?.data;
          new NotifUtils().success('Profile', 'Image modifier avec succès.')
        }
        else {
          new NotifUtils().error('Erreur !', 'Oups! Une erreur est survenue.')
        }
      }
    );
  };

  return {
    updateMedia,
    mediaProfile,
    mediaProfileCover,
    uploadImageMediaProfile,
    uploadImageMediaProfileCover,
    loading_media, loading_mediaCover
  };
};
