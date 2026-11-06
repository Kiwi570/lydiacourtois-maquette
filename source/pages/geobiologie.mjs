/* Géobiologie — ouverture : fond chaux, très grand titre centré, bandeau photo recouvert de la coupe du lieu
   (murs et sols tracés) qui s'efface au défilement. Scène épinglée : la coupe se lit en trois temps. */
import { html } from '../../outils/gabarit.mjs';
import { tarifs, dessinTarifs, objetFil } from '../gabarits/elements.mjs';

export const page = { cle: 'geobiologie', fichier: 'geobiologie', imagePartage: 'geo-ouverture-1024.webp' };

export default (c) => html`
<section class="geo-ouv" id="debut">
  <p class="surtitre" data-anime="gsap">${c.t('geo.tete.sur')}</p>
  <h1 data-axes-ouv data-grille="typo" data-effet="titre-qui-s-apaise"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('geo.tete.titre')}</span></span></h1>
  <p class="chapo" data-anime="gsap">${c.t('geo.tete.texte')}</p>
  <p class="page-actions" data-anime="gsap">
    ${c.lien('contact', { ancre: 'demande', params: 'sujet=geobiologie', classe: 'bouton', texte: c.t('geo.tete.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
    <span class="info-cle" data-info-cle>${c.t('geo.tete.info')}</span>
  </p>
  <div class="geo-bandeau" data-iris-centre>
    ${c.media({ nom: 'geo-ouverture', alt: 'Salon aux murs sable, parquet en chevrons et olivier en pot', priorite: true, sizes: '(max-width: 1240px) 96vw, 1240px' })}
    <svg class="coupe" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true" data-effet="coupe-du-lieu" data-superpose>
      <rect class="coupe-voile" x="0" y="420" width="1000" height="80"/>
      <path class="trait-coupe" data-trace-ouv d="M60 420 H940 M60 420 V90 M940 420 V90 M60 90 L500 20 L940 90"/>
      <path class="trait-coupe" data-trace-ouv d="M380 420 V150 M620 420 V200 M380 250 H620"/>
      <path class="hachure" data-trace-ouv d="M0 440 H1000 M0 462 H1000 M0 484 H1000 M40 440 l-20 22 M140 440 l-20 22 M240 440 l-20 22 M340 440 l-20 22 M440 440 l-20 22 M540 440 l-20 22 M640 440 l-20 22 M740 440 l-20 22 M840 440 l-20 22 M940 440 l-20 22"/>
    </svg>
    <span class="coupe-etiquette" style="left:12%;top:40%">${c.t('geo.tete.murs')}</span>
    <span class="coupe-etiquette" style="left:30%;top:91%">${c.t('geo.tete.sols')}</span>
    <span class="coupe-etiquette" style="left:62%;top:58%">${c.t('geo.tete.pieces')}</span>
    <span data-fil-point="0.02 1" data-fil-sans-perle aria-hidden="true"></span>
  </div>
</section>

<section class="section" id="vision" data-fil="gauche">
  <div class="conteneur duo">
    <div>
      <p class="surtitre">${c.t('geo.vision.sur')}</p>
      <h2 class="titre-section titre-regle" data-effet="titre-a-la-regle" data-axes data-fil-repere>${c.t('geo.vision.titre')}</h2>
      <p class="chapo" data-anime>${c.t('geo.vision.texte')}</p>
      <ul class="liste-plan" data-anime="cascade">${[1, 2, 3, 4].map((n) => html`<li><b>0${n}</b><span>${c.t(`geo.vision.l${n}`)}</span></li>`)}</ul>
    </div>
    ${c.media({ nom: 'grok/geo-vision', alt: 'Pièce vide aux murs de pierre chaulés, fenêtre ouverte sur les oliviers', classe: 'media-portrait', sizes: '(max-width: 760px) 92vw, 38vw', attrs: 'data-anime="rideau"' })}
  </div>
</section>

<section class="memoire" id="memoire" data-entete-cache>
  <div class="memoire-scene" data-effet="lumiere-rasante" data-souris role="img" aria-label="${c.s('geo.memoire.region')}">
    ${c.media({ nom: 'grok/geo-tarifs', alt: '', classe: 'memoire-photo', sizes: '100vw' })}
    <div class="memoire-ombre" aria-hidden="true"></div>
    <span class="memoire-mot" data-x="28" data-y="34" style="left:28%;top:34%" aria-hidden="true">${c.t('geo.memoire.murs')}</span>
    <span class="memoire-mot" data-x="70" data-y="80" style="left:70%;top:80%" aria-hidden="true">${c.t('geo.memoire.sols')}</span>
    <span class="memoire-mot" data-x="45" data-y="66" style="left:45%;top:66%" aria-hidden="true">${c.t('geo.memoire.traces')}</span>
    <span class="memoire-mot" data-x="76" data-y="20" style="left:76%;top:20%" aria-hidden="true">${c.t('geo.memoire.seuil')}</span>
  </div>
  <div class="conteneur memoire-texte">
    <p class="surtitre">${c.t('geo.memoire.sur')}</p>
    <h2 class="titre-grand titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes>${c.t('geo.memoire.titre')}</h2>
    <p class="chapo">${c.t('geo.memoire.texte')}</p>
    <p class="memoire-indice"><span class="souris">${c.t('geo.memoire.indice')}</span><span class="doigt">${c.t('geo.memoire.indiceTactile')}</span></p>
  </div>
</section>

<section class="see" id="deroulement" data-module="schema-epingle-etapes" data-epingle data-entete-cache data-grille="scene" data-effet="lecture-de-la-coupe" aria-labelledby="t-deroulement">
  <div class="see__scene">
    <div class="see__grille socle-cadre conteneur">
      <div class="see__texte" data-tient="texte">
        <p class="surtitre see__surtitre">${c.t('geo.deroulement.sur')}</p>
        <h2 class="see__titre" id="t-deroulement" data-axes>${c.t('geo.deroulement.titre')}</h2>
        <ol class="see__etapes">
          ${[1, 2, 3].map((n) => html`<li class="see__etape"><p class="see__n">${c.t(`geo.deroulement.e${n}n`)}</p><h3>${c.t(`geo.deroulement.e${n}t`)}</h3><p>${c.t(`geo.deroulement.e${n}p`)}</p></li>`)}
        </ol>
      </div>
      <figure class="see__schema" data-tient="schéma">
        <div class="see__plan">
          <svg class="see__svg" viewBox="0 0 400 300" aria-hidden="true">
            <rect class="see__fond" width="400" height="300"/>
            <rect class="sol" x="0" y="232" width="400" height="22"/><rect class="sol sol--2" x="0" y="254" width="400" height="22"/><rect class="sol sol--3" x="0" y="276" width="400" height="24"/>
            <path class="mur-plan" d="M50 232 V90 L200 40 L350 90 V232 Z"/>
            <path class="cloison-plan" d="M170 232 V110 M250 232 V130 M170 160 H250"/>
            <g data-see-partie="1" data-see-des="1"><path class="see__trait" d="M70 240 H330"/><path class="see__flux" d="M70 240 H330"/><circle class="ressenti-c" cx="110" cy="190" r="26"/><circle class="ressenti-c" cx="300" cy="200" r="22"/></g>
            <g data-see-partie="2" data-see-des="2"><circle class="ressenti" cx="110" cy="190" r="26"/><circle class="ressenti" cx="300" cy="200" r="22"/><path class="see__pointe" d="M110 150 v-22 M300 160 v-22"/></g>
            <g data-see-partie="3" data-see-des="3"><rect x="232" y="44" width="110" height="34" rx="3" fill="var(--papier)" stroke="var(--encre)"/><path class="coche" d="M244 61 l7 7 12 -14"/><path d="M270 56 h58 M270 66 h40" stroke="var(--encre)" stroke-width="2"/></g>
          </svg>
          <span class="see__etiquette" data-see-partie="1" style="--x: 50%; --y: 80%">${c.t('geo.deroulement.l1')}</span>
          <span class="see__etiquette" data-see-partie="2" style="--x: 28%; --y: 50%">${c.t('geo.deroulement.l2')}</span>
          <span class="see__etiquette" data-see-partie="3" style="--x: 72%; --y: 34%">${c.t('geo.deroulement.l3')}</span>
        </div>
        <figcaption class="socle-sr">${c.t('geo.deroulement.legende')}</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="section papier tarifs" id="tarifs" data-fil="droite">
  <div class="conteneur tarifs-grille tarifs--geobiologie">
    <div class="tarifs-tete">
      <p class="surtitre">${c.t('geo.tarifs.sur')}</p>
      <h2 class="titre-section titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes data-fil-repere>${c.t('geo.tarifs.titre')}</h2>
      <p class="chapo texte-doux" data-anime>${c.t('geo.tarifs.texte')}</p>
      <div class="tarifs-bande">${c.media({ nom: 'grok/page-404', alt: 'Porte ouverte sur une petite pièce chaulée inondée de soleil', classe: 'tarifs-photo', sizes: '(max-width: 1240px) 96vw, 1240px', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}</div>
      <div class="trf" data-module="tarifs-a-rouleaux" data-grille="retour" data-effet="prix-qui-roulent" data-conseillee="${c.s('accueil.tarifs.conseillee')}" data-choisie="${c.s('accueil.tarifs.choisie')}">${tarifs(c, 'geobiologie')}</div>
    </div>
  </div>
</section>

<section class="section" id="intention" data-fil="gauche">
  <div class="conteneur duo duo--inverse">
    <div>
      <p class="surtitre">${c.t('geo.intention.sur')}</p>
      <h2 class="titre-grand titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes data-fil-repere>${c.t('geo.intention.titre')}</h2>
      <p class="chapo" data-anime>${c.t('geo.intention.texte')}</p>
      <p data-anime>${c.lien('contact', { ancre: 'demande', params: 'sujet=geobiologie', classe: 'bouton', texte: c.t('geo.intention.action'), attrs: 'data-survol="magnetique"' })}</p>
    </div>
    ${c.media({ nom: 'grok/geo-intention', alt: 'Chambre calme au matin, lin et lumière douce', classe: 'media-portrait', sizes: '(max-width: 760px) 92vw, 36vw', attrs: 'data-fx="zoom"' })}
  </div>
  <span data-fil-point="0.5 1" aria-hidden="true"></span>
</section>
${objetFil()}
`;
