import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useNotificateStore = defineStore("natificate", () => {
  const userNotificate = ref();

  const newNotify = reactive({
    count: 0,
    actived: false,
  });

  const newNotifyMessage = reactive({
    count: 0,
    actived: false,
  });


  return {
    userNotificate,
    newNotify,
    newNotifyMessage
  }
    
});
