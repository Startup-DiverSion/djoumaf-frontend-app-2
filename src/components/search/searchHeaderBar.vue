<template>
  <div class="fixed left-0 w-[100%] lg:w-[30%] mx-0 lg:m-[72px] z-20" v-if="state.active_search">
    <div class="bg-white rounded-md h-10 flex items-center px-2 gap-4 mx-2 cursor-pointer">
      <MagnifyingGlassIcon class="h-6"></MagnifyingGlassIcon>

      <input
        class="flex w-full h-full outline-none rounded-md"
        type="search"
        name=""
        @keyup.enter="InToEntry"
        id=""
        placeholder="Recherche par : poste titre ou libelle, lieu, type de contract"
      />

      <XMarkIcon class="h-6" @click="DisplayAeraSearch()"></XMarkIcon>
    </div>

    <div class="bg-white w-full absolute top-12 lg:hidden" v-if="route.name === 'Search'">
      <div class="flex gap-4 whitespace-nowrap overflow-auto scrollbar-hide w-11/12 m-auto">
        <div v-for="fil in filterSearch">
          <RouterLink
            :to="{
              name: 'Search',
              query: { q: route.query?.q, ft: fil.code },
            }"
            class="py-2 min-w-[70px] flex justify-center max-w-full"
            :class="fil.actived ? 'border-b-2 border-blue-700 text-blue-700 font-bold' : ''"
          >
            {{ fil.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  {{ verify_to_search }}
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { useSearchBar } from './search.services'
import { useJobComposition } from '@/views/pages/jobs/job.compositoin'
import { useRouter, useRoute } from 'vue-router'
import { useNavigationStore } from '@/stores/navigations'
import { useSearchComposition } from '@/composables/search.composition'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/solid'

const router = useRouter()
const route = useRoute()
const { DisplayAeraSearch, state } = useSearchBar()
const { filterSearch, verify_to_search } = useSearchComposition()
const InToEntry = (e: any) => {
  useNavigationStore().toSearch__q = e.target.value
  const ft = route?.query.ft
  router.replace({
    name: 'Search',
    query: { q: e.target.value, ft: ft ? ft : 'jobs' },
  })
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
