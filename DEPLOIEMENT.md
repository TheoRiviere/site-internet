# Déploiement du site

Le site de `nightgame.fr` est fait de fichiers statiques, servis par nginx depuis `/var/www/nightgame` sur le VPS OVH (`ubuntu@137.74.113.240`). Pour le mettre en ligne, il suffit de remplacer ces fichiers : pas de build, et pas besoin de recharger nginx.

Le déploiement se fait en trois temps : envoyer les fichiers dans un dossier d'attente sur le VPS, les mettre à la place du site, vérifier dans le navigateur.

## 1. Envoyer les fichiers

Sur le PC, dans `site-internet/`, sur la branche `main` à jour :

```powershell
ssh ubuntu@137.74.113.240 "rm -rf ~/site-nightgame && mkdir ~/site-nightgame"
```
```powershell
scp -r index.html applications.html cgu.html confidentialite.html suppression-compte.html site.css site.js lang.js fonts images rep ubuntu@137.74.113.240:~/site-nightgame/
```

Mot de passe : le même que d'hab, demandé à chaque commande.

La première commande repart d'un dossier d'attente vide, pour ne rien traîner d'un envoi précédent. La seconde liste les fichiers un par un : `README.md`, `DEPLOIEMENT.md`, `CLAUDE.md` et `docs/` restent sur le PC. Un nouveau fichier ou dossier à la racine du site doit être ajouté à cette liste.

## 2. Mettre en ligne

Sur le VPS (`ssh ubuntu@137.74.113.240`) :

```bash
# Garde l'ancien site au cas où, puis met le nouveau à sa place
sudo cp -r /var/www/nightgame ~/nightgame-avant-$(date +%F-%Hh%M)
sudo cp -r ~/site-nightgame/. /var/www/nightgame/
sudo chown -R www-data:www-data /var/www/nightgame
rm -rf ~/site-nightgame
```

La sauvegarde porte la date et l'heure, par exemple `nightgame-avant-2026-10-09-16h30` : deux déploiements le même jour donnent deux sauvegardes distinctes.

## 3. Vérifier

Dans le navigateur, en navigation privée pour ne pas tomber sur le cache :

- https://nightgame.fr : l'accueil de Crime Night, les yeux qui clignent, les boutons des stores, les deux carrousels
- le bouton FR/EN de la barre du haut : la page passe en anglais, et le lien « All our apps » ouvre la page des applications en anglais elle aussi
- https://nightgame.fr/applications.html : les cartes de Crime Night et de Rep'
- https://nightgame.fr/cgu.html, https://nightgame.fr/confidentialite.html, https://nightgame.fr/suppression-compte.html : les pages de Crime Night, en français
- https://nightgame.fr/cgu.html?lang=en : la même page directement en anglais
- https://nightgame.fr/rep/confidentialite.html et https://nightgame.fr/rep/suppression-compte.html : les pages de Rep', avec leur bouton FR/EN
- sur un téléphone : l'accueil, et la barre du haut qui tient sur une ligne
- dans Crime Night et dans Rep', les liens vers les conditions et la politique de confidentialité ouvrent la bonne page

## Revenir en arrière

Sur le VPS, en remplaçant le nom par celui de la sauvegarde (`ls ~` pour la retrouver) :

```bash
sudo rm -rf /var/www/nightgame
sudo cp -r ~/nightgame-avant-AAAA-MM-JJ-HHhMM /var/www/nightgame
sudo chown -R www-data:www-data /var/www/nightgame
```

Une fois le nouveau site vérifié, les vieilles sauvegardes peuvent être supprimées : `sudo rm -rf ~/nightgame-avant-*`.

## À savoir

- Les pages de Crime Night restent à la racine : l'appli KillerParty et les stores pointent vers `nightgame.fr/cgu.html` et `nightgame.fr/confidentialite.html`. Ne pas les renommer ni les déplacer.
- Les adresses des pages de Rep' sont celles données à App Store Connect et à la Play Console, et l'appli les ouvre. Elles ne doivent pas changer non plus.
- Un fichier supprimé du dossier n'est pas supprimé du VPS par la copie : il faut l'enlever à la main dans `/var/www/nightgame`.
- Après une mise à jour, un visiteur déjà passé sur le site peut garder un temps l'ancien `site.css` ou `site.js` dans le cache de son navigateur. Un rechargement forcé (Ctrl+F5) règle le problème de son côté.
