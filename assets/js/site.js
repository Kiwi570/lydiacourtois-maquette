/* Ma Bonne Étoile — effets propres au client (direction « Le plan et l'étoile »).
   Le socle gère l'ouverture, le voile en étoile, l'en-tête, le menu, le mode calme, les boucles et la bibliothèque d'effets.
   Modules de la bibliothèque (assets/js/modules/, branchés sur ce socle par pont.js) : objet-a-faire-tourner (boussole),
   fil-conducteur (ligne de circulation), axes-au-defilement (Fraunces qui s'apaise), tarifs-a-rouleaux,
   schema-epingle-etapes (lecture du lieu, coupe), formulaire-par-etapes (demande).
   Chaque effet propre porte data-effet="nom-du-plan". */
import { demarrer, etat, versObjet, quand, partir } from './socle/index.js?v=2';

const gsap = window.gsap;
const ST = () => window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const calme = () => etat.calme;
const AXES_DE = '"SOFT" 0, "WONK" 1', AXES_A = '"SOFT" 100, "WONK" 0';
import * as mTourner from './modules/objet-a-faire-tourner/module.js?v=2';
import * as mFil from './modules/fil-conducteur/module.js?v=2';
import * as mAxes from './modules/axes-au-defilement/module.js?v=2';
import * as mTarifs from './modules/tarifs-a-rouleaux/module.js?v=2';
import * as mScene from './modules/schema-epingle-etapes/module.js?v=2';
import * as mFormulaire from './modules/formulaire-par-etapes/module.js?v=2';
import * as mPile from './modules/temoignages-en-pile/module.js?v=2';
/* Modules chargés avec la page (et non à la demande) : les scènes épinglées existent avant que le socle
   place la page sur une ancre, sinon la position est mesurée sans leur hauteur. */
const MODULES = { 'objet-a-faire-tourner': mTourner, 'fil-conducteur': mFil, 'axes-au-defilement': mAxes, 'tarifs-a-rouleaux': mTarifs,
  'schema-epingle-etapes': mScene, 'formulaire-par-etapes': mFormulaire, 'temoignages-en-pile': mPile };
const module = async (nom) => MODULES[nom];

/* ---------- Boussole des neuf domaines (accueil) : l'étoile qu'on fait tourner éclaire une zone du plan ---------- */
async function boussole() {
  const racine = $('.boussole');
  if (!racine) return;
  const DIRS = ['S', 'SO', 'O', 'NO', 'N', 'NE', 'E', 'SE'];
  const scene = racine.closest('.ouv-scene');
  const domaines = JSON.parse(racine.closest('.ouv-scene').dataset.domaines || '[]');
  const nom = $('[data-domaine-nom]'), mots = $('[data-domaine-mots]');
  const zones = $$('.plan-ouverture .zone'), lettres = $$('.lettre', racine);
  let courant = '';
  const eclairer = (dir) => {
    if (dir === courant) return;
    courant = dir;
    zones.forEach((z) => z.classList.toggle('est-eclairee', z.dataset.zone === dir));
    lettres.forEach((l) => l.classList.toggle('est-active', l.dataset.dir === dir));
    const d = domaines.find((x) => x.dir === dir);
    if (d && nom) { nom.textContent = d.nom; mots.textContent = d.mots; }
  };
  /* La lettre en haut (sous le repère) donne la direction ; au repos, rien ne tourne en mode calme : le centre. */
  const { init } = await module('objet-a-faire-tourner');
  await init(racine, {
    repos: 0.16, defilement: 0.0025, lumiere: 'aucune', elanMax: 22,
    dessiner: (e) => {
      /* Le plan pivote avec l'étoile : chaque lettre reste au-dessus de sa zone. */
      scene.style.setProperty('--plan-angle', `${(e.angle * 180 / Math.PI).toFixed(2)}deg`);
      if (calme()) { eclairer('C'); return; }
      const k = ((Math.round(-e.angle / (Math.PI / 4)) % 8) + 8) % 8;
      eclairer(DIRS[k]);
    },
  });
  if (calme()) eclairer('C');
  /* Un toucher bref au centre de l'étoile éclaire le neuvième domaine, le centre. */
  let t0 = 0, x0 = 0, y0 = 0;
  racine.addEventListener('pointerdown', (ev) => { t0 = performance.now(); x0 = ev.clientX; y0 = ev.clientY; });
  racine.addEventListener('pointerup', (ev) => {
    const r = racine.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if (performance.now() - t0 < 250 && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 6 && Math.hypot(ev.clientX - cx, ev.clientY - cy) < r.width * 0.16) {
      courant = ''; eclairer('C');
    }
  });
}

/* ---------- Calque qui glisse (accueil) : au défilement, le calque du plan glisse et dévoile la photo ---------- */
function calqueQuiGlisse() {
  const calque = $('.ouv-calque');
  if (!calque || calme() || !gsap || !ST()) return;
  gsap.fromTo(calque, { xPercent: 0, rotation: 0 }, { xPercent: -16, rotation: -2.5, ease: 'none', scrollTrigger: { trigger: '.ouv', start: 'top top', end: 'bottom top', scrub: 0.6 } });
}

/* ---------- Calques à feuilleter (accueil) : on attrape le calque du dessus et on le lance, il se glisse sous la pile
   (module temoignages-en-pile) ; au défilement, la pile se redresse comme une liasse posée sur la table. ---------- */
async function calques() {
  const racine = $('.calques-pile');
  if (!racine) return;
  const { init } = await module('temoignages-en-pile');
  const nom = racine.dataset.feuilleter || 'Calque';
  await init(racine, { textes: { precedent: `${nom} précédent`, suivant: `${nom} suivant`, compte: (i, n) => `${i} / ${n}` } });
  if (calme() || !gsap || !ST()) return;
  gsap.fromTo('.calques', { y: 48 }, { y: 0, ease: 'none', scrollTrigger: { trigger: racine, start: 'top bottom', end: 'top 30%', scrub: 0.6 } });
}

/* ---------- Lumière du matin (accueil) : un rai de soleil traverse le calque et suit la souris, sans dériver ---------- */
function lumiere() {
  const rai = $('.rai'), scene = $('.ouv-scene');
  if (!rai || !scene || calme()) return;
  let cible = 0.35, x = 0.35, actif = false, raf = 0;
  const pas = () => { x += (cible - x) * 0.12; rai.style.setProperty('--rai', x.toFixed(4)); if (Math.abs(cible - x) > 0.0005) raf = requestAnimationFrame(pas); else { x = cible; rai.style.setProperty('--rai', x.toFixed(4)); raf = 0; } };
  const lancer = () => { if (!raf) raf = requestAnimationFrame(pas); };
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    scene.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const r = scene.getBoundingClientRect(); cible = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); actif = true; lancer(); });
    scene.addEventListener('pointerleave', () => { cible = 0.35; lancer(); });
  }
  /* Au doigt et sans souris : le rai avance avec le défilement, comme le soleil dans la journée. */
  if (gsap && ST()) ST().create({ trigger: '.ouv', start: 'top top', end: 'bottom top', onUpdate: (st) => { if (!actif) { cible = 0.35 + st.progress * 0.5; lancer(); } } });
}

/* ---------- Bulles qui flottent (Capsules) ---------- */
function bulles() {
  if (calme() || !gsap || !ST()) return;
  $$('[data-flotte]').forEach((b) => {
    const i = +b.dataset.flotte, amp = [12, -9, 14, -10][i % 4];
    gsap.fromTo(b, { y: amp, rotation: i % 2 ? 1.2 : -1.2 }, { y: -amp * 0.6, rotation: 0, ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
  });
}

/* ---------- Titre tracé à la règle : la règle passe, le titre et sa cote apparaissent ---------- */
function titresRegle() {
  const titres = $$('.titre-regle');
  if (!titres.length) return;
  if (calme() || !gsap || !('IntersectionObserver' in window)) { titres.forEach((t) => t.classList.add('est-trace')); return; }
  titres.forEach((t) => t.style.setProperty('--regle', '0%'));
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const t = e.target;
    t.classList.add('en-trace');
    gsap.fromTo(t, { '--regle': '0%' }, { '--regle': '100%', duration: 1.5, ease: 'power2.inOut', onComplete: () => { t.classList.remove('en-trace'); t.classList.add('est-trace'); } });
  }), { rootMargin: '0px 0px -18% 0px' });
  titres.forEach((t) => io.observe(t));
}

/* ---------- Titres en lettres-étoiles : chaque lettre arrive de loin en tournant et se pose à sa place ---------- */
function titresEtoiles() {
  const titres = $$('.titre-etoiles');
  if (!titres.length) return;
  const montrer = (t) => t.classList.add('vu');
  if (calme() || !gsap || !window.SplitText || !('IntersectionObserver' in window) || etat.arrivee === 'retour') { titres.forEach(montrer); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const t = e.target;
    const split = new window.SplitText(t, { type: 'words,chars', charsClass: 'lettre-etoile' });
    t.setAttribute('data-superpose', ''); /* lettres en vol : chevauchement voulu, le temps de l'animation */
    montrer(t);
    gsap.fromTo(split.chars,
      { opacity: 0, scale: 0.2, rotation: () => gsap.utils.random(-140, 140), x: () => gsap.utils.random(-60, 60), y: () => gsap.utils.random(-50, 30), color: '#c69a3e' },
      { opacity: 1, scale: 1, rotation: 0, x: 0, y: 0, color: '', duration: 0.75, ease: 'back.out(1.6)', stagger: { each: 0.012, from: 'random' },
        onComplete: () => { split.revert(); t.removeAttribute('data-superpose'); } });
  }), { rootMargin: '0px 0px -12% 0px' });
  titres.forEach((t) => io.observe(t));
}

/* ---------- Mémoire des murs (Géobiologie) : une lumière rasante qu'on promène sur le mur révèle ses mots ---------- */
function memoire() {
  const scene = $('.memoire-scene');
  if (!scene || calme()) return;
  const mots = $$('.memoire-mot', scene).map((m) => ({ el: m, x: +m.dataset.x, y: +m.dataset.y }));
  let cx = 30, cy = 40, tx = 30, ty = 40, raf = 0, souris = false;
  const poser = () => {
    scene.style.setProperty('--mx', `${cx.toFixed(2)}%`); scene.style.setProperty('--my', `${cy.toFixed(2)}%`);
    mots.forEach((m) => m.el.classList.toggle('est-eclaire', Math.hypot((m.x - cx) * 1.6, m.y - cy) < 22));
  };
  const pas = () => {
    cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
    poser();
    if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05) raf = requestAnimationFrame(pas); else { cx = tx; cy = ty; poser(); raf = 0; }
  };
  const viser = (x, y) => { tx = x; ty = y; if (!raf) raf = requestAnimationFrame(pas); };
  let boite = null;
  const mesurer = () => { boite = scene.getBoundingClientRect(); };
  scene.addEventListener('pointerenter', mesurer);
  scene.addEventListener('pointermove', (e) => {
    if (!boite) mesurer();
    souris = e.pointerType === 'mouse' || souris;
    viser(((e.clientX - boite.left) / boite.width) * 100, ((e.clientY - boite.top) / boite.height) * 100);
  });
  addEventListener('scroll', () => { boite = null; }, { passive: true });
  /* Sans souris : la lumière traverse le mur au défilement, comme le soleil dans la journée. */
  if (ST()) ST().create({ trigger: scene, start: 'top bottom', end: 'bottom top', onUpdate: (st) => { if (!souris) viser(12 + st.progress * 76, 28 + Math.sin(st.progress * Math.PI) * 44); } });
  poser();
}

/* ---------- Roue des cinq éléments (Feng Shui) : elle tourne au défilement, l'élément en haut s'allume ---------- */
function roue() {
  const svg = $('.roue-svg');
  if (!svg) return;
  const noeuds = $$('.roue-noeud', svg), lu = $('[data-element-lu]');
  const allumer = (i) => { noeuds.forEach((n, k) => n.classList.toggle('est-actif', k === i)); if (lu) lu.textContent = noeuds[i].dataset.nom; };
  if (calme() || !gsap || !ST()) { allumer(0); return; }
  let dernier = -1;
  gsap.fromTo(svg, { rotation: 0, transformOrigin: '50% 50%' }, { rotation: -288, ease: 'none', scrollTrigger: { trigger: '.elements', start: 'top 80%', end: 'bottom 20%', scrub: 0.6,
    onUpdate: (st) => { const i = Math.min(4, Math.floor(st.progress * 5 * 0.999)); if (i !== dernier) { dernier = i; allumer(i); } } } });
  /* Les noms restent droits pendant que la roue tourne. */
  gsap.fromTo($$('.roue-nom', svg), { rotation: 0, transformOrigin: '50% 50%' }, { rotation: 288, ease: 'none', scrollTrigger: { trigger: '.elements', start: 'top 80%', end: 'bottom 20%', scrub: 0.6 } });
  allumer(0);
}

/* ---------- Grille des neuf domaines épinglée (Feng Shui) : elle s'allume en spirale, de la porte au centre ---------- */
function domainesEpingles() {
  const section = $('.domaines-section');
  if (!section || calme() || !gsap || !ST()) return;
  const items = $$('.domaine', section);
  const ordre = [7, 6, 3, 0, 1, 2, 5, 8, 4];
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (min-height: 640px)', () => {
    let dernier = -1;
    ST().create({ trigger: section, start: 'top top', end: '+=160%', pin: true, onUpdate: (st) => {
      const k = Math.min(8, Math.floor(st.progress * 9 * 0.999));
      if (k !== dernier) { dernier = k; items[ordre[k]].click(); }
    } });
  });
}

/* ---------- Porte qui s'ouvre (Immobilier Autrement) ---------- */
function ouvrirPorte() {
  const porte = $('.porte');
  if (!porte) return;
  if (calme() || !gsap) { porte.classList.add('est-ouverte'); return; }
  gsap.fromTo('.battant--g', { rotationY: 0 }, { rotationY: -112, duration: 1.4, ease: 'power3.inOut' });
  gsap.fromTo('.battant--d', { rotationY: 0 }, { rotationY: 112, duration: 1.4, ease: 'power3.inOut', onComplete: () => porte.classList.add('est-ouverte') });
}

/* ---------- Contact : l'étoile file du numéro vers les Pyrénées-Orientales ; l'aube se lève sur le panorama ---------- */
function etoileVersDepartement() {
  const e = $('.etoile-vol'), carte = $('.carte svg'), num = $('.numero');
  if (!e || !carte || !num || calme() || !gsap) return;
  const c = carte.getBoundingClientRect(), n = num.getBoundingClientRect(), f = e.parentElement.getBoundingClientRect();
  const vb = carte.viewBox.baseVal, k = c.width / vb.width;
  const x1 = c.left - f.left + 207 * k - 17, y1 = c.top - f.top + 337 * k - 17;
  const x0 = n.right - f.left - 17, y0 = n.top - f.top + n.height / 2 - 17;
  gsap.set(e, { x: x0, y: y0, opacity: 0, scale: 0.5 });
  gsap.timeline({ delay: 0.2 })
    .to(e, { opacity: 1, duration: 0.2 })
    .to(e, { x: x1, rotation: 360, scale: 1, duration: 1.2, ease: 'power1.inOut' }, 0)
    .to(e, { y: Math.min(y0, y1) - 120, duration: 0.6, ease: 'sine.out' }, 0)
    .to(e, { y: y1, duration: 0.6, ease: 'sine.in' }, 0.6)
    .fromTo('.carte .po', { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.25, duration: 0.25, yoyo: true, repeat: 1 }, 1.15);
}
function aube() {
  const a = $('.aube');
  if (!a || calme() || !gsap || !ST()) return;
  gsap.fromTo(a, { opacity: 1 }, { opacity: 0, ease: 'none', scrollTrigger: { trigger: '.panorama-cadre', start: 'top 85%', end: 'bottom 30%', scrub: 0.6 } });
}

/* ---------- Coupe du lieu (Géobiologie) : murs et sols tracés sur la photo, qui s'effacent au défilement ---------- */
function coupe() {
  const svg = $('.coupe');
  if (!svg || calme() || !gsap || !ST()) return;
  gsap.fromTo(svg, { opacity: 1 }, { opacity: 0.08, ease: 'none', scrollTrigger: { trigger: '.geo-bandeau', start: 'top 45%', end: 'bottom 35%', scrub: 0.5 } });
  gsap.fromTo('.coupe-etiquette', { y: 0, opacity: 1 }, { y: -24, opacity: 0, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: '.geo-bandeau', start: 'top 35%', end: 'center 25%', scrub: 0.5 } });
}

/* ---------- Grille des neuf domaines posée depuis la porte (Feng Shui, ouverture et section) ---------- */
function bagua() {
  const cases = $$('.bagua-case');
  if (cases.length && !calme() && gsap && ST()) {
    const ordre = [7, 6, 3, 0, 1, 2, 5, 8, 4]; /* de la porte (N) vers le tour, puis le centre */
    let dernier = -1;
    ST().create({ trigger: '.fs-ouv', start: 'top top', end: 'bottom top', onUpdate: (st) => {
      const k = Math.min(ordre.length - 1, Math.floor(st.progress * ordre.length * 0.999));
      if (k === dernier) return; dernier = k;
      cases.forEach((c, i) => c.classList.toggle('est-allumee', i === ordre[k]));
    } });
    gsap.fromTo('.fs-arche', { yPercent: 0 }, { yPercent: -14, ease: 'none', scrollTrigger: { trigger: '.fs-ouv', start: 'top top', end: 'bottom top', scrub: 0.6 } });
  }
  const grille = $('.domaines-grille');
  if (!grille) return;
  const items = $$('.domaine', grille), lu = $('.domaines-lu');
  const choisir = (el) => {
    items.forEach((x) => { x.classList.toggle('est-allume', x === el); x.setAttribute('aria-pressed', x === el ? 'true' : 'false'); });
    if (lu && el) lu.innerHTML = `<b>${el.dataset.nom}</b>${el.dataset.mots}`;
  };
  items.forEach((el) => el.addEventListener('click', () => { choisir(el); manuel = true; }));
  let manuel = false;
  if (calme() || !ST()) { choisir(items[4]); return; }
  const ordre = [7, 6, 3, 0, 1, 2, 5, 8, 4];
  let dernier = -1;
  /* Sur grand écran, la section est épinglée (domainesEpingles) ; ailleurs, la grille s'allume au fil du défilement. */
  gsap.matchMedia().add('(max-width: 899px), (max-height: 639px)', () => {
    ST().create({ trigger: grille, start: 'top 75%', end: 'bottom 35%', onUpdate: (st) => {
      if (manuel) return;
      const k = Math.min(8, Math.floor(st.progress * 9 * 0.999));
      if (k === dernier) return; dernier = k; choisir(items[ordre[k]]);
    } });
  });
  choisir(items[4]);
}

/* ---------- Parcours de visite (Immobilier Autrement) : de la porte au jardin, le chemin avance au défilement ---------- */
function parcoursVisite() {
  const chemin = $('.parcours-visite path');
  if (!chemin || calme() || !gsap || !ST()) return;
  gsap.fromTo(chemin, { strokeDashoffset: 0 }, { strokeDashoffset: -220, ease: 'none', scrollTrigger: { trigger: '.immo-ouv', start: 'top top', end: 'bottom top', scrub: 0.4 } });
  gsap.fromTo('.parcours-visite circle', { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.6, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: '.immo-ouv', start: 'top top', end: 'bottom top', scrub: 0.4 } });
}

/* ---------- Carte du contact : les ondes autour des Pyrénées-Orientales s'étendent au défilement ---------- */
function carte() {
  const ondes = $$('.onde-po');
  if (!ondes.length || calme() || !gsap || !ST()) return;
  ondes.forEach((o, i) => gsap.fromTo(o, { scale: 0.4, opacity: 0.9, transformOrigin: '50% 50%' }, { scale: 1.6 + i * 0.5, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.carte', start: 'top 85%', end: 'bottom top', scrub: 0.6 } }));
}

/* ---------- Demande en trois étapes (contact) : préremplie par l'adresse, l'étoile se pose sur la fiche « Reçue » ---------- */
async function demande() {
  const racine = $('.fpe');
  if (!racine) return;
  const p = new URLSearchParams(location.search);
  const sujet = p.get('sujet') || '', formule = p.get('formule') || '';
  const cocher = (name, val) => { const i = racine.querySelector(`input[name="${name}"][value="${val}"]`); if (i) i.checked = true; };
  const carte = { geobiologie: 'geobiologie', 'feng-shui': 'feng-shui', immobilier: 'immobilier', bulle: 'capsule', capsule: 'capsule' };
  const k = Object.keys(carte).find((x) => sujet.startsWith(x));
  if (k) cocher('accompagnement', carte[k]);
  if (sujet.startsWith('immobilier')) cocher('lieu', 'vente');
  if (sujet.startsWith('bulle-sommeil') || sujet.startsWith('bulle-voyageur')) cocher('lieu', 'chambre');
  if (sujet.startsWith('bulle-bureau')) cocher('lieu', 'professionnel');
  if (/sur-place/.test(sujet)) cocher('modalite', 'sur-place');
  if (/distance/.test(sujet)) cocher('modalite', 'distance');
  const champFormule = racine.querySelector('[name="formule"]');
  if (champFormule) champFormule.value = formule || (sujet ? (racine.dataset[`sujet${sujet.replace(/(^|-)(\w)/g, (_, a, b) => b.toUpperCase())}`] || sujet.replace(/-/g, ' ')) : '');
  const { init } = await module('formulaire-par-etapes');
  await init(racine, { mailto: racine.dataset.mailto || '', sujet: 'Demande depuis la maquette Ma Bonne Étoile' });
  racine.addEventListener('formulaire:envoye', () => requestAnimationFrame(() => etoileRecue(racine)));
}

function etoileRecue(racine) {
  const fin = $('.fpe__fin', racine), tampon = $('.recu-tampon', racine);
  if (!fin || !tampon) return;
  if (calme() || !gsap) { tampon.style.opacity = 1; return; }
  const depart = $('.fpe__nav', racine) || racine;
  const a = depart.getBoundingClientRect(), b = tampon.getBoundingClientRect();
  const etoile = document.createElement('div');
  etoile.className = 'etoile-envol';
  etoile.setAttribute('aria-hidden', 'true');
  etoile.innerHTML = $('.pied-etoile') ? $('.pied-etoile').outerHTML : '';
  document.body.appendChild(etoile);
  const x0 = a.left + a.width / 2 - 27, y0 = a.top - 27, x1 = b.left + b.width / 2 - 27, y1 = b.top + b.height / 2 - 27;
  gsap.set(tampon, { opacity: 0, scale: 1.8, rotation: -10 });
  gsap.set(etoile, { x: x0, y: y0, scale: 0.6 });
  gsap.timeline({ onComplete: () => etoile.remove() })
    .to(etoile, { x: x1, rotation: 270, scale: 1, duration: 0.9, ease: 'power1.inOut' }, 0)
    .to(etoile, { y: Math.min(y0, y1) - 80, duration: 0.45, ease: 'sine.out' }, 0)
    .to(etoile, { y: y1, duration: 0.45, ease: 'sine.in' }, 0.45)
    .to(tampon, { opacity: 1, scale: 1, rotation: -10, duration: 0.35, ease: 'back.out(2.4)' }, 0.85)
    .to(etoile, { opacity: 0, scale: 0.4, duration: 0.3 }, 0.95);
}

/* ---------- Tarifs à rouleaux (toutes les pages qui en ont) ---------- */
async function tarifsRouleaux() {
  const blocs = $$('.trf');
  if (!blocs.length) return;
  const { init } = await module('tarifs-a-rouleaux');
  await Promise.all(blocs.map((b) => init(b, { conseillee: b.dataset.conseillee || 'Conseillée', choisie: b.dataset.choisie || 'Choisie' })));
  /* Le tampon « Choisie » se voit avant que le voile en étoile parte du bouton (450 ms). */
  if (calme()) return;
  $$('.trf__choisir').forEach((a) => a.addEventListener('click', (ev) => {
    if (ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    const u = new URL(a.href, location.href);
    if (u.pathname === location.pathname) return;
    ev.preventDefault(); ev.stopPropagation();
    const point = ev.detail !== 0 ? { x: ev.clientX, y: ev.clientY } : null;
    setTimeout(() => partir(u, a.dataset.libelle || '', point), 450);
  }));
}

/* ---------- Scènes épinglées : lecture du lieu (accueil), coupe (géobiologie) ---------- */
async function scenes() {
  const blocs = $$('.see');
  if (!blocs.length) return;
  const { init } = await module('schema-epingle-etapes');
  blocs.forEach((b) => init(b, { pas: 60, hauteurMin: 680 }));
}

/* ---------- Typographie : Fraunces passe de « tendu » à « apaisé » au défilement (axes SOFT et WONK, largeur fixe) ---------- */
async function axes() {
  if (!$('[data-axes]')) return;
  const { init } = await module('axes-au-defilement');
  init(document.body, { de: AXES_DE, a: AXES_A, debut: 'top 92%', fin: 'top 45%' });
}

/* ---------- Fil conducteur : la ligne de circulation du plan, de porte en porte, une étoile au bout ---------- */
let filLance = false;
async function fil() {
  if (filLance) return; filLance = true;
  const main = $('main[data-module="fil-conducteur"]');
  if (!main || calme()) return;
  const { init } = await module('fil-conducteur');
  init(main, { cadre: '.conteneur', onde: 8, boucle: 26, lissage: 0.45 });
}

demarrer({
  preparer() {
    calqueQuiGlisse(); calques(); lumiere(); bulles(); titresRegle(); titresEtoiles(); memoire(); roue(); coupe(); bagua(); domainesEpingles(); parcoursVisite(); carte(); aube();
    boussole(); tarifsRouleaux(); scenes(); axes(); demande();
    /* Le fil se construit après l'ouverture : son calcul ne retarde jamais l'intro (leçon de la bibliothèque). */
    const plusTard = () => (window.requestIdleCallback ? requestIdleCallback(() => fil(), { timeout: 1800 }) : setTimeout(fil, 900));
    quand('pret', () => { setTimeout(plusTard, 400); window.ScrollTrigger?.sort?.(); window.ScrollTrigger?.refresh(); });
    /* Les scènes épinglées ajoutées par le projet décalent ce qui suit : positions recalculées une fois tout créé. */
    requestAnimationFrame(() => { window.ScrollTrigger?.sort?.(); window.ScrollTrigger?.refresh(); });
  },
  /* Intro (moins de 3 s) : la nuit, le plan se trace, l'étoile se dessine au compas, « Ma Bonne Étoile » s'écrit,
     puis l'étoile glisse jusqu'à l'objet d'ouverture de la page et l'écran s'ouvre depuis elle (versObjet). */
  jouer() {
    if (!gsap) return null;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const corps = $('.ouverture-etoile .etoile-corps'), plan = $$('.ouverture-plan path');
    if (corps && corps.getTotalLength) {
      const L = corps.getTotalLength();
      tl.fromTo(corps, { strokeDasharray: L, strokeDashoffset: L, fillOpacity: 0 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0)
        .to(corps, { fillOpacity: 1, duration: 0.3 }, 0.5);
    }
    plan.forEach((p) => { const L = p.getTotalLength ? p.getTotalLength() : 0; if (L) tl.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 0.85, ease: 'power2.out' }, 0); });
    tl.fromTo('.ouverture-etoile .etoile-relief', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.55)
      .fromTo('.ouverture-nom', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.2)
      .fromTo('.ouverture-trait', { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, 0.35)
      .fromTo('.ouverture-ligne', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.45)
      .to('.ouverture-nom, .ouverture-ligne, .ouverture-trait, .ouverture-plan', { opacity: 0, duration: 0.25 }, 0.9);
    versObjet(tl, { a: 1.0, echelleMax: 3 });
    arriveePage(tl, 1.42);
    return tl;
  },
  etatFinal() {
    $('#debut')?.classList.add('lignes-libres');
    $('.porte')?.classList.add('est-ouverte');
    if (!gsap) return;
    gsap.set('#debut [data-anime="gsap"], .ouv-ligne', { clearProps: 'transform,opacity' });
    $$('[data-axes-ouv]').forEach((h) => { h.style.fontVariationSettings = AXES_A; });
  },
  arrivee() {
    if (!gsap) return;
    arriveePage(gsap.timeline({ defaults: { ease: 'power3.out' } }), 0.1);
  },
});

/* Mouvement d'ouverture de chaque page : titre ligne à ligne, axes qui s'apaisent, puis le reste du premier écran. */
function arriveePage(tl, t) {
  const lignes = $$('#debut .ouv-ligne');
  if (lignes.length) tl.fromTo(lignes, { yPercent: 105, opacity: 1 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, t);
  const autres = $$('#debut [data-anime="gsap"]').filter((e) => !e.classList.contains('ouv-ligne'));
  if (autres.length) tl.fromTo(autres, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, t + 0.1);
  $$('[data-axes-ouv]').forEach((h) => tl.fromTo(h, { fontVariationSettings: AXES_DE }, { fontVariationSettings: AXES_A, duration: 0.85, ease: 'power2.inOut' }, t + 0.1));
  const debut = $('#debut');
  if (debut) tl.call(() => debut.classList.add('lignes-libres'), null, t + 1.05);
  /* Effets longs d'ouverture : lancés à part, pour ne jamais allonger l'intro. */
  if ($('.porte')) tl.call(ouvrirPorte, null, t);
  if ($('.etoile-vol')) tl.call(etoileVersDepartement, null, t + 0.3);
  const traits = $$('#debut [data-trace-ouv]');
  traits.forEach((p) => { const L = p.getTotalLength ? p.getTotalLength() : 0; if (L) tl.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, t + 0.1); });
  return tl;
}
