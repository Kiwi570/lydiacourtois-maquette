/* Contact — ouverture compacte quadrillée : numéro en très grand, carte de France avec les Pyrénées-Orientales.
   Demande en trois étapes (module formulaire-par-etapes), préremplie par l'adresse ; à l'envoi, l'étoile se pose
   sur la fiche et un tampon « Reçue » s'imprime (retour physique). */
import { html, brut } from '../../outils/gabarit.mjs';
import { objetFil } from '../gabarits/elements.mjs';
import { etoileSvg } from '../gabarits/commun.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'grok/contact-panorama-1280.webp' };

const carte = (c, k) => html`<label class="fpe__carte"><input type="radio" name="${k[0]}" value="${k[1]}"${k[3] ? brut(' required') : ''}><span class="fpe__carte-titre">${c.t(k[2])}</span>${k[4] ? html`<span class="fpe__carte-texte">${c.t(k[4])}</span>` : ''}</label>`;

export default (c) => {
  const k = c.donnees.carte;
  const t = (x) => `contact.demande.${x}`;
  return html`
<section class="contact-ouv papier" id="debut">
  <div class="conteneur contact-grille">
    <div>
      <p class="surtitre" data-anime="gsap">${c.t('contact.tete.sur')}</p>
      <h1 data-axes-ouv data-grille="typo" data-effet="titre-qui-s-apaise"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('contact.tete.titre')}</span></span></h1>
      <a class="numero" href="tel:${c.site.contact.telephoneLien}" data-action-principale data-anime="gsap" aria-label="${c.s('contact.tete.telephone')}">${c.site.contact.telephone}</a>
      <p class="info-cle" data-info-cle data-anime="gsap">${c.t('contact.tete.zone')}</p>
      <p class="contact-coords" data-anime="gsap"><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a><span class="a-completer">${c.t('contact.tete.horaires')}</span></p>
    </div>
    <figure class="carte" data-iris-centre data-visuel>
      <svg viewBox="${brut(k.viewBox)}" role="img" aria-label="${c.s('contact.tete.carte')}">
        <path class="france" d="${brut(k.france)}" data-trace-ouv/>
        <path class="po" d="${brut(k.po)}"/>
        <circle class="onde-po" data-effet="ondes-du-departement" cx="207" cy="337" r="18"/>
        <circle class="onde-po" data-effet="ondes-du-departement" cx="207" cy="337" r="18"/>
      </svg>
      <span class="etoile-vol" data-effet="etoile-vers-le-departement" aria-hidden="true">${etoileSvg('etoile-vol-svg')}</span>
      <figcaption class="carte-legende"><span>${c.t('contact.tete.surPlace')}</span><span>${c.t('contact.tete.distance')}</span></figcaption>
    </figure>
  </div>
  <span data-fil-point="0.04 1" data-fil-sans-perle aria-hidden="true"></span>
</section>

<section class="section demande" id="demande" data-fil="gauche">
  <div class="conteneur demande-grille">
    <div>
      <p class="surtitre">${c.t(t('sur'))}</p>
      <h2 class="titre-section titre-regle" data-effet="titre-a-la-regle" data-axes data-fil-repere>${c.t(t('titre'))}</h2>
      <p class="chapo texte-doux" data-anime>${c.t(t('annonce'))}</p>
      <p class="mention-donnees" data-anime>${c.t(t('rgpd'))}</p>
      <svg class="demande-dessin" viewBox="0 0 200 150" aria-hidden="true" data-fx="trace" data-visuel><path d="M20 40 H180 V130 H20 Z"/><path d="M20 40 L100 95 L180 40"/><path class="or" d="M150 18 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4 Z"/></svg>
    </div>
    <div class="fpe" data-module="formulaire-par-etapes" data-grille="retour" data-effet="etoile-recue" data-mailto="${c.site.contact.email}">
      <div class="fpe__carton">
        <form class="fpe__form" action="#" method="post" novalidate>
          <div class="fpe__progression">
            <ol class="fpe__reperes" aria-label="Progression"></ol>
            <div class="fpe__barre" aria-hidden="true"><span></span></div>
            <p class="fpe__etat" aria-live="polite"></p>
          </div>
          <fieldset class="fpe__etape" data-etape="${c.s(t('etape1'))}">
            <legend class="fpe__legende"><h3 class="fpe__titre">${c.t(t('q1'))}</h3></legend>
            <div class="fpe__groupe fpe__cartes" data-libelle="${c.s(t('etape1'))}">
              ${[['lieu', 'habitation', t('lieu1'), true, t('lieu1p')], ['lieu', 'chambre', t('lieu2'), false, t('lieu2p')], ['lieu', 'vente', t('lieu3'), false, t('lieu3p')], ['lieu', 'professionnel', t('lieu4'), false, t('lieu4p')]].map((x) => carte(c, x))}
            </div>
          </fieldset>
          <fieldset class="fpe__etape" data-etape="${c.s(t('etape2'))}">
            <legend class="fpe__legende"><h3 class="fpe__titre">${c.t(t('q2'))}</h3></legend>
            <div class="fpe__groupe fpe__cartes" data-libelle="${c.s(t('etape2'))}">
              ${[['accompagnement', 'geobiologie', t('acc1'), true], ['accompagnement', 'feng-shui', t('acc2')], ['accompagnement', 'immobilier', t('acc3')], ['accompagnement', 'capsule', t('acc4')], ['accompagnement', 'a-definir', t('acc5')]].map((x) => carte(c, x))}
            </div>
            <fieldset class="fpe__groupe" data-libelle="${c.s(t('modalite'))}">
              <legend class="fpe__groupe-titre">${c.t(t('modalite'))}</legend>
              <div class="fpe__puces">
                <label class="fpe__puce"><input type="radio" name="modalite" value="sur-place"><span class="fpe__choix-texte">${c.t(t('mod1'))}</span></label>
                <label class="fpe__puce"><input type="radio" name="modalite" value="distance"><span class="fpe__choix-texte">${c.t(t('mod2'))}</span></label>
              </div>
            </fieldset>
            <div class="fpe__champ"><label for="fpe-formule">${c.t(t('formule'))}</label><input id="fpe-formule" name="formule" data-libelle="${c.s(t('formule'))}"></div>
          </fieldset>
          <fieldset class="fpe__etape" data-etape="${c.s(t('etape3'))}">
            <legend class="fpe__legende"><h3 class="fpe__titre">${c.t(t('q3'))}</h3></legend>
            <div class="fpe__grille">
              <div class="fpe__champ"><label for="fpe-prenom">${c.t(t('prenom'))}</label><input id="fpe-prenom" name="prenom" autocomplete="given-name"></div>
              <div class="fpe__champ"><label for="fpe-email">${c.t(t('email'))} <i aria-hidden="true">*</i></label><input id="fpe-email" name="email" type="email" autocomplete="email" required></div>
              <div class="fpe__champ"><label for="fpe-tel">${c.t(t('tel'))}</label><input id="fpe-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" pattern="[0-9 +().\\-]{8,20}"></div>
            </div>
            <div class="fpe__champ"><label for="fpe-message">${c.t(t('message'))} <i aria-hidden="true">*</i></label><textarea id="fpe-message" name="message" rows="4" minlength="10" required></textarea></div>
            <label class="fpe__case"><input type="checkbox" name="accord" value="oui" required data-libelle="Accord" data-hors-recap><span class="fpe__choix-texte">${c.t(t('accord'))} <i aria-hidden="true">*</i></span></label>
          </fieldset>
          <fieldset class="fpe__etape" data-etape="${c.s(t('etape4'))}" data-recap>
            <legend class="fpe__legende"><h3 class="fpe__titre">${c.t(t('q4'))}</h3></legend>
            <div class="fpe__recap"></div>
          </fieldset>
          <div class="fpe__nav">
            <button class="fpe__bouton fpe__bouton--ligne" type="button" data-precedent>${c.t(t('precedent'))}</button>
            <button class="fpe__bouton" type="button" data-suivant>${c.t(t('suivant'))}</button>
            <button class="fpe__bouton" type="submit">${c.t(t('envoyer'))}</button>
          </div>
        </form>
        <div class="fpe__fin" hidden>
          <span class="recu-tampon" aria-hidden="true">${c.t(t('tampon'))}</span>
          <h3>${c.t(t('finTitre'))}</h3>
          <p data-resume></p>
          <p>${c.t(t('finTexte'))}</p>
          <div class="fpe__fin-actions">
            <a class="fpe__bouton" href="mailto:${c.site.contact.email}" data-mailto hidden>${c.t(t('mailto'))}</a>
            <button class="fpe__bouton fpe__bouton--ligne" type="button" data-recommencer>${c.t(t('recommencer'))}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section panorama" id="zone" data-fil="droite">
  <div class="conteneur">
    <h2 class="titre-section titre-etoiles" data-anime="gsap" data-effet="titre-etoiles" data-axes data-fil-repere>${c.t('contact.panorama.titre')}</h2>
    <p class="chapo texte-doux" data-anime>${c.t('contact.panorama.texte')}</p>
    <div class="panorama-cadre">
      ${c.media({ nom: 'grok/contact-panorama', alt: 'Plaine de vignes et d\'oliviers au lever du soleil, collines au loin', sizes: '(max-width: 1240px) 92vw, 1200px', attrs: 'data-fx="parallaxe"' })}
      <span class="aube" data-effet="aube-qui-se-leve" aria-hidden="true" data-superpose></span>
    </div>
  </div>
  <span data-fil-point="0.5 1" aria-hidden="true"></span>
</section>
${objetFil()}
`;
};
