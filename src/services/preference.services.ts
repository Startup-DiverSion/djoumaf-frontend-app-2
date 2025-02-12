import { URL} from "@/router/url";
import { defineComponent, defineAsyncComponent } from "vue";
import { AuthValidate } from "@/vendors/validators/auth.validate";
import axios from "axios";

export class PreferenceService {
  // Register new user
  private async __PreferenceRessoucre(url: string) {
    try {
      const { data } = await axios.get(url);

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

  // Authentification Register of App Djoumaf
  public async getAll() {
    return await this.__PreferenceRessoucre(URL.PARAMETER_LIST);
  }

  // Authentification Register of App Djoumaf
  public async CenterOfInterest() {
    return await this.__PreferenceRessoucre(URL.PARAMETER_LIST);
  }
}
