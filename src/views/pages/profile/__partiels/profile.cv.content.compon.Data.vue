<template>

            
              <RouterLink
                :to="
                  item.available ? `/${data?.slug}/cv-created/${item.slug}` : `/${data?.slug}?content_page=cv`
                "
                class="flex flex-col gap-2 relative group"
              >
                <div class="overflow-hidden bg-gray-100 p-1 rounded-md lg:h-[200px] h-[300px]">
                  <img
                    class=" h-full object-cover rounded-md"
                    :src="item.link"
                    alt=""
                  />
                </div>
  
                <div
                  class="absolute top-2 right-3 flex gap-1 items-center z-20"
                  v-if="item.premiun" :class="!item.available ? 'text-red-400' : 'text-yellow-400'"
                >
                  <span
                    class="text-xs font-bold  bg-white px-2 rounded-full"
                  >
                    {{ !item.available ? "Bientôt Disponible" : "Premiun" }}
                  </span>
                  <StarIcon class="h-4"  />
                </div>
  
                <div
                  class="p-2 text-white absolute z-10 top-0 hidden group-hover:flex group-hover:items-end bg-gray-700/70 h-full w-full rounded-md"
                >
                  <span class="flex text-sm">{{ item.name }} </span>
                </div>
              </RouterLink>
           


  </template>
  
  <script lang="ts">

  import { envConfig } from "@/env.config";
  import { StarIcon } from "@heroicons/vue/24/solid";

  import { defineComponent, ref, reactive, defineAsyncComponent } from "vue";
  
  export default defineComponent({
    name: "profile-cv-content",
    props: ["item", 'data'],
    components: { StarIcon },
    setup() {
      const showInfoCard = ref(false);
    
      return {
        showInfoCard,
      };
    },
  });
  </script>
  
  <style scoped></style>
  