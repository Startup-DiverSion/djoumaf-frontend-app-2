<template>
  <main
    class="flex w-full h-full flex-col justify-center items-center gap-8 md:py-0 font-love z-10"
  >
    <!-- Background auth page -->
    <div class="bg-gray-50 absolute flex w-full h-auto top-0">
      <div
        class="bg-blue-500 h-screen w-full fixed top-0 left-0 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10"
      >
        <img
          class="object-cover w-full h-full opacity-10"
          v-lazy="'/images/placeholder/femme-choix-photos-personnes-v5.png'"
          alt=""
        />
      </div>
    </div>

    <!-- Content Auth page -->
    <section
      class="bg-white z-40 py-8 lg:rounded-lg flex w-full lg:w-7/12 xl:w-5/12 lg:my-8 lg:h-auto md:h-[80vh] h-[100vh] m-auto"
    >
      <div class="w-10/12 md:w-8/12 m-auto flex flex-col gap-8 justify-center h-full">
        <!--  -->
        <logoCompoment />

        <!--  -->
        <div class="flex flex-col gap-2">
          <span class="text-2xl lg:text-2xl font-love font-bold"> {{ head.title }} </span>
          <span class="text-thin lg:text-base font-love font-normal opacity-90">
            {{ head.sub }}
          </span>
        </div>

        <form
          @submit.prevent="authConnexion"
          class="flex flex-col gap-4"
          enctype="multipart/form-data"
        >
          <slot></slot>
        </form>

        <slot name="redirect"></slot>
      </div>
    </section>

    <!-- Footer Auth page -->
    <FooterAuth />
  </main>
</template>

<script lang="ts">
import logoCompoment from '@/components/logo/logoCompoment.vue'
import FooterAuth from '@/navigations/footers/footerAuth.vue'
import { defineComponent, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'auth-layout',
  props: ['authConnexion', 'head'],
  setup() {
    const router = useRouter()
    const route = useRoute()
    return {
      router,
      route,
    }
  },
  components: { FooterAuth, logoCompoment },
})
</script>

<style scoped></style>
