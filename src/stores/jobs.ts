import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useJobStore = defineStore("Jobs", () => {
    const Jobs:any = ref()
    const GlobalJobs = ref([])
    const openModal = ref(false)
    const success_create_job = ref(false)
    const state = reactive({
        loading_jobs: false,
        error_jobs: false,
        loading_jobsFaster: false,
        error_jobsFaster: false,
        
      });

      function ModalToTag(data:any){
        openModal.value = data 
      }

    // expose managed state as return value
    return { Jobs, state, GlobalJobs, ModalToTag, openModal, success_create_job }
});
