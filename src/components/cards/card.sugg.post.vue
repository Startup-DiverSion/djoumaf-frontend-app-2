<template>
  <div class="" v-if="state_job.jobs" >

    <LadingSpinerBasic :loading="sugg.loading_jobs" />

    <CardMedia label="Suggestion d'offres d'emploi" v-if="!sugg.loading_jobs">
      <div class="flex flex-col px-4 divide-y-[1px] ">
        
          <RouterLink :to="'/jobs/'+job.slug" class="py-2" v-for="job in state_job.jobs">
            <TextQuery
              class-name="font-light uppercase  text-sm   "
              :xl="50"
              :title="job.title"
            />
          </RouterLink>
      </div>
    </CardMedia>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useJobComposition } from "@/views/pages/jobs/job.compositoin";
import CardMedia from "./medias/card.media.vue";
import TextQuery from "../texts/text.query.vue";
import LadingSpinerBasic from "./loading/lading.spiner.basic.vue";

export default defineComponent({
  name: "",
  props: [],
  setup() {
    const { jobIndex, state_job } = useJobComposition();
    const sugg = reactive ({
      loading_jobs: false
    })
    onMounted(() => {
      sugg.loading_jobs = true
      jobIndex({'limit': 4, 'page': 1})
      sugg.loading_jobs = false
    });

    return {
      sugg,
      state_job
    };
  },
  components: { CardMedia, TextQuery, LadingSpinerBasic },
});
</script>

<style scoped></style>
