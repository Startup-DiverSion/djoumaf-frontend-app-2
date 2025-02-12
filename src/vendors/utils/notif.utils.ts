import { createToast, withProps } from "mosha-vue-toastify";
import ToastIndex from "@/toastifications/toast.index.vue";
import ToastPoster from "@/toastifications/toast.poster.vue";

export class NotifUtils {
  private configOptions(timeout?: any) {
    const cf: any = {
      timeout: timeout || 5000,
      hideProgressBar: true,
      position: "bottom-right",
      transition: "slide",
      type: "default",
    };
    return cf;
  }

  private configOptionsTop(timeout?: any) {
    const cf: any = {
      timeout: timeout || 5000,
      hideProgressBar: true,
      position: "top-right",
      transition: "slide",
      type: "default",
    };
    return cf;
  }

  // New user connected
  public simple(title: any, description: any, type: any, timeout?: any) {
    return createToast({ title, description },  {
        timeout: timeout || 5000,
        hideProgressBar: true,
        position: "bottom-right",
        transition: "slide",
        type,
      });
  }

  // New user connected
  public success(title: any, description: any, timeout?: any) {
    return createToast(
      withProps(ToastIndex, {
        statut: title,
        icon: "check",
        color: "green-500",
        message: description,
      }),  {
        timeout: timeout || 5000,
        hideProgressBar: true,
        position: "bottom-right",
        transition: "slide",
        type: "default",
      });
  }


   // New user connected
   public poster(title: any, icon: any, color: any, description: any, seeText: any, seeLink:any,  timeout?: any) {
    return createToast(
      withProps(ToastPoster, {
        statut: title,
        icon,
        color,
        message: description,
        seeText,
        seeLink
      }),  {
        timeout: timeout || 5000,
        hideProgressBar: true,
        position: "bottom-right",
        transition: "slide",
        type: "default",
      });
  }

    // Custom
    public custom(title: any, description: any, icon:any, color:any, timeout?: any) {
      return createToast(
        withProps(ToastIndex, {
          statut: title,
          icon: icon,
          color: color,
          message: description,
        }),  {
          timeout: timeout || 5000,
          hideProgressBar: true,
          position: "bottom-right",
          transition: "slide",
          type: "default",
        });
    }

  // New user connected
  public error(title: any, description: any, timeout?: any) {
    return createToast(
      withProps(ToastIndex, {
        statut: 'Oups!',
        icon: "cross",
        color: "red-400",
        message: "Une erreur c'est produite",
      }),  {
        timeout: timeout || 5000,
        hideProgressBar: true,
        position: "bottom-right",
        transition: "slide",
        type: "default",
      });
  }


  // New user connected
  public newUser(timeout?: any) {
    return createToast(
      withProps(ToastIndex, {
        statut: "Hello! Bienvenue,",
        icon: "user",
        color: "orange-500",
        message: `Connectez-vous, Maintenant sur DjoumAf.`,
      }),
      this.configOptionsTop(timeout)
    );
  }

  // Notification : Email comfirmed
  public emailComfirm(timeout?: any) {
    return createToast(
      withProps(ToastIndex, {
        statut: "Comfirmez votre mail",
        icon: "envelope",
        color: "blue-500",
        message: `Un mail de confirmation vous à été envoyer.`,
      }),
      this.configOptionsTop(timeout)
    );
  }

  // Notification : Email comfirmed
  public emailComfirmTrue(timeout?: any) {
    return createToast(
      withProps(ToastIndex, {
        statut: "Mail Comfirmer",
        icon: "check",
        color: "green-500",
        message: `Votre addresse mail à été comfirmer avec succès`,
      }),
      this.configOptions(timeout)
    );
  }

  

  // Notification : Succes created jobs
  public createdJob(timeout?: any) {
    return createToast(
      withProps(ToastIndex, {
        statut: "Succès",
        icon: "check",
        color: "green-500",
        message: `Offre d'emploi ajouter.`,
      }),
      this.configOptions(timeout)
    );
  }

  // Notification : Build App
  public buildApp(timeout?: any) {
    return createToast(
      withProps(ToastIndex, {
        statut: "En developpement",
        icon: "megaphone",
        color: "blue-700",
        message: `Cette zone est en cours de developpement.`,
      }),
      this.configOptions(timeout)
    );
  }
}
