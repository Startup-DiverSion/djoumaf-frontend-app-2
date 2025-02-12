<template>
  <div class=" bottom-4 w-full md:w-11/12 m-auto text-center pb-1 font-love">

   <div class="flex flex-wrap gap-x-4 justify-center items-center text-sm">

    <span class="uppercase font-extrabold text-blue-700">2023 © DjoumAf</span>
    
    <RouterLink :to="{name: 'CGU'}">
      Conditions générales
    </RouterLink>

    <RouterLink :to="{name: 'CGU'}">
      Politique de confidentialité
    </RouterLink>

    <RouterLink :to="{name: 'PUC'}">
      Politique d’utilisation des cookies.
    </RouterLink>

    <form class="flex gap-2 items-center">
        <label>{{ $t('message.language') }}</label>
        <select v-model="$i18n.locale" class="bg-white border-[1px] rounded-md uppercase">
          <option value="fr">Fr</option>
          <option value="en">en</option>
          <option value="ja">ja</option>
        </select>
      </form>

   </div>


  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterAuth',
  props: {
    test: String
  },
  setup(props){
    return{

    }
  }
});
</script>

<style scoped>

</style>
