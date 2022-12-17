# MyHealth (Front-End)

MyHealth est une application web qui permet de surveiller l'état de santé d'un individu selon des paramètres bien précis.

## Prérequis

* **Angular** version **15.0.0** (ou plus)
* **Node** version **18.12.1** (ou plus)
* **NPM** version **8.19.2** (ou plus)

## Développement

Le fichier **environment.ts** dans **src/app/environments** permet de configurer le serveur de l'API utilisée lors l'exécution de la commande `ng serve`.

## Production

Le fichier **environment.prod.ts** dans **src/app/environments** permet de configurer le serveur de l'API utilisée par l'application après le build.

Pour build l'application, exécutez la commande 

```ng build --configuration=production --base-href /myhealth/```.

## Déploiement

Je recommande **Apache** pour déployer l'application. Installez-le et assurez-vous d'avoir activé le *Rewrite* et le *AllowOverride* pour permettre au fichier **.htaccess** de faire son boulot.

Renommez le dossier contenu dans le répertoire **dist** par **myhealth** puis déplacez-le vers le répertoire **root** du serveur **Apache**.

## Back-End du projet

Accédez au back-end de l'application par [ici](https://github.com/GimmyR/myhealth-back).