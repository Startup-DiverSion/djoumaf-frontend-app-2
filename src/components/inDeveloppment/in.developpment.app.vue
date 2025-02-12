<template>

    <section class="pt-32 w-full flex flex-col h-full m-auto gap-4">   
        <div class=" absolute inset-0 bg-white w-screen h-screen"></div>

       <div class="flex justify-center flex-col items-center h-full gap-2">
        <div class="h-[250px] flex justify-center ">
            <img class="h-full" src="/images/build.svg" alt="">
        </div>

        <div class="w-4/12 m-auto  ">
            <p class="text-xl font-love text-center font-light"> Cette application est en cours de developpement, veillez s'il vous plait patiente! </p>
        </div>
       </div>

    </section>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'in-developpment',
});
</script>

<style scoped>

</style>
