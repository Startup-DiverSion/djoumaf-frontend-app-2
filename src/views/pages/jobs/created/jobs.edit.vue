<template>
    <HomeTwoLayout>
      <template #small>
        
        <JobCreatedForm />
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
  import JobCreatedForm from "./jobCreatedForm.vue";
import JobProfileReconnandation from "../job.profile.reconnandation.vue";
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
  
      return {};
    },
  });
  </script>
  
  <style scoped></style>
  