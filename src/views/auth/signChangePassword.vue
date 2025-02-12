<template>
  <AuthLayout :head="headerData" :authConnexion="SignChangePassword">
    <template #default>
      <div class="flex flex-col gap-2">
        <div class="flex flex-col mb-2 gap-2 rounded-md">
          <div class="flex justify-between items-center">
            <span class="text-xl font-light">Code de réinitialisation</span>
          </div>

          <div class="flex flex-col gap-1 placeholder:text-center">
            <OnlyInput
              placeholder="00000"
              type="number"
              name="code"
              :modelValue="inputData.code"
              @update:modelValue="inputData.code = $event.target.value"
              :errorInput="isError"
            />
            <div
              @click="SendEmailAgin"
              class="text-sm font-sans font-bold text-blue-500/80 underline cursor-pointer flex justify-end px-1"
              :class="isTimeRelaunchExist ? 'cursor-text' : ''"
            >
              <span class="pr-1">Renvoyer un code </span>
              <span v-if="isTimeRelaunchExist !== null"
                >,dans
                {{
                  jDateBeforeToRelaunchMail.min.toString().length === 1
                    ? "0" + jDateBeforeToRelaunchMail.min
                    : jDateBeforeToRelaunchMail.min
                }}:{{
                  jDateBeforeToRelaunchMail.sec.toString().length === 1
                    ? "0" + jDateBeforeToRelaunchMail.sec
                    : jDateBeforeToRelaunchMail.sec
                }}
              </span>
            </div>
          </div>
        </div>

        <OnlyInput
          placeholder="Nouveau mot de passe"
          type="password"
          name="old_password"
          :modelValue="inputData.old_password"
          @update:modelValue="inputData.old_password = $event.target.value"
          :errorInput="isError"
        />
        <OnlyInput
          placeholder="Comfirmez le mot de passe"
          type="password"
          name="new_password"
          :modelValue="inputData.new_password"
          @update:modelValue="inputData.new_password = $event.target.value"
          :errorInput="isError"
        />
      </div>

      <BtnAuthCompoment label="Suivant" :isLoading="state.loading" />
    </template>

    <template #redirect>
      <RedirectLinkAuthCompoment
        routeName="SignChangeEmail"
        quiz="Pas le bon Mail ?"
        route-label="Changez-le"
        routeLink="SignChangeEmail"
      />
    </template>
  </AuthLayout>
</template>

<script lang="ts">
const AuthLayout= defineAsyncComponent(() =>
import('@/layouts/AuthLayout.vue')
)
import {
  defineComponent,
  reactive,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  computed,
  onMounted,
  defineAsyncComponent
} from "vue";
const OnlyInput= defineAsyncComponent(() =>
import('@/components/forms/onlyInput.vue')
)
import BtnAuthCompoment from "@/components/toPages/Auth/btnAuthCompoment.vue";
const RedirectLinkAuthCompoment= defineAsyncComponent(() =>
import('@/components/toPages/Auth/redirectLinkAuthCompoment.vue')
)
import { useAuthComposition} from "@/composables/auth.composition"
import { useRoute, useRouter } from "vue-router";
import { LocalSotreUtils } from "@/vendors/utils/localStore.utils";
import moment from "moment";
import { CryptUtils } from "@/vendors/utils/crypt.utils";
// import { Toast } from '@capacitor/toast';

export default defineComponent({
  name: "SignIn",
  components: {
    AuthLayout,
    OnlyInput,
    BtnAuthCompoment,
    RedirectLinkAuthCompoment,
  },
  props: {},
  setup() {
    const headerData = reactive({
      title: "Réinitialisez maintenant votre mot de passe!",
      sub: `Réinitialisez en toute sécurité votre mot de passe, avec le code de 5 chiffres envoyer par mail.`,
    });

    const {
      state,
      inputDataPassword,
      inputDataOnlyEmail,
      SignChangePassword,
      isError,
      SignVerifyEmail,
    } = useAuthComposition();

    const jStore = new LocalSotreUtils();
    const jCrypt = new CryptUtils();
    const router = useRouter();

    // Chech if email is not send
    onBeforeMount(async () => {
      const getKeyInStore__jEmail = await jStore.get("jEmail");
      if (!getKeyInStore__jEmail) {
        router.replace({ name: "SignChangeEmail" });
      }
    });

    // Send Email Agin
    const SendEmailAgin = async () => {
      if (isTimeRelaunchExist.value === null) {
        const email = await jStore.get("jEmail");
        inputDataOnlyEmail.email = jCrypt.qDecrypted(email) 
        SignVerifyEmail()
          .then(() => {
            jStore.set(
              "jDateBeforeToRelaunchMail",
              moment().utc().add(5, "minutes")
            );
            jStore.get("jDateBeforeToRelaunchMail").then((el: any) => {
              isTimeRelaunchExist.value = el;
            });
            //Defined Toast
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("No");
      }
    };

    onMounted(() => {
      jStore.get("jDateBeforeToRelaunchMail").then((el: any) => {
        isTimeRelaunchExist.value = el;
      });
    });

    // Waiting time, before to send mail
    const currentDate = ref({ sec: 0, min: 0 });
    const isTimeRelaunchExist = ref(null);
    const jDateBeforeToRelaunchMail = computed(() => {
      if (isTimeRelaunchExist.value !== null) {
        setInterval(async () => {
          const getTimeInStore = moment(isTimeRelaunchExist.value);
          const getTimeToDay = moment().utc();

          let container = getTimeInStore.diff(getTimeToDay);

          container = Math.floor(container / 1000);
          currentDate.value.sec = container % 60;

          container = Math.floor((container - currentDate.value.sec) / 60);
          currentDate.value.min = container % 60;

          if (currentDate.value.min < 0 && currentDate.value.sec < 0) {
            isTimeRelaunchExist.value = null;
            await jStore.remove("jDateBeforeToRelaunchMail");
          }
        }, 1000);
      }

      return currentDate.value;
    });

    onBeforeUnmount(() => {
      // clearInterval(jDateBeforeToRelaunchMail.value);
      jDateBeforeToRelaunchMail;
    });

    return {
      headerData,
      inputData: inputDataPassword,
      SignChangePassword,
      state,
      isError,
      SendEmailAgin,
      jDateBeforeToRelaunchMail,
      isTimeRelaunchExist,
    };
  },
});
</script>

<style scoped></style>
