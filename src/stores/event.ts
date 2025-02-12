import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useEventStore = defineStore("envent", () => {
  const editProfile = ref(false);
  const editExperience:any = ref(false)
  const editCourse:any = ref(false)

  const OPEN_Experience = ref(false)
  const OPEN_Course = ref(false)

  const LOADING_PLACEHOLDER = ref('')
 

  return { editProfile, editExperience, OPEN_Experience,OPEN_Course, editCourse, LOADING_PLACEHOLDER };
});
