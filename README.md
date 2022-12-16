# MyHealth

Ce projet a été développé avec **Angular** version 15.0.0 donc il est évident que vous devez avoir au moins la même version d'Angular sur votre machine ainsi que la dernière version stable de **Node** et de **NPM**.

## Développement

Le fichier *environment.ts* dans *src/app/environments* permet de configurer le serveur de l'API utilisée lors l'exécution de la commande `ng serve`.

## Production

Le fichier *environment.prod.ts* dans *src/app/environments* permet de configurer le serveur de l'API utilisée par l'application après le build.

Pour build l'application, exécutez la commande 

```ng build --configuration=production --base-href /myhealth/```.

## Déploiement

Je recommande **Apache** pour déployer l'application. Installez-le et assurez-vous d'avoir activé le *Rewrite* et le *AllowOverride* pour permettre au fichier *.htaccess* de faire son boulot.

Renommez le dossier contenu dans le répertoire *dist* par *myhealth* puis déplacez-le vers le répertoire *root* du serveur **Apache**.