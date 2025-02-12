import { ref } from "vue";

export const useUploadLocalFile = () => {


    const toImageConvert: any = ref([]);
    const binaryImage = ref(null)

    const image = (event: any) => {
      const images = event.target.files;
      binaryImage.value = event.target.files
      toImageConvert.value = [];
      for (let i = 0; i < images.length; i++) {
        const reader = new FileReader();
        const el = images[i];
        reader.readAsDataURL(el);
        reader.onload = (event) => {
          toImageConvert.value.push(event.target?.result);
        };
      }
      document.querySelector(".InToText")?.classList.add("h-[240px]");
    };


    return { toImageConvert, image, binaryImage }


}