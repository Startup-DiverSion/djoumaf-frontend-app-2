<template>
    <div class="flex gap-4 items-start">
          <div class="w-4 h-4">
            <AvatarIcon :path="icon" :class="icon" class-name="opacity-70 text-gray-500 h-5" />
          </div>
          <TextQuery class-name="font-love text-sm break-words relative " :title="title" :sm="sm" :md="md"  :lg="lg" :xl="xl"  />
        </div>
  </template>
  <code></code>
  
  <script lang="ts">
  import { defineComponent , defineAsyncComponent} from "vue";
import TextQuery from "../texts/text.query.vue";
import AvatarIcon from "../avatar/avatarIcon.vue";
  
  export default defineComponent({
    name: "card-profile-info",
    components: { TextQuery, AvatarIcon },
    props: ['icon', 'title', 'sm', 'md', 'lg', 'xl'],
    setup() {
   
  
      return {
        
      };
    },
  });
  </script>
  
  <style scoped></style>
  