import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import axios from "axios";
import { URL } from "@/router/url";
import moment from "moment";
import { useCerleComposition } from "./cerle.composition";
import { useJobComposition } from "@/views/pages/jobs/job.compositoin";
import { useUploadLocalFile } from "@/composables/uploadLocalFile";
import { usePreferenceComposition } from "@/composables/preference.composition";
import { jsPDF } from "jspdf";
import { NotifUtils } from "@/vendors/utils/notif.utils";

export const useCvComposition = () => {
  // State Data

  const router = useRouter();
  const route = useRoute();

  const jStore = new LocalSotreUtils();
  const jCryto = new CryptUtils();
  const { toImageConvert, image, binaryImage } = useUploadLocalFile();

  const nameToSave = ref("mon-cv-pro");
  const AllColor: any = reactive([
    {
      name: "Orange",
      value: "orange-500",
      prenium: false,
    },
    {
      name: "Blue",
      value: "blue-500",
      prenium: false,
    },
    {
      name: "Green",
      value: "green-500",
      prenium: true,
    },
  ]);

  const MenuCv = reactive([
    {
      icon: "user",
      name: "Informations",
      id: 0,
    },
    {
      icon: "academi",
      name: "Formations",
      id: 1,
    },
    {
      icon: "experience",
      name: "Experiences",
      id: 2,
    },
    {
      icon: "competance",
      name: "Competences",
      id: 3,
    },
    {
      icon: "langage",
    name: "Langues",
      id: 4,
    },
    {
      icon: "quality",
      name: "Qualités",
      id: 5,
    },
    {
      icon: "centre",
      name: "C/ interet",
      id: 6,
    },
  ]);

  const OptionColorCv = reactive([
    {
      name: "blue",
      bg: "bg-blue-400",
      text: "text-blue-400"
    },
    {
      name: "blue",
      bg: "bg-blue-500",
      text: "text-blue-500"
    },
    {
      name: "blue",
      bg: "bg-blue-700",
      text: "text-blue-700"
    },
    {
      name: "blue",
      bg: "bg-blue-800",
      text: "text-blue-800"
    },
  //   Orange
  {
      name: "Orange",
      bg: "bg-orange-400",
      text: "text-orange-400"
    },
    {
      name: "Orange",
      bg: "bg-orange-500",
      text: "text-orange-500"
    },
    {
      name: "Orange",
      bg: "bg-orange-700",
      text: "text-orange-700"
    },
    {
      name: "Orange",
      bg: "bg-orange-800",
      text: "text-orange-800"
    },
    //   Green
  {
      name: "Gre",
      bg: "bg-green-400",
      text: "text-green-400"
    },
    {
      name: "Green",
      bg: "bg-green-500",
      text: "text-green-500"
    },
    {
      name: "Green",
      bg: "bg-green-700",
      text: "text-green-700"
    },
    {
      name: "Green",
      bg: "bg-green-800",
      text: "text-green-800"
    },
  ]);

  const optionColor = ref(OptionColorCv[0])

  const ChooseColorCv = (item:any) => {
    optionColor.value = item
  }

  const toAccess = ref(0);

  const close = ref(true);
  const Preview = (_close: any) => {
    const preview = document.querySelector(".preview");

    if (_close) {
      preview?.classList.remove("hidden");
      close.value = false;
    } else {
      preview?.classList.add("hidden");
      close.value = true;
    }
  };

  const CV_Experience: any = ref([]); // Experiences
  const CV_Quality: any = ref([]); // Qualites
  const CV_Formation: any = ref([]); // Formations
  const CV_References: any = ref([]); // References
  const CV_Competence: any = ref([]); // Comptences
  const CV_BasicInfo: any = reactive({
    image: "",
    firstname: "",
    lastname: "",
    profession: "",
    me: {
      tel: "",
      mail: "",
      place: "",
      site: "",
    },

    about: "",
    hobit: "",
  });

  // Add Elements to Cv
  const AddNewReference = () => {
    CV_References.value.push({
      fullname: "",
      domaine: "",
      contacts: [
        {
          type: "Tel",
          value: "",
        },
        {
          type: "Email",
          value: "",
        },
      ],
    });
  };

  const AddNewQuality = () => {
    CV_Quality.value.push({
      libelle: "",
      per: "",
    });
  };

  const AddNewExperience = () => {
    CV_Experience.value.push({
      date_start: moment().toISOString(),
      date_fin: moment().toISOString(),
      type_exp: "",
      place: "",
      compagny: "",
      description: "",
    });
  };

  const AddNewFormation = () => {
    CV_Formation.value.push({
      date_start: moment().toISOString(),
      date_fin: moment().toISOString(),
      domaine: "",
      school: "",
      diplome: "",
      description: "",
    });
  };

  const AddNewCompetence = () => {
    CV_Competence.value.push({
      libelle: "",
      per: "",
    });
  };

  // Remove Elements to Cv
  const removeDataInExperience = (index: any) => {
    CV_Experience.value.splice(index, 1);
  };
  const removeDataInFormation = (index: any) => {
    CV_Formation.value.splice(index, 1);
  };
  const removeDataInCompetence = (index: any) => {
    CV_Competence.value.splice(index, 1);
  };
  const removeDataInReference = (index: any) => {
    CV_References.value.splice(index, 1);
  };
  const removeDataInQuality = (index: any) => {
    CV_Quality.value.splice(index, 1);
  };

  // Uploads image to Cv
  const uploadImage = (event: any) => {
    image(event);
    CV_BasicInfo.image = toImageConvert.value;
  };

  // Download Cv
  const exportToPDF = () => {
    const source: any = document.querySelector(".main_cv_card");
    const heading: any = document.querySelectorAll(".headingCvBasic");
    const headingCvBasic_image = document.querySelector(
      ".headingCvBasic_image"
    );

    source.classList.remove("h-[60vh]");
    source.classList.remove("w-[105%]");
    source.classList.add("w-[110%]");
    source.classList.add("h-full");

    heading.forEach((el: any) => {
      el.classList.add("-top-[0.35rem]");
    });

    var pdf = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });

    pdf.html(source, {
      margin: [10, 0, 10, 0],
      callback: function (doc) {
        doc.addFont("https://fonts.googleapis.com/css2?family=Kablammo&display=swap", "Kablammo", "normal");
        doc.setFont("Kablammo");
        doc.save(nameToSave.value + ".pdf");

        source.classList.add("h-[60vh]");
        source.classList.remove("w-[110%]");
        source.classList.add("w-[105%]");
        source.classList.remove("h-full");
        heading.forEach((el: any) => {
          el.classList.remove("-top-[0.35rem]");
        });
      },
    });
  };

  // Save to Cv
  const SaveCvInDataBase = async () => {
    try {
      const data_cv_user = {
        basicInfo: JSON.stringify(CV_BasicInfo),
        experiences: JSON.stringify(CV_Experience),
        cources: JSON.stringify(CV_Formation.value),
        skills: JSON.stringify(CV_Competence.value),
        references: JSON.stringify(CV_References),
        quality: JSON.stringify(CV_Quality),
        name: nameToSave.value,
        model: route.params.id ? route.params.id : "",
      };

      const { data } = await axios.post(URL.PROFILE_CREATE_CV, data_cv_user);

      if (data) {
        console.log(data);
        exportToPDF();
        new NotifUtils().success(
          "curriculum vitae (Cv)",
          "Enregistre & telecharger avec succès"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const state_cv = reactive({
    data: ref(),
  });

  const findCV = async () => {
    try {
      const { data } = await axios.get(URL.PROFILE_INDEX_CV);
      if (data) {
        state_cv.data = data.cv;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteCV = async (id: any) => {
    try {
      const { data } = await axios.post(URL.PROFILE_DELETE_CV, { id });
      if (data) {
        state_cv.data = state_cv.data.filter((el: any) => {
          return el.id != id;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    router,
    route,
    findCV,
    state_cv,
    DeleteCV,
    exportToPDF,
    CV_Experience,
    AddNewExperience,
    CV_Formation,
    AddNewFormation,
    removeDataInExperience,
    AddNewCompetence,
    CV_Competence,
    CV_BasicInfo,
    uploadImage,
    removeDataInFormation,
    removeDataInCompetence,
    removeDataInQuality,
    AddNewReference,
    removeDataInReference,
    CV_References,
    AddNewQuality,
    CV_Quality,
    Preview,
    SaveCvInDataBase,
    nameToSave,
    optionColor,
    AllColor,
    MenuCv,
    toAccess,
    OptionColorCv,
    ChooseColorCv
  };
};
