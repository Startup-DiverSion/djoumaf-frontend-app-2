<template>
  <section class="flex w-full justify-end">
    <NavigationSideMenu />

    <section class="flex justify-end w-full lg:w-[95%] contenaire">
      <NavigationHeader   />

      <section class="lg:w-11/12 w-full m-auto pt-20 lg:py-24 font-love" id="">
        <!--  -->
        <div class="flex flex-col gap-4 relative w-full">
          <div class="flex w-full relation">
            <!--  -->
            <Transition name="slide-fade">
            <CandidacyMenu v-if="MenuDjMailBoll" :mailLinks="mailLinks" :navigateMail="navigateMail" @navigateMail="(value:any) => navigateMail = value" />
            </Transition>
            <!--  -->
            <div
              class="flex flex-col w-full lg:w-9/12 rounded-r-md relative h-[80vh]"
            >
              <div
                class="bg-white flex justify-between px-4 py-5 absolute w-full"
              >
                <div class="flex items-center gap-2">
                  <Bars3Icon
                    class="h-6" v-if="MenuDjMailBoll !== true"
                    @click=" MenuDjMail(MenuDjMailBoll)"
                  ></Bars3Icon>
                  <XMarkIcon
                    class="h-6 lg:hidden" v-if="MenuDjMailBoll == true"
                    @click=" MenuDjMail(MenuDjMailBoll)"
                  ></XMarkIcon>
                  <span class="text-lg font-bold">Candidactures</span>
                </div>

                <div
                  class="flex gap-2 px-4 h-auto lg:w-4/12 w-6/12 border-[1px] items-center"
                >
                  <MagnifyingGlassIcon class="h-6" />
                  <input
                    class="w-full bg-transparent outline-none py-2"
                    placeholder="Recherche un nom"
                    type="search"
                    v-model="candidacySearch"
                    name="candidacySearch"
                    id="candidacySearchID"
                  />
                </div>
              </div>

              <!--  -->

              <!--  -->
              
              <div
                class="mt-20 pt-4 pb-16 px-4 flex flex-col gap-2 overflow-auto font-love bg-white/50 h-full"
                v-if="talkMailsData"
              >
                <CandidacyAll
                  v-if="navigateMail === 0"
                  :talkMailsData="talkMailsData"
                /><!-- All -->

                <CandidacySelected
                  v-if="navigateMail === 1"
                  :talkMailsData="candidacyNoRead"
                /><!-- Selected -->

                <CandidacySelected
                  v-if="navigateMail === 3"
                  :talkMailsData="candidacySelected"
                /><!-- Selected -->

                <CandidacySelected
                  v-if="navigateMail === 4"
                  :talkMailsData="candidacyReject"
                /><!-- Rejecter -->
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </section>
  </section>

  {{ __candidacySelected }}
  {{ __candidacySearch }}
</template>

<script lang="ts">
const BtnMoreCard= defineAsyncComponent(() =>
  import('@/components/buttons/btn.more.card.vue')
)
const BtnSimple= defineAsyncComponent(() =>
  import('@/components/buttons/btn.simple.vue')
)
const CardPostProfile= defineAsyncComponent(() =>
  import('@/components/cards/card.post.profile.vue')
)
const CardBody= defineAsyncComponent(() =>
  import('@/components/cards/medias/card.body.vue')
)
import { defineComponent, reactive, onMounted, ref, computed, defineAsyncComponent } from "vue";
import { useProfileMailComposition} from "@/composables/profileMail.composition"
import Editor from "@tinymce/tinymce-vue";
import { useUserComposition } from "@/composables/user.composition";
import LoadingMessageEmpty from "@/components/cards/loading/loading.message.empty.vue";
const TalkCard  = defineAsyncComponent(() =>
import('@/components/talkMessages/talk.card.vue')
)
const NavigationSideMenu= defineAsyncComponent(() =>
  import('@/navigations/navigation.side.menu.vue')
)
import NavigationHeader from "@/navigations/navigationHeader.vue"
import CandidacyAll from "./candidacy.all.vue";
import CandidacySelected from "./candidacy.selected.vue";
import CandidacyMenu from "./candidacy.menu.vue";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "profile-mail",
  props: [],
  components: {
    CardBody,
    BtnSimple,
    BtnMoreCard,
    CardPostProfile,
    editor: Editor,
    LoadingMessageEmpty,
    TalkCard,
    NavigationSideMenu,
    NavigationHeader,
    CandidacyAll,
    CandidacySelected,
    CandidacyMenu,
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon
},
  setup() {
    const { GET_USER, USER } = useUserComposition();

    onMounted(async () => {
      await GET_USER();
    });

    const navigateMail = ref(0);

    const mailLinks = ref([
      {
        id: 0,
        name: "Toutes les condidactures",
        count: 0,
      },
      {
        id: 1,
        name: "Condidacture non vue(s)",
        count: 0,
      },
      // {
      //   id: 2,
      //   name: "Favories",
      //   count: 0,
      // },
      {
        id: 3,
        name: "Condidacture en favorie",
        count: 0,
      },
      {
        id: 4,
        name: "Condidacture rejecter",
        count: 0,
      },
      // {
      //   id: 5,
      //   name: "Profile interesant",
      //   count: 0,
      // },
    ]);
    const candidacySearch = ref("");
    const talkMailsDataCache = ref();

    const {
      talkMails,
      talkMailsData,
      candidacySelected,
      candidacyReject,
      envConfig,
      candidacy_state_defined,
      candidacyNoRead,
    } = useProfileMailComposition();
    const MenuDjMailBoll = ref(true);

    const MenuDjMail = (dor: boolean) => {
      const MenuDjMail = document.querySelector(".MenuDjMail");
      if (dor === true) {
        MenuDjMail?.classList.remove("flex");
        setTimeout(() => {
          MenuDjMail?.classList.add("hidden");
        }, 500);
       
      } else {
        MenuDjMail?.classList.remove("hidden");
        MenuDjMail?.classList.add("flex");
      }

      MenuDjMailBoll.value === true
                          ? (MenuDjMailBoll.value = false)
                          : (MenuDjMailBoll.value = true)
    };

    onMounted(() => {
      if (USER) {
        talkMails().then(() => {
          talkMailsDataCache.value = talkMailsData.value;
        });
      }
    });

    const __candidacySearch = computed(() => {
      if (talkMailsDataCache.value) {
        talkMailsData.value = talkMailsDataCache.value.filter((el: any) => {
          return (
            el.user?.profile?.full_name
              .toLowerCase()
              .includes(candidacySearch.value.toLowerCase()) ||
            el.subject
              .toLowerCase()
              .includes(candidacySearch.value.toLowerCase())
          );
        });
      }
    });

    const __candidacySelected = computed(() => {
      mailLinks.value[0].count = talkMailsData.value.length;

      candidacyNoRead.value = talkMailsData.value.filter((el: any) => {
        return el.candidacy_see_profile === false;
      });
      mailLinks.value[1].count = candidacyNoRead.value.length;

      candidacySelected.value = talkMailsData.value.filter((el: any) => {
        return el.candidacy_state === true;
      });
      mailLinks.value[2].count = candidacySelected.value.length;

      candidacyReject.value = talkMailsData.value.filter((el: any) => {
        return el.candidacy_state === false;
      });
      mailLinks.value[3].count = candidacyReject.value.length;
    });

    return {
      mailLinks,
      talkMailsData,
      envConfig,
      USER,
      navigateMail,
      MenuDjMail,
      MenuDjMailBoll,
      candidacySelected,
      __candidacySelected,
      candidacyReject,
      candidacyNoRead,
      candidacySearch,
      __candidacySearch,
    };
  },
});
</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
