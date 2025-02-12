import { RegexUtils } from "../utils/regex.utils";

export class AuthValidate extends RegexUtils {

    


    /**
     * register
     */
    public async register(request: any) {

        let errorInputArr: Array<Object> = []

        let errorIput: any = null

        // Get all key object of data
        const objectRequestKey = Object.keys(request)

        // Handle error by the stements
        objectRequestKey.forEach(el => {

            // If all data is empty
            if (request[el] === '') {
                errorInputArr.push({
                    path: el,
                    message: "Le champs ne peut pas etre vide."
                })
                errorIput = true
                 return {
                    error: errorIput,
                    context: errorInputArr
                }
            }
            // If username charater is not greater than at 7
            if (el === 'username' && request['username'].length < 3) {
                errorInputArr.push({
                    path: 'username',
                    message: "Le nom d'utilisateur require 3 charactere mimium."
                })
                errorIput = true
                 return {
                    error: errorIput,
                    context: errorInputArr
                }
            }
            // If fullname or storename charater is not greater than at 3
            if (el === 'fullname_or_storename' && request['fullname_or_storename'].length < 3) {
                errorInputArr.push({
                    path: 'fullname_or_storname',
                    message: "Ce champs require 3 charactere mimium."
                })
                errorIput = true
                 return {
                    error: errorIput,
                    context: errorInputArr
                }
            }
            // If email is not true
            if (el === 'email' && this.ValidateEmail(request['email']) === false) {
                errorInputArr.push({
                    path: 'email',
                    message: "L'adresse email n'est pas valide."
                })
                 errorIput = true
                 return {
                    error: errorIput,
                    context: errorInputArr
                }
            }

            if (el === 'old_password' && request['old_password'] !== request['new_password']) {
                errorInputArr.push({
                    path: 'old_password',
                    message: "Mot de passe non identique, verifier..."
                })
                 errorIput = true
                 return {
                    error: errorIput,
                    context: errorInputArr
                }
            }
        });
      

        console.log(errorInputArr)

        return {
            error: errorIput,
            context: errorInputArr
        }



    }


    public async profile(request: any){


        
        let errorInputArr: Array<Object> = []

        let errorIput: any = null

        // Get all key object of data
        const objectRequestKey = Object.keys(request)

        // Handle error by the stements
        objectRequestKey.forEach(el => {

            // firstname
            if (el !== 'image' && request[el].length < 3) {
                errorInputArr.push({
                    path: el,
                    message: "Require 3 charactere mimium."
                })
                errorIput = true
                 return {
                    error: errorIput,
                    context: errorInputArr
                }
            }
          
              
   });
      

        console.log(errorInputArr)

        return {
            error: errorIput,
            context: errorInputArr
        }
    }

}