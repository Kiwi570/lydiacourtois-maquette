/* Page 404 : « Cette pièce n'est pas sur le plan ». */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: '404', fichier: '404', langues: ['fr'], partage: false, fil: false };

export default (c) => html`
<section class="conteneur introuvable" id="debut">
  <div>
    <p class="surtitre">404</p>
    <h1 data-anime data-axes data-grille="typo">${c.t('introuvable.titre')}</h1>
    <p data-anime>${c.t('introuvable.texte')}</p>
    <p data-anime>${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })}</p>
  </div>
  ${c.media({ nom: 'grok/page-404', alt: 'Porte ouverte sur une petite pièce vide inondée de soleil', priorite: true, sizes: '(max-width: 760px) 92vw, 50vw', attrs: 'data-iris-centre data-fx="zoom"' })}
</section>
`;
