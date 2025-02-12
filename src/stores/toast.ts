import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useToastStore = defineStore("Toast", () => {
    const Toast = ref({
        active: false,
        statut: '',
        message: '',
        delai: '',
        textColor: '',
        bgColor: '',
        icon: ''
    })

    const ToastAll:any = ref([])

    // expose managed state as return value
    return { Toast, ToastAll }
});
