<template>
  <div class="flex flex-col font-love text-[0.90rem]">
    <div class="bg-blue-600 h-14 w-full fixed z-20">
      <RouterLink to="/" class="flex justify-center items-center h-14">
        <img
          src="https://djoumaf.com/app-assets/images/logo/images/logo.png"
          class="h-10 w-24 object-cover"
          alt=""
        />
      </RouterLink>
    </div>

    <div
      class="flex flex-col gap-4 bg-white w-8/12 m-auto p-8 mt-16"
      id="mydiv"
    >
      <div class="flex flex-col">
        <span class="">Dernière modification : Publié le 18/05/2022</span>

        <span class="text-4xl font-bold">
          Politique d'utilisation des cookies sur DjoumAf</span
        >
      </div>

      <div class="flex flex-col gap-4">
        <span class="text-2xl font-bold underline">Sommaire</span>

        <ul class="text-blue-500 list-disc">
          <li class="py-2" v-for="item in AncreLinks">
            <a :href="'#' + item.hash" class="text-xl text-blue-500">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>

      <div class="">
        <div class="card pt-16" id="intro">
          <div class="card-content">
            <div class="card-body">
              <div class="title">
                <h2>Politique d’utilisation des cookies</h2>
              </div>
              <h4>Cookies et autres technologies de stockage</h4>
              <p>
                Les cookies sont de petits éléments de texte qui servent à
                stocker des informations sur les navigateurs web. Les cookies
                sont notamment utilisés pour stocker et recevoir des
                identifiants et d’autres informations sur des appareils comme
                les ordinateurs ou les téléphones. D’autres technologies, dont
                les données que nous stockons sur votre navigateur web ou sur
                votre appareil, les identifiants associés à votre appareil et
                d’autres logiciels, sont utilisées dans des buts similaires.
                Dans la présente politique, nous désignons toutes ces
                technologies par le terme « cookies ».
              </p>

              <p>
                Nous utilisons des cookies si vous avez un compte DjoumAf, si
                vous utilisez les Produits DjoumAf, y compris notre site web et
                nos applications, ou si vous consultez d’autres sites web et
                applications qui ont recours aux Produits DjoumAf (notamment le
                bouton J’aime et d’autres Technologies DjoumAf). Les cookies
                permettent à DjoumAf de vous proposer les Produits DjoumAf et de
                comprendre les informations reçues de votre part, notamment les
                informations concernant votre utilisation des autres sites web
                et applications, que vous soyez inscrit(e) ou connecté(e) ou
                non.
              </p>
              <p>
                Cette politique explique comment nous utilisons les cookies et
                présente les choix dont vous disposez à cet égard. Sauf
                indication contraire dans la présente politique, la Politique
                d’utilisation des données s’appliquera à nos traitements des
                données que nous collectons au moyen des cookies.
              </p>
            </div>
          </div>
        </div>

        <!-- 
                                -
                                -
                                -
                                -

                             -->

        <div class="card pt-16" id="controler_cookies">
          <div class="card-content ">
            <div class="card-body">
              <div class="title ">
                <h2 class="kb-title">controler l'tilisation des cookies</h2>
              </div>
              <h4>
                Comment pouvez-vous contrôler l’utilisation des cookies par
                DjoumAf ?
              </h4>
              <p>
                Nous utilisons des cookies pour vous aider à personnaliser et
                améliorer le contenu et les services, fournir une expérience
                plus sécurisée et vous montrer des publicités utiles et
                pertinentes sur DjoumAf et ailleurs. Vous pouvez contrôler la
                façon dont nous exploitons les données pour vous proposer des
                publicités et plus, grâce aux outils décrits ci-dessous.
              </p>
              <h5>1. Si vous avez un compte DjoumAf :</h5>
              <p></p>
              <ol>
                <p></p>
                <li>
                  Vous pouvez utiliser vos préférences publicitaires afin de
                  savoir pourquoi vous voyez une publicité en particulier et de
                  contrôler la façon dont nous utilisons les informations que
                  nous recueillons pour vous proposer des publicités.
                </li>
                <p></p>
                <p></p>
                <li>
                  Afin de vous montrer des publicités plus pertinentes, nous
                  utilisons les données que les annonceurs et d’autres
                  partenaires nous fournissent à propos de votre activité en
                  dehors des Produits des Entités DjoumAf, notamment les sites
                  web et les applications. Vous pouvez décider si nous pouvons
                  utiliser ces données pour vous présenter des publicités dans
                  vos paramètres publicitaires.
                </li>
                <p></p>
                <p></p>
                <li>
                  L’Audience Network de DjoumAf permet aux annonceurs de vous
                  présenter des publicités sur des applications et des sites web
                  qui ne font pas partie des Produits des entités DjoumAf.
                  L’Audience Network peut vous présenter des publicités
                  pertinentes en analysant, entre autres, vos préférences
                  publicitaires et en déterminant ainsi les publicités
                  susceptibles de vous intéresser. Vous pouvez définir cela dans
                  vos paramètres publicitaires.
                </li>
                <p></p>
                <p></p>
                <li>
                  Vous pouvez consulter votre activité en dehors de DjoumAf que
                  des entreprises et des organisations partagent avec nous au
                  sujet de vos interactions avec elles, comme les visites sur
                  leurs applications ou sites web. Ils utilisent nos Outils
                  Business, comme le pixel DjoumAf, pour partager des
                  informations avec nous. Cela nous permet notamment de vous
                  offrir une expérience plus personnalisée sur DjoumAf. En
                  savoir plus sur l’activité en dehors de DjoumAf, comment nous
                  l’utilisons et comment vous pouvez la gérer.
                </li>
                <p></p>
              </ol>
              <p></p>

              <h5>2. Plus d’informations sur la publicité en ligne :</h5>
              <p>
                Les agences de publicité avec lesquelles nous travaillons
                utilisent généralement des cookies et des technologies
                similaires dans le cadre de leurs services. Pour en savoir plus
                sur la manière dont les annonceurs utilisent généralement les
                cookies et sur les choix dont vous disposez par rapport à
                ceux-ci, reportez-vous aux ressources ci-après :
              </p>
              <ol>
                <p></p>
                <li>Alliance de la publicité numérique</li>
                <p></p>
                <p></p>
                <li>Alliance canadienne de la publicité numérique</li>
                <p></p>
                <p></p>
                <li>
                  Alliance européenne pour l’éthique en matière de publicité
                  numérique
                </li>
                <p></p>
              </ol>
              <p></p>
              <h5>3. Contrôle des cookies de navigateur :</h5>
              <p>
                De plus, votre navigateur ou votre appareil propose peut-être
                des paramètres vous permettant de choisir si les cookies du
                navigateur sont activés et de les supprimer. Ces contrôles
                varient en fonction du navigateur et les fabricants peuvent
                modifier les paramètres disponibles et le fonctionnement de
                ceux-ci à tout moment. Depuis le 5 octobre 2020, vous pouvez
                trouver des informations supplémentaires sur les contrôles
                proposés par les navigateurs populaires en consultant les liens
                ci-dessous. Certaines parties des Produits DjoumAf peuvent ne
                pas fonctionner correctement si vous avez désactivé
                l’utilisation des cookies dans votre navigateur. Soyez conscient
                que ces contrôles sont distincts de ceux que DjoumAf vous
                propose.
              </p>
              <ol>
                <li>Google Chrome ;</li>
                <li>Internet Explorer;</li>
                <li>Firefox ;</li>
                <li>Safari ;</li>
                <li>Safari Mobile;</li>
                <li>Opera.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, defineAsyncComponent, reactive } from "vue";

export default defineComponent({
  name: "",
  props: {},
  setup() {
    const AncreLinks = reactive([
      { name: "Introduction", hash: "intro" },
      { name: "controler l'tilisation des cookies", hash: "controler_cookies" }
    ]);

    return {
      AncreLinks,
    };
  },
});
</script>

<style scoped>

div {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 4px;
  all: unset;
  width: 90%;
  margin: 0 auto;
}

ul {
  all: unset;
  margin: 0.5rem 2rem !important;
}

ol {
  all: unset;
  list-style-type: decimal;
  margin: 0.5rem 1rem !important;
}

ol li {
  margin: 0.5rem 0px !important;
}
ul li {
  width: 90% !important;
  margin: 0 auto !important;
}

h2 {
  @apply text-2xl !important;
  font-weight: 800;
  margin: 8px 0px;
}

h3 {
  @apply text-xl !important;
  font-weight: 700;
  margin: 8px 0px;
}

h4 {
  @apply text-lg !important;
  font-weight: 600;
  margin: 8px 0px;
}

h6 {
  @apply text-base !important;
  font-weight: 500;
  margin: 8px 0px;
}
</style>
