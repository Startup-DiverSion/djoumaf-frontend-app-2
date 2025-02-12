import { ref, onMounted, onUnmounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router';
import { useFeedStore } from './../../stores/feeds';
import { useEventStore } from "@/stores/event";

// by convention, composable function names start with "use"
export function useModal() {

    const toImageConvert: any = ref([]);
   
      const dataPosterInfo = reactive([
        {
          icon: "text-red-500",
          name: "Video",
          isNoOperate: false
        },
        {
          icon: "text-blue-300",
          name: "Images",
          isNoOperate: false
        },
        {
          icon: "text-green-500",
          name: "Poste",
          isNoOperate: false
        },
        // {
        //   icon: "fi-sr-bolt text-green-500",
        //   name: "DjoumFast",
        // },
        {
            icon: 'fi-sr-browser',
            name: 'Article',
            isNoOperate: true
        }
      ]);

    

      const modal = () => {
        // Experience
        useEventStore().editExperience = false
        useEventStore().OPEN_Experience = false
        // Course
        useEventStore().editCourse = false
        useEventStore().OPEN_Course = false
        document.querySelector('body')?.classList.remove('overflow-hidden')
        const AllCloseModal = document.querySelectorAll(".modal-close")
        AllCloseModal.forEach(el => {
          el.classList.add("hidden");
        });
        
      };

      const closeIntoMore = () => {
        useFeedStore().addToPublish = false;
        toImageConvert.value = [];
      };


    // expose managed state as return value
    return {  dataPosterInfo, toImageConvert, modal, closeIntoMore }
}
