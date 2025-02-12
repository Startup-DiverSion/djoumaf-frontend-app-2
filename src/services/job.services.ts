import { URL } from "@/router/url";
import { defineComponent, defineAsyncComponent } from "vue";
import axios from "axios";
import moment from "moment";
import "@/vendors/utils/date.utils";
import { UserService } from "./user.services";
import { JobValidate } from "./../vendors/validators/job.validate";
import { envConfig } from "../env.config";

interface REGISTER {
  username: string;
  fullnameOrStoreName: string;
  email: string;
  password: string;
}

interface TYPE_OFFRE {
  ref: String;
}

interface JOB {
  title: string;
  field_activity: any;
  localizaton_country: any;
  localizaton_city: any;
  work_place: any;
  contract_type: any;
  description: any;
  dead_line: any;
}

interface JOB_UPDATE {
  id: any;
  title: string;
  field_activity: any;
  localizaton_country: any;
  localizaton_city: any;
  work_place: any;
  contract_type: any;
  description: any;
  dead_line: any;
}

interface JOB_DELETE {
  id: any;
}

export class JobService {
  // Gets all Jobs
  /**
   * name
   */
  public async findAll(query?: any) {
    let Jobs: any = [];
    let job_length: Number = 0;
    let job_current_length: Number = 0;
    try {
      const { data } = await axios.post(`${URL.JOBS_LIST}`, { limit: query?.limit, page: query?.page, search: query?.search, domain: query?.domain });

      if (data) {
        Jobs = data.Jobs;

        if (data.Jobs.length !== 0) {
          Jobs.forEach((job: any) => {
            job.timePost = moment(job.created_at).fromNow();
            job.deadLine = moment(job.dead_line).format("DD/MM/YYYY");
            job.profile.media_profile = job.profile?.media_profile
              ? job.profile?.media_profile[0]
              : [];
            job.image = job.profile.media_profile[0]?.url
              ? `${job.profile.media_profile[0]?.original_url}`
              : envConfig().DEFAULT_IMAGE_PROFILE;
          });
        }

        job_length = data.job_length;
        job_current_length = data.job_current_length;

        return { Jobs, job_length, job_current_length };
      }

      return { Jobs, job_length, job_current_length };
    } catch (error) {
      console.log(error);
      return { e: true };
    }
  }

  // GET ONE JOBS
  /**
   * findOne
   */
  public async findOne(slug: any) {
    let JobOne: any = [];
    let JobsInteresting: any = [];
    try {
      const { data } = await axios.post(URL.JOBS_DETAIL, { slug });

      if (data) {
        JobOne = data.job;
        JobsInteresting = data.interesting;
        JobOne.created_at_from = moment(JobOne.created_at).fromNow();
        JobOne.dead_line_format = moment(JobOne.dead_line).format("DD/MM/YYYY");

        // JobOne.media_profile = JobOne.media_profile[0]
        // JobOne.media_profileCover = JobOne.media_profileCover[0]
        JobOne.image = JobOne.user.profile.media_profile[0]?.url
          ? `${envConfig().HOST_SERVER_IMAGE}${
              JobOne.user.profile.media_profile[0]?.url
            }`
          : envConfig().DEFAULT_IMAGE_PROFILE;

        JobsInteresting.forEach((job: any) => {
          job.timePost = moment(job.created_at).fromNow();
          job.deadLine = moment(job.dead_line).format("DD/MM/YYYY");
          job.profile.media_profile = job.profile?.media_profile
            ? job.profile?.media_profile[0]
            : [];
          job.image = job.profile.media_profile[0]?.url
            ? `${envConfig().HOST_SERVER_IMAGE}${
                job.profile.media_profile[0]?.url
              }`
            : envConfig().DEFAULT_IMAGE_PROFILE;
        });

        return { JobOne, profile: JobOne?.user.profile, JobsInteresting };
      }

      return { JobOne };
    } catch (error) {
      console.log(error);
      return { e: true };
    }
  }

  public async create(job: JOB) {
    try {
      const { error, context } = await new JobValidate().main(job);

      if (error) {
        return {
          data: null,
          error: context,
        };
      }

      const { data } = await axios.post(URL.JOBS_CREATE, job);

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

  // Update
  public async update(job: JOB_UPDATE) {
    try {
      const { error, context } = await new JobValidate().main(job);

      if (error) {
        return {
          data: null,
          error: context,
        };
      }

      const { data } = await axios.post(URL.JOBS_UPDATE, job);

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

  // Delete
  public async delete(job: JOB_DELETE) {
    try {
      const { data } = await axios.post(URL.JOBS_DELETE, job);

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

  // Gets all Jobs
  /**
   * name
   */
  public async fand_job() {
    let field_activity: any = [];
    try {
      const { data } = await axios.get(URL.FIELD_ACTIVITY_NUMBER_DP_JOB_LIST);

      if (data) {
        field_activity = data.field_activity;
        return { field_activity };
      }

      return { field_activity };
    } catch (error) {
      console.log(error);
      return { e: true };
    }
  }
}
