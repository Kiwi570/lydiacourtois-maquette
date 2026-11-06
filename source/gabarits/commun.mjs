/* Gabarit commun : head, en-tête, menu, pied de page, barre fixe du téléphone, voile.
   Les conventions data-* sont celles que lisent le socle JavaScript et l'audit (voir le README). */
import { html, brut } from '../../outils/gabarit.mjs';

/* Étoile à huit branches du logo : branches cardinales longues, diagonales plus courtes (viewBox -100 -100 200 200). */
export function pointsEtoile(R = 96, d = 60, r = 12) {
  const pts = [];
  for (let k = 0; k < 16; k++) {
    const a = (-90 + k * 22.5) * Math.PI / 180, ray = k % 2 ? r : (k % 4 === 0 ? R : d);
    pts.push(`${(Math.cos(a) * ray).toFixed(1)},${(Math.sin(a) * ray).toFixed(1)}`);
  }
  return pts.join(' ');
}
/* Moitiés claires des branches (relief du logo) : triangle centre, pointe, creux suivant. */
function reliefEtoile(R = 96, d = 60, r = 12) {
  const out = [];
  for (let k = 0; k < 16; k += 2) {
    const a = (-90 + k * 22.5) * Math.PI / 180, b = (-90 + (k + 1) * 22.5) * Math.PI / 180, ray = k % 4 === 0 ? R : d;
    out.push(`M0 0L${(Math.cos(a) * ray).toFixed(1)} ${(Math.sin(a) * ray).toFixed(1)}L${(Math.cos(b) * r).toFixed(1)} ${(Math.sin(b) * r).toFixed(1)}Z`);
  }
  return out.join('');
}
export const etoileSvg = (classe = '', attrs = '') => brut(`<svg class="etoile ${classe}" viewBox="-100 -100 200 200" aria-hidden="true" focusable="false"${attrs ? ' ' + attrs : ''}><polygon class="etoile-corps" points="${pointsEtoile()}"/><path class="etoile-relief" d="${reliefEtoile()}"/><circle class="etoile-coeur" r="5"/></svg>`);

const navigation = (c) => c.site.navigation.filter((cle) => c.pages[cle] && (c.pages[cle].langues || c.langues).includes(c.l));

function tete(c) {
  const p = c.page, cle = p.cle;
  const titre = c.s(`pages.${cle}.titre`), description = c.s(`pages.${cle}.description`);
  const ici = c.abs(c.url(cle));
  const imagePartage = c.abs(`/assets/partage/${p.partage === false ? 'accueil' : cle}-${c.l}.jpg`);
  const autres = c.alternatives(cle);
  const structure = c.donnees.structure ? JSON.stringify(c.donnees.structure).replace(/</g, '\\u003c') : '';
  return html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${titre}</title>
<meta name="description" content="${description}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${ici}">
${autres.length > 1 ? autres.map((a) => html`<link rel="alternate" hreflang="${a.l}" href="${c.abs(a.url)}">\n`) : ''}${autres.length > 1 ? html`<link rel="alternate" hreflang="x-default" href="${c.abs(c.alternatives(cle)[0].url)}">` : ''}
<style>${brut(c.critique.css)}</style>
<script>${brut(c.critique.js)}</script>
${(c.site.polices || []).map((f) => html`<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>\n`)}<link rel="stylesheet" href="${c.asset('css/socle.css')}">
<link rel="stylesheet" href="${c.asset('css/modules.css')}">
<link rel="stylesheet" href="${c.asset('css/site.css')}">
<link rel="modulepreload" href="${c.asset('js/site.js')}">
<link rel="modulepreload" href="${c.asset('js/socle/index.js')}">
<script src="/assets/vendor/gsap.min.js" defer></script>
<script src="/assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/vendor/SplitText.min.js" defer></script>
<script type="module" src="${c.asset('js/site.js')}"></script>
<meta name="theme-color" content="${c.site.couleurs.theme || c.site.couleurs.fond}">
<link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${c.site.nom}">
<meta property="og:locale" content="${c.l === 'fr' ? 'fr_FR' : c.l === 'en' ? 'en_GB' : c.l}">
<meta property="og:title" content="${titre}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${ici}">
<meta property="og:image" content="${imagePartage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${c.s(`pages.${p.partage === false ? 'accueil' : cle}.partageAlt`)}">
<meta name="twitter:card" content="summary_large_image">
${structure ? html`<script type="application/ld+json">${brut(structure)}</script>` : ''}
</head>`;
}

function entete(c) {
  const autreLangue = c.alternatives(c.page.cle).filter((a) => a.l !== c.l);
  return html`<header data-entete>
  <div class="entete-rangee">
    <a class="entete-logo" href="${c.url('accueil')}" aria-label="${c.s('commun.logoAlt')}" data-libelle="${c.libelle('accueil')}"${c.page.cle === 'accueil' ? brut(' aria-current="page"') : ''}>
      <img src="/assets/images/logo-480.webp" srcset="/assets/images/logo-480.webp 480w, /assets/images/logo-960.webp 960w" sizes="160px" alt="${c.s('commun.logoAlt')}" width="480" height="146">
    </a>
    <nav data-nav aria-label="${c.s('commun.navigation')}">
      <ul>${navigation(c).filter((k) => k !== 'accueil').map((k) => html`<li>${c.lien(k)}</li>`)}</ul>
    </nav>
    <div class="entete-actions">
      ${autreLangue.map((a) => html`<a class="entete-langue" href="${a.url}" hreflang="${a.l}" lang="${a.l}" data-langue="${a.l}" aria-label="${c.s('commun.langueAutre')}">${a.l}</a>`)}
      ${c.site.actionEntete ? html`<a class="bouton" href="${c.url(c.site.actionEntete.page, c.site.actionEntete.ancre || '')}" data-libelle="${c.libelle(c.site.actionEntete.page)}">${c.t('commun.actionEntete')}</a>` : ''}
      <button type="button" data-menu-bouton aria-controls="menu" aria-expanded="false" data-libelle-ouvrir="${c.s('commun.menu')}" data-libelle-fermer="${c.s('commun.fermer')}"><span data-libelle-bouton>${c.t('commun.menu')}</span></button>
    </div>
  </div>
</header>
<div id="menu" data-menu role="dialog" aria-modal="true" aria-label="${c.s('commun.menu')}">
  <ul>${navigation(c).map((k, i) => html`<li style="--i:${i}">${c.lien(k, { classe: 'menu-lien' })}</li>`)}</ul>
  <p><a class="bouton" href="tel:${c.site.contact.telephoneLien}">${c.t('commun.appeler')} ${c.site.contact.telephone}</a></p>
  ${autreLangue.map((a) => html`<p><a class="entete-langue" href="${a.url}" hreflang="${a.l}" lang="${a.l}" data-langue="${a.l}">${c.s('commun.langueAutre')}</a></p>`)}
  <p><button type="button" class="lien" data-calme-bascule data-libelle-reduire="${c.s('commun.calmeReduire')}" data-libelle-retablir="${c.s('commun.calmeRetablir')}" data-libelle-systeme="${c.s('commun.calmeSysteme')}"><span data-libelle-bouton>${c.t('commun.calmeReduire')}</span></button></p>
</div>`;
}

function pied(c) {
  const r = c.site.reseaux || {};
  return html`<footer class="pied" id="pied">
  <div class="conteneur pied-grille">
    <div class="pied-marque">
      ${etoileSvg('pied-etoile')}
      <p class="pied-nom">${c.site.nom}</p>
      <p class="pied-signature">${c.t('commun.signature')}</p>
      <p class="pied-metiers">${c.t('commun.pied')}</p>
    </div>
    <div>
      <p><strong>${c.t('contact.tete.sur')}</strong></p>
      <p>${c.t('commun.zone')}<br><a href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a><br><a class="pied-email" href="mailto:${c.site.contact.email}">${c.site.contact.email.split('@')[0]}<wbr>@${c.site.contact.email.split('@')[1]}</a></p>
      <p><strong>${c.t('commun.suivre')}</strong></p>
      <ul class="pied-reseaux">
        <li><a href="${r.facebook}" target="_blank" rel="noopener">${c.t('commun.facebook')} <span class="visuellement-cache">${c.t('commun.nouvelOnglet')}</span></a></li>
        <li><a href="${r.instagram}" target="_blank" rel="noopener">${c.t('commun.instagram')} <span class="visuellement-cache">${c.t('commun.nouvelOnglet')}</span></a></li>
      </ul>
    </div>
    <nav aria-label="${c.s('commun.sommaire')}">
      <p><strong>${c.t('commun.sommaire')}</strong></p>
      <ul>${navigation(c).map((k) => html`<li>${c.lien(k)}</li>`)}</ul>
    </nav>
    <div>
      <p><strong>${c.t('commun.confort')}</strong></p>
      <ul>
        <li><button type="button" class="lien" data-calme-bascule data-libelle-reduire="${c.s('commun.calmeReduire')}" data-libelle-retablir="${c.s('commun.calmeRetablir')}" data-libelle-systeme="${c.s('commun.calmeSysteme')}"><span data-libelle-bouton>${c.t('commun.calmeReduire')}</span></button></li>
        <li><a href="#haut" data-sans-transition>${c.t('commun.retourHaut')}</a></li>
      </ul>
    </div>
  </div>
  <div class="conteneur pied-bas">
    <p>${c.t('commun.cadreCourt')}</p>
    <p>${c.t('commun.maquette')}</p>
    <p>© 2026 ${c.site.nom} — ${c.t('commun.signature')} · <span class="pied-legal">${c.t('commun.mentions')}</span> · <span class="pied-legal">${c.t('commun.confidentialite')}</span></p>
  </div>
</footer>`;
}

function barre(c) {
  const a = c.site.actionEntete;
  return html`<div data-barre-fixe>
  <a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.t('commun.appeler')}</a>
  ${a ? html`<a class="bouton" href="${c.url(a.page, a.ancre || '')}" data-libelle="${c.libelle(a.page)}">${c.t('commun.actionEntete')}</a>` : ''}
</div>`;
}

/* Voile : sa forme (glisse, iris, vague, rideau) vient de donnees/site.json (formeVoile) ; voir assets/js/socle/voile.js. */
const FORMES_VOILE = ['glisse', 'iris', 'vague', 'rideau', 'etoile'];
function voile(c) {
  const forme = FORMES_VOILE.includes(c.site.formeVoile) ? c.site.formeVoile : 'glisse';
  const vagues = forme === 'vague'
    ? html`<svg class="voile-vague voile-vague--haut" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120 C 240 20 480 20 720 70 S 1200 130 1440 40 V 120 H 0 Z"/></svg><svg class="voile-vague voile-vague--bas" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 C 240 100 480 100 720 50 S 1200 -10 1440 80 V 0 H 0 Z"/></svg>`
    : '';
  return html`<div data-voile data-forme="${forme}" aria-hidden="true">${vagues}<div class="voile-contenu">${etoileSvg('voile-etoile')}<span data-voile-libelle>${c.libelle(c.page.cle)}</span></div></div>`;
}

export function page(c, contenu) {
  return html`<!doctype html>
<html lang="${c.l}" data-v="${c.v}"${c.site.curseur ? brut(' data-curseur') : ''}>
${tete(c)}
<body id="haut">
${voile(c)}
<div class="ouverture-panneau" data-ouverture aria-hidden="true">
  <svg class="ouverture-plan" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M150 90 H850 V510 H150 Z M150 300 H420 M420 90 V510 M620 90 V300 M620 300 H850 M520 510 V420 M300 300 V510"/><path class="ouverture-porte" d="M480 510 A60 60 0 0 1 540 450"/></svg>
  <div class="ouverture-objet" data-ouverture-objet>${etoileSvg('ouverture-etoile')}</div>
  <p class="ouverture-nom"><span class="ouverture-signature">${c.t('commun.signature')}</span>${c.site.nom}</p>
  <span class="ouverture-trait"></span>
  <p class="ouverture-ligne">${c.t('commun.introLigne')}</p>
</div>
<a class="evitement" href="#contenu">${c.t('commun.evitement')}</a>
${entete(c)}
<main id="contenu" tabindex="-1"${c.page.fil === false ? '' : brut(' data-grille="fil" data-module="fil-conducteur"')}${c.page.sansAction ? brut(' data-sans-action') : ''}${c.page.sansEffet ? brut(' data-sans-effet') : ''}>
${contenu}
</main>
${pied(c)}
${barre(c)}
</body>
</html>`;
}
