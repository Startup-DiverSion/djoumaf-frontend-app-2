import { URL} from "@/router/url";
import axios from "axios";
import moment from "moment";
import { defineComponent, defineAsyncComponent } from "vue";

export class TalkMailService {
  // Get Profile of user connected
  public async find() {
    try {
      let talkMail: any = [];

      const { data } = await axios.get(URL.TALK_MAIL_INDEX);

      if (data) {
        talkMail = data.talk_mails;

        talkMail.forEach((el: any) => {
          el.created_at = moment(el.created_at).fromNow();
        });

        return {
          data: talkMail,
          error: null,
        };
      }
    } catch (error: any) {
      if (error.response) {
        return {
          data: null,
          error: [error.response.data],
        };
      }
    }
  }

  public candidacy_see_profile = async (
    id: any,
    userSlug: any,
    candidacy_see_profile: any,
    candidacyGlobal: any
  ) => {
    try {
      const { data } = await axios.post(URL.PROFILE_CANDIDACY_SEE, { id });
      if (data) {
       

        return {
          data,
          error: null,
        };
      }
    } catch (error: any) {
      if (error.response) {
        return {
          data: null,
          error: [error.response.data],
        };
      }
    }
  };


  public candidacy_state= async (
    id: any,
    state: Boolean
  ) => {
    try {
      const { data } = await axios.post(URL.PROFILE_CANDIDACY_STATE, { id, state });
      if (data) {
       

        return {
          data,
          error: null,
        };
      }
    } catch (error: any) {
      if (error.response) {
        return {
          data: null,
          error: [error.response.data],
        };
      }
    }
  };


}
