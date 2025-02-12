import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useNavigationStore = defineStore("navigation", () => {
  const ProfileToPage = ref('x11-djoumad');
  const searchActived  = ref(false)
  const toSearch__q = ref('')
  const starter_app = ref(true)

  function ProfileToPageChange(data:string) {
    ProfileToPage.value = data
  }

  return { ProfileToPage, ProfileToPageChange, searchActived, toSearch__q, starter_app};
});
