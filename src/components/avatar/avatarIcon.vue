<template>
  <HomeIcon :class="className" v-if="path == 'Feed'" />
  <GlobeAsiaAustraliaIcon :class="className" v-if="path == 'Networks'" />
  <BriefcaseIcon :class="className" v-if="path == 'Jobs'" />
  <ChatBubbleBottomCenterTextIcon
    :class="className"
    v-if="path == 'Messages'"
  />
  <BellIcon :class="className" v-if="path == 'Notifications'" />
  <PlusCircleIcon :class="className" v-if="path == 'JobCreate'" />
  <i
    class="ri-shake-hands-fill"
    :class="className + ' text-2xl'"
    v-if="path == 'ProfileCandidacy'"
  ></i>
  <i
    class="ri-user-search-fill"
    :class="className + ' text-2xl'"
    v-if="path == 'SearchAvanced'"
  ></i>
  <PlusCircleIcon :class="className" v-if="path == '/job/create'" />
  <UserIcon :class="className" v-if="path == '/'" />

  <div v-if="path == 'ProfileCv'">
    <div
      class="w-5 h-5 flex items-center justify-center top-2 left-2 rounded-full bg-white absolute  text-gray-700 z-10 text-[9px] border-2 border-gray-700 font-black"
    >
      CV
    </div>
    <DocumentTextIcon :class="className" />
  </div>

  <UserIcon :class="className" v-if="path == 'user'" />
  <StarIcon :class="className" v-if="path == 'bio'" />
  <MapPinIcon :class="className" v-if="path == 'marker'" />
  <MapPinIcon :class="className" v-if="path == 'place'" />
  <CreditCardIcon :class="className" v-if="path == 'account'" />

  <Cog6ToothIcon :class="className" v-if="path == 'Setting'" />
  <AdjustmentsVerticalIcon :class="className" v-if="path == 'Preferences'" />
  <ArrowLeftOnRectangleIcon :class="className" v-if="path == 'Out'" />

  <VideoCameraIcon :class="className" v-if="path == 'Video'" />
  <PhotoIcon :class="className" v-if="path == 'Images'" />
  <BriefcaseIcon :class="className" v-if="path == 'Poste'" />
  <NewspaperIcon :class="className" v-if="path == 'Article'" />

  <LockClosedIcon :class="className" v-if="path == 'lock'" />
  <ArchiveBoxArrowDownIcon :class="className" v-if="path == 'reject'" />
  <CheckIcon :class="className" v-if="path == 'check'" />

  <EnvelopeIcon :class="className" v-if="path == 'envelope'" />
  <EnvelopeIcon :class="className" v-if="path == 'mail'" />
  <PhoneIcon :class="className" v-if="path == 'tel'" />
  <ComputerDesktopIcon :class="className" v-if="path == 'site'" />

  <AcademicCapIcon :class="className" v-if="path == 'academi'"  />
  <BeakerIcon :class="className" v-if="path == 'experience'" />
  <LanguageIcon :class="className" v-if="path == 'langage'" />
  <CpuChipIcon :class="className" v-if="path == 'quality'" />
  <ComputerDesktopIcon :class="className" v-if="path == 'competance'" />
  <MusicalNoteIcon :class="className" v-if="path == 'centre'" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  Bars3Icon,
  BeakerIcon,
  BriefcaseIcon,
  HomeIcon,
  GlobeAsiaAustraliaIcon,
  ChatBubbleBottomCenterTextIcon,
  BellIcon,
  PlusCircleIcon,
  AcademicCapIcon,
  SquaresPlusIcon,
  UserIcon,
  StarIcon,
  MapPinIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  AdjustmentsVerticalIcon,
  ArrowLeftOnRectangleIcon,
  VideoCameraIcon,
  PhotoIcon,
  NewspaperIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArchiveBoxArrowDownIcon,
  CheckIcon,
  ComputerDesktopIcon,
  PhoneIcon,
  DocumentTextIcon,
  MagnifyingGlassCircleIcon,
KeyIcon,
LanguageIcon,
CpuChipIcon,
MusicalNoteIcon,
} from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "avatar-icon",
  props: {
    path: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "image form DjoumAf",
    },
    className: String,
  },
  components: {
    Bars3Icon,
    BriefcaseIcon,
    BeakerIcon,
    HomeIcon,
    GlobeAsiaAustraliaIcon,
    ChatBubbleBottomCenterTextIcon,
    BellIcon,
    PlusCircleIcon,
    AcademicCapIcon,
    SquaresPlusIcon,
    UserIcon,
    StarIcon,
    MapPinIcon,
    CreditCardIcon,
    Cog6ToothIcon,
    AdjustmentsVerticalIcon,
    ArrowLeftOnRectangleIcon,
    VideoCameraIcon,
    PhotoIcon,
    NewspaperIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ArchiveBoxArrowDownIcon,
    CheckIcon,
    ComputerDesktopIcon,
    PhoneIcon,
    DocumentTextIcon,
    MagnifyingGlassCircleIcon,
    KeyIcon,
    LanguageIcon,
    CpuChipIcon,
    MusicalNoteIcon
},
  setup(props) {
    return {};
  },
});
</script>

<style scoped></style>
