import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", () => {
  const setpOfCreation = ref(1);
  const preferenceData: any = ref([]);

  const dataProfile: any = ref();
  const dataProfileExperiences: any = ref([]);
  const dataProfileCourse: any = ref([]);

  // Prefrence
  const preferenceData_typeUser: any = ref([]);
  const preferenceData_fieldActivity: any = ref([]);
  const preferenceData_centerInteret: any = ref([]);
  const preferenceData_carrier: any = ref([]);

  // User
  const userCurent = null

  function description(value: any) {
    dataProfile.value.description = value;
  }

  function updateExperience(data: any) {
  
    dataProfileExperiences.value = dataProfileExperiences.value.forEach(
      (el: any, index: any) => {
        if (el.id === data?.id) {
          el.company_name = data.company;
        }
      }
    );
  }

  //
  const binaryImageToInput: any = ref("");

  return {
    updateExperience,
    setpOfCreation,
    preferenceData,
    binaryImageToInput,
    preferenceData_typeUser,
    preferenceData_fieldActivity,
    preferenceData_centerInteret,
    preferenceData_carrier,
    dataProfile,
    dataProfileExperiences,
    description,
    dataProfileCourse,
    userCurent
  };
});
