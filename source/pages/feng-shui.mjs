/* Feng Shui — ouverture : fond bleu nuit, la grille des neuf domaines posée sur le plan depuis la porte d'entrée,
   les cases s'allument une à une au défilement ; photo dans une arche. Section : les neuf domaines à lire case par case. */
import { html } from '../../outils/gabarit.mjs';
import { tarifs, objetFil, ORDRE_GRILLE } from '../gabarits/elements.mjs';

export const page = { cle: 'feng-shui', fichier: 'feng-shui', imagePartage: 'fs-ouverture-800.webp' };

export default (c) => {
  const par = Object.fromEntries(c.donnees.domaines.map((d) => [d.dir, d]));
  return html`
<section class="fs-ouv nuit" id="debut">
  <div>
    <p class="surtitre" data-anime="gsap">${c.t('fs.tete.sur')}</p>
    <h1 data-axes-ouv data-grille="typo" data-effet="titre-qui-s-apaise"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('fs.tete.titre')}</span></span></h1>
    <p class="chapo" data-anime="gsap">${c.t('fs.tete.texte')}</p>
    <p class="page-actions" data-anime="gsap">
      ${c.lien('contact', { ancre: 'demande', params: 'sujet=feng-shui', classe: 'bouton', texte: c.t('fs.tete.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
      <span class="info-cle" data-info-cle>${c.t('fs.tete.info')}</span>
    </p>
  </div>
  <div class="fs-scene">
    <div class="bagua" data-iris-centre data-visuel role="img" aria-label="${c.s('fs.domaines.region')}">
      ${ORDRE_GRILLE.map((d) => html`<div class="bagua-case" data-effet="bagua-porte"><span class="dir">${d === 'C' ? '' : d}</span>${par[d].nom}</div>`)}
      <span class="bagua-porte" aria-hidden="true"><span>${c.t('fs.tete.porte')}</span></span>
    </div>
    ${c.media({ nom: 'fs-ouverture', alt: 'Salon aux hautes fenêtres en arche, coussins de lin bordeaux et parquet de chêne', priorite: true, classe: 'fs-arche', sizes: '(max-width: 860px) 40vw, 20vw' })}
  </div>
</section>

<section class="section" id="adapter" data-fil="gauche">
  <div class="conteneur duo">
    <div>
      <p class="surtitre">${c.t('fs.adapter.sur')}</p>
      <h2 class="titre-section titre-regle" data-effet="titre-a-la-regle" data-axes data-fil-repere>${c.t('fs.adapter.titre')}</h2>
      <p class="chapo" data-anime>${c.t('fs.adapter.texte1')}</p>
      <p data-anime>${c.t('fs.adapter.texte2')}</p>
      <ul class="liste-plan" data-anime="cascade">${[1, 2, 3, 4].map((n) => html`<li><b>0${n}</b><span>${c.t(`fs.adapter.l${n}`)}</span></li>`)}</ul>
    </div>
    ${c.media({ nom: 'grok/fs-adapter', alt: 'Enfilade de portes ouvertes, la lumière passe d\'une pièce à l\'autre', classe: 'media-portrait', sizes: '(max-width: 760px) 92vw, 38vw', attrs: 'data-fx="parallaxe"' })}
  </div>
</section>

<section class="section papier" id="domaines" data-fil="droite">
  <div class="conteneur domaines">
    <div>
      <p class="surtitre">${c.t('fs.domaines.sur')}</p>
      <h2 class="titre-section" data-anime="lignes" data-axes data-fil-repere>${c.t('fs.domaines.titre')}</h2>
      <p class="chapo texte-doux" data-anime>${c.t('fs.domaines.texte')}</p>
      <p class="domaines-lu" aria-live="polite"><b>${par.C.nom}</b>${par.C.mots}</p>
      <p class="a-completer">${c.t('fs.domaines.source')}</p>
    </div>
    <div class="domaines-grille" role="group" aria-label="${c.s('fs.domaines.region')}" data-visuel>
      ${ORDRE_GRILLE.map((d) => html`<button type="button" class="domaine" data-effet="domaines-qui-s-allument" data-nom="${par[d].nom}" data-mots="${par[d].mots}" aria-pressed="false"><span class="dir">${d === 'C' ? '' : d}</span><b>${par[d].nom}</b><i>${par[d].mots}</i></button>`)}
    </div>
  </div>
</section>

<section class="section tarifs" id="tarifs" data-fil="gauche">
  <div class="conteneur tarifs-grille">
    ${c.media({ nom: 'grok/fs-tarifs', alt: 'Longue table de chêne près d\'une haute fenêtre, bol d\'eau en céramique', classe: 'tarifs-media', sizes: '(max-width: 860px) 92vw, 30vw', attrs: 'data-fx="parallaxe"' })}
    <div>
      <p class="surtitre">${c.t('fs.tarifs.sur')}</p>
      <h2 class="titre-section" data-anime="lignes" data-axes data-fil-repere>${c.t('fs.tarifs.titre')}</h2>
      <p class="chapo texte-doux" data-anime>${c.t('fs.tarifs.texte')}</p>
      <div class="trf" data-module="tarifs-a-rouleaux" data-grille="retour" data-effet="prix-qui-roulent" data-conseillee="${c.s('accueil.tarifs.conseillee')}" data-choisie="${c.s('accueil.tarifs.choisie')}">${tarifs(c, 'feng-shui')}</div>
    </div>
  </div>
</section>

<section class="section nuit" id="serenite">
  <div class="conteneur duo duo--inverse">
    <div>
      <p class="surtitre">${c.t('fs.serenite.sur')}</p>
      <h2 class="titre-grand" data-anime="lignes" data-axes>${c.t('fs.serenite.titre')}</h2>
      <p class="chapo" data-anime>${c.t('fs.serenite.texte')}</p>
      <p data-anime>${c.lien('contact', { ancre: 'demande', params: 'sujet=feng-shui', classe: 'bouton', texte: c.t('fs.serenite.action'), attrs: 'data-survol="magnetique"' })}</p>
    </div>
    ${c.media({ nom: 'grok/fs-serenite', alt: 'Terrasse d\'une maison de pierre à l\'heure dorée, portes vitrées ouvertes', sizes: '(max-width: 760px) 92vw, 42vw', attrs: 'data-fx="zoom"' })}
  </div>
  <span data-fil-point="0.5 1" aria-hidden="true"></span>
</section>
${objetFil()}
`;
};
