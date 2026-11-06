/* Éléments partagés par les pages : plan de maison (calque), tarifs à rouleaux, appel final. */
import { html, brut } from '../../outils/gabarit.mjs';
import { pointsEtoile } from './commun.mjs';

/* Ordre des zones sur le plan (sud en haut, comme sur le visuel de Lydia) : SE S SO / E C O / NE N NO. */
export const ORDRE_GRILLE = ['SE', 'S', 'SO', 'E', 'C', 'O', 'NE', 'N', 'NO'];

/* Plan de maison illustratif (viewBox 0 0 400 400), grille des neuf zones en pointillés. */
export const planMaison = (classe = '') => brut(`<svg class="plan ${classe}" viewBox="0 0 400 400" aria-hidden="true" focusable="false"${classe === 'plan-ouverture' ? ' data-effet="plan-qui-s-oriente"' : ''}>
  ${ORDRE_GRILLE.map((d, i) => `<rect class="zone" data-zone="${d}" x="${30 + (i % 3) * 113.3}" y="${30 + Math.floor(i / 3) * 113.3}" width="113.3" height="113.3"/>`).join('')}
  <path class="mur" d="M178 370 H30 V30 H370 V370 H232"/>
  <path class="cloison" d="M30 190 H150 M150 120 V280 M150 280 H30 M250 30 V150 M250 150 H370 M250 230 H370 M250 230 V300 M290 370 V300 H250"/>
  <path class="porte" d="M178 370 A54 54 0 0 1 232 316 M150 205 A28 28 0 0 1 178 233 M250 172 A26 26 0 0 0 276 150"/>
  <path class="grille" d="M143.3 30 V370 M256.6 30 V370 M30 143.3 H370 M30 256.6 H370"/>
  <path class="cote" d="M30 388 H370 M30 383 V393 M370 383 V393 M388 30 V370 M383 30 H393 M383 370 H393"/>
</svg>`);

/* Boussole : étoile du logo dans un anneau gradué, lettres des huit directions attachées aux branches. */
export function boussole() {
  /* Sud en haut, comme sur le visuel de Lydia : chaque lettre est au-dessus de sa zone du plan. */
  const dirs = ['S', 'SO', 'O', 'NO', 'N', 'NE', 'E', 'SE'];
  const grad = Array.from({ length: 72 }, (_, i) => {
    const a = (i * 5 - 90) * Math.PI / 180, r1 = i % 9 === 0 ? 82 : 88;
    return `<line class="graduation" x1="${(Math.cos(a) * r1).toFixed(1)}" y1="${(Math.sin(a) * r1).toFixed(1)}" x2="${(Math.cos(a) * 94).toFixed(1)}" y2="${(Math.sin(a) * 94).toFixed(1)}"/>`;
  }).join('');
  const lettres = dirs.map((d, i) => {
    const a = (i * 45 - 90) * Math.PI / 180;
    return `<text class="lettre" data-audit-ignorer data-dir="${d}" x="${(Math.cos(a) * 72).toFixed(1)}" y="${(Math.sin(a) * 72).toFixed(1)}" transform="rotate(${i * 45} ${(Math.cos(a) * 72).toFixed(1)} ${(Math.sin(a) * 72).toFixed(1)})">${d}</text>`;
  }).join('');
  return brut(`<svg viewBox="-100 -100 200 200" aria-hidden="true" focusable="false" data-effet="boussole-etoile">
  <circle class="anneau" r="96"/>${grad}${lettres}
  <g transform="scale(.6)"><polygon class="etoile-corps" points="${pointsEtoile()}"/><circle class="etoile-coeur" r="6"/></g>
</svg>`);
}

/* Tarifs à rouleaux (module de la bibliothèque) à partir de donnees/tarifs.json. */
export function tarifs(c, cle, { titreId, ancre = 'demande' } = {}) {
  return html`<ul class="trf__grille">
    ${c.donnees.tarifs[cle].map((f) => html`<li class="trf__formule" data-formule="${f.nom}"${f.conseillee ? brut(' data-conseillee') : ''}>
      <p class="trf__sur">${f.sur}</p>
      <h3 class="trf__nom">${f.nom}</h3>
      <p class="trf__prix" data-prix>${f.prix ? html`<span class="trf__montant">${f.prix}</span> <span class="trf__unite">${f.unite}</span>` : html`<span class="trf__montant trf__montant--texte">${f.unite}</span>`}</p>
      <p class="trf__note">${f.note}</p>
      <ul class="trf__inclus">${f.inclus.map((x) => html`<li>${x}</li>`)}</ul>
      ${c.lien('contact', { ancre, params: `sujet=${f.sujet}`, classe: 'bouton bouton--contour trf__choisir', texte: c.t('accueil.tarifs.choisir') })}
    </li>`)}
  </ul>`;
}

/* Étoile du fil conducteur. */
export const objetFil = () => brut(`<template data-fil-objet><polygon points="${pointsEtoile(11, 7, 2)}"/></template>`);

/* Dessins des sections de tarifs : un par page (tracés au défilement), à la place des photos de remplissage. */
export const DESSINS = {
  accueil: '<circle cx="100" cy="100" r="86"/><circle cx="100" cy="100" r="62" stroke-dasharray="3 6"/><path class="or" d="M100 18 L108 92 L182 100 L108 108 L100 182 L92 108 L18 100 L92 92 Z"/><path d="M100 4 V16 M100 184 V196 M4 100 H16 M184 100 H196"/>',
  geobiologie: '<path d="M30 20 H170"/><path d="M100 20 V150"/><path class="or" d="M88 150 L100 180 L112 150 Z"/><path d="M20 190 H180" stroke-dasharray="4 6"/><path d="M40 60 H70 M130 90 H160 M40 120 H70" stroke-dasharray="2 5"/>',
  'feng-shui': '<rect x="20" y="20" width="160" height="160"/><path d="M73 20 V180 M127 20 V180 M20 73 H180 M20 127 H180" stroke-dasharray="4 5"/><path class="or" d="M100 82 L104 96 L118 100 L104 104 L100 118 L96 104 L82 100 L96 96 Z"/><path d="M84 180 A16 16 0 0 1 116 180"/>',
  'immobilier-autrement': '<circle cx="62" cy="100" r="34"/><circle cx="62" cy="100" r="12"/><path d="M96 100 H184 M150 100 V124 M170 100 V118"/><path class="or" d="M40 40 l5 14 14 5 -14 5 -5 14 -5 -14 -14 -5 14 -5 Z"/>',
};
export const dessinTarifs = (cle) => brut(`<svg class="tarifs-dessin" viewBox="0 0 200 200" aria-hidden="true" data-fx="trace" data-visuel>${DESSINS[cle]}</svg>`);
