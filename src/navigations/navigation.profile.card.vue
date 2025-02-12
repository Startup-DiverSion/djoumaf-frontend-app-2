<template>
 
   
     
        <div class="hover:bg-gray-200 px-8 py-1 cursor-pointer font-love">
          <span class="font-light text-sm"> {{ label }} </span>
        </div>

        <!-- <span class="inline-flex border-b-[1px] mx-8"></span> -->

      

</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, defineAsyncComponent } from "vue";
import NavigationLinkComponent from "@/navigations/navigationLinkComponent.vue";
export default defineComponent({
name: "navigation-profile",
props: ['label'],
components: {
NavigationLinkComponent,
},

setup(props) {
const test = () => {
  alert("test");
};

return {
  test,
};
},
});
</script>

<style scoped></style>
