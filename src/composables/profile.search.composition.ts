import { reactive, ref, computed } from "vue";
import { ProfileService } from "@/services/profile.services";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { AuthValidate } from "@/vendors/validators/auth.validate";
import { useProfileStore } from "./../stores/profile.store";
import axios from "axios";
import { URL } from "@/router/url";

export const useProfileSearchComposition = () => {
  // State Data
  const state_profile_search: any = reactive({
    loading: false,
    error: false,
    data: [],
  });
  const router = useRouter();
  const route = useRoute();
  const isError = ref({ path: "", message: "" });
  const profile = ref({});

  const jStore = new LocalSotreUtils();
  const jUseStore: any = useProfileStore();
  const jCryto = new CryptUtils();
  const inputDataFilterProfile = reactive({
    post: "",
    diplome: [],
    experience: [],
    localizaton_country: "",
    localizaton_city: "",
  });

  let years_exp = ref(0.0);

  // Get profile of user connected
  const sendToSearchProfile = async () => {
    try {
      state_profile_search.data = [];
      years_exp.value = 0.0
      state_profile_search.loading = true;

      const { data } = await axios.post(URL.PROFILE_SEARCH, {
        post: inputDataFilterProfile.post,
      });
      if (data) {
        data.profiles.forEach((p: any, index: any) => {
          state_profile_search.data.push(p.profile);
          state_profile_search.data[index].experience = p.experience;
          state_profile_search.data[index].course = p.course;
          state_profile_search.data[index].user_id = p.id;
        });

        console.log(inputDataFilterProfile);
        state_profile_search.data = state_profile_search.data.filter(
          (sp: any) => {
            return sp.bio.includes(inputDataFilterProfile.post);
          }
        );

        // Diplome
        let getCourse: any = [];
        if (inputDataFilterProfile.diplome.length != 0) {
          inputDataFilterProfile.diplome.forEach((dip: any) => {
            state_profile_search.data.forEach((cs: any) => {
              if (cs.course.length != 0) {
                cs.course.forEach((css: any) => {
                  if (css.diploma.title == dip) {
                    getCourse.push(cs);
                  }
                });
              }
            });
          });

          if (getCourse.length != 0) {
            state_profile_search.data = getCourse;
          } else {
            state_profile_search.data = [];
          }
        }

        // Experiences
        let getExperiences: any = [];
        let getPoste: any = [];
        
        if (inputDataFilterProfile.experience.length != 0) {
          console.log(inputDataFilterProfile.experience);
          inputDataFilterProfile.experience.forEach((exp: any) => {
            state_profile_search.data.forEach((xp: any) => {
              if (xp.experience.length != 0) {
                xp.experience.forEach((xxp: any) => {
                  const getSelectedExp = exp.split("to");

                  if (xxp.poste.includes(inputDataFilterProfile.post)) {
                    years_exp.value =  Number(xxp.years_experience);
                    if (years_exp.value >= Number(getSelectedExp[0]) && years_exp.value <= Number(getSelectedExp[1]) ) {
                      getExperiences.push(xp);
                    }
                  }

                  
                });
              }
            });
          });

          if (getExperiences.length != 0) {
            console.log(getExperiences)
            state_profile_search.data = getExperiences.filter(
              (obj: any, index: any) =>
                getExperiences.findIndex((item: any) => item.id === obj.id) ===
                index
            );
          } else {
            state_profile_search.data = [];
          }
        }

        state_profile_search.loading = false;
      }
    } catch (error) {
      console.log(error);
      state_profile_search.loading = false;
      state_profile_search.error = true;
    }
  };

  return {
    state_profile_search,
    sendToSearchProfile,
    router,
    route,
    isError,
    inputDataFilterProfile,
  };
};
