<template>
  <div class="">
    <!-- Content =* Images -->
    <div class="w-11/12 m-auto flex flex-col">
      <article
        class="text-thin flex whitespace-pre-wrap font-normal"
        v-html="
          content.length >  allText
            ? `${mediaSize !== 0 ?  content.substring(0, 50) + '...' : content.substring(0, 200) + '...'}`
            : content
        "
      ></article>
     <div class="flex w-full justify-start mt-1">
        <span class=" font-bold text-xs underline underline-offset-2 cursor-pointer flex" v-if="content.length > allText" @click="LongArticle">Voir plus</span>
     </div>
    </div>

  
  </div>
</template>

<script lang="ts">
const BtnDjoumer= defineAsyncComponent(() =>
  import('@/components/buttons/btn.djoumer.vue')
)
const BtnFollow= defineAsyncComponent(() =>
  import('@/components/buttons/btn.follow.vue')
)
const CardMedia= defineAsyncComponent(() =>
  import('@/components/cards/medias/card.media.vue')
)
const ChooseYourPreference= defineAsyncComponent(() =>
  import('@/components/toPages/Auth/chooseYourPreference.vue')
)
const LegalAuthCompoment= defineAsyncComponent(() =>
  import('@/components/toPages/Auth/legalAuthCompoment.vue')
)
const NavigationFooter= defineAsyncComponent(() =>
  import('@/navigations/navigationFooter.vue')
)
import NavigationHeader from "@/navigations/navigationHeader.vue"
import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from "vue";
import InDeveloppmentApp from "@/components/inDeveloppment/in.developpment.app.vue";
import TextQuery from "@/components/texts/text.query.vue";

export default defineComponent({
  name: "",
  props: ["content", "mediaSize"],
  components: {
    NavigationHeader,
    NavigationFooter,
    ChooseYourPreference,
    CardMedia,
    BtnFollow,
    BtnDjoumer,
    LegalAuthCompoment,
    InDeveloppmentApp,
    TextQuery,
  },
  setup(props) {
    const isLongArticle = ref(false);
    const allText = ref(props.mediaSize !== 0 ? 150 : 215);
    const LongArticle = () => {
      if (isLongArticle.value) {
        isLongArticle.value = false;
        allText.value = 210;
      } else {
        allText.value = props.content.length
        isLongArticle.value = true;
      }
    };
    return {
      isLongArticle,
      LongArticle,
      allText,
    };
  },
});
</script>

<style scoped></style>
