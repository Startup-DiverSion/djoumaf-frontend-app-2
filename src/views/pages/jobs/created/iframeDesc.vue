<template>
    <iframe
            name="iframeRef"
            ref="iframeRef"
            src="about:blank"
            class="my-iframe"
          ></iframe>
          <Teleport  :to="iframeRef">
           
                </Teleport>
                
  </template>
  
  <script lang="ts">
  import { onMounted, ref, computed, onBeforeUpdate } from 'vue'
  
  export default {
    setup() {
      const iframeRef = ref<HTMLIFrameElement | null>(null)
  
      onBeforeUpdate(() => {
        const iframe = iframeRef.value?.contentDocument
        if (!iframe) {
          return
        }
  
        const css = `
          .my-iframe {
            width: 100%;
            height: 500px;
            border: none;
            background-color: #f0f0f0;
            color: red;
          }
          h2 {
            color: green;
          }
        `
        const style = iframe.createElement('style')
        style.innerHTML = css
        iframe.head.appendChild(style)
  
        const body = iframe.body
        const h2 = iframe.createElement('h2')
        h2.innerText = "Contenu de l'iframe"
        body.appendChild(h2)
        const p = iframe.createElement('p')
        p.innerText =
          "Ceci est un paragraphe dans l'iframe. Le style CSS appliqué à cette page est défini dans le composant principal."
        body.appendChild(p)
      })
  
      return {
        iframeRef,
      }
    },
  }
  </script>
  
  <style>
  .my-iframe {
    /* styles pour l'iframe avant qu'il ne soit chargé */
    background-color: #fff;
  }
  </style>
  