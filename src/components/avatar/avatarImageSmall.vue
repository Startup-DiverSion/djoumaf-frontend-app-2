<template>

    <div class="">
        <img class="w-5 h-5 rounded-full object-cover" :src="path" :alt="name">
    </div>
      
      </template>
      
      <script lang="ts">
      import { defineComponent } from 'vue';
      
      export default defineComponent({
        name: 'avatar-image-small',
        props: {
            path: {
                type: String,
                default: 'data:image/jpeg;base64,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'
            },
            name: {
                type: String,
                default: 'image form DjoumAf'
            }
        },
        setup(props){
          return{
      
          }
        }
      });
      </script>
      
      <style scoped>
      
      </style>
      