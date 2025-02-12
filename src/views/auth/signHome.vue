<template>
  <main class="bg-gray-200 h-screen relative">
    <img
      class="absolute h-full top-0 left-0"
      src="https://images.unsplash.com/photo-1604076913837-52ab5629fba9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3JhZGllbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      alt=""
    />

    <section class="backdrop-blur-xl bg-white/95 h-screen">
      <div class="h-[50vh] p-4">
        <img
          class="h-full w-full rounded-lg object-cover"
          src="https://cdn.dribbble.com/users/1400450/screenshots/14177975/media/dfe2926e73974a21d6b52a0965d814fd.png?compress=1&resize=768x576&vertical=top"
          alt=""
        />
      </div>

      <div
        class="flex flex-col gap-4 items-center justify-center w-9/12 m-auto h-[50vh]"
      >
        <div class="flex flex-col gap-4">
          <span class="text-5xl text-center font-bold font-sans">
            Prêt à likider, vos articles ?
          </span>
          <span class="text-base text-center font-love"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo odio
            eum necessitatibus, dolorem nobis delectus!</span
          >
        </div>

        <div
          class="grid grid-cols-2 border-2 border-gray-50 rounded-lg mt-8 h-20 w-full"
        >
          <RouterLink
            :to="{ name: 'SignUp' }"
            href="/auth/sign-up"
            class="flex place-content-center items-center backdrop-blur-xl bg-orange-50 text-orange-500 font-bold text-xl"
          >
            <span class="text-xl font-bold font-sans">S'incrire</span>
          </RouterLink>

          <RouterLink
            :to="{ name: 'SignIn' }"
            href="/auth/sign-in"
            class="flex place-content-center items-center text-xl"
          >
            <span class="text-xl font-bold font-sans">Connexion</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent , defineAsyncComponent} from "vue";

export default defineComponent({
  name: "SignHome",
  components: {},
  props: {},
});
</script>

<style scoped></style>
