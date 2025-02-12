import { URL} from "@/router/url";
import axios from "axios";
import moment from "moment";
import "@/vendors/utils/date.utils";
import { JobValidate } from "@/vendors/validators/job.validate";
import { defineComponent, defineAsyncComponent } from "vue";

interface SHOW {
    jobID: any;
    userID: any;
}

interface JOB_APPLY {
  jobID: any;
}

export class ApplyService {

  // Gets all Apply
  /**
   * name
   */
  public async findAll() {
    let Apply: any = [];
    try {
      const { data } = await axios.get(URL.JOBS_LIST);

      if (data) {
        Apply = data.Apply;



        return { Apply };
      }

      return { Apply };
    } catch (error) {
      return { e: true };
    }
  }


  // GET ONE JOBS
  /**
   * findOne
   */
  public async findOne(dataOne: SHOW) {
    let ApplyOne: any = {};
    try {
      const { data } = await axios.post( URL.JOB_APPLY_SHOW, dataOne);

      if (data) {
        ApplyOne = data.job;
        return { data: data };
      }

      
    } catch (error) {
      return { e: true };
    }
  }



  public  async create(dataCreate: JOB_APPLY) {
    try {

      const { error, context } = await new JobValidate().apply(dataCreate);

      if (error) {
        return {
          data: null,
          error: context,
        };
      }

      const { data } = await axios.post(URL.JOB_APPLY_CREATE, dataCreate);

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


}
