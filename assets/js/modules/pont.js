/* Pont entre les modules de la bibliothèque (pret([...]) de leur socle) et le socle de la skill :
   même GSAP, même mode calme, mêmes boucles (arrêtées hors écran, onglet caché, jamais en mode calme),
   mêmes mesures regroupées. Les modules ne chargent rien eux-mêmes. */
import { etat, boucle as boucleSocle, rafraichir } from '../socle/index.js?v=3';

const html = document.documentElement;
const reduit = matchMedia('(prefers-reduced-motion: reduce)');
const socle = {
  get gsap() { return window.gsap || null; },
  get ScrollTrigger() { return window.ScrollTrigger || null; },
  get SplitText() { return window.SplitText || null; },
  Flip: null, OGL: null, lenis: null,
  get calme() { return etat.calme || reduit.matches || html.classList.contains('calme'); },
  get souris() { return matchMedia('(hover: hover) and (pointer: fine)').matches; },
  get telephone() { return innerWidth < 700; },
  webgl() { return false; },
  rafraichir,
  mesurer() {},
  /* Signature des modules : fn(t en ms, dt en ms). */
  boucle(el, fn) { return boucleSocle(el, (dt, t) => fn(t * 1000, dt * 1000)); },
};

export async function pret() { return socle; }
