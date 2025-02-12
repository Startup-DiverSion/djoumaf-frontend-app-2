import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
import { useProfileStore } from "./../stores/profile.store";
import { ApplyService } from "@/services/apply.sercices";
import { NotifUtils } from "@/vendors/utils/notif.utils";
import { PostService } from "@/services/post.services";
import axios from "axios";
import { Device } from "@capacitor/device";
import { useModal } from "@/components/modals/modal.services";
import { useFeedStore } from "@/stores/feeds";
import moment from "moment";

export const useFeedComposition = () => {
  const jStore = new LocalSotreUtils();
  const jUseStore: any = useProfileStore();
  const jCryto = new CryptUtils();
  const router = useRouter();
  const route = useRoute();
  const { modal, toImageConvert } = useModal();

  //   Loading
  const post_loading = ref(false);
  const post_index_loading = ref(false);

  //   Input Data
  const inputPost = reactive({
    description: "",
    place: "",
    device: "",
  });

  //   Input Error
  const isError = ref({ path: "", message: "" });

  const openModalAside = (name: string) => {
    if (name !== "Poste") {
      toPoster();
    }
    useFeedStore().openAddToPublish(name);
  };

  // Actions card
  const ActionsCard = (
    djoumer: number,
    likes: number,
    comments: number,
    postID: any,
    is_djoumer: Boolean,
    is_likes: Boolean,
    is_comments: Boolean,
    is_share: Boolean,
    is_stats: Boolean
  ) => {
    return [
      {
        id: "dj-00",
        name: "Djom",
        count: djoumer,
        icon: "group-hover:bg-blue-400/20 group-hover:text-blue-400",
        iconReturn:
          "fi fi-rr-arrow-small-up flex group-hover:bg-blue-400/20 group-hover:text-blue-400 text-gray-700/80",
        iconActived:
          "group-hover:bg-blue-400/20 group-hover:text-blue-400 text-blue-400/80",
        color: "group-hover:text-blue-400 ",
        colorReturn: "group-hover:text-blue-400 text-gray-700/80",
        colorActived: "group-hover:text-blue-400 text-blue-400/80",
        postID,
        allready: is_djoumer,
      },
      {
        id: "dj-01",
        name: "J'adore",
        count: likes,
        icon: "group-hover:bg-orange-400/20 group-hover:text-orange-400",
        iconReturn:
          "fi fi-rr-heart flex group-hover:bg-orange-400/20 group-hover:text-orange-400 text-gray-700/80",
        iconActived:
          "group-hover:bg-orange-400/20 group-hover:text-orange-400 text-orange-400/80",
        color: "group-hover:text-orange-400",
        colorReturn: "group-hover:text-orange-400 text-gray-700/80",
        colorActived: "group-hover:text-orange-400 text-orange-400/80",
        postID,
        allready: is_likes,
      },
      {
        id: "dj-02",
        name: "Commenter",
        count: comments,
        icon: "group-hover:bg-purple-400/20 group-hover:text-purple-400",
        iconReturn:
          "fi fi-rr-comment-alt flex group-hover:bg-purple-400/20 group-hover:text-purple-400 text-gray-700/80",
        iconActived:
          "group-hover:bg-purple-400/20 group-hover:text-purple-400 text-purple-400/80",
        color: "group-hover:text-purple-400",
        colorReturn: "group-hover:text-purple-400 text-gray-700/80",
        colorActived: "group-hover:text-purple-400 text-purple-400/80",
        postID,
        allready: is_comments,
      },
      // {
      //   id: "dj-03",
      //   name: 0,
      //   icon: "fi fi-rr-arrows-repeat flex group-hover:bg-green-400/20 group-hover:text-green-400",
      //   color: "group-hover:text-green-400",
      // },
      {
        id: "dj-04",
        name: "Partager",
        count: 0,
        icon: "group-hover:bg-gray-400/20 group-hover:text-gray-400",
        iconReturn:
          "fi fi-rr-arrow-small-up flex group-hover:bg-blue-400/20 group-hover:text-blue-400 text-gray-700/80",
        iconActived:
          "group-hover:bg-blue-400/20 group-hover:text-blue-400 text-blue-400/80",
        color: "group-hover:text-gray-400",
        colorReturn: "group-hover:text-blue-400 text-gray-700/80",
        colorActived: "group-hover:text-blue-400 text-blue-400/80",
        postID,
        allready: is_share,
      },
      {
        id: "dj-05",
        name: "Vus",
        count: 0,
        icon: "group-hover:bg-fuchsia-400/20 group-hover:text-fuchsia-400",
        iconReturn:
          "fi fi-rr-chart-histogram flex group-hover:bg-fuchsia-400/20 group-hover:text-fuchsia-400 text-gray-700/80",
        iconActived:
          "group-hover:bg-blue-400/20 group-hover:text-fuchsia-400 text-fuchsia-400/80",
        color: "group-hover:text-fuchsia-400",
        colorReturn: "group-hover:text-fuchsia-400 text-gray-700/80",
        colorActived: "group-hover:text-fuchsia-400 text-fuchsia-400/80",
        postID,
        allready: is_stats,
      },
    ];
  };

  const openModal = ref(false);
  const toPoster = () => {
    useFeedStore().addToPublish = false;
    document.querySelector(".modal")?.classList.remove("hidden");
    document.querySelector(".modal")?.classList.add("flex");
    document.querySelector("body")?.classList.add("overflow-hidden");
  };

  //
  const BASE = async (AService: any, callback: Function, loading?: boolean) => {
    loading = true;
    const __base = await AService;
    if (__base?.error) {
      loading = false;
      return (isError.value = __base?.error[0]);
    }

    callback(__base);
    loading = false;
  };

  const logInfo = async () => {
    try {
      const { data } = await axios.get("https://ipapi.co/json/");

      if (data.ip) {
        inputPost.place = JSON.stringify(data);
        inputPost.device = JSON.stringify(await Device.getInfo());
      }
    } catch (error) {
      inputPost.place = "";
      inputPost.device = JSON.stringify(await Device.getInfo());
    }
  };

  // Index Post : Get All post
  const posts: any = ref([]);
  const postIndex = async (query?:any) => {
    useFeedStore().actionsCount = [];
    try {
      post_index_loading.value = true;

      const { posts: _posts, e } = await new PostService().findAll(query ? query : '');
      if (_posts) {
        
        posts.value = _posts.reverse();
        posts.value.forEach((post: any) => {
          post.place = post.place ? JSON.parse(post.place) : null;
          post.device = post.device ? JSON.parse(post.device) : null;
          post.created_at = moment(post.created_at).fromNow();

          useFeedStore().actionsCount.push(
            ActionsCard(
              post.djoumer_count,
              post.like_count,
              post.comment_count,
              post.id,
              post.is_djoumer,
              post.is_liked,
              post.is_comments,
              false,
              false
            )
          );

          useFeedStore().posts = posts.value

        });
        post_index_loading.value = false;
      }
      if (e) {
        post_index_loading.value = false;
      }
    } catch (error) {
      post_index_loading.value = false;
    }
  };

const post:any = ref()
const loading_show:any = ref(false)

  const postShow = async (slug:any) => {
    try {
      loading_show.value = true;
      

      const { data, e } = await new PostService().findOne({slug});

      if (data) {
        post.value = data.post;
        post.value.created_at = post.value.created_at ? moment(post.value.created_at).fromNow() : moment().fromNow();
        post.value.place = post.value.place
          ? JSON.parse(post.value.place)
          : null;
        post.value.device = post.value.device
          ? JSON.parse(post.value.device)
          : null;
          loading_show.value = false;
      }
    } catch (error) {
      console.log(error);
      loading_show.value = false;
    }
  };

  //   Created Post
  const postCreate = async () => {
    try {
      post_loading.value = true;

      await logInfo();

      const data = new FormData();
      const filesPost: any = document.querySelector("#id-files-post");

      data.append("description", inputPost.description);
      data.append("device", inputPost.device);
      data.append("place", inputPost.place);
      for (let i = 0; i < filesPost?.files.length; i++) {
        const file = filesPost?.files[i];
        data.append(`files`, file);
      }

      return await BASE(new PostService().create(data), (__base: any) => {
        if (__base?.data) {
          // Close modal
          modal();

          //Send Notification
          // new NotifUtils().poster(
          //   "Post publier",
          //   "fi fi-sr-graduation-cap",
          //   "green-500",
          //   "Votre post à été publier avec succès",
          //   "le post",
          //   "/detail/" + __base?.data?.slug,
          //   10000
          // );
          new NotifUtils().success(
            "Publication",
            "Post publier avec succès",
            5000
          );

          const slug:any= __base?.data?.post?.slug

          postShow(slug).then(() => {
            const postsAll = useFeedStore().posts
            postsAll.unshift(post.value)
            useFeedStore().posts = postsAll        
          })
          // Data
          inputPost.description = "";
          toImageConvert.value = [];

          post_loading.value = false;
        }
      });
    } catch (error) {
      post_loading.value = false;
    }
  };

const loading_delete = ref(false)
  const postDelete = async (id:any) => {
    try {
      loading_delete.value = true;
      

      const { data, e } = await new PostService().delete({id});

      if (data) {
       
       
          loading_delete.value = false;
      }
    } catch (error) {
      console.log(error);
      loading_delete.value = false;
    }
  };



  return {
    router,
    route,
    isError,
    postCreate,
    inputPost,
    post_loading,
    postIndex,
    posts,
    openModalAside,
    toPoster,
    ActionsCard,
    post_index_loading,
    postShow,
    loading_show,
    post,
    postDelete,
    loading_delete
  };
};
