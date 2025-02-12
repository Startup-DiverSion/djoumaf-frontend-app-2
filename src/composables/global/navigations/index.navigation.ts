import { ref, onMounted, onUnmounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";

// by convention, composable function names start with "use"
export function useNavigationLinks() {
  // state encapsulated and managed by the composable
  const route = useRoute();
  const header = reactive([
    {
      title: "Fil d'actualité",
      icon: "fi fi-sr-home",
      path: "Feed",
      active: true,
    },
    {
      title: "Cercles",
      icon: "fi fi-sr-world",
      path: "Networks",
      active: false,
    },
    {
      title: "Emploi",
      icon: "fi fi-sr-briefcase",
      path: "Jobs",
      active: false,
    },
    {
      title: "Messages",
      icon: "fi fi-sr-comment-alt",
      path: "Messages",
      active: false,
    },
    {
      title: "Notifications",
      icon: "fi fi-sr-bell",
      path: "Notifications",
      active: false,
    },
    // {
    //   title: "Vous",
    //   icon: "fi fi-sr-user",
    //   path: "Profile",
    //   active: false,
    // },
    {
      title: "Rechercher",
      icon: "fi fi-sr-search",
      path: "",
      active: false,
    },

    // {
    //     title: "Publier",
    //     icon: "/icons/navigations/message.png",
    //     path: "Profile",
    //     active: false
    // },
  ]);

  const headerFistPart = reactive([
    {
      title: "Fil d'actualité",
      icon: "fi fi-sr-home",
      path: "Feed",
      active: true,
    },

    {
      title: "Cercles",
      icon: "fi fi-sr-world",
      path: "Networks",
      active: false,
    },

    {
        title: "Messages",
        icon: "fi fi-sr-comment-alt",
        path: "Messages",
        active: false
    },
  ]);
  const headerSecondPart = reactive([
    {
      title: "Emploi",
      icon: "fi fi-sr-briefcase",
      path: "Jobs",
      active: false,
    },

    {
        title: "Notifications",
        icon: "fi fi-sr-bell",
        path: "Notifications",
        active: false
    },

    {
      title: "Publier",
      icon: "fi fi-sr-add",
      path: "JobCreate",
      active: false
  },
    // {
    //   title: "Vous",
    //   icon: "fi fi-sr-user",
    //   path: "Profile",
    //   active: false,
    // },
  ]);

  headerFistPart.forEach((el: any) => {
    el.icon = el.icon + " " + "text-white";
  });
  headerSecondPart.forEach((el: any) => {
    el.icon = el.icon + " " + "text-white";
  });
  const footer = reactive([
    header[0],
    header[1],
    header[3],
    header[4],
    // {
    //   title: "Publier",
    //   icon: "fi fi-sr-add ",
    //   path: "JobCreate",
    //   active: false,
    // },
    
    header[2],
  ]);
  footer.forEach((el: any) => {
    el.icon = el.icon;
  });

  const startAppActiveLinks = computed(() => {
    footer.forEach((el) => {
      el.active = false;
      if (route.name === el.path) {
        el.active = true;
      }
    });
    headerFistPart.forEach((el) => {
      el.active = false;
      if (route.name === el.path) {
        el.active = true;
      }
    });
    headerSecondPart.forEach((el: any) => {
      el.active = false;
      if (route.name === el.path) {
        el.active = true;
      }
    });
  });

  // expose managed state as return value
  return {
    header,
    footer,
    headerFistPart,
    headerSecondPart,
    startAppActiveLinks,
  };
}
