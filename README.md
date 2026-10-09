# Site internet de nightgame.fr

Site statique servi par nginx depuis `/var/www/nightgame` sur le VPS OVH (`ubuntu@137.74.113.240`). Il remplace `KillerParty/infra/site/`.

```
index.html                 accueil : Crime Night
applications.html          « Toutes nos applications » : Crime Night et Rep'
cgu.html                   Crime Night : conditions d'utilisation
confidentialite.html       Crime Night : politique de confidentialité
suppression-compte.html    Crime Night : suppression de compte
site.css, site.js          style et script communs à l'accueil, aux applications et aux pages légales de Crime Night
lang.js                    choix de la langue des pages légales
fonts/                     Lilita One (titres) et Nougat (le nom « Crime Night »), comme dans l'appli
images/                    yeux, modes, règles, captures et icône de Crime Night, logo de Rep', icônes des stores
rep/confidentialite.html   Rep' : politique de confidentialité
rep/suppression-compte.html  Rep' : suppression de compte
rep/rep.css                style commun des pages de Rep'
```

Pas de build : les fichiers sont écrits à la main et servis tels quels.

Les pages de Crime Night restent à la racine : l'appli ouvre `https://nightgame.fr/cgu.html` et `https://nightgame.fr/confidentialite.html`, et ces adresses sont déjà dans les stores. Ne pas les déplacer.

Adresses de Rep' (Réglages de l'appli, App Store Connect, Play Console) :

- https://nightgame.fr/rep/confidentialite.html
- https://nightgame.fr/rep/suppression-compte.html

## Pages légales en deux langues

Les cinq pages légales contiennent le français et l'anglais dans le même fichier, chacun dans une `<section data-l="fr">` ou `<section data-l="en">`. `lang.js` n'en affiche qu'une : le français par défaut, l'anglais avec `?lang=en` (par exemple `https://nightgame.fr/cgu.html?lang=en`) ou avec le bouton FR/EN de la page. Le français fait foi.

Toute modification d'un texte légal se fait dans les deux sections.

## Publier

Voir `DEPLOIEMENT.md`.
