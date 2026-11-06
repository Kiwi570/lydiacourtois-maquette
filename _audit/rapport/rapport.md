# Rapport d’audit

Projet : `lydiacourtois-maquette` · 06/11/2026 18:35:18 · 20 min · 6 page(s) · audit standard

## Résumé

- Échecs : **0**
- À regarder : **7**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (7), mesures (66), balayage (5), films d’ouverture (10), films de transition (10), bords de l’écran (6), intro accélérable et passable (7), menu (1), clavier (6), liens et boutons (6), liens profonds (16), liens vers la page en cours (5), changements de hauteur (5), mode calme (10), bouton du mode calme (2), tient dans l’écran (4), fluidité (10), défilement selon l’appareil (5), mouvement (10), effets du plan (24), souris immobile (6), vitesse (5), captures (1)

## Grille wouahou

| Point | État | Détail |
|---|---|---|
| 1. L’effet signature se manipule | ✓ présent | accueil |
| 2. L’intro devient la page | ✓ présent | objet d’ouverture sur 5 page(s), versObjet dans l’intro |
| 3. La transition reprend le motif | ✓ présent | voile en etoile |
| 4. Un fil conducteur traverse le site | ✓ présent | sur les 5 page(s) |
| 5. La typographie bouge aussi | ✓ présent | sur les 5 page(s) |
| 6. Les scènes épinglées sont des gestes du métier | ✓ présent | geste du métier sur /feng-shui, /geobiologie, /immobilier-autrement, / |
| 7. L’action principale a un retour physique | ✓ présent | sur /contact, /feng-shui, /geobiologie, /immobilier-autrement, / |

Le script vérifie les marques (`data-grille`, `data-iris-centre`, forme du voile, `versObjet`) ; la force et la justesse de chaque point se jugent sur les captures et les films.

## Échecs

Aucun.

## À regarder

### rechargement au milieu de la page (1)

- **rechargement au milieu de la page** — `/immobilier-autrement` — écran différent à la même position après rechargement (18.8 %), voir comparaisons/rechargement-immobilier-autrement-*.png _(1366×768)_

### fluidité (3)

- **fluidité** — `/` — 6 % d'images de plus de 50 ms _(1366×768 défilement à la molette, processeur ralenti 4 fois)_
- **fluidité** — `/feng-shui` — 3 % d'images de plus de 50 ms _(1366×768 défilement à la molette, processeur ralenti 4 fois)_
- **fluidité** — `/immobilier-autrement` — 3 % d'images de plus de 50 ms _(1366×768 défilement à la molette, processeur ralenti 4 fois)_

### effet qui ne bouge pas au défilement (3)

- **effet qui ne bouge pas au défilement** — `/feng-shui` — div.bagua-case — bagua-porte : il ne bouge ni au défilement ni tout seul à cette taille (effet au survol, au clic, ou réservé à l'ordinateur ?) ; il ne compte pas comme effet de section _(1366×768 normal, 390×844 normal)_
- **effet qui ne bouge pas au défilement** — `/feng-shui` — button.domaine — domaines-qui-s-allument : il ne bouge ni au défilement ni tout seul à cette taille (effet au survol, au clic, ou réservé à l'ordinateur ?) ; il ne compte pas comme effet de section _(1366×768 normal, 390×844 normal)_
- **effet qui ne bouge pas au défilement** — `/immobilier-autrement` — div.piste.visite-piste — visite-piece-par-piece : il ne bouge ni au défilement ni tout seul à cette taille (effet au survol, au clic, ou réservé à l'ordinateur ?) ; il ne compte pas comme effet de section _(390×844 normal)_

## Non lancé

- **Safari (WebKit)** : WebKit ne peut pas s’installer ici : vérification à faire dans Safari sur le Mac (liste dans le rapport)

### À vérifier dans Safari sur le Mac (WebKit indisponible ici)

- Ouverture de chaque page : rien qui clignote, intro complète au premier chargement et au rechargement.
- Changement de page : le voile couvre l’écran, pas de page blanche ; retour arrière sans intro ni voile resté.
- Défilement : fluide (natif), en-tête qui se cache et revient sans clignoter, sections épinglées entières.
- Menu sur iPhone (mode Responsive de Safari) : ouverture, fermeture, page bloquée derrière.
- Polices, images, mention « Illustration générée », formulaires et barre fixe du bas.

## Repères

- Numéro de version des fichiers : ?v=2
- Journal v2 : 0 étape(s) notée(s), 0 min de travail, 2 min d’attente de l’utilisateur.
- Audit standard : étapes lourdes sur /, /contact, /feng-shui, /geobiologie, /immobilier-autrement.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Ouverture / (1366×768) : 2823 ms depuis le premier octet
- Ouverture /contact (1366×768) : 2660 ms depuis le premier octet
- film de l'ouverture /contact 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Ouverture /feng-shui (1366×768) : 2744 ms depuis le premier octet
- Ouverture /geobiologie (1366×768) : 2705 ms depuis le premier octet
- Ouverture /immobilier-autrement (1366×768) : 2742 ms depuis le premier octet
- Ouverture / (390×844) : 2717 ms depuis le premier octet
- Ouverture /contact (390×844) : 2646 ms depuis le premier octet
- Ouverture /feng-shui (390×844) : 2697 ms depuis le premier octet
- Ouverture /geobiologie (390×844) : 2689 ms depuis le premier octet
- Ouverture /immobilier-autrement (390×844) : 2697 ms depuis le premier octet
- bords de l’écran /contact 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Bords de l’écran : 361 images d’intro, 14 de voile et 134 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Aucun parcours propre au projet (_audit/parcours.mjs) : filtres, calculateurs, panier, réservation, fenêtres testés seulement par les contrôles généraux.
- Tient dans l'écran / : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /feng-shui : aucune section épinglée ou plein écran.
- Tient dans l'écran /geobiologie : aucune section épinglée ou plein écran.
- Fluidité /contact 1366×768 (molette) : 3 % d'images lentes sur 179, tâche la plus longue 54 ms
- Fluidité /geobiologie 1366×768 (molette) : 3 % d'images lentes sur 356, tâche la plus longue 72 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1440, tâche la plus longue 51 ms
- Fluidité /contact 390×844 (doigt) : 0 % d'images lentes sur 1349, tâche la plus longue 0 ms
- Fluidité /feng-shui 390×844 (doigt) : 0 % d'images lentes sur 1347, tâche la plus longue 0 ms
- Fluidité /geobiologie 390×844 (doigt) : 0 % d'images lentes sur 1342, tâche la plus longue 0 ms
- Fluidité /immobilier-autrement 390×844 (doigt) : 0 % d'images lentes sur 1341, tâche la plus longue 0 ms
- Vitesse / : 0.80 s de calcul au chargement (téléphone ralenti).
- Vitesse /contact : 0.49 s de calcul au chargement (téléphone ralenti).
- Vitesse /feng-shui : 0.63 s de calcul au chargement (téléphone ralenti).
- Vitesse /geobiologie : 0.60 s de calcul au chargement (téléphone ralenti).
- Vitesse /immobilier-autrement : 0.66 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`
