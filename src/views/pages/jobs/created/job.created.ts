import { ref, onMounted, onUnmounted, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

// by convention, composable function names start with "use"
export function useJobCreated() {
  const Jobs: any = ref([]);
  const dataInput = reactive({
    intituel_post: "",
  });

  // expose managed state as return value
  return {
    dataInput,
  };
}
