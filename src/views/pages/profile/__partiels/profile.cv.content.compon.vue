<template>
  <div class="flex flex-col bg-white rounded-md">
    <div class="flex flex-col gap-4 px-4">
      <CardBody :label="title">
        <div
          class="lg:grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4"
          :class="isfree ? 'hidden' : ''"
        >
          <div v-for="(item, index) in cvData.filter((el:any) => el.premiun == !isfree)">
           
            <ProfileCvContentComponData :item="item" :data="data"  />
          </div>
        </div>

        <Swiper
          :class="isfree ? 'lg:hidden' : 'lg:hidden hidden'"
          :pagination="{ clickable: true }"
          :modules="modules"
          :slides-per-view="1"
          :space-between="50"
        >
          <swiper-slide v-for="(item, index) in cvData">
            <ProfileCvContentComponData :item="item" :data="data" />
          </swiper-slide>
        </Swiper>
      </CardBody>
    </div>
  </div>
</template>

<script lang="ts">
const CardBody = defineAsyncComponent(
  () => import("@/components/cards/medias/card.body.vue")
);
import { envConfig } from "@/env.config";
import { StarIcon } from "@heroicons/vue/24/solid";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import {
  defineComponent,
  ref,
  reactive,
  defineAsyncComponent,
  computed,
onMounted,
} from "vue";
import ProfileCvContentComponData from "./profile.cv.content.compon.Data.vue";

export default defineComponent({
  name: "profile-cv-content",
  props: ["cvData", "data", "title", "isfree"],
  components: {
    CardBody,
    StarIcon,
    Swiper,
    SwiperSlide,
    ProfileCvContentComponData,
  },
  setup(props) {
    const showInfoCard = ref(false);

    onMounted(() => {
      // props.cvData.filter((el:any) => el.premiun == !isfree)
    })

    const MobileDecte = computed(() => {
      let check = false;
    });

    return {
      showInfoCard,
      MobileDecte,
      modules: [Navigation, Pagination],
    };
  },
});
</script>

<style scoped></style>
