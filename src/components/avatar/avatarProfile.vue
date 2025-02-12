<template>
 
<div class="overflow-hidden rounded-full " :class="size == 'large' ? 'h-14 w-14' : size == 'medium' ? 'h-12 w-12' : size == 'small' ? 'h-10 w-10' : custom ">
    <img v-lazy="imgObj"  alt="" class="bg-gray-100  min-h-full min-w-full rounded-full object-cover object-top " >
</div>
  
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from "vue";
  
  export default defineComponent({
    name: "avatar-profile",
    props: ['imageUrl', 'size', 'custom'],
    components: {
    
  },
    setup(props) {

        const  imgObj = reactive({
        src: props.imageUrl,
        error: '/images/profile.jpg',
        loading: '/images/profile.jpg'
      })

      return {
        imgObj
      };
    },
  });
  </script>
  
  <style scoped></style>
  