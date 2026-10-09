# Site internet de nightgame.fr

Site statique servi par nginx depuis `/var/www/nightgame` sur le VPS OVH (`ubuntu@137.74.113.240`). Il remplace `KillerParty/infra/site/`.

```
index.html                 accueil : Crime Night
applications.html          « Toutes nos applications » : Crime Night et Rep'
cgu.html                   Crime Night : conditions d'utilisation
confidentialite.html       Crime Night : politique de confidentialité
suppression-compte.html    Crime Night : suppression de compte
site.css, site.js          style et script communs à l'accueil, aux applications et aux pages légales de Crime Night
lang.js                    choix de la langue, sur toutes les pages
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

## Deux langues

Toutes les pages contiennent le français et l'anglais dans le même fichier : chaque texte existe en deux exemplaires, marqués `data-l="fr"` et `data-l="en"`. `lang.js` n'en affiche qu'un : le français par défaut, l'anglais avec `?lang=en` (par exemple `https://nightgame.fr/cgu.html?lang=en`) ou avec le bouton FR/EN de la barre du haut. Les liens entre les pages du site gardent la langue choisie.

Toute modification d'un texte se fait dans les deux langues. Pour les pages légales, le français fait foi.

## Publier

Voir `DEPLOIEMENT.md`.
