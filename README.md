# groupomania-node

## npm i : Installation des dependences

## npm run dev : Demarrage du serveur Nodemon

## npm start : Demarrage du serveur Node

## Port : 5000

## point d'entrée  : app.js

## Version Node : v15.2.0


# Technologies :

* Node JS
* Express
* MySQL BDD
* Sequelize ORM
* Bcrypt  : hashage mdp
* jsonwebtoken  Authentification
* joi validation données
* multer gestion des fichiers


# Base de donnée

la bdd utilisée est Mysql , faudra avoir Mysql sur sa machine

Penser à crée une schema nommée groupomania

config ORM sur le fichier ./config/database.js

schema : "groupomania"
user : "votre user"
password : "votre mot de passe"
dialect : "mysql"
host : "localhost

config Admin

Pour avoir un accées admin, penser à remplir les champs suivants sur la table admins

* id : 1
* username : un nom d'utilisateur
* email : un email
* password : un mot de passe
* createdAt : yyyy-mm-dd hh:mm:ss
* updatedAt : yyyy-mm-dd hh:mm:ss


## Sur le front :
* Aller sur /admin
* email : l'email indique sur la bdd
* password : le mdp indiquée sur la bdd

