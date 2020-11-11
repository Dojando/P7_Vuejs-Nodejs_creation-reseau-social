# P7_amraoui_jawad

**Installer le projet :**  
Pour installer le projet, installez les dépendances des dossiers backend et frontend, puis lancez le serveur backend et vue-cli pour le front.

**La base de données :**  
Créez la base de données avec le fichier sql 'create' dans le dossier sql du projet, et peuplez-la de données avec le fichier 'populate'.

**Le fichier .env :**  
Remplissez les valeurs du fichier env avec vos données  
TOKEN_KEY = votre clé secrete pour securiser les token d'athentification  
DATABASE = le nom de votre base de données  
DATABASE_HOST = l'adresse d'hébergement de la base de données  
DATABASE_USER = l'administrateur de la base de données  
DATABASE_PASSWORD = le mot de passe de l'admin de la base de  

**Administration du site :**  
Pour acceder aux droits administrateur du site, vous devez directement changer la valeur de la colonne 'privilege' de l'utilisateur dans la base de données pour 'admin'.
Un utilisateur admin peut faire passer un autre utilisateur admin depuis la page d'activité de cet utilisateur.