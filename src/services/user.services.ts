import { URL} from "@/router/url";
import { defineComponent, defineAsyncComponent } from "vue";
import axios from "axios";
import moment from "moment";
import "@/vendors/utils/date.utils";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { useRoute } from "vue-router";
import { envConfig } from "@/env.config";

export class UserService {
  public jStoreUtils = new LocalSotreUtils();
  public jCrypt = new CryptUtils();


  // Get current user connected
  public async AuthUserCurrent() {
    try {
      const user =
        await this.jStoreUtils.get("jUser") !== null
          ? JSON.parse(this.jCrypt.qDecrypted(await this.jStoreUtils.get("jUser")) )
          : null;
          if(user.profile.media_profile === undefined) user.profile.media_profile = null
      if (!user) return { e: true };
      return { user: user };
    } catch (error) {
      return { e: true };
    }
  }

   // GET ONE JOBS
  /**
   * findOne
   */
  public async findOne() {

    
    try {

      const _USER = (await this.jStoreUtils.get("jUser"))
        ? JSON.parse(this.jCrypt.qDecrypted(await this.jStoreUtils.get("jUser"))).id
        : null;
        
if(_USER){

  let user: any = {};
      const { data } = await axios.post( URL.USER_INDEX , { 'userID': _USER });

      if (data) {
        user = data.user;

          // Defined Update app
      if (
        (await this.jStoreUtils.get("jVersion_app")) &&
        (await this.jStoreUtils.get("jVersion_app")) != envConfig().VERSION_APP
      ) {
        await this.jStoreUtils.remove("jVersion_app");
        window.location.reload();
      } else {
        await this.jStoreUtils.set("jVersion_app", envConfig().VERSION_APP);
      }

        return { user };
      }

}

return { user: null };
    

      
    } catch (error:any) {
      const route = useRoute()

      if (error.response?.data?.message === 'User no exist') {
        this.jStoreUtils.clear()

      
        
        if((window.location.pathname == '/jobs/') || (window.location.pathname == "/") || (window.location.pathname == '/jobs') ){
          return null
        }else{
          window.location.assign('/auth/sign-in')
        }
        
      }
      return { e: true };
    }
  }
}
