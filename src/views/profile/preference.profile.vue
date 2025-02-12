<template>
  <div class="w-10/12 m-auto flex flex-col pt-4 gap-4">
    <!-- Qui vous être ? -->

    <CardToChoose
      title="Qui vous êtes ?"
      id="typer_user"
      name="preferenceData_typeUser"
      :preferenceFun="funPreferenceData_typeUser"
      :data="preferenceData(4)"
      :modelValue="preferenceData_typeUser"
      :isError="isError"
      :isSearch="false"
    />

    <!--  Quel est votre domaine d'activité ? -->
    <CardToChoose
      title="Quel est votre domaine d'activité ?"
      id="fieldActivity"
      name="preferenceData_fieldActivity"
      :preferenceFun="funPreferenceData_fieldActivity"
      :data="preferenceData(1)"
      :modelValue="preferenceData_fieldActivity"
      :isError="isError"
      :isSearch="true"
    />

    <!-- <div class="flex flex-col gap-4">
      <div class="flex border-b-[1px] py-2">
        <span>Quels sont vos domaines d'activité ?</span>
        <span v-if="isError.path === 'fieldActivity'" class="text-red-500">
          {{ isError.message }}
        </span>
      </div>

      <VueSelect
        class="font-love text-sm"
        v-model="preferenceData_fieldActivity"
        :options="preferenceData(1)"
        name="preferenceData_fieldActivity"
        label="title"
        multiple
        placeholder="Domaine d'activité"
      />

    </div> -->

    <!-- Votre centre d'interêt ? -->
    <CardToChoose
      title="Votre centre d'interêt ?"
      id="centerInteret"
      name="preferenceData_centerInteret"
      :preferenceFun="funPreferenceData_centerInteret"
      :data="preferenceData(2)"
      :modelValue="preferenceData_centerInteret"
      :isError="isError"
      :isSearch="true"
    />

    <!-- <div class="flex flex-col gap-4">
      <div class="flex border-b-[1px] py-2">
        <span>Quels sont vos centres d'interêt ?</span>
        <span v-if="isError.path === 'centerInteret'" class="text-red-500">
          {{ isError.message }}
        </span>
      </div>

      <VueSelect
        class="font-love text-sm"
        v-model="preferenceData_centerInteret"
        :options="preferenceData(2)"
        name="preferenceData_centerInteret"
        label="title"
        placeholder="Centre d'interêt"
        multiple
      />

    </div> -->

    <!--  -->
    <CardToChoose
      title="Quels sont vos plans carrière"
      id="carrier"
      name="preferenceData_carrier"
      :preferenceFun="funPreferenceData_carrier"
      :data="preferenceData(3)"
      :modelValue="preferenceData_carrier"
      :isError="isError"
      :isSearch="false"
      
    />
  </div>
</template>

<script lang="ts">
const BtnNext = defineAsyncComponent(
  () => import("@/components/buttons/btn.next.vue")
);
import CardToChoose from "@/components/cards/card.to.choose.vue";
const CardMedia = defineAsyncComponent(
  () => import("@/components/cards/medias/card.media.vue")
);
import VueSelect from "vue-select";
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  computed,
  defineAsyncComponent,
} from "vue";
import ModalStep from "@/components/modals/modal.step.vue";
import { usePreferenceComposition } from "@/composables/preference.composition";
import { useProfileComposition } from "@/composables/profile.composition";
import { useProfileStore } from "@/stores/profile.store";

export default defineComponent({
  name: "choose-your-preference",
  props: ["isError"],
  components: { BtnNext, CardToChoose, CardMedia, ModalStep, VueSelect },
  setup() {
    const {
      getAllParameter,
      preferenceData,
      userType,
      checkedNames,
      __userType,
    } = usePreferenceComposition();

    onMounted(async () => {
      await getAllParameter();
      userType();
    });

    const MORE_USER = reactive([
      {
        id: 2001,
        title: "Professionnel(le)",
        created_at: "2023-01-13T13:32:36.942Z",
        updated_at: "2023-01-13T13:32:41.917Z",
        deleted_at: null,
        type_parameter: {
          id: 4,
          slug: "type_user",
          title: "Type d'utilisateur",
          created_at: "2023-01-13T12:29:22.086Z",
          updated_at: "2023-01-16T11:01:49.582Z",
          deleted_at: null,
        },
        active: false,
      },
      {
        id: 2002,
        title: "Etudiant(e)",
        created_at: "2023-01-13T13:32:36.942Z",
        updated_at: "2023-01-13T13:32:41.917Z",
        deleted_at: null,
        type_parameter: {
          id: 4,
          slug: "type_user",
          title: "Type d'utilisateur",
          created_at: "2023-01-13T12:29:22.086Z",
          updated_at: "2023-01-16T11:01:49.582Z",
          deleted_at: null,
        },
        active: false,
      },
      {
        id: 2003,
        title: "Commerçant(e)",
        created_at: "2023-01-13T13:32:36.942Z",
        updated_at: "2023-01-13T13:32:41.917Z",
        deleted_at: null,
        type_parameter: {
          id: 4,
          slug: "type_user",
          title: "Type d'utilisateur",
          created_at: "2023-01-13T12:29:22.086Z",
          updated_at: "2023-01-16T11:01:49.582Z",
          deleted_at: null,
        },
        active: false,
      },
    ]);

    const Base_funPreferenceData = (
      value: any,
      preferenceData: any,
      inSotre: any
    ) => {
      const isValue = parseInt(value);

      if (preferenceData.value.includes(isValue)) {
        preferenceData.value = preferenceData.value.filter((el: any) => {
          return el !== isValue;
        });
      } else {
        preferenceData.value.push(isValue);
      }
      inSotre();
    };

    const preferenceData_typeUser: any = ref([]);
    const funPreferenceData_typeUser = (e: any) => {
      const isValue = parseInt(e.target.value);

      if (preferenceData_typeUser.value.length === 0) {
        preferenceData_typeUser.value.push(isValue);
      } else {
        preferenceData_typeUser.value.splice(
          0,
          preferenceData_typeUser.value.length
        );
        preferenceData_typeUser.value.push(isValue);
      }

      useProfileStore().preferenceData_typeUser = preferenceData_typeUser.value;
    };

    const preferenceData_fieldActivity: any = ref([]);
    const funPreferenceData_fieldActivity = (e: any) => {
      Base_funPreferenceData(
        e.target.value,
        preferenceData_fieldActivity,
        () => {
          useProfileStore().preferenceData_fieldActivity =
            preferenceData_fieldActivity;
        }
      );
    };

    const preferenceData_centerInteret: any = ref([]);
    const funPreferenceData_centerInteret = (e: any) => {
      Base_funPreferenceData(
        e.target.value,
        preferenceData_centerInteret,
        () => {
          useProfileStore().preferenceData_centerInteret =
            preferenceData_centerInteret;
        }
      );
    };

    const preferenceData_carrier: any = ref([]);
    const funPreferenceData_carrier = (e: any) => {
      Base_funPreferenceData(e.target.value, preferenceData_carrier, () => {
        useProfileStore().preferenceData_carrier = preferenceData_carrier;
      });
    };

    return {
      preferenceData,
      userType,
      __userType,
      checkedNames,

      preferenceData_typeUser,
      funPreferenceData_typeUser,
      preferenceData_fieldActivity,
      funPreferenceData_fieldActivity,
      preferenceData_centerInteret,
      funPreferenceData_centerInteret,
      preferenceData_carrier,
      funPreferenceData_carrier,

      MORE_USER,
    };
  },
});
</script>

<style scoped></style>
