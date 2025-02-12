import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useModal } from "@/components/modals/modal.services";

export const useFeedStore = defineStore("feed", () => {

  const posts:any =  [] 

    const {toImageConvert, dataPosterInfo }  = useModal()
    
    const addToPublish = ref(false);
    const postFileData = reactive({
        icon: "",
        content: "",
        accept: "",
        multi: false,
        name: "",
      });

      const actionsCount:any = reactive([])
      const displaySenderComment:any = reactive([])


    const openAddToPublish = (name: any) => {
        try {
            toImageConvert.value = [];
            addToPublish.value = true;
            
            if (name === "Images") { 
              postFileData.name = name;
              postFileData.icon = dataPosterInfo[1].icon;
              postFileData.accept = "image/png,image/gif,image/jpeg,image/jpg,image/*";
              postFileData.content = "Ajouter une images à votre publication";
              postFileData.multi = true;
            } else if (name === "Video") {
              postFileData.name = name;
              postFileData.icon = dataPosterInfo[0].icon;
              postFileData.accept = "video/mp4,video/x-m4v,video/*";
              postFileData.content = "Ajouter des videos  à votre publication";
              postFileData.multi = false;
            } else if (name === "Poste") {
                
      document.querySelector(".modal-job")?.classList.remove("hidden");
      document.querySelector(".modal-job")?.classList.add("flex");
              }  
        } catch (error) {
            console.log(error)
        }

        // console.log(addToPublish.value, postFileData, toImageConvert.value)
      };

  

    // expose managed state as return value
    return { postFileData, dataPosterInfo, addToPublish, toImageConvert, openAddToPublish, actionsCount, posts, displaySenderComment }
});
