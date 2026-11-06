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
