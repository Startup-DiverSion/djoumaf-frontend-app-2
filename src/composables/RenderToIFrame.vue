<script lang="ts">

import { h, ref, createApp, onMounted, onBeforeUpdate, defineComponent} from "vue"

export default defineComponent({
  name: "RenderToIFrame",
  props: {
    css: {
      type: String,
      default: ""
    }
  },
  setup(props:any, { slots }:any) {
    const iframeRef = ref()
    const iframeBody = ref()
    const iframeHead = ref()
    const iframeStyle = ref()
    let iframeApp:any = null

    onMounted(() => {
      iframeBody.value = iframeRef.value.contentDocument.body
      iframeHead.value = iframeRef.value.contentDocument.head
      const el = document.createElement("div")
      iframeBody.value.appendChild(el)
      iframeStyle.value = document.createElement("style")
      iframeStyle.value.innerHTML = props.css
      iframeHead.value.appendChild(iframeStyle.value)

      iframeApp = createApp({
        name: "iframeRender",
        setup() {
          return () => slots.default()
        }
      }).mount(el)
    })
    onBeforeUpdate(() => {
      if (!iframeApp || !iframeRef.value) {
        return
      }
      if (props.css) {
        iframeStyle.value.innerHTML = props.css
      }
    })
    return () => h("iframe", { ref: iframeRef })
  }
})

</script>

<template >
  
</template>