<template>
  
   <ChooseYourPreference />

</template>

<script lang="ts">
import ChooseYourPreference from '@/components/toPages/Auth/chooseYourPreference.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "",
    props: {},
    components: { ChooseYourPreference }
});
</script>

<style scoped>

</style>
