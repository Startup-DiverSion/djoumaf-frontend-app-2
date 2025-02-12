<template>
    <HomeTwoLayout>
      <template #small>
        
        <JobCreatedForm data="edit" />
      </template>
  
      <template #middle>
        
        <JobProfileReconnandation />
      </template>
    </HomeTwoLayout>
  </template>
  
  <script lang="ts">
 const OnlyInput= defineAsyncComponent(() =>
  import('@/components/forms/onlyInput.vue')
)
  const HomeTwoLayout= defineAsyncComponent(() =>
  import('@/layouts/HomeTwoLayout.vue')
)
  import { defineComponent, onMounted, defineAsyncComponent } from "vue";
  import Editor from "@tinymce/tinymce-vue";
  const formSelect= defineAsyncComponent(() =>
  import('@/components/forms/form.select.vue')
)
  const formDate= defineAsyncComponent(() =>
  import('@/components/forms/form.date.vue')
)
  const CardMedia= defineAsyncComponent(() =>
  import('@/components/cards/medias/card.media.vue')
)
  const CardPostProfile= defineAsyncComponent(() =>
  import('@/components/cards/card.post.profile.vue')
)
  import JobCreatedForm from "../jobs/created/jobCreatedForm.vue";
  import { useJobCreated } from "../jobs/created/job.created";
  import JobProfileReconnandation from "../jobs/job.profile.reconnandation.vue";
  export default defineComponent({
    name: "",
    components: {
      HomeTwoLayout,
      OnlyInput,
      editor: Editor,
      formSelect,
      formDate,
      CardMedia,
      CardPostProfile,
      JobCreatedForm,
      JobProfileReconnandation
  },
    props: [],
    setup() {
      onMounted(() => {
        console.log(Editor);
      });
  
      const { dataInput } = useJobCreated()
  
      return {
        dataInput
      };
    },
  });
  </script>
  
  <style scoped></style>
  