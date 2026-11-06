/* Immobilier Autrement — ouverture scindée inversée sur fond terre cuite clair : la façade à gauche, sur laquelle
   le parcours de visite se trace de la porte au jardin ; la question en grand à droite. */
import { html } from '../../outils/gabarit.mjs';
import { tarifs, dessinTarifs, objetFil } from '../gabarits/elements.mjs';

export const page = { cle: 'immobilier-autrement', fichier: 'immobilier-autrement', imagePartage: 'grok/immo-ouverture-800.webp' };

export default (c) => html`
<section class="immo-ouv" id="debut">
  <div class="immo-photo" data-iris-centre>
    ${c.media({ nom: 'grok/immo-ouverture', alt: 'Façade chaulée d\'une maison de village, porte grande ouverte', priorite: true, sizes: '(max-width: 860px) 92vw, 40vw' })}
    <div class="porte" aria-hidden="true" data-superpose><span class="battant battant--g" data-effet="porte-qui-s-ouvre"></span><span class="battant battant--d" data-effet="porte-qui-s-ouvre"></span></div>
    <svg class="parcours-visite" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true" data-superpose>
      <path data-effet="parcours-de-visite" d="M200 470 C 200 420, 196 380, 196 340 C 196 300, 150 280, 120 250 C 90 220, 110 180, 160 170"/>
      <circle cx="200" cy="470" r="7"/><circle cx="196" cy="340" r="6"/><circle cx="160" cy="170" r="6"/>
    </svg>
    <span data-fil-point="0.02 1" data-fil-sans-perle aria-hidden="true"></span>
  </div>
  <div>
    <p class="surtitre" data-anime="gsap">${c.t('immo.tete.sur')}</p>
    <h1 data-anime="gsap">${c.t('immo.tete.titre')}</h1>
    <p class="immo-question" data-axes-ouv data-grille="typo" data-effet="titre-qui-s-apaise"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('immo.tete.question')}</span></span></p>
    <p class="page-actions" data-anime="gsap">
      ${c.lien('contact', { ancre: 'demande', params: 'sujet=immobilier', classe: 'bouton', texte: c.t('immo.tete.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
      <span class="info-cle" data-info-cle>${c.t('immo.tete.info')}</span>
    </p>
  </div>
</section>

<section class="ecran epingle visite" id="observer" data-fx="galerie" data-grille="scene" data-entete-cache data-fil-dessus>
  <div class="conteneur visite-tete">
    <p class="surtitre">${c.t('immo.visite.sur')}</p>
    <h2 class="titre-section titre-regle" data-effet="titre-a-la-regle" data-axes>${c.t('immo.visite.titre')}</h2>
    <p class="texte-doux">${c.t('immo.visite.texte')}</p>
  </div>
  <div class="piste visite-piste" data-galerie data-effet="visite-piece-par-piece" tabindex="0" role="region" aria-label="${c.s('immo.visite.region')}">
    <svg class="visite-chemin" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 20 C 120 4, 220 36, 340 20 S 560 4, 680 20 S 880 36, 1000 20"/></svg>
    ${[['grok/accueil-parcours', 'Porte d\'une maison de village entrouverte, clés dans la serrure'], ['grok/fs-adapter', 'Enfilade de portes ouvertes, la lumière passe d\'une pièce à l\'autre'], ['grok/immo-observer', 'Séjour clair et dégagé, prêt pour une visite'], ['grok/offre-immobilier', 'Trousseau de clés posé sur un rebord de fenêtre ensoleillé'], ['grok/immo-transition', 'Cartons de déménagement rangés dans une pièce vide et ensoleillée']].map(([img, alt], i) => html`<article class="piece">
      ${c.media({ nom: img, alt, classe: 'piece-media', sizes: '(max-width: 760px) 80vw, 30vw' })}
      <p class="piece-n">0${i + 1}</p>
      <h3>${c.t(`immo.observer.p${i + 1}`)}</h3>
    </article>`)}
  </div>
  <div class="galerie-progres" aria-hidden="true"><span></span></div>
  <p class="visite-indice" aria-hidden="true">${c.t('immo.visite.indice')}</p>
</section>

<section class="section papier" id="valoriser" data-fil="gauche">
  <div class="conteneur">
    <p class="surtitre">${c.t('immo.valoriser.sur')}</p>
    <h2 class="titre-section titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes data-fil-repere>${c.t('immo.valoriser.titre')}</h2>
    ${c.media({ nom: 'grok/immo-cles', alt: 'Trousseau de clés anciennes posé sur un rebord de fenêtre ensoleillé', classe: 'media-bandeau', sizes: '(max-width: 1240px) 92vw, 1200px', attrs: 'data-anime="rideau"' })}
    <div class="axes" data-anime="cascade">
      ${[1, 2, 3].map((n) => html`<div class="axe"><h3>${c.t(`immo.valoriser.a${n}`)}</h3><p${n === 2 ? html` class="a-completer"` : ''}>${c.t(`immo.valoriser.a${n}p`)}</p></div>`)}
    </div>
  </div>
</section>

<section class="section tarifs" id="tarifs" data-fil="droite">
  <div class="conteneur tarifs-grille tarifs--immobilier-autrement">
    <div class="tarifs-tete">
      <p class="surtitre">${c.t('immo.tarifs.sur')}</p>
      <h2 class="titre-section titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes data-fil-repere>${c.t('immo.tarifs.titre')}</h2>
      <div class="tarifs-bande">${c.media({ nom: 'grok/fs-serenite', alt: 'Terrasse d\'une maison de pierre à l\'heure dorée, portes vitrées ouvertes', classe: 'tarifs-photo', sizes: '(max-width: 1240px) 96vw, 1240px', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}</div>
      <div class="trf" data-module="tarifs-a-rouleaux" data-grille="retour" data-effet="prix-qui-roulent" data-conseillee="${c.s('accueil.tarifs.conseillee')}" data-choisie="${c.s('accueil.tarifs.choisie')}">${tarifs(c, 'immobilier-autrement')}</div>
      <p class="tarifs-avert">${c.t('immo.tarifs.avert')}</p>
    </div>
  </div>
</section>

<section class="section nuit" id="echange">
  <div class="conteneur cadre">
    ${c.media({ nom: 'accueil-appel', alt: 'Chaise paillée près d\'un rideau de lin bordeaux, lumière douce', classe: 'cadre-photo', sizes: '(max-width: 640px) 92vw, 34vw', attrs: 'data-fx="zoom"' })}
    <div>
      <p class="surtitre">${c.t('immo.echange.sur')}</p>
      <h2 class="titre-section titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes>${c.t('immo.echange.titre')}</h2>
      <p class="chapo" data-anime>${c.t('immo.echange.texte')}</p>
      ${c.lien('contact', { ancre: 'demande', params: 'sujet=immobilier', classe: 'bouton', texte: c.t('immo.echange.action') })}
    </div>
  </div>
</section>
${objetFil()}
`;
