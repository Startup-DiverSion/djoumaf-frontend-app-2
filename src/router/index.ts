import { createRouter, createWebHistory } from "vue-router";
import AuthPage from "../views/auth/AuthPage.vue";
import PageNotFound from "../views/errors/404.vue";

// Pages
import Feed from "@/views/pages/feeds/feed.vue";
import Home from "@/views/pages/home.vue";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "./../vendors/utils/crypt.utils";
import { useNavigationStore } from "@/stores/navigations";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      name: "Home",
      meta: {
        requiresAuth: false,
      },
      component: Home,
    },

    // Feed
    {
      path: "/feeds",
      redirect: "/feeds",
      meta: {
            requiresAuth: true,
          },
      children: [
        {
          path: "",
          name: "Feed",
          meta: {
            requiresAuth: true,
          },
          component: Feed,
        },
        {
          path: "detail/:slug",
          name: "FeedDetail",
          component: Feed,
          //  component: () => import("@/views/pages/feeds/feed.detail.vue"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },

    //
    {
      path: "/networks",
      name: "Networks",
      meta: {
        requiresAuth: true,
      },
      component: () => import("@/views/pages/network/network.vue"),
    },

    // Jobs Route
    {
      path: "/jobs/",
      redirect: "/jobs",

      children: [
        {
          path: "",
          name: "Jobs",
          component: () => import("@/views/pages/jobs/jobs.vue"),
        },
        {
          path: ":slug",
          name: "JobDetail",
          meta: {
            requiresAuth: true,
          },
          component: () => import("@/views/pages/jobs/job.detail.vue"),
        },
        {
          path: "create",
          name: "JobCreate",
          meta: {
            requiresAuth: true,
          },
          component: () => import("@/views/pages/jobs/created/job.create.vue"),
        },
        {
          path: "edit/:slug",
          name: "JobEdit",
          meta: {
            requiresAuth: true,
          },
          component: () => import("@/views/pages/jobs/job.edit.vue"),
        },
      ],
    },


    // Search Route
    {
      path: "/search/",
      redirect: "/search",

      children: [
        {
          path: "",
          name: "Search",
          component: () => import("@/views/pages/search/index.search.vue"),
        },
        {
          path: "profile/avanced",
          name: "SearchAvanced",
          component: () => import("@/views/pages/search/profile.search.vue"),
        },
      ],
    },




    {
      path: "/messages/",
      redirect: "/messages",
      children: [
        {
          path: "",
          name: "Messages",
          component: () => import("@/views/pages/chats/chat.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/notifications",
      name: "Notifications",
      component: () => import("@/views/pages/notifications/notification.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/",
      redirect: "/",
      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: ":slug",
          name: "Profile",
          component: () => import("@/views/pages/profile/profile.vue"),
        },
        {
          path: ":slug?content_page=cv",
          name: "ProfileCV",
          component: () => import("@/views/pages/profile/profile.vue"),
        },
        {
          path: ":slug/cv-created/:id",
          name: "ProfileCvCreate",
          component: () =>
            import("@/views/pages/profile/profile.cv.created.vue"),
        },
        {
          path: "candidacy",
          name: "ProfileCandidacy",
          component: () =>
            import("@/views/pages/candidacy/candidacy.index.vue"),
        },
        {
          path: ":slug/recent-activity",
          name: "RecentActivity",
          component: () =>
            import("@/views/pages/profile/profile.recentActivity.vue"),
        },
        {
          path: ":slug/my-cercle",
          name: "MyCercle",
          component: () =>
            import("@/views/pages/profile/profile.myCercle.vue"),
        },
        
      ],
    },

    {
      path: "/choose-preference",
      name: "choosePreference",
      component: () => import("@/views/auth/Auth.redirect.choose.vue"),
    },
    // {
    //   meta: {
    //     requiresAuth: true,
    //   }
    // },
    {
      path: "/auth/",
      name: "Auth",
      component: AuthPage,
      redirect: "/auth/sign-in",

      children: [
        {
          path: "sign",
          name: "SignHome",
          component: () => import("@/views/auth/signHome.vue"),
        },
        {
          path: "sign-in",
          name: "SignIn",
          component: () => import("@/views/auth/signIn.vue"),
        },
        {
          path: "sign-up",
          name: "SignUp",
          component: () => import("@/views/auth/signUp.vue"),
        },
        {
          path: "sign-validate-account",
          name: "SignValidateAccount",
          component: () => import("@/views/auth/signValidateAccount.vue"),
        },
        {
          path: "sign-change-email",
          name: "SignChangeEmail",
          component: () => import("@/views/auth/SignSendEmail.vue"),
        },
        {
          path: "sign-sucess",
          name: "SignSuccess",
          component: () => import("@/views/auth/signSuccess.vue"),
        },
        {
          path: "sign-change-password",
          name: "SignChangePassword",
          component: () => import("@/views/auth/signChangePassword.vue"),
        },
      ],
    },

    // Profile Auth
    {
      path: "/auth/",
      name: "AuthProfile",
      redirect: "/auth/finalize-the-creation-of-your-profile",
      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: "finalize-the-creation-of-your-profile",
          name: "AuthProfileIndex",
          component: () => import("@/views/profile/index.profile.vue"),
        },
      ],
    },

    // Legal Routes
    {
      path: "/legal/",
      name: "Legal",
      redirect: "/legal/condiction-general-utilisation",

      children: [
        {
          path: "condiction-general-utilisation",
          name: "CGU",
          component: () => import("@/views/public/condiction.general.vue"),
        },
        {
          path: "polilique-utilisation-cookies",
          name: "PUC",
          component: () =>
            import("@/views/public/polique.utilisation.cookie.vue"),
        },
      ],
    },

    { path: "/:pathMatch(.*)*", component: PageNotFound },
  ],
});

router.beforeEach(async (to, from) => {
  // Determine if the route requires authentication
  const TOKEN =
    (await new LocalSotreUtils().get("jToken")) !== null ? true : false;
  const SETP: any = (await new LocalSotreUtils().get("jProfileSetp"))
    ? new CryptUtils().qDecrypted(
        await new LocalSotreUtils().get("jProfileSetp")
      )
    : null;
  const isLoggedIn: any = TOKEN;

  if (to.name !== "Auth" && to.name !== "SignIn" && to.name !== "SignUp") {
    if (SETP && SETP == 0 && to.name !== "AuthProfileIndex") {
      return {
        name: "AuthProfileIndex",
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      };
    } else if (SETP && SETP != 0 && to.name === "AuthProfileIndex") {
      return {
        name: "Jobs",
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      };
    }

    if (to.meta.requiresAuth && !isLoggedIn) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      return {
        name: "SignIn",
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      };
    }
  } else {
    if (isLoggedIn) {
      // this route requires auth, check if logged in
      // if not, redirect to login page

      return {
        name: "Jobs",
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      };
    }
  }
});

export default router;
