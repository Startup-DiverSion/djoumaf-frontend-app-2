import { reactive, ref, computed } from "vue";
import { ProfileService } from "@/services/profile.services";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { AuthValidate } from "@/vendors/validators/auth.validate";
import { useProfileStore } from "./../stores/profile.store";

export const useNavigationComposition = () => {
  // State Data
  const MenuLinks = reactive([
    {
        name: "Fil d'actualité",
        icon: "fi fi-sr-home",
        link: "Feed",
    },
    {
        name: "Offre d'emploi",
        icon: "fi fi-sr-briefcase",
        link: "Jobs",
    },
    {
      name: "Mon cercle",
      icon: "fi fi-sr-world",
      link: "Networks",
  }
  
  ,{
    name: "Messages",
    icon: "fi fi-sr-comment-alt",
    link: "Messages",
},
  {
    name: "Condidactures",
    icon: "fi fi-sr-handshake",
    link: "ProfileCandidacy",
},
{
  name: "Recherche Avancer",
  icon: "fi fi-sr-handshake",
  link: "SearchAvanced",
},
{
  name: "Recherche Avancer",
  icon: "link",
  link: "ProfileCv",
},
//   {
//     name: "Publier un offre",
//     icon: "fi fi-sr-add",
//     link: "JobCreate",
// },
    // {
    //   name: "Boite mail",
    //   icon: "fi fi-sr-envelope",
    //   link: "ProfileDJMail",
    // },
    // {
    //   name: "CV",
    //   icon: "fi fi-sr-document",
    //   link: "Feed",
    // },
]);
const profileConnexion = reactive([
    {
        id: "setting",
        name: "Parametre",
        icon: "fi fi-sr-settings",
        action: "link",
        mode: "link",
        link: "Setting"
    },
    {
        id: "preferences",
        name: "preferences",
        mode: "link",
        icon: "fi fi-sr-settings-sliders",
        action: "",
        link: "Preferences"
    },
    {
        id: "sign-out",
        name: "Deconnexion",
        icon: "fi fi-sr-exit",
        action: "",
        mode: "no-link",
        link: "Out"
    },
]);

const MenuLinksFooter = reactive([
  {
      name: "Publier",
      icon: "fi fi-sr-add",
      link: "/job/create",
  },
  {
      name: "Profile",
      icon: "fi fi-sr-user",
      link: "/",
  },
]);

const load = ref(true);
//
const router = useRouter();
const FunProfileConnexion = (mode: any, refx: any) => {
  if (mode === "no-link" && refx === "sign-out") {
      new LocalSotreUtils().clear();
      router.replace('/')
  }
};




  return {
    MenuLinks,
    profileConnexion,
    MenuLinksFooter,
    FunProfileConnexion,
    load
  };
};
