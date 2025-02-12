import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import axios from "axios";
import { URL } from "@/router/url";
import moment from "moment";
import { useCerleComposition } from "./cerle.composition";
import { useJobComposition } from "@/views/pages/jobs/job.compositoin";

export const useSearchComposition = () => {
  // State Data

  const router = useRouter();
  const route = useRoute();

  const jStore = new LocalSotreUtils();
  const jCryto = new CryptUtils();

  const {
    ALLPROFILE,
    ALLPROFILE_COMPANY,
    state_profile_compagny,
    state_profile,
    MoreSeeProfileCompagny,
    MoreSeeProfile,
  } = useCerleComposition();

  const { state_job, jobIndex, SeeMoreJob } = useJobComposition()

  const filterSearch = reactive([
    {
      name: "Emplois",
      code: "jobs",
      count: 0,
      actived: true,
    },
    //   {
    //     name: "Posts",
    //     count: 0,
    //     actived: true,
    //   },
    {
      name: "Personnes",
      code: "person",
      count: 0,
      actived: false,
    },
    {
      name: "Entreprise",
      code: "company",
      count: 0,
      actived: false,
    },
  ]);

  const queryCache: any = ref("");
  const filterActived: any = ref("jobs");

  const verify_to_search = computed(() => {
    // Remove All actived link
    filterSearch.forEach((el: any) => {
      el.actived = false;
    });

    // Remove All actived link
    filterSearch.forEach((el: any) => {
      if (route.query?.ft === el.code) {
        el.actived = true;
      }
    });

    filterActived.value = route.query?.ft;

    if (route.name === "Search" && route.query?.q !== queryCache.value) {
      queryCache.value = route.query?.q;
      Search();
    }
  });

  const Search = async () => {
    const Qsearch: any = route.query?.q;

    //
    jobIndex({'limit': state_job.paginted.limit, 'page': state_job.paginted.page, 'search': Qsearch})
    ALLPROFILE({'limit': state_profile.paginted.limit, 'page': state_profile.paginted.page, 'search': Qsearch});
    ALLPROFILE_COMPANY({'limit': state_profile_compagny.paginted.limit, 'page': state_profile_compagny.paginted.page, 'search': Qsearch});
  };

  return {
    router,
    route,
    filterSearch,
    verify_to_search,
    filterActived,
    state_profile,
    state_job,
    SeeMoreJob,
    state_profile_compagny,
    MoreSeeProfileCompagny,
    MoreSeeProfile,
  };
};
