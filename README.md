# Ma Bonne Étoile — Lydia Courtois · maquette v1

Maquette du site de Lydia Courtois (géobiologie, Feng Shui tibétain, Immobilier Autrement), direction artistique « Le plan et l'étoile » : papier sable d'architecte, encre bleu nuit, étoile d'or du logo.

Adresse prévue : https://lydiacourtois-maquette.vercel.app (maquette non indexée : `noindex`).

## Pages

| Page | Ouverture | Points forts |
|---|---|---|
| Accueil | Scindée sur papier millimétré : photo sous le calque du plan, étoile-boussole | Boussole des neuf domaines à faire tourner (le plan pivote avec elle), rai de lumière du matin, calques à feuilleter, « Lire le lieu » épinglée, tarifs à rouleaux, Capsules, parcours |
| Géobiologie | Fond chaux, très grand titre centré, bandeau photo sous la coupe du lieu | Coupe qui s'efface, déroulement en trois temps épinglé, tarifs |
| Feng Shui | Fond bleu nuit, grille des neuf domaines posée depuis la porte, photo en arche | Les neuf domaines case par case, tarifs |
| Immobilier Autrement | Façade à gauche avec le parcours de visite, question en grand | Points observés, trois axes, tarifs et avertissement |
| Contact | Compacte quadrillée, numéro en très grand, carte de France | Demande en trois étapes préremplie, tampon « Reçue » |
| 404 | « Cette pièce n'est pas sur le plan » | |

Commun : intro (étoile tracée, plan dessiné, l'étoile se pose sur la page), voile de transition en étoile, fil de circulation doré dans la marge, Fraunces qui passe de « tendu » à « apaisé » au défilement, mode calme complet (lien « Réduire les animations »).

## Travailler sur le projet

- Textes : `donnees/textes/fr.json` ; tarifs : `donnees/tarifs.json` ; neuf domaines : `donnees/domaines.json` ; Capsules : `donnees/bulles.json`.
- Pages : `source/pages/*.mjs`, puis `node outils/generer.mjs`. Ne jamais modifier les `.html` à la main.
- Images : `plan-images.json`, puis `node ~/Downloads/bibliotheque-maquettes/images/produire.mjs plan-images.json`.
- Audit : `node _audit/audit.mjs` (standard), `--complet` pour la version finale.

## À fournir par Lydia (à compléter)

- [ ] Mentions légales : éditeur, SIRET ou équivalent, assurance professionnelle.
- [ ] Hébergeur : Vercel Inc., adresse à vérifier sur vercel.com au moment de la mise en ligne.
- [ ] Politique de confidentialité (formulaire de contact, lettre d'information).
- [ ] Tarifs à confirmer : l'accueil du site actuel annonce 179 € puis 290 € à distance, la page Géobiologie 290 € / 490 €, la page Feng Shui 490 € / 590 €, la page Immobilier 490 € / 790 € (« sur devis » sur l'accueil). La maquette reprend les tarifs de chaque page.
- [ ] Les neuf domaines : noms et mots repris du visuel « Les 9 domaines de vie » de Lydia ; à confirmer.
- [ ] Portrait réel de Lydia (le visuel actuel est une image générée, non reprise).
- [ ] Témoignages réels, avec l'accord des personnes (aucun n'est inventé).
- [ ] Photo du kit artisanal (hérisson, tortues, étoile et cristal de roche).
- [ ] Horaires de contact.
- [ ] Texte de l'axe « Présenter le meilleur jour » (Immobilier Autrement), absent du site actuel.
- [ ] Comptes LinkedIn et Twitter : le site actuel n'a que des liens génériques, ils ne sont pas repris.

## Incohérences du site actuel relevées

Tarifs qui ne concordent pas d'une page à l'autre ; page Contact en erreur ; boutique (« Liste de produits ») vide ; « Témoignages » et « Mon approche » au menu sans contenu ; boutons vers une ancre « #tarifs » absente ; libellé « capsule – tarif de lancement » sur l'offre immobilière ; plusieurs fautes de frappe ; images en grande partie générées par IA, dont une personne présentée en ouverture et une photo de banque d'images.

## Crédits des images

- Images de Lydia (site actuel) : salons, coins lecture, visuels des Bulles, visuel géobiologie, logo.
- Illustrations générées (Grok) : ouverture de l'accueil, table à dessin, porte entrouverte, pages Géobiologie, Feng Shui, Immobilier Autrement, panorama du contact, 404. Chacune porte la mention « Illustration générée » : **à garder sur le site final**.
- Contour de la France : france-geojson (Grégoire David), version simplifiée.
- Polices : Fraunces et Instrument Sans (SIL Open Font License), hébergées avec le site.

## À la mise en ligne définitive

- Retirer : `noindex` (balise robots dans `source/gabarits/commun.mjs`, en-tête X-Robots-Tag dans `vercel.json`), formulaire simulé (le brancher à un vrai envoi), mentions « à compléter ».
- Garder : la mention « Illustration générée » sur chaque image créée par IA, et le cadre « ne remplace pas un avis médical, psychologique ou vétérinaire ».
