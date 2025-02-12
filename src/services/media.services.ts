import { URL } from '@/router/url';
import axios from 'axios';

interface SHOW {
    id: any;
  }

  interface UPDATE {
    id: any;
    file: any;
    type: any;
  }

export class MediaService {


    constructor(){}

    public async profile(profileID:SHOW) {
        try {
            let profile: any = {};
      
            const { data } = await axios.post(URL.MEDIA_PROFILE_SHOW, profileID );
      
            if (data) {
              profile = data.profile;
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


    public async update(profile: UPDATE) {
      try {

        const dataFile = new FormData()
        dataFile.append('id', profile.id)
        dataFile.append('file', profile.file)
        dataFile.append('type', profile.type)
  
        const { data } = await axios.post(URL.MEDIA_PROFILE_UPDATE, dataFile);
  
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