# P7_amraoui_jawad

**1. Installer le projet :**  
Apres avoir récupéré le projet, ouvrez un terminal à la racine du dossier 'backend' et 'frontend', puis lancez 'npm install' dans ces terminaux pour installez les dépendances du projet.

**2. La base de données :**  
Ensuite, créez la base de données SQL en important le fichier 'Dump_create_db.sql' se trouvant dans le dossier sql du projet. Vous pouvez ensuite peuplez la base de données en important le fichier 'Dump_populate_db.sql' se trouvant au même endroit.

**3. Le fichier .env :**  
Apres avoir installé les dépendances et créé la base de données, remplissez les valeurs du fichier '.env' se trouvant dans le dossier 'backend' avec vos données  
TOKEN_KEY = votre clé secrete pour securiser les token d'athentification  
DATABASE = le nom de votre base de données  
DATABASE_HOST = l'adresse d'hébergement de la base de données  
DATABASE_USER = l'administrateur de la base de données  
DATABASE_PASSWORD = le mot de passe de l'admin de la base de données 

**4. Faire fonctionner le site :**  
A présent, pour faire fonctionner le site, vous devez lancez 'npm start' dans un terminal depuis la racine du dossier backend, ensuite, lancez 'npm run serve' dans un terminal depuis la racine du dossier frontend.

**5. Acceder au site :**  
Vous pouvez à présent accéder au site depuis l'url présent dans le terminal frontend : http://localhost:8080/

**Administration du site :**  
Pour donner les droits administrateur à un utilisateur dans le site, vous devez directement changer la valeur de la colonne 'privilege' de l'utilisateur dans la base de données pour 'admin'.
Un utilisateur admin peut faire passer un autre utilisateur admin depuis la page d'activité de cet utilisateur.
