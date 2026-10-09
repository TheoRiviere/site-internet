# Site internet de nightgame.fr

Site statique servi par nginx depuis `/var/www/nightgame` sur le VPS OVH (`ubuntu@137.74.113.240`). Il remplace `KillerParty/infra/site/`.

```
index.html                 accueil : Crime Night et Rep'
cgu.html                   Crime Night : conditions d'utilisation
confidentialite.html       Crime Night : politique de confidentialité
suppression-compte.html    Crime Night : suppression de compte
images/                    yeux et modes de Crime Night, logo de Rep'
rep/confidentialite.html   Rep' : politique de confidentialité
rep/suppression-compte.html  Rep' : suppression de compte
rep/rep.css                style commun des pages de Rep'
```

Les pages de Crime Night restent à la racine : l'appli ouvre `https://nightgame.fr/cgu.html` et `https://nightgame.fr/confidentialite.html`, et ces adresses sont déjà dans les stores. Ne pas les déplacer.

Adresses de Rep' (Réglages de l'appli, App Store Connect, Play Console) :

- https://nightgame.fr/rep/confidentialite.html
- https://nightgame.fr/rep/suppression-compte.html

## Publier

Voir `DEPLOIEMENT.md`.
