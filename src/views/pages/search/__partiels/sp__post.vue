<template>
  
    <div class="flex flex-col gap-2">

        <div class="flex flex-col">
          <label for="id-title">Poste</label>
          <OnlyInput
            placeholder="eg: Developpeur d'application web"
            name="title"
            :modelValue="inputDataFilterProfile.post"
            @update:modelValue="inputDataFilterProfile.post = $event.target.value"
            :error-input="isError"
          />
        </div>

        <div class="grid grid-cols-1 gap-2 w-full ">
          <div class="flex flex-col w-full">
            <label for="id-title">Pour quel pays?</label>
            <VueSelect
              class="font-love text-sm"
              v-model="inputDataFilterProfile.localizaton_country"
              :options="Places.country"
              name="localizaton_country"
              label="name"
              placeholder="Pays"
            />
            <span
              class="text-sm font-love text-red-500 mt-1 mx-1"
              v-if="isError.path === 'localizaton_country'"
            >
              {{ isError.message }}
            </span>
          </div>
          <div class="flex flex-col w-full">
            <label for="id-title">Dans quelle ville?</label>

            <VueSelect
              v-model="inputDataFilterProfile.localizaton_city"
              :options="localizatonCity"
              label="name"
              class="font-love text-sm"
              placeholder="Ville"
              name="localizaton_city"
            />
            <span
              class="text-sm font-love text-red-500 mt-1 mx-1"
              v-if="isError.path === 'localizaton_city'"
            >
              {{ isError.message }}
            </span>
          </div>

          <div class="flex flex-col w-full">
            <label for="id-title">Secteur d'activité</label>
            <VueSelect
              class="font-love text-sm"
              v-model="inputDataFilterProfile.field_activity"
              :options="activite(1)"
              name="localizaton_country"
              label="title"
              placeholder="Secteur d'activité"
            />
            <span
              class="text-sm font-love text-red-500 mt-1 mx-1"
              v-if="isError.path === 'localizaton_country'"
            >
              {{ isError.message }}
            </span>
          </div>
        </div>

    </div>


</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useJobComposition } from '../../jobs/job.compositoin';
import OnlyInput from '@/components/forms/onlyInput.vue';
import VueSelect from 'vue-select';

export default defineComponent({
    name: "",
    props: ['inputDataFilterProfile', 'activite'],
    setup() {
        const isError = {
            path: "",
            message: ""
        };
        const { Places, localizatonCity, localizaton } = useJobComposition();
       

        onMounted(() => {
            localizaton()
        })

        return {
            isError,
            Places,
            localizatonCity
        };
    },
    components: { OnlyInput, VueSelect }
});
</script>

<style scoped>

</style>
