import { reactive, ref, computed } from "vue";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { TalkMailService } from "./../services/talkMail.services";
import { envConfig } from "../env.config";
import { NotifUtils } from "@/vendors/utils/notif.utils";
import axios from "axios";
import { URL } from "@/router/url";
import { useFeedComposition } from "./feed.composition";
import { useFeedStore } from "@/stores/feeds";

export const usePostCommentComposition = () => {
  const jStore = new LocalSotreUtils();
  const jCryto = new CryptUtils();
  const {ActionsCard} = useFeedComposition()
  const loading_comment = ref(false)
  const isSenderComment = ref(false)
  const my_comment = ref('')

  //
  const sendComment = async (postID: any, _emit: any) => {
    try {
      loading_comment.value = true
     

      const { data } = await axios.post(URL.POST_COMMENTS_CREATED, {
        message: my_comment.value,
        postID,
      });
      if (data) {
        _emit("addToComment", data?.comment);

        let getIndex:any;
        useFeedStore().actionsCount.forEach((element: any, index: any) => {
          element.forEach((el: any) => {
            if (postID == el.postID) {
              getIndex = index
            }
          });
        });

        useFeedStore().actionsCount[getIndex][2].count = useFeedStore().actionsCount[getIndex][2].count  + 1
        useFeedStore().actionsCount[getIndex][2].allready = true
       
        my_comment.value = ''
        loading_comment.value = false
       
      }
    } catch (error) {
      loading_comment.value = false
      console.log(error);
    }
  };

  return { envConfig, sendComment, loading_comment, my_comment };
};
