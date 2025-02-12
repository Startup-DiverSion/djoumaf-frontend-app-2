import { RegexUtils } from "../utils/regex.utils";

export class ProfileValidate {


    private errorInputArr: Array<Object> = [];

    private errorIput: any = null;

  private stg(
    el: any,
    inputName: any,
    request: any,
    message: any,
    limit = 3
  ) {
    if (el === inputName && request[el].length < limit) {
      this.errorInputArr.push({
        path: el,
        message: message,
      });
      this.errorIput = true;
      return {
        error: this.errorIput,
        context: this.errorInputArr,
      };
    }
  }

  public async Experience(request: any) {
    

    // Get all key object of data
    const objectRequestKey = Object.keys(request);

    // Handle error by the stements
    objectRequestKey.forEach((el) => {
      // firstname
      this.stg(el, 'company', request, 'Require 3 charactere mimium.')
      this.stg(el, 'work_place', request, 'Require 3 charactere mimium.')
      this.stg(el, 'description', request, 'Require 3 charactere mimium.')
      

   

      
    });

    return {
      error: this.errorIput,
      context: this.errorInputArr,
    };
  }

  public async Course(request: any) {
   

    // Get all key object of data
    const objectRequestKey = Object.keys(request);

    // Handle error by the stements
    objectRequestKey.forEach((el) => {
    
      this.stg(el, 'etablishment', request, 'Require 3 charactere mimium.')
      this.stg(el, 'date_start', request, 'Ce champs est requis.')
      this.stg(el, 'date_finish', request, 'Ce champs est requis.')
      this.stg(el, 'domain', request, 'Require 3 charactere mimium.')
      this.stg(el, 'work_place', request, 'Require 3 charactere mimium.')
      this.stg(el, 'description', request, 'Require 3 charactere mimium.')
      
   
    });

    return {
      error: this.errorIput,
      context: this.errorInputArr,
    };
  }


  public async EditProfile(request: any) {
   

    // Get all key object of data
    const objectRequestKey = Object.keys(request);

    // Handle error by the stements
    objectRequestKey.forEach((el) => {
    
      this.stg(el, 'first_name', request, 'Require 3 charactere mimium.')
      this.stg(el, 'last_name', request, 'Ce champs est requis.')
      this.stg(el, 'bio', request, 'Ce champs est requis.')
      
   
    });

    return {
      error: this.errorIput,
      context: this.errorInputArr,
    };
  }


  public async EditProfileDescription(request: any) {
   

    // Get all key object of data
    const objectRequestKey = Object.keys(request);

    // Handle error by the stements
    objectRequestKey.forEach((el) => {
    
      this.stg(el, 'description', request, 'Require 20 charactere mimium.')
      
   
    });

    return {
      error: this.errorIput,
      context: this.errorInputArr,
    };
  }
}
