<template>
  <a :href="'/jobs/'+ data.slug "
     class="flex w-full bg-white px-2 py-3 gap-2 rounded-md">
   

     <AvatarProfile :imageUrl="data?.profile?.media_profile?.url
          ? data?.profile?.media_profile.original_url
          : envConfig().DEFAULT_IMAGE_PROFILE" size="small" />
      
    

    <div class="w-[80%] flex flex-col font-love">

      <TextQuery class-name="text-blue-500 font-semibold text-thin uppercase" :title="data.title" :sm="35" :md="35" :lg="20" :xl="30"  />
      <TextQueryHtml class-name=" text-sm first-letter:uppercase" :title="data.description" :sm="35" :md="60" :lg="35"   />
      
      <span class="font-ligth text-xs my-1">  
            {{ data.city ? data.city : "Abidjan" }},
            {{
              data.country
                ? data.country
                : "Côte d’Ivoire"
            }} </span>
      <span class="font-medium text-xs"> publier {{data.timePost}}</span>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";
import TextQuery from "../texts/text.query.vue";
import TextQueryHtml from "../texts/text.query.html.vue";
import { envConfig } from "@/env.config";
import AvatarProfile from "../avatar/avatarProfile.vue";

export default defineComponent({
    name: "",
    props: ["data"],
    components: { TextQuery, TextQueryHtml, AvatarProfile },
    setup(){
      return {
        envConfig
      }
    }
});
</script>

<style scoped></style>
