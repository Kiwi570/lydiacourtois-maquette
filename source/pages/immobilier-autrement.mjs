/* Immobilier Autrement — ouverture scindée inversée sur fond terre cuite clair : la façade à gauche, sur laquelle
   le parcours de visite se trace de la porte au jardin ; la question en grand à droite. */
import { html } from '../../outils/gabarit.mjs';
import { tarifs, objetFil } from '../gabarits/elements.mjs';

export const page = { cle: 'immobilier-autrement', fichier: 'immobilier-autrement', imagePartage: 'grok/immo-ouverture-800.webp' };

export default (c) => html`
<section class="immo-ouv" id="debut">
  <div class="immo-photo" data-iris-centre>
    ${c.media({ nom: 'grok/immo-ouverture', alt: 'Façade chaulée d\'une maison de village, porte grande ouverte', priorite: true, sizes: '(max-width: 860px) 92vw, 40vw' })}
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

<section class="section" id="observer" data-fil="gauche">
  <div class="conteneur duo">
    <div>
      <p class="surtitre">${c.t('immo.observer.sur')}</p>
      <h2 class="titre-section titre-regle" data-effet="titre-a-la-regle" data-axes data-fil-repere>${c.t('immo.observer.titre')}</h2>
      <p class="chapo" data-anime>${c.t('immo.observer.texte')}</p>
      <ol class="points" data-anime="cascade">${[1, 2, 3, 4, 5].map((n) => html`<li>${c.t(`immo.observer.p${n}`)}</li>`)}</ol>
    </div>
    ${c.media({ nom: 'grok/immo-observer', alt: 'Séjour clair et dégagé, prêt pour une visite', classe: 'media-portrait', sizes: '(max-width: 760px) 92vw, 38vw', attrs: 'data-fx="parallaxe"' })}
  </div>
</section>

<section class="section papier" id="valoriser" data-fil="droite">
  <div class="conteneur">
    <p class="surtitre">${c.t('immo.valoriser.sur')}</p>
    <h2 class="titre-section" data-anime="lignes" data-axes data-fil-repere>${c.t('immo.valoriser.titre')}</h2>
    ${c.media({ nom: 'grok/immo-cles', alt: 'Trousseau de clés anciennes posé sur un rebord de fenêtre ensoleillé', classe: 'media-bandeau', sizes: '(max-width: 1240px) 92vw, 1200px', attrs: 'data-anime="rideau"' })}
    <div class="axes" data-anime="cascade">
      ${[1, 2, 3].map((n) => html`<div class="axe"><h3>${c.t(`immo.valoriser.a${n}`)}</h3><p${n === 2 ? html` class="a-completer"` : ''}>${c.t(`immo.valoriser.a${n}p`)}</p></div>`)}
    </div>
  </div>
</section>

<section class="section tarifs" id="tarifs" data-fil="gauche">
  <div class="conteneur tarifs-grille">
    ${c.media({ nom: 'grok/immo-transition', alt: 'Cartons de déménagement rangés dans une pièce vide et ensoleillée', classe: 'tarifs-media', sizes: '(max-width: 860px) 92vw, 30vw', attrs: 'data-fx="parallaxe"' })}
    <div>
      <p class="surtitre">${c.t('immo.tarifs.sur')}</p>
      <h2 class="titre-section" data-anime="lignes" data-axes data-fil-repere>${c.t('immo.tarifs.titre')}</h2>
      <div class="trf" data-module="tarifs-a-rouleaux" data-grille="retour" data-effet="prix-qui-roulent" data-conseillee="${c.s('accueil.tarifs.conseillee')}" data-choisie="${c.s('accueil.tarifs.choisie')}">${tarifs(c, 'immobilier-autrement')}</div>
      <p class="tarifs-avert">${c.t('immo.tarifs.avert')}</p>
    </div>
  </div>
</section>

<section class="section nuit" id="echange">
  <div class="conteneur cadre">
    <svg class="cadre-dessin" viewBox="0 0 200 200" aria-hidden="true" data-fx="trace" data-visuel><path d="M30 180 V80 L100 24 L170 80 V180 Z"/><path d="M80 180 V122 H120 V180"/><path class="or" d="M150 22 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3 Z"/><circle cx="114" cy="152" r="3"/></svg>
    <div>
      <p class="surtitre">${c.t('immo.echange.sur')}</p>
      <h2 class="titre-section" data-anime="lignes" data-axes>${c.t('immo.echange.titre')}</h2>
      <p class="chapo" data-anime>${c.t('immo.echange.texte')}</p>
      ${c.lien('contact', { ancre: 'demande', params: 'sujet=immobilier', classe: 'bouton', texte: c.t('immo.echange.action') })}
    </div>
  </div>
</section>
${objetFil()}
`;
