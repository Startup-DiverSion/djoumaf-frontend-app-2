import { ref, onMounted, onUnmounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { useNavigationStore } from "./../../stores/navigations";

// by convention, composable function names start with "use"
export function useSearchBar() {
  const state = computed(() => {
    return { active_search: useNavigationStore().searchActived };
  });

  const DisplayAeraSearch = () => {
    useNavigationStore().searchActived === true
      ? (useNavigationStore().searchActived = false)
      : (useNavigationStore().searchActived = true);
  };

  // expose managed state as return value
  return { DisplayAeraSearch, state };
}
