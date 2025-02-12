import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import axios from "axios";
import { URL } from "@/router/url";
import moment from "moment";
import { useCerleComposition } from "./cerle.composition";
import { useNotificateStore } from "@/stores/notificate.store";

export const useNotificationComposition = () => {
  // State Data

  const router = useRouter();
  const route = useRoute();

  const jStore = new LocalSotreUtils();
  const jCryto = new CryptUtils();

  const filterSearch = reactive([
    {
      name: "Messages",
      code: "message",
      count: 0,
      actived: true,
    },
  ]);

  const loading_notify = ref(false);
  const error_notify = ref(false);

  const queryCache: any = ref("");
  const filterActived: any = ref("jobs");
  const notify: any = ref([]);
  const notifyMessage: any = ref();

  const getAllNotify = async () => {
    try {
      loading_notify.value = true;
      const { data } = await axios.get(URL.NOTIFICATION_INDEX);
      if (data) {
        notify.value = data.notifications.reverse();
        useNotificateStore().userNotificate = notify.value;

        loading_notify.value = false;
      }
    } catch (error) {
      loading_notify.value = false;
      error_notify.value = true;
      console.log(error);
    }
  };

  const SeeNotificate = async (notif: any) => {
    const { data } = await axios.post(URL.NOTIFICATION_UPDATE_DISTRIBUTION, {
      id: notif.id,
    });
    if (data) {
      notify.value.forEach((nt: any) => {
        if (nt.provide_id == notif.provide_id) {
          nt.distribution = true;
        }
      });
      useNotificateStore().userNotificate = notify.value;
      if (
        notif.notification_type.id === 238 ||
        notif.notification_type.id === 239 ||
        notif.notification_type.id === 240
      ) {
        router.push("/" + notif?.user.profile.slug);
      } else {
        jStore.set("seeNotificateMessage", notif.provide_id);
        router.push({ name: "Messages" });
      }
    }
  };

  const SendNotification = async (notificationDATA: any) => {
    const { data } = await axios.post(
      URL.NOTIFICATION_CREATE,
      notificationDATA
    );

   
  };

  const DetectToDisplayNotuficate = computed(() => {
    if (notify.value) {
      const discTY = notify.value.filter((nt: any) => {
        return nt?.distribution_all === true;
      });

      notify.value.forEach((notif: any) => {
        if (notif?.distribution_all === false) {
          useNotificateStore().newNotify.actived = true;
        }
      });

      useNotificateStore().newNotify.count =
        notify.value.length - discTY.length;
    }

    if (
      useNotificateStore().newNotify.actived &&
      route.name == "Notifications"
    ) {
      axios
        .post(URL.NOTIFICATION_UPDATE_DISTRIBUTION_ALL, { data: null })
        .then(() => {
          notify.value.forEach((notif: any) => {
            notif.distribution_all = true;
          });

          useNotificateStore().newNotify.actived = false;
          useNotificateStore().newNotify.count = 0;
          useNotificateStore().userNotificate = notify.value;
        });
    }
  });

  return {
    router,
    route,
    filterSearch,
    filterActived,
    notify,
    getAllNotify,
    SeeNotificate,
    loading_notify,
    error_notify,
    DetectToDisplayNotuficate,
    SendNotification,
  };
};
