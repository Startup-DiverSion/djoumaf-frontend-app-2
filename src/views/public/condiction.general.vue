<template>
  <div class="flex flex-col font-love text-[0.90rem]">

    <div class="bg-blue-600 h-14 w-full fixed z-20 ">
      <RouterLink to="/" class="flex justify-center items-center h-14">
        <img
          src="https://djoumaf.com/app-assets/images/logo/images/logo.png"
          class="h-10 w-24 object-cover"
          alt=""
        />
      </RouterLink>
    </div>

    <div class="flex flex-col gap-4 bg-white w-8/12 m-auto p-8 mt-16" id="mydiv">
      <div class="flex flex-col">
        <span class="">Dernière modification : Publié le 18/05/2022</span>

        <span class="text-4xl font-bold">
          Conditions d'utilisation de DjoumAf</span
        >
      </div>

      <div class="flex flex-col gap-4">
        <span class="text-2xl font-bold underline">Sommaire</span>

      
          <ul class=" text-blue-500 list-disc">
            <li class="py-2"
              v-for="item in AncreLinks"
            >
              <a :href="'#'+item.hash" class="text-xl text-blue-500"> {{ item.name }} </a>
            </li>
          </ul>
        
      </div>

      <div>
        <div class="card" id="intro">
          <div class="card-content">
            <div class="card-body">
              <div class="title">
                <h2 class="kb-title">Conditions Générales</h2>
                <h4>Conditions de service</h4>
              </div>
              <p>
                DjoumAf développe des technologies et des services permettant à
                tous d’entrer en contact, de créer des communautés et de
                développer des entreprises. Les présentes Conditions régissent
                votre utilisation de DjoumAf et autres produits,
                fonctionnalités, applications, services, technologies et
                logiciels que nous proposons (les Produits DjoumAf ou les
                Produits), sauf lorsque nous indiquons expressément que des
                conditions distinctes (et non les présentes) s’appliquent. Ces
                Produits vous sont fournis par DjoumAf, Inc.
              </p>
              <p>
                Nous ne vous facturons pas l’utilisation de DjoumAf ou des
                autres produits et services inclus dans les présentes
                Conditions. À la place, les entreprises et les organisations
                nous payent pour vous montrer des publicités pour leurs produits
                et services. En utilisant nos Produits, vous acceptez que nous
                vous montrions des publicités que nous croyons pertinentes pour
                vous en fonction de vos intérêts. Nous utilisons vos données
                personnelles afin de définir les publicités à vous montrer.
              </p>
              <p>
                Nous ne vendons pas vos données personnelles aux annonceurs et
                ne partageons pas d’informations permettant de vous identifier
                directement (telles que votre nom, votre adresse e-mail ou
                toutes autres coordonnées) avec les annonceurs, sauf
                autorisation expresse de votre part. À la place, les annonceurs
                nous donnent des informations, telles que le type d’audience à
                qui ils souhaitent montrer leurs publicités, et nous diffusons
                ces publicités auprès des personnes susceptibles d’être
                intéressées. Nous envoyons aux annonceurs des rapports sur les
                performances de leurs publicités pour les aider à comprendre
                comment les gens interagissent avec leur contenu. Consultez la
                Section 2 ci-dessous pour en savoir plus.
              </p>
              <p>
                Notre Politique d’utilisation des données explique comment nous
                recueillons et utilisons vos données personnelles afin de
                définir les publicités que vous voyez et de vous fournir tous
                les services décrits ci-dessous. Vous pouvez également accéder à
                vos Paramètres à tout moment afin d’examiner les options de
                confidentialité à votre disposition concernant notre utilisation
                de vos données.
              </p>
            </div>
          </div>
        </div>

        <!-- 

            -
            -
            -
            -
            -
            -

         -->
        <div class="card" id="service_fouurnissons">
          <div class="card-content">
            <div class="card-body">
              <div class="title mb-2">
                <h2 class="kb-title">Les services que nous fournissons</h2>
                <p>Publié le 18/05/2022</p>
              </div>
              <p>
                Notre mission consiste à donner à tous la possibilité de créer
                une communauté et de rapprocher le monde entier. Pour faire
                avancer cette mission, nous vous fournissons les Produits et les
                services décrits ci-dessous :
              </p>
              <p>
                <strong
                  >Nous vous mettons en contact avec les personnes et les
                  organisations qui comptent pour vous</strong
                >
                : votre expérience sur DjoumAf ne ressemble à celle de personne
                d’autre. Qu’il s’agisse des publications, des actualités, des
                évènements, des publicités et des autres contenus que vous voyez
                dans le fil d’actualité ou sur notre plate-forme vidéo, ou des
                Pages auxquelles vous êtes abonné(e) et des autres
                fonctionnalités que vous pouvez utiliser, telles qu’À la une,
                Marketplace et la recherche. Nous utilisons les données dont
                nous disposons, par exemple à propos des connexions que vous
                établissez, des options et des paramètres que vous sélectionnez,
                et de ce que vous partagez et faites sur nos Produits et en
                dehors, pour personnaliser votre expérience.
              </p>
              <p>
                <strong
                  >Nous vous fournissons une expérience personnalisée</strong
                >
                : nous vous aidons à trouver et à contacter les personnes, les
                groupes, les entreprises, les organisations et autres qui
                comptent pour vous sur l’ensemble des Produits DjoumAf que vous
                utilisez. Nous utilisons les données dont nous disposons pour
                présenter des suggestions, à vous comme à d’autres personnes,
                par exemple des groupes à rejoindre, des évènements auxquels
                participer, des Pages auxquelles s’abonner ou envoyer un
                message, des programmes à regarder et des personnes avec
                lesquelles vous pourriez vouloir devenir ami(e). Les vraies
                communautés sont fondées sur des liens forts et nous pensons que
                nos services sont plus utiles lorsque les gens sont connectés
                aux personnes, aux groupes et aux organisations qui comptent
                pour eux.
              </p>
              <p>
                <strong
                  >Nous vous donnons les moyens de vous exprimer et de
                  communiquer à propos de ce qui compte pour vous</strong
                >
                : Il existe de nombreuses manières de vous exprimer sur DjoumAf
                et de communiquer avec vos amis, votre famille et d’autres
                personnes à propos de ce qui compte pour vous, comme le partage
                de statuts, de photos, de vidéos et de stories à travers les
                Produits DjoumAf que vous utilisez, l’envoi de messages à un ami
                ou à plusieurs personnes, la création d’évènements ou de
                groupes, ou l’ajout de contenu à votre profil. Nous avons
                également développé de nouvelles manières d’utiliser la
                technologie, telles que la réalité augmentée et la vidéo 360
                pour créer et partager des contenus plus expressifs et
                attrayants sur DjoumAf, et nous continuons d’explorer cette
                voie.
              </p>
              <p>
                <strong
                  >Nous vous aidons à découvrir du contenu, des produits et des
                  services qui pourraient vous intéresser</strong
                >
                : nous vous présentons des publicités, des offres et d’autres
                contenus sponsorisés afin de vous aider à découvrir du contenu,
                des produits et des services qui sont proposés par les
                nombreuses entreprises et organisations qui utilisent DjoumAf et
                d’autres produits DjoumAf. La Section 2 ci-dessous offre des
                explications plus détaillées.
              </p>

              <p>
                <strong
                  >Lutter contre les comportements préjudiciables ainsi que
                  protéger et soutenir notre communauté</strong
                >
                : Les personnes ne créeront une communauté sur DjoumAf que si
                elles s’y sentent en sécurité. Nous employons des équipes
                dédiées à travers le monde et développons des systèmes
                techniques avancés afin de détecter les mauvaises utilisations
                de nos Produits, les comportements préjudiciables envers les
                autres et les situations dans lesquelles nous pourrions être en
                mesure de soutenir ou de protéger notre communauté. Si un tel
                contenu ou un tel comportement est porté à notre connaissance,
                nous prendrons les mesures appropriées, par exemple en proposant
                notre aide, en supprimant le contenu, en supprimant ou limitant
                l’accès à certaines fonctionnalités, en désactivant un compte ou
                en contactant les autorités légales. Nous partageons des données
                avec d’autres Entités DjoumAf lorsque nous détectons une
                mauvaise utilisation ou un comportement préjudiciable de la part
                de quelqu’un qui utilise l’un de nos Produits.
              </p>
              <p>
                <strong>Nous recherchons comment améliorer nos services</strong>
                : nous nous impliquons dans la recherche pour développer, tester
                et améliorer nos Produits. Cela inclut d’analyser les données
                que nous avons concernant nos utilisateurs et de comprendre
                comment les personnes utilisent nos Produits, par exemple, en
                effectuant des sondages et des tests et en résolvant les
                problèmes qui surviennent dans de nouvelles fonctionnalités.
                Notre Politique d’utilisation des données explique comment nous
                utilisons les données pour soutenir la recherche afin de
                développer et d’améliorer nos services.
              </p>
              <p>
                Nous fournissons des expériences homogènes et fluides à travers
                l’ensemble des produits des entités DjoumAf : nos Produits vous
                aident à trouver et à entrer en contact avec des personnes, des
                groupes, des entreprises, des organisations et autres qui
                comptent pour vous. Nous concevons nos systèmes de sorte que
                votre expérience soit homogène et fluide à travers l’ensemble
                des différents Produits des entités DjoumAf que vous utilisez.
              </p>
              <p>
                <strong>Permettre un accès international à nos services</strong>
                : Pour que notre service mondial fonctionne, nous devons
                conserver et distribuer du contenu et des données dans nos
                centres de données et nos systèmes dans le monde entier, y
                compris en dehors de votre pays de résidence. Cette
                infrastructure peut être exploitée ou contrôlée par DjoumAf,
                Inc., DjoumAf Ireland Limited ou leurs filiales.
              </p>
            </div>
          </div>
        </div>

        <!-- 

            -
            -
            -
            -
            -
            -

         -->
        <div class="card" id="service_finances">
          <div class="card-content">
            <div class="card-body">
              <div class="title">
                <h2 class="kb-title">Comment nos services sont financés</h2>
              </div>
              <p>
                Au lieu de payer pour l’utilisation de DjoumAf et des autres
                produits et services que nous offrons, en utilisant les Produits
                DjoumAf inclus dans les présentes Conditions, vous acceptez que
                nous vous montrions les publicités payées par les entreprises et
                organisations pour que nous les promouvions sur les Produits des
                entités DjoumAf et en dehors. Nous utilisons vos données
                personnelles, telles que les informations concernant votre
                activité et vos intérêts, afin de vous montrer des publicités
                plus pertinentes pour vous.
              </p>
              <p>
                La protection de la vie privée est au cœur de la conception de
                notre système publicitaire. Cela signifie que nous pouvons vous
                montrer des publicités pertinentes et utiles sans informer les
                annonceurs sur votre identité. Nous ne vendons pas vos données
                personnelles. Nous autorisons les annonceurs à nous donner des
                informations, telles que leur objectif commercial et le type
                d’audience à qui ils souhaitent montrer leurs publicités (par
                exemple, les personnes âgées de 18 à 35 ans qui aiment le vélo).
                Puis, nous montrons leur publicité aux personnes susceptibles
                d’être intéressées.
              </p>

              <p>
                De plus, nous envoyons aux annonceurs des rapports sur les
                performances de leurs publicités pour les aider à comprendre
                comment les gens interagissent avec leur contenu sur DjoumAf et
                en dehors. Par exemple, nous communiquerons aux annonceurs des
                informations générales concernant la démographie et les centres
                d’intérêt (par exemple, une publicité a été vue par une femme
                entre 25 et 34 ans qui vit à Madrid et qui aime l’informatique)
                pour les aider à mieux comprendre leur audience. Nous ne
                partageons aucune information qui vous identifie directement
                (des informations comme votre nom ou adresse e-mail qui, en
                elles-mêmes, peuvent servir à vous contacter ou à vous
                identifier) sans avoir obtenu votre autorisation spécifique.
                Découvrez comment fonctionnent les publicités DjoumAf ici.
              </p>
              <p>
                Nous collectons et utilisons vos données personnelles afin de
                vous fournir les services décrits ci-dessus. Pour en savoir plus
                sur la façon dont nous collectons et utilisons vos données,
                consultez notre Politique d’utilisation des données. Vous pouvez
                contrôler les types de publicités et d’annonceurs que vous voyez
                ainsi que les types d’informations que nous utilisons pour
                définir les publicités que nous vous montrons. En savoir plus.
              </p>
            </div>
          </div>
        </div>

        <!-- 

            -
            -
            -
            -
            -
            -

         -->
         
        <div class="card" id="engagements_communauté">
          <div class="card-content">
            <div class="card-body">
              <div class="title">
                <h2 class="kb-title">
                  Vos engagements envers DjoumAf et notre communauté
                </h2>
              </div>
              <p>
                Nous fournissons ces services à vous et à d’autres personnes
                pour faire progresser notre mission. En échange, nous avons
                besoin que vous preniez les engagements suivants :
              </p>
              <h4>1. Qui peut utiliser DjoumAf</h4>
              <p>
                Lorsque les personnes répondent de leur avis et de leurs
                actions, notre communauté est plus sûre et plus responsable.
                Pour cette raison, vous devez :
              </p>
              <ul>
                <li>
                  Utiliser le même nom que celui que vous utilisez au quotidien
                  ;
                </li>
                <li>Fournir des informations exactes à propos de vous ;</li>
                <li>
                  Créer un seul compte (le vôtre) et utiliser votre journal à
                  des fins personnelles ;
                </li>
                <li>
                  Ne pas partager votre mot de passe, autoriser d’autres
                  personnes à accéder à votre compte DjoumAf, ni transférer
                  votre compte à quiconque (sans notre autorisation).
                </li>
              </ul>
              <p>
                Nous essayons de rendre DjoumAf largement accessible à tous,
                mais vous ne pouvez pas utiliser DjoumAf si :
              </p>
              <ul>
                <li>
                  Vous êtes âgé(e) de moins de 13 ans (ou l’âge minimum légal
                  dans votre pays pour utiliser nos Produits) ;
                </li>
                <li>Vous êtes un délinquant sexuel condamné ;</li>
                <li>
                  Nous avons précédemment désactivé votre compte pour
                  non-respect de nos Conditions générales ou de nos Règlements ;
                </li>
                <li>
                  Vous n’êtes pas autorisé(e) à recevoir nos produits, nos
                  services ou nos logiciels en vertu des lois applicables.
                </li>
              </ul>
              <p></p>
              <h4>2. Ce que vous pouvez partager et faire sur DjoumAf</h4>
              <p>
                Nous voulons que les gens utilisent DjoumAf pour s’exprimer et
                partager du contenu qui leur importe, mais pas au détriment de
                la sécurité et du bien-être des autres ou de l’intégrité de
                notre communauté. Vous acceptez donc de ne pas agir de la
                manière décrite ci-dessous (ni d’encourager ou de soutenir les
                autres à le faire) :
              </p>
              <ul>
                <p></p>
                <h6>
                  1. Vous ne pouvez pas utiliser nos Produits pour faire ou
                  partager quoi que ce soit :
                </h6>
                <p></p>
                <ul>
                  <li>
                    qui enfreint les présentes Conditions, nos Standards de la
                    communauté et les autres conditions et politiques
                    applicables à votre utilisation de DjoumAf ;
                  </li>
                  <li>
                    qui est illégal, trompeur, discriminant ou frauduleux ;
                  </li>
                  <li>
                    qui enfreint ou viole des droits tiers, y compris des droits
                    de propriété intellectuelle.
                  </li>
                </ul>
                <p></p>
                <h6>
                  2. Vous ne pouvez pas importer de virus ou de code malveillant
                  ni agir d’une manière qui pourrait désactiver, surcharger ou
                  empêcher le bon fonctionnement ou l’apparence de nos Produits.
                </h6>
                <p></p>
                <p></p>
                <h6>
                  3. Vous ne devez pas collecter des données sur nos Produits ni
                  accéder à de telles données par des moyens automatisés (sans
                  notre autorisation préalable), ni tenter d’accéder à des
                  données auxquelles vous n’êtes pas autorisé(e) à accéder.
                </h6>
                <p></p>
              </ul>
              <p></p>
              <p>
                Nous pouvons supprimer ou limiter l’accès au contenu qui
                enfreint les présentes dispositions.
              </p>
              <p>
                Si nous supprimons du contenu que vous avez partagé, car il
                enfreint nos Standards de la communauté, nous vous en
                informerons et vous expliquerons les options à votre disposition
                pour demander un réexamen. Vous ne pourrez pas faire cette
                demande si vous enfreignez gravement ou à maintes reprises les
                présentes Conditions ou si cela engage notre responsabilité
                juridique ou celle d’un tiers, porte atteinte à notre communauté
                d’utilisateurs, ou compromet ou altère l’intégrité ou le
                fonctionnement de nos services, systèmes ou Produits, ou en cas
                de restrictions techniques ou lorsqu’il nous est interdit de le
                faire pour des raisons légales.
              </p>
              <p>
                Pour nous aider à soutenir notre communauté, nous vous
                encourageons à signaler tout contenu ou comportement qui, selon
                vous, enfreint vos droits (y compris vos droits de propriété
                intellectuelle) ou nos conditions et règlements.
              </p>
              <p>
                Nous pouvons également supprimer ou limiter l’accès à votre
                contenu, vos services ou vos informations si nous estimons que
                cela s’avère raisonnablement nécessaire pour éviter ou atténuer
                les effets juridiques ou réglementaires négatifs sur DjoumAf.
              </p>

              <h4>3. Les autorisations que vous nous accordez</h4>
              <p>
                Nous avons besoin de certaines autorisations de votre part pour
                pouvoir fournir nos services :
              </p>
              <ul>
                <h6>
                  1. Autorisation d’utiliser le contenu que vous créez et
                  partagez : le contenu que vous partagez ou importez, tel que
                  les photos ou les vidéos, peut être protégé par des droits de
                  propriété intellectuelle.
                </h6>
                <p>
                  Vous possédez les droits de propriété intellectuelle (tels que
                  les droits d’auteur et les marques déposées) de tout le
                  contenu que vous créez et partagez sur DjoumAf et des autres
                  Produits des entités DjoumAf que vous utilisez. Aucune
                  disposition des présentes Conditions ne vous prive des droits
                  que vous possédez sur votre propre contenu. Vous êtes libre de
                  partager votre contenu avec quiconque, où vous le souhaitez.
                </p>
                <p>
                  Cependant, afin que nous puissions fournir nos services, vous
                  devez nous accorder certaines autorisations légales (appelées
                  « licences ») pour utiliser ce contenu. Ceci est uniquement
                  dans le but de fournir et d’améliorer nos Produits et
                  services, tels que décrits dans la Section 1 ci-dessus.
                </p>
                <p>
                  En particulier, lorsque vous partagez, publiez ou importez du
                  contenu protégé par des droits de propriété intellectuelle sur
                  ou en rapport avec nos Produits, vous nous accordez une
                  licence non exclusive, transférable, sous-licenciable,
                  gratuite et mondiale pour héberger, utiliser, distribuer,
                  modifier, exécuter, copier, représenter publiquement ou
                  afficher publiquement, traduire et créer des œuvres dérivées
                  de votre contenu (conformément à vos paramètres de
                  confidentialité et d’application). Cela signifie, par exemple,
                  que si vous partagez une photo sur DjoumAf, vous nous
                  autorisez à la stocker, la copier et la partager avec d’autres
                  personnes (une nouvelle fois, conformément à vos paramètres),
                  telles que des fournisseurs de services qui prennent en charge
                  notre service ou les autres Produits DjoumAf que vous
                  utilisez. Cette licence prend fin lorsque votre contenu est
                  supprimé de nos systèmes.
                </p>
                <p>
                  Vous pouvez supprimer votre contenu individuellement ou tout
                  d’un coup en supprimant votre compte. Découvrez comment
                  supprimer votre compte. Vous pouvez télécharger une copie de
                  vos données à tout moment avant de supprimer votre compte.
                </p>
                <p>
                  Lorsque vous supprimez du contenu, il n’est plus visible aux
                  autres utilisateurs. Cependant, il peut perdurer ailleurs,
                  dans nos systèmes, lorsque :
                </p>
                <ul>
                  <li>
                    la suppression immédiate est impossible en raison de
                    restrictions techniques (auquel cas, votre contenu sera
                    supprimé dans un délai maximum de 90 jours à compter du
                    moment où vous le supprimez) ;
                  </li>
                  <li>
                    votre contenu a été utilisé par des tiers conformément à la
                    licence, et ils ne l’ont pas supprimé (auquel cas, cette
                    licence continue de s’appliquer jusqu’à la suppression du
                    contenu) ;ou
                  </li>

                  <li>
                    lorsque la suppression immédiate limiterait notre faculté :
                  </li>
                  <ul>
                    <li>
                      d’identifier ou à enquêter sur des activités illégales ou
                      des violations de nos conditions et règlements (par
                      exemple, identifier ou enquêter sur une utilisation
                      détournée de nos Produits ou systèmes) ;
                    </li>
                    <li>
                      de respecter une obligation légale, telle que la
                      préservation des éléments de preuve ; ou
                    </li>

                    <li>
                      de respecter la demande d’une autorité judiciaire ou
                      administrative, d’une autorité d’application de la loi ou
                      d’un organisme gouvernemental ;
                    </li>
                  </ul>
                </ul>
                <p>
                  auquel cas, le contenu ne sera pas conservé plus longtemps
                  qu’il n’est nécessaire aux fins pour lesquelles il a été
                  conservé (la durée exacte variant au cas par cas).
                </p>
                <p>
                  Dans chacun des cas mentionnés ci-dessus, la licence perdure
                  jusqu’à la suppression complète du contenu.
                </p>
                <h6>
                  2. Autorisation d’utiliser votre nom, votre photo de profil et
                  les informations relatives à vos actions en rapport avec les
                  publicités et le contenu sponsorisé : vous nous autorisez à
                  utiliser votre nom et votre photo de profil et les
                  informations relatives aux actions que vous avez effectuées
                  sur DjoumAf suite à, ou en rapport avec des publicités, des
                  offres et d’autres contenus sponsorisés que nous affichons à
                  travers nos Produits, sans vous verser aucune compensation.
                  Nous pouvons, par exemple, montrer à vos amis que vous êtes
                  intéressé(e) par un évènement promu ou que vous avez aimé une
                  Page créée par une marque qui nous a payés pour afficher ses
                  publicités sur DjoumAf. Ce type de publicités est uniquement
                  visible par les personnes autorisées par vous à voir les
                  actions que vous avez effectuées sur DjoumAf. Apprenez-en
                  davantage sur vos paramètres et vos préférences publicitaires.
                </h6>
                <h6>
                  3. Autorisation de mettre à jour le logiciel que vous utilisez
                  ou téléchargez : si vous téléchargez ou utilisez notre
                  logiciel, vous nous autorisez à télécharger et à installer les
                  mises à jour du logiciel, le cas échéant.
                </h6>
              </ul>
              <p></p>
              <h4>
                4. Limites quant à l’utilisation de notre propriété
                intellectuelle
              </h4>
              <p>
                Si vous utilisez du contenu couvert par des droits de propriété
                intellectuelle que nous possédons et rendons disponibles dans
                nos Produits (par exemple, des images, des dessins, des vidéos
                ou des sons que nous fournissons et que vous ajoutez à du
                contenu que vous créez ou partagez sur DjoumAf), nous conservons
                tous les droits relatifs à ce contenu (mais pas au vôtre). Vous
                ne pouvez utiliser nos droits d’auteur ou nos marques de
                commerce (ou toute autre marque similaire) que dans les cas
                expressément autorisés par nos Règles d’utilisation des marques
                ou après avoir reçu une autorisation écrite de notre part. Vous
                devez obtenir notre autorisation écrite (ou une autorisation
                dans le cadre d’une licence open source) pour modifier, créer
                des œuvres dérivées, décompiler ou tenter autrement d’extraire
                notre code source.
              </p>
            </div>
          </div>
        </div>

        <!-- 

            -
            -
            -
            -
            -
            -

         -->
        <div class="card" id="Condition_jour">
          <div class="card-content">
            <div class="card-body">
              <div class="title">
                <h2 class="kb-title">Condition de mise à jour</h2>
              </div>
              <h4>1. Mise à jour de nos Conditions</h4>
              <p>
                Nous nous efforçons d’améliorer constamment nos services et de
                développer de nouvelles fonctionnalités pour vous proposer de
                meilleurs Produits, ainsi qu’à notre communauté. Ainsi, nous
                sommes susceptibles de mettre à jour les présentes Conditions de
                temps à autre afin de refléter correctement nos services et nos
                pratiques. Nous les modifierons uniquement si les dispositions
                ne sont plus adéquates ou si elles sont incomplètes, et si les
                modifications sont raisonnables et prennent bien en compte vos
                intérêts.
              </p>
              <p>
                Nous vous informerons (par exemple, par e-mail ou par
                l’intermédiaire de nos Produits) au moins 30 jours avant de
                modifier les présentes Conditions et vous donnerons
                l’opportunité de les examiner avant leur entrée en vigueur, à
                moins que les modifications ne soient requises par la loi. Une
                fois les Conditions révisées en vigueur, vous serez lié(e) par
                celles-ci si vous continuez d’utiliser nos Produits.
              </p>
              <p>
                Nous espérons que vous continuerez d’utiliser nos Produits, mais
                si vous n'êtes pas d'accord avec nos Conditions révisées et ne
                souhaitez plus faire partie de la communauté DjoumAf, vous
                pouvez supprimer votre compte à tout moment.
              </p>
              <h4>2. Suspension ou résiliation d’un compte</h4>
              <p>
                Nous voulons faire de DjoumAf un lieu à la fois chaleureux et
                sécurisé, où chacun peut s’exprimer et partager ses opinions et
                ses idées.
              </p>
              <p>
                S’il s’avère que vous avez manifestement, gravement ou à maintes
                reprises enfreint nos Conditions ou nos Règlements, et notamment
                nos Standards de la communauté, nous pourrons suspendre ou
                désactiver définitivement l’accès à votre compte. Nous pourrons
                également suspendre ou désactiver votre compte si vous
                enfreignez à plusieurs reprises des droits de propriété
                intellectuelle tiers ou si la loi nous y oblige.
              </p>
              <p>
                Si nous procédons ainsi, nous vous en informerons et vous
                expliquerons les options à votre disposition pour demander un
                examen, à moins que cela ne puisse engager notre responsabilité
                juridique ou celle d’un tiers, porter atteinte à notre
                communauté d’utilisateurs, ou compromettre ou altérer
                l’intégrité ou le fonctionnement de nos sources, systèmes ou
                Produits, ou en cas de restrictions techniques ou lorsqu'il nous
                est interdit de le faire pour des raisons légales.
              </p>
              <p>
                Apprenez-en plus sur les dispositions que vous pouvez prendre si
                votre compte a été désactivé et sur la façon de nous contacter
                si vous estimez que nous avons désactivé votre compte par
                erreur.
              </p>
              <p>
                Si vous supprimez ou si nous désactivons votre compte, les
                présentes Conditions prendront fin et ne constitueront plus un
                accord entre vous et nous, mais les dispositions suivantes
                resteront en vigueur : 3, 4.2-4.5.
              </p>
              <h4>3. Limites de responsabilité</h4>
              <p>
                Nous mettons tout en œuvre pour fournir les meilleurs Produits
                possible et donner des directives claires à tous les
                utilisateurs. Toutefois, nos Produits sont fournis « tels quels
                » et nous ne pouvons garantir qu’ils seront toujours sûrs, sans
                risques ou exempts d’erreur, ou encore qu’ils fonctionneront
                sans interruptions, retards ou imperfections. Dans la mesure
                permise par la loi, nous déclinons également
                <strong
                  >TOUTE GARANTIE, EXPLICITE OU IMPLICITE, NOTAMMENT LES
                  GARANTIES IMPLICITES DE QUALITÉ MARCHANDE, D’ADÉQUATION À UN
                  USAGE PARTICULIER, DE TITRE ET D’ABSENCE DE
                  CONTREFAÇON</strong
                >. Nous ne pouvons contrôler ni orienter ce que les gens font ou
                disent, et nous ne sommes pas responsables de leurs actions ou
                conduite (en ligne comme hors ligne) ni du contenu qu’ils
                partagent (qu’il soit offensant, inapproprié, obscène, illégal
                ou autrement répréhensible).
              </p>
              <p>
                Nous ne sommes pas en mesure de prévoir lorsque des problèmes
                peuvent survenir avec nos Produits. Par conséquent, notre
                responsabilité sera limitée dans toute la mesure permise par le
                droit en vigueur, et nous ne serons en aucun cas responsables
                envers vous des pertes de profits, de revenus, d’informations ou
                de données, ou des dommages accessoires, spéciaux, indirects,
                exemplaires, punitifs ou accidentels découlant des présentes
                conditions ou des Produits DjoumAf, ou en rapport avec ceux-ci,
                même si nous avons été informés de la possibilité de tels
                dommages.
              </p>
              <h4>4. Litiges</h4>
              <p>
                Nous tentons de fournir des règles claires de manière à pouvoir
                limiter ou, espérons-le, éviter les litiges entre vous et nous.
                Si un litige survient, toutefois, il est utile de savoir à
                l’avance à quel endroit il peut être résolu et quelles lois vont
                s’appliquer.
              </p>
              <p>
                Si vous êtes un consommateur, les lois du pays dans lequel vous
                résidez s’appliqueront à toute réclamation, à tout motif
                d’action ou à tout litige à notre encontre, qui survient des
                présentes Conditions ou des Produits DjoumAf, ou en lien avec
                ceux-ci, et vous pourrez résoudre votre réclamation devant tout
                tribunal compétent de ce pays qui peut statuer sur la
                réclamation. Dans tous les autres cas, vous acceptez que ces
                réclamations soient résolues exclusivement devant un tribunal
                américain du district nord de la Californie ou un tribunal
                d’État du comté de San Mateo. Vous acceptez également de vous
                soumettre à la compétence personnelle de l’un de ces tribunaux
                dans le cadre de telles réclamations et reconnaissez que le
                droit de l’État de Californie régit les présentes Conditions et
                les réclamations, sans égard aux dispositions en matière de
                conflits de lois.
              </p>
              <h4>5. Autres</h4>
              <ol>
                <li>
                  Ces Conditions (anciennement connues sous le nom de «
                  Déclaration des droits et responsabilités ») forment
                  l’intégralité de l’accord entre vous et DjoumAf, Inc. en ce
                  qui concerne votre utilisation de nos Produits. Elles
                  remplacent tout accord antérieur.
                </li>
                <li>
                  Certains des Produits que nous proposons sont également régis
                  par des conditions supplémentaires. Si vous utilisez l’un de
                  ces Produits, les conditions supplémentaires seront rendues
                  disponibles et feront partie de notre accord avec vous. Par
                  exemple, si vous utilisez nos Produits ou y accédez à des fins
                  commerciales ou professionnelles, comme pour acheter des
                  publicités, pour vendre des produits, pour développer des
                  applications, pour gérer un groupe ou une Page pour votre
                  activité commerciale, ou encore pour utiliser nos services de
                  mesure, vous devez accepter nos Conditions commerciales. Si
                  vous publiez ou partagez du contenu contenant de la musique,
                  vous devez respecter nos Règles applicables à la musique. Dans
                  la mesure où les conditions supplémentaires seraient en
                  conflit avec les présentes Conditions, les conditions
                  supplémentaires prévaudront dans la mesure du conflit.
                </li>
                <li>
                  Si une partie des présentes Conditions est jugée inapplicable,
                  la partie restante restera pleinement en vigueur. Si nous ne
                  parvenons pas à faire appliquer l’une des présentes
                  Conditions, cela ne pourra être considéré comme une
                  renonciation. Tout amendement des présentes Conditions ou
                  toute dérogation à celles-ci doivent être établis par écrit et
                  signés par nous.
                </li>
                <li>
                  Vous ne transférerez pas à un tiers les droits ou obligations
                  qui vous incombent en vertu des présentes Conditions sans
                  notre consentement.
                </li>
                <li>
                  Vous pouvez désigner une personne (appelée « contact légataire
                  ») pour gérer votre compte s’il est transformé en compte de
                  commémoration. Seul votre contact légataire ou une personne
                  que vous avez identifiée dans un testament valide ou un
                  document similaire indiquant clairement que vous consentez à
                  divulguer votre contenu en cas de décès ou d’incapacité sera
                  en mesure de demander la divulgation de votre compte après
                  qu’il a été transformé en compte de commémoration.
                </li>
                <li>
                  Les présentes Conditions ne confèrent aucun droit à des tiers
                  bénéficiaires. La totalité de nos droits et de nos obligations
                  en vertu des présentes Conditions est librement cessible par
                  nous dans le cadre d’une fusion, d’une acquisition ou de la
                  vente de nos actifs, ou par effet de la loi ou dans d’autres
                  cas.
                </li>
                <li>
                  Vous devez savoir que nous pouvons être amenés à changer le
                  nom d’utilisateur associé à votre compte dans certaines
                  circonstances (par exemple, lorsqu’une autre personne
                  revendique le nom d’utilisateur et que le nom d’utilisateur
                  semble sans rapport avec le nom que vous utilisez au
                  quotidien). Nous vous informerons à l’avance si nous devons
                  procéder ainsi et vous expliquerons pourquoi.
                </li>
                <li>
                  Nous sommes toujours ravis de recevoir votre avis et d’autres
                  suggestions à propos de nos produits et services. Sachez
                  toutefois que nous pouvons les utiliser sans aucune
                  restriction ni obligation de rémunération, et que nous ne
                  sommes pas tenus de les garder confidentiels.
                </li>
                <li>
                  Nous nous réservons tous les droits qui ne vous sont pas
                  explicitement accordés.
                </li>
              </ol>
            </div>
          </div>
        </div>

        <!-- 

            -
            -
            -
            -
            -
            -

         -->
        <div class="card" id="conditions_politiques">
          <div class="card-content">
            <div class="card-body">
              <div class="title">
                <h2 class="kb-title">
                  Autres conditions et politiques qui peuvent s’appliquer à vous
                </h2>
              </div>
              <ol>
                <li>
                  Standards de la communauté : ces directives soulignent nos
                  standards quant au contenu que vous publiez sur DjoumAf et à
                  vos activités sur DjoumAf et sur d’autres Produits DjoumAf.
                </li>
                <li>
                  Conditions commerciales : ces conditions s’appliquent si vous
                  accédez également à nos Produits ou les utilisez à des fins
                  commerciales ou professionnelles, notamment pour la publicité,
                  l’exploitation d’une application sur notre Plate-forme,
                  l’utilisation de nos services de mesure, la gestion d’un
                  groupe ou d’une Page pour une activité commerciale, ou la
                  vente de biens ou de services.
                </li>
                <li>
                  Règles publicitaires : ces règles précisent les types de
                  contenu publicitaire autorisés de la part des partenaires qui
                  font de la publicité à travers l’ensemble des Produits
                  DjoumAf.
                </li>
                <li>
                  Conditions d’utilisation des publicités en libre-service : ces
                  conditions s’appliquent lorsque vous utilisez les interfaces
                  de publicité en libre-service pour créer, soumettre ou
                  diffuser une publicité, ou une activité ou un contenu
                  commercial ou sponsorisé.
                </li>
                <li>
                  Règles applicables aux Pages, aux groupes et aux évènements :
                  ces directives s’appliquent si vous créez ou administrez une
                  Page DjoumAf, un groupe ou un évènement, ou si vous utilisez
                  DjoumAf pour communiquer ou administrer une promotion.
                </li>

             
                <li>
                  Politique de la Plate-forme DjoumAf : ces directives
                  soulignent les politiques qui s’appliquent à votre utilisation
                  de notre Plate-forme (par exemple, pour les développeurs ou
                  les opérateurs d’une application ou d’un site web sur la
                  Plate-forme, ou si vous utilisez des plugins sociaux).
                </li>
                <li>
                  Conditions de paiement des développeurs : ces conditions
                  s’appliquent aux développeurs d’applications qui utilisent le
                  service Paiements DjoumAf.
                </li>
                <li>
                  Conditions relatives aux paiements de la communauté : ces
                  conditions s’appliquent aux paiements réalisés sur ou au moyen
                  de DjoumAf.
                </li>
                <li>
                  Politique relative au commerce : ces directives soulignent les
                  règles qui s’appliquent lorsque vous proposez des produits et
                  des services à la vente sur DjoumAf
                </li>
                <li>
                  Ressources de marque DjoumAf : ces directives soulignent les
                  politiques applicables à l’utilisation des marques, des logos
                  et des captures d’écran DjoumAf.
                </li>
                <li>
                  Règles applicables à la musique : ces directives précisent les
                  règles applicables si vous publiez ou partagez du contenu
                  contenant de la musique sur DjoumAf.
                </li>
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
  setup(){
        
    const AncreLinks = reactive([
    {name: 'Introduction', hash: 'intro'},
    {name: 'Les services fournis', hash: 'service_fouurnissons'},
    {name: 'Services financés', hash: 'service_finances'},
    {name: 'Vos engagements envers DjoumAf et notre communauté', hash: 'engagements_communauté'},
    {name: 'Condition de mise à jour', hash: 'Condition_jour'},
    {name: 'Autres conditions et politiques qui peuvent s’appliquer à vous', hash: 'conditions_politiques'},
    ])

    return {
        AncreLinks
    }
  }
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
