import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", () => {
  const userToDiscution = ref(null);
  const allChatsGroup:any = ref([]);
  const newChatID_Detect = ref(null)


  return {
    userToDiscution,
    allChatsGroup,
    newChatID_Detect
  }
    
});
