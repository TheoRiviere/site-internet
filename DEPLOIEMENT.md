# Déploiement du site

Le site de `nightgame.fr` est fait de fichiers statiques, servis par nginx depuis `/var/www/nightgame` sur le VPS OVH (`ubuntu@137.74.113.240`). Pour le mettre en ligne, il suffit de remplacer ces fichiers : pas de build, et pas besoin de recharger nginx.

## Mettre en ligne

Sur le PC, dans `site-internet/` :

```powershell
scp -r index.html cgu.html confidentialite.html suppression-compte.html images rep ubuntu@137.74.113.240:~/site-nightgame/
```

Mot de passe : le même que d'hab.

Sur le VPS (`ssh ubuntu@137.74.113.240`) :

```bash
# Garde l'ancien site au cas où, puis met le nouveau à sa place
sudo cp -r /var/www/nightgame ~/nightgame-avant-$(date +%F)
sudo cp -r ~/site-nightgame/. /var/www/nightgame/
sudo chown -R www-data:www-data /var/www/nightgame
rm -rf ~/site-nightgame
```

## Vérifier

Dans le navigateur, en navigation privée pour ne pas tomber sur le cache :

- https://nightgame.fr : l'accueil avec Crime Night et Rep', les yeux qui clignent
- https://nightgame.fr/cgu.html, https://nightgame.fr/confidentialite.html, https://nightgame.fr/suppression-compte.html : les pages de Crime Night, inchangées
- https://nightgame.fr/rep/confidentialite.html et https://nightgame.fr/rep/suppression-compte.html : les pages de Rep'
- Dans Rep', Réglages › « Politique de confidentialité » ouvre la bonne page

## Revenir en arrière

Sur le VPS, en remplaçant la date par celle de la sauvegarde (`ls ~` pour la retrouver) :

```bash
sudo rm -rf /var/www/nightgame
sudo cp -r ~/nightgame-avant-AAAA-MM-JJ /var/www/nightgame
sudo chown -R www-data:www-data /var/www/nightgame
```

Une fois le nouveau site vérifié, les vieilles sauvegardes peuvent être supprimées : `sudo rm -rf ~/nightgame-avant-*`.

## À savoir

- Les pages de Crime Night restent à la racine : l'appli KillerParty et les stores pointent vers `nightgame.fr/cgu.html` et `nightgame.fr/confidentialite.html`. Ne pas les renommer ni les déplacer.
- Les adresses des pages de Rep' sont celles données à App Store Connect et à la Play Console, et l'appli les ouvre. Elles ne doivent pas changer non plus.
- Un fichier supprimé du dossier n'est pas supprimé du VPS par la copie : il faut l'enlever à la main dans `/var/www/nightgame`.
