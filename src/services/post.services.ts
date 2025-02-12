import { defineComponent, defineAsyncComponent } from "vue";
import { URL} from "@/router/url";
import axios from "axios";
import moment from "moment";
import "@/vendors/utils/date.utils";
import { JobValidate } from "@/vendors/validators/job.validate";
import { PostValidate } from "@/vendors/validators/post.validate";

interface SHOW {
    slug: any;
}

interface DELETE {
  id: any
}

interface POST_CREATE {
  description: any;
}

export class PostService {

  // Gets all posts
  /**
   * name
   */
  public async findAll(query?:any) {
    let posts: any = [];
    try {
      const { data } = await axios.get(URL.POST_INDEX + query );

      if (data) {
        posts = data.posts;
        return { posts };
      }

      return { posts };
    } catch (error) {
      return { e: true };
    }
  }


  // GET ONE JOBS
  /**
   * findOne
   */
  public async findOne(dataOne: SHOW) {
    let post: any = {};
    try {
      const { data } = await axios.post( URL.POST_SHOW, dataOne);

      if (data) {
        post = data;
        return { data: post }; 
      }

      return { data: post }; 
    } catch (error) {
      return { e: true };
    }
  }



  public  async create(dataCreate: any) {
    try {

      const { error, context } = await new PostValidate().create(dataCreate);

      if (error) {
        return {
          data: null,
          error: context,
        };
      }

      const { data } = await axios.post(URL.POST_CREATE, dataCreate);

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


   // GET ONE JOBS
  /**
   * 
   */
  public async delete(dataDelete: DELETE) {
    let post: any = {};
    try {
      const { data } = await axios.post( URL.POST_DELETE, dataDelete);

      if (data) {
        post = data;
        return { data: post }; 
      }

      return { data: post }; 
    } catch (error) {
      return { e: true };
    }
  }


}
