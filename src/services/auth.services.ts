import { URL} from "@/router/url";
import { AuthValidate } from "@/vendors/validators/auth.validate";
import axios from "axios";
import { defineComponent, defineAsyncComponent } from "vue";

interface REGISTER {
  email: string
  password: string
  signin_place: any
  device: any
}

interface LOGIN {
  email: string;
  password: string;
}

interface VERIFY_EMAIL {
  email: string;
}

interface CHANGE_PASSWORD {
  email: any;
  old_password: string;
  new_password: string;
  code: any;
}

export class AuthService {
  private __AuthValidate = new AuthValidate();

  // Register new user
  private async __AuthRessoucre(url: string, authData: any) {
    try {
      const { error, context } = await this.__AuthValidate.register(authData);

      if (error) {
        return {
          data: null,
          error: context,
        };
      }

      const { data } = await axios.post(url, authData);

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
  public async register(Register: REGISTER) {
    return await this.__AuthRessoucre(URL.AUTH_REGISTER, Register);
  }

  // Authentification Login of App Djoumaf
  public async login(Login: LOGIN) {
    return await this.__AuthRessoucre(URL.AUTH_LOGIN, Login);
  }

  // Authentification Login of App Djoumaf
  public async verifyEmail(Verify_email: VERIFY_EMAIL) {
    return await this.__AuthRessoucre(URL.AUTH_VERIFY_EMAIL, Verify_email);
  }

  // Authentification Login of App Djoumaf
  public async changePassword(password: CHANGE_PASSWORD) {
    return await this.__AuthRessoucre(URL.AUTH_CHANGE_PASSWORD, password);
  }
}
