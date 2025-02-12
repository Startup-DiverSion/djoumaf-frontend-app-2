<template>
   
      <div class="flex sticky top-24 w-full">

        <CardMedia label="Des profils en fonction de votre offre.">
          <div class="">
            <div
            class="flex  w-10/12 m-auto"
          >
           
          <span class="text-sm text-yellow-300 font-light"> Cette option est en cours de développement pour les comptes payants (Possibilité de voir les profile intéressant en temps réel, en fonction de votre offre d'emploi). </span>

          </div>
          </div>
        </CardMedia>

      </div>

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
  export default defineComponent({
    name: "job-profile-reconnandation",
    components: {
      HomeTwoLayout,
      OnlyInput,
      editor: Editor,
      formSelect,
      formDate,
      CardMedia,
      CardPostProfile
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
  