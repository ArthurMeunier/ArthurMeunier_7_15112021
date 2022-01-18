# Présentation du projet

Groupomania est un groupe spécialisé dans la grande distribution. Suite à la mise en place d'un comité de pilotage sur le bien-être au travail, l'entreprise a décidé de renforcer la communication entre les salariés en mettant en place un réseau social interne.

# Objectifs

- Développer la première version d'une application type 9GAG/Reddit (Réseau de partage de contenu img/gif/txt)

## Spécifications fonctionnelles
- La présentation des fonctionnalités doit être simple
- La création d'un compte doit être simple et possible depuis un téléphone mobile
- Le profil doit contenir très peu d'informations pour que sa complétion soit rapide
- La suppression du compte doit être possible
- L'accès à un forum où les salariés publient des contenus multimédias doit être présent;
- L'accès à un forum où les salariés publient des textes doit être présent ;
- Les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés
- Le ou la chargé(e) de communication Groupomania doit pouvoir modérer les interactions entre salariés

## Frontend
**Setup :**
- cd frontend
- npm install
- npm run serve

## Backend

**Setup :**
- Créer un fichier "dbKey.js" dans le dossier backend et y entrer :
```
    const dbKey = "dbPASSWORDhere";

    module.exports = dbKey;
```    
- cd backend
- npm install
- nodemon