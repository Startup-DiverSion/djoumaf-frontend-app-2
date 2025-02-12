import { RegexUtils } from "../utils/regex.utils";

export class JobValidate extends RegexUtils {
  /**
   * register
   */
  public async main(request: any) {
    let errorInputArr: Array<Object> = [];

    let errorIput: any = null;

    // Get all key object of data
    const objectRequestKey = Object.keys(request);

    // Handle error by the stements
    objectRequestKey.forEach((el) => {
      // If all data is empty
      if (request[el] === "") {
        errorInputArr.push({
          path: el,
          message: "Le champs ne peut pas etre vide.",
        });
        errorIput = true;
        return {
          error: errorIput,
          context: errorInputArr,
        };
      }

      // If username charater is not greater than at 7
      if (el === "title" && request["title"].length < 6) {
        errorInputArr.push({
          path: "title",
          message: "L'intituel du post require 6 charactere mimium.",
        });
        errorIput = true;
        return {
          error: errorIput,
          context: errorInputArr,
        };
      }
      // If fullname or storename charater is not greater than at 3
      if (el === "description" && request["description"].length < 60) {
        errorInputArr.push({
          path: "description",
          message: "Ce champs require 60 charactere mimium.",
        });
        errorIput = true;
        return {
          error: errorIput,
          context: errorInputArr,
        };
      }
    });

    return {
      error: errorIput,
      context: errorInputArr,
    };
  }

  //   Job apply validation
  public async apply(request: any) {
    let errorInputArr: Array<Object> = [];

    let errorIput: any = null;

    // Get all key object of data
    const objectRequestKey = Object.keys(request);

    // Handle error by the stements
    objectRequestKey.forEach((el) => {
      // If username charater is not greater than at 7
      if (el === "jobID" && request["jobID"].length < 6) {
        errorInputArr.push({
          path: "title",
          message: "L'intituel du post require 6 charactere mimium.",
        });
        errorIput = true;
        return {
          error: errorIput,
          context: errorInputArr,
        };
      }
    });

    return {
      error: errorIput,
      context: errorInputArr,
    };
  }
}
