import { ref, onMounted, onUnmounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router';

// by convention, composable function names start with "use"
export function useIndividualAction(dataset: any) {

    const displayByIndividual: any = ref([])
    const parentNod = dataset
 
const root = () => {
console.log('test')
    if (displayByIndividual.value.length === 0) {
        displayByIndividual.value.push(parentNod);
      } else {
        displayByIndividual.value.push(parentNod);

        for (let i = 0; i < displayByIndividual.value.length; i++) {
          const el = displayByIndividual.value[i];
          console.log(el);

          if (el === parentNod) {
            const moreWhatTwo = displayByIndividual.value.filter((item: any) => {
              return item === parentNod;
            });

            if (moreWhatTwo.length > 1) {
              displayByIndividual.value = displayByIndividual.value.filter(
                (item: any) => {
                  return item !== parentNod;
                }
              );
            }
          }
        }
      }
console.log(displayByIndividual.value)
}


    // expose managed state as return value
    return {displayByIndividual, root}
}
