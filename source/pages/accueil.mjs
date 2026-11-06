/* Accueil — direction « Le plan et l'étoile ».
   Grille wouahou : étoile-boussole à faire tourner (manipuler), intro qui finit sur elle (data-iris-centre="disque"),
   voile en étoile, fil de circulation (main), titres Fraunces qui s'apaisent (typo), lecture du lieu épinglée (scene),
   tampon « Choisie » des tarifs puis tampon « Reçue » de la demande (retour). */
import { html, brut } from '../../outils/gabarit.mjs';
import { planMaison, boussole, tarifs, dessinTarifs, objetFil } from '../gabarits/elements.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'grok/accueil-ouverture-800.webp' };

const PICTOS = {
  e1: '<path d="M10 66 V30 L38 10 L66 30 V66 Z"/><path d="M30 66 V46 H46 V66"/><path class="or" d="M50 22 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 Z"/>',
  e2: '<path d="M8 66 H68"/><path d="M14 66 V34 L34 18 L54 34 V66"/><path d="M40 30 h18 v14 h-18 Z"/><path class="or" d="M44 37 h10"/>',
  e3: '<rect x="12" y="14" width="52" height="52"/><path d="M12 34 H64 M38 34 V66"/><path class="or" d="M22 50 h8 M46 50 h8"/>',
  e4: '<rect x="10" y="12" width="56" height="38" rx="3"/><path d="M28 64 H48 M38 50 V64"/><path class="or" d="M22 40 V24 H40 V32 H54 V40 Z"/>',
};

export default (c) => html`
<section class="ouv papier" id="debut" data-fil-dessus>
  <div class="ouv-texte">
    <p class="surtitre" data-anime="gsap">${c.t('accueil.hero.sur')}</p>
    <h1 class="ouv-titre" data-grille="typo" data-axes-ouv data-effet="titre-qui-s-apaise"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('accueil.hero.titre1')}</span></span><span class="ligne-masque"><span class="ouv-ligne ouv-ligne--or" data-anime="gsap">${c.t('accueil.hero.titre2')}</span></span></h1>
    <p class="ouv-accroche" data-anime="gsap"><strong>${c.t('accueil.hero.accroche')}</strong><span>${c.t('accueil.hero.texte')}</span></p>
    <p class="ouv-actions" data-anime="gsap">
      ${c.lien('contact', { ancre: 'demande', classe: 'bouton', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
      <span class="ouv-info" data-info-cle>${c.t('accueil.hero.info')}</span>
    </p>
  </div>
  <div class="ouv-scene" data-domaines="${JSON.stringify(c.donnees.domaines)}">
    ${c.media({ nom: 'grok/accueil-ouverture', alt: 'Salon baigné de soleil, murs à la chaux, tomettes et olivier en pot', priorite: true, classe: 'ouv-photo', sizes: '(max-width: 860px) 92vw, 46vw' })}
    <div class="ouv-calque" data-superpose data-effet="calque-qui-glisse">${planMaison('plan-ouverture')}</div>
    <span class="rai" data-effet="lumiere-du-matin" data-souris data-superpose aria-hidden="true"></span>
    <div class="oat boussole" data-module="objet-a-faire-tourner" data-grille="manipuler" data-iris-centre="disque" data-superpose role="img" aria-label="${c.s('accueil.hero.boussole')}">
      <span class="boussole-repere" aria-hidden="true"></span>
      <div class="oat__objet">${boussole()}</div>
      <p class="oat__indice" aria-hidden="true"><span class="souris">${c.t('accueil.hero.indice')}</span><span class="doigt">${c.t('accueil.hero.indiceTactile')}</span></p>
    </div>
    <p class="ouv-domaine" data-superpose aria-live="polite"><span>${c.t('accueil.hero.eclaire')}</span><b data-domaine-nom>${c.donnees.domaines[8].nom}</b><i data-domaine-mots>${c.donnees.domaines[8].mots}</i></p>
    <p class="ouv-source">${c.t('accueil.hero.source')}</p>
    <span data-fil-point="0.02 1" data-fil-sans-perle aria-hidden="true"></span>
  </div>
</section>

<section class="section" id="enjeu" data-fil="gauche">
  <div class="conteneur duo">
    <div>
      <p class="surtitre">${c.t('accueil.manifeste.sur')}</p>
      <h2 class="titre-grand titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes data-grille="typo" data-fil-repere>${c.t('accueil.manifeste.titre')}</h2>
      <p class="chapo" data-anime>${c.t('accueil.manifeste.texte1')}</p>
      <p class="texte-doux" data-anime>${c.t('accueil.manifeste.texte2')}</p>
    </div>
    ${c.media({ nom: 'accueil-manifeste', alt: 'Fauteuil ancien en chêne et coussins de lin dans un coin lecture au soleil du matin', classe: 'media-portrait manifeste-media', sizes: '(max-width: 760px) 92vw, 38vw', attrs: 'data-fx="parallaxe"' })}
  </div>
</section>

<section class="section papier" id="accompagnements" data-fil="droite">
  <div class="conteneur">
    <div class="facons-tete">
      <p class="surtitre">${c.t('accueil.facons.sur')}</p>
      <h2 class="titre-section titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes data-fil-repere>${c.t('accueil.facons.titre')}</h2>
      <p class="chapo texte-doux" data-anime>${c.t('accueil.facons.texte')}</p>
    </div>
    <div class="tep calques-pile" data-module="temoignages-en-pile" data-feuilleter="${c.s('accueil.facons.feuilleter')}">
      <ol class="tep__pile calques" data-effet="calques-empiles">
      ${[['geo', 'geobiologie', 'offre-geobiologie', 'Pendule au-dessus d\'un plan de maison, boussole en laiton et bougie sur la table'], ['fs', 'feng-shui', 'offre-feng-shui', 'Salon lumineux avec la roue des cinq éléments au mur'], ['immo', 'immobilier-autrement', 'grok/offre-immobilier', 'Trousseau de clés anciennes posé sur un rebord de fenêtre ensoleillé']].map(([k, p, img, alt], i) => html`
      <li class="tep__carte calque-carte" style="--i:${i}" data-numero="${c.s('accueil.facons.calque')} 0${i + 1}">
        <div>
          <p class="surtitre">${c.t(`accueil.facons.${k}.sur`)}</p>
          <h3>${c.t(`accueil.facons.${k}.nom`)}</h3>
          <p>${c.t(`accueil.facons.${k}.texte`)}</p>
          <ul>${[1, 2, 3, 4].map((n) => html`<li>${c.t(`accueil.facons.${k}.l${n}`)}</li>`)}</ul>
          <p class="calque-prix" data-prix>${c.t(`accueil.facons.${k}.prix`)}</p>
          ${c.lien(p, { classe: 'lien-fleche', texte: c.t(`accueil.facons.${k}.lien`) })}
        </div>
        ${c.media({ nom: img, alt, classe: 'calque-media', sizes: '(max-width: 760px) 86vw, 34vw' })}
      </li>`)}
      </ol>
      <p class="calques-indice" aria-hidden="true">${c.t('accueil.facons.indice')}</p>
    </div>
  </div>
</section>

<section class="see" id="demarche" data-module="schema-epingle-etapes" data-epingle data-entete-cache data-grille="scene" data-effet="lecture-du-lieu" aria-labelledby="t-demarche">
  <div class="see__scene">
    <div class="see__grille socle-cadre conteneur">
      <div class="see__texte" data-tient="texte">
        <p class="surtitre see__surtitre">${c.t('accueil.lecture.sur')}</p>
        <h2 class="see__titre" id="t-demarche" data-axes>${c.t('accueil.lecture.titre')}</h2>
        <p class="texte-doux">${c.t('accueil.lecture.texte')}</p>
        <ol class="see__etapes">
          ${[1, 2, 3].map((n) => html`<li class="see__etape"><p class="see__n">${c.t(`accueil.lecture.e${n}n`)}</p><h3>${c.t(`accueil.lecture.e${n}t`)}</h3><p>${c.t(`accueil.lecture.e${n}p`)}</p></li>`)}
        </ol>
      </div>
      <figure class="see__schema" data-tient="schéma">
        <div class="see__plan">
          <svg class="see__svg" viewBox="0 0 400 300" aria-hidden="true">
            <rect class="see__fond" width="400" height="300"/>
            <path class="mur-plan" d="M40 30 H360 V270 H222 M178 270 H40 Z"/>
            <path class="cloison-plan" d="M40 150 H160 M160 30 V210 M160 210 H40 M260 30 V130 H360 M260 190 H360 M260 190 V270"/>
            <g data-see-partie="1" data-see-des="1">
              <circle class="ressenti" cx="100" cy="90" r="26"/><circle class="ressenti-c" cx="100" cy="90" r="34"/>
              <circle class="ressenti" cx="310" cy="230" r="22"/><circle class="ressenti-c" cx="310" cy="230" r="30"/>
              <circle class="ressenti" cx="210" cy="90" r="18"/>
            </g>
            <g data-see-partie="2" data-see-des="2">
              <path class="see__trait" d="M200 270 C 200 220, 210 180, 210 150 S 120 120, 100 90 M210 150 C 260 160, 300 170, 310 230"/>
              <path class="see__flux" d="M200 270 C 200 220, 210 180, 210 150 S 120 120, 100 90 M210 150 C 260 160, 300 170, 310 230"/>
            </g>
            <g data-see-partie="3" data-see-des="3">
              <polygon class="etoile-plan" transform="translate(210 150)" points="0,-22 3,-3 22,0 3,3 0,22 -3,3 -22,0 -3,-3"/>
              <path class="coche" d="M88 90 l8 8 14 -16 M298 230 l8 8 14 -16"/>
            </g>
          </svg>
          <span class="see__etiquette" data-see-partie="1" style="--x: 25%; --y: 13%">${c.t('accueil.lecture.l1')}</span>
          <span class="see__etiquette" data-see-partie="2" style="--x: 64%; --y: 52%">${c.t('accueil.lecture.l2')}</span>
          <span class="see__etiquette" data-see-partie="2" style="--x: 80%; --y: 25%">${c.t('accueil.lecture.l3')}</span>
          <span class="see__etiquette" data-see-partie="3" style="--x: 52%; --y: 64%">${c.t('accueil.lecture.l4')}</span>
        </div>
        <figcaption class="socle-sr">${c.t('accueil.lecture.legende')}</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="section tarifs" id="tarifs" data-fil="gauche">
  <div class="conteneur tarifs-grille tarifs--accueil">
    <div class="tarifs-tete">
      <p class="surtitre">${c.t('accueil.tarifs.sur')}</p>
      <h2 class="titre-section titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes data-fil-repere>${c.t('accueil.tarifs.titre')}</h2>
      <p class="chapo texte-doux" data-anime>${c.t('accueil.tarifs.texte')}</p>
      <div class="tarifs-bande">${c.media({ nom: 'geo-ouverture', alt: 'Salon aux murs sable, parquet en chevrons et olivier en pot', classe: 'tarifs-photo', sizes: '(max-width: 1240px) 96vw, 1240px', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}</div>
      <div class="trf" data-module="tarifs-a-rouleaux" data-grille="retour" data-effet="prix-qui-roulent" data-conseillee="${c.s('accueil.tarifs.conseillee')}" data-choisie="${c.s('accueil.tarifs.choisie')}">
        ${tarifs(c, 'accueil')}
      </div>
      <p class="tarifs-detail">${c.t('accueil.tarifs.detail')} ${c.lien('geobiologie', { ancre: 'tarifs' })} · ${c.lien('feng-shui', { ancre: 'tarifs' })} · ${c.lien('immobilier-autrement', { ancre: 'tarifs' })}</p>
    </div>
  </div>
</section>

<section class="section papier" id="capsules" data-fil="droite">
  <div class="conteneur">
    <p class="surtitre">${c.t('accueil.capsules.sur')}</p>
    <h2 class="titre-section titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes data-fil-repere>${c.t('accueil.capsules.titre')}</h2>
    <p class="chapo texte-doux" data-anime>${c.t('accueil.capsules.texte')}</p>
    <div class="bulles">
      ${c.donnees.bulles.map((b, i) => html`<article class="bulle" id="bulle-${b.cle}">
        ${c.media({ nom: b.image, alt: `Visuel de ${b.nom}`, classe: 'bulle-media', sizes: '(max-width: 640px) 92vw, 24vw', attrs: `data-effet="bulles-qui-flottent" data-flotte="${i}"` })}
        <p class="bulle-lieu">${b.lieu}</p>
        <h3>${b.nom}</h3>
        <p>${b.texte}</p>
        <p class="bulle-bas"><b data-prix>${c.t('accueil.capsules.prix')}</b>${c.lien('contact', { ancre: 'demande', params: `sujet=bulle-${b.cle}`, classe: 'lien-fleche', texte: c.t('accueil.capsules.reserver') })}</p>
      </article>`)}
    </div>
    <div class="kit" data-anime>
      <div class="kit-icones" data-visuel>
        <figure><svg viewBox="0 0 64 64" aria-hidden="true" data-fx="trace"><path d="M10 44 C 10 28, 26 18, 40 22 C 50 25, 56 34, 54 44 Z"/><path d="M18 30 l-4 -6 M26 24 l-2 -8 M34 21 l1 -8 M42 23 l4 -7 M50 30 l6 -4"/><circle cx="50" cy="38" r="1.6"/><path d="M14 44 v6 M46 44 v6"/></svg><figcaption>${c.t('accueil.capsules.herisson')}</figcaption></figure>
        <figure><svg viewBox="0 0 64 64" aria-hidden="true" data-fx="trace"><path d="M8 42 C 10 30, 22 24, 32 24 C 42 24, 52 30, 54 42 Z"/><path d="M20 32 L32 26 L44 32 L40 42 H24 Z"/><path d="M54 40 c4 0 6 -3 5 -6"/><path d="M14 42 v6 M48 42 v6"/></svg><figcaption>${c.t('accueil.capsules.tortues')}</figcaption></figure>
        <figure><svg viewBox="0 0 64 64" aria-hidden="true" data-fx="trace"><path d="M32 6 L36 28 L58 32 L36 36 L32 58 L28 36 L6 32 L28 28 Z"/><path d="M44 46 l6 -6 6 6 -6 10 Z"/></svg><figcaption>${c.t('accueil.capsules.etoile')}</figcaption></figure>
      </div>
      <div>
        <p>${c.t('accueil.capsules.kit')}</p>
        <p class="a-completer">${c.t('accueil.capsules.kitPhoto')}</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="parcours" data-fil="gauche">
  <div class="conteneur duo duo--inverse">
    <div>
      <p class="surtitre">${c.t('accueil.parcours.sur')}</p>
      <h2 class="titre-section titre-regle" data-effet="titre-a-la-regle" data-axes data-fil-repere>${c.t('accueil.parcours.titre')}</h2>
      <p data-anime>${c.t('accueil.parcours.texte')}</p>
      <p class="parcours-chiffre" data-anime><strong><span data-compteur="20">20</span>${c.t('accueil.parcours.anneesPlus')}</strong><span>${c.t('accueil.parcours.annees')}</span></p>
      <p><strong>${c.t('accueil.parcours.valeurs')}</strong></p>
      <ul class="valeurs" data-anime="cascade"><li>${c.t('accueil.parcours.v1')}</li><li>${c.t('accueil.parcours.v2')}</li><li>${c.t('accueil.parcours.v3')}</li></ul>
      <p class="a-completer">${c.t('accueil.parcours.portrait')}</p>
      <p class="a-completer">${c.t('accueil.parcours.temoignages')}</p>
    </div>
    ${c.media({ nom: 'grok/accueil-parcours', alt: 'Porte d\'une maison de village entrouverte, clés dans la serrure', classe: 'media-portrait', sizes: '(max-width: 760px) 92vw, 38vw', attrs: 'data-anime="rideau"' })}
  </div>
</section>

<section class="section papier" id="pour-qui" data-fil="droite">
  <div class="conteneur">
    <p class="surtitre">${c.t('accueil.espaces.sur')}</p>
    <h2 class="titre-section titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes data-fil-repere>${c.t('accueil.espaces.titre')}</h2>
    <div class="espaces">
      ${[['e1', 'grok/geo-intention', 'Chambre calme au matin, lin et lumière douce'], ['e2', 'grok/immo-ouverture', 'Façade chaulée d\'une maison de village, porte grande ouverte'], ['e3', 'grok/fs-tarifs', 'Longue table de chêne près d\'une haute fenêtre'], ['e4', 'grok/accueil-tarifs', 'Table à dessin, calque vierge et compas en laiton']].map(([e, img, alt]) => html`<article class="espace espace--photo">${c.media({ nom: img, alt, classe: 'espace-media', ratio: '4 / 5', sizes: '(max-width: 640px) 92vw, 24vw', attrs: 'data-anime="rideau"' })}<h3>${c.t(`accueil.espaces.${e}`)}</h3><p>${c.t(`accueil.espaces.${e}p`)}</p></article>`)}
    </div>
  </div>
</section>

<section class="section nuit" id="cadre">
  <div class="conteneur cadre">
    ${c.media({ nom: 'grok/geo-vision', alt: 'Pièce vide aux murs de pierre chaulés, fenêtre ouverte sur les oliviers', classe: 'cadre-photo', sizes: '(max-width: 640px) 92vw, 34vw', attrs: 'data-fx="zoom"' })}
    <div>
      <p class="surtitre">${c.t('accueil.cadre.sur')}</p>
      <h2 class="titre-section titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes>${c.t('accueil.cadre.titre')}</h2>
      <p class="chapo" data-anime>${c.t('accueil.cadre.texte')}</p>
      ${c.lien('contact', { ancre: 'demande', classe: 'bouton', texte: c.t('accueil.cadre.action') })}
    </div>
  </div>
</section>

<section class="section" id="fin" data-fil="gauche">
  <div class="conteneur duo">
    <div>
      <h2 class="titre-grand titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes data-fil-repere>${c.t('accueil.fin.titre')}</h2>
      <p class="chapo" data-anime>${c.t('accueil.fin.texte')}</p>
      <p class="fin-actions" data-anime>
        <a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}" data-survol="magnetique">${c.t('accueil.fin.appeler')}</a>
        ${c.lien('contact', { ancre: 'demande', classe: 'bouton', texte: c.t('accueil.fin.premier'), attrs: 'data-survol="magnetique"' })}
      </p>
    </div>
    ${c.media({ nom: 'accueil-appel', alt: 'Chaise paillée près d\'un rideau de lin bordeaux, lumière douce', classe: 'media-portrait', sizes: '(max-width: 760px) 92vw, 36vw', attrs: 'data-fx="zoom"' })}
  </div>
  <span data-fil-point="0.5 1" aria-hidden="true"></span>
</section>
${objetFil()}
`;
