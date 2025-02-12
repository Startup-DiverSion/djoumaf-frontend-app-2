import { defineComponent, defineAsyncComponent } from "vue";
import { URL} from "@/router/url";
import { AuthValidate } from "@/vendors/validators/auth.validate";
import axios from "axios";

interface PROFILE {
  first_name: string;
  last_name: string;
  bio: string;
  description?: string;
  image: any;
}

interface SHOW {
  id: any;
}

export class ProfileService {
  private __ProfileValidate = new AuthValidate();

  private async __ProfileRessoucre(url: string, profileData: any) {
    try {
      const { error, context } = await this.__ProfileValidate.profile(
        profileData
      );

      if (error) {
        return {
          data: null,
          error: context,
        };
      }

      const { data } = await axios.post(url, profileData);

      if (data) {
        return {
          data: data,
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

  private async __ProfileCheckValidator(profileData: any) {
    try {
      const { error, context } = await this.__ProfileValidate.profile(
        profileData
      );

      if (error) {
        return {
          data: null,
          error: context,
        };
      }

      return {
        data: [],
        error: null,
      };
    } catch (error: any) {
      if (error.response) {
        return {
          data: null,
          error: [error.response.data],
        };
      }
    }
  }

  // Authentification Register of App Djoumaf
  public async finalizeCreateProfil(Profile: any) {
    return await this.__ProfileRessoucre(URL.PROFILE_UPDATE, Profile);
  }

  // Authentification Register of App Djoumaf
  public async validator(Profile: PROFILE) {
    return await this.__ProfileCheckValidator(Profile);
  }




   // Get All Profile
   public async index(query?:any) {
    try {
      let profiles: any = [];

      const { data } = await axios.get(URL.PROFILE_INDEX + '?' + query );

      if (data) {
        profiles = data.profiles;
       
        return {
          data: profiles,
          error: null,
        };
      }

      return {
        data: null,
        error: true,
      };
    } catch (error: any) {
      if (error.response) {
        return {
          data: null,
          error: [error.response.data],
        };
      }
    }
  }




  // Get Profile of user connected
  public async show(profileID: SHOW) {
    try {
      let profile: any = {};

      const { data } = await axios.post(URL.PROFILE_SHOW, profileID );

      if (data) {
        profile = data.profile;
        profile.media_profile = data.media_profile
        return {
          data: profile,
          error: null,
        };
      }

      return {
        data: null,
        error: true,
      };
    } catch (error: any) {
      if (error.response) {
        return {
          data: null,
          error: [error.response.data],
        };
      }
    }
  }



    // Get Profile of user connected
    public async showWihSlug(profileSLUG: any) {
      try {
        let profile: any = {};
  
        const { data } = await axios.post(URL.PROFILE_SHOW_SLUG, profileSLUG );
  
        if (data) {
          profile = data.profile;
          profile.media_profile = profile.media_profile[0]
          profile.media_profile_cover = profile.media_profile_cover[0]

        
          return {
            data: profile,
            error: null,
          };
        }
  
        return {
          data: null,
          error: true,
        };
      } catch (error: any) {
        if (error.response) {
          return {
            data: null,
            error: [error.response.data],
          };
        }
      }
    }
}
