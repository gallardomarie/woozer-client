### Sonar
Pour lancer une analyse avec Sonar Scanner (il faut avoir défini la variable d'environnement qui pointe vers le dossier /bin de sonar-scanner dans le path) :
``sonar-scanner   -Dsonar.projectKey=Woozer   -Dsonar.sources=.   -Dsonar.host.url=http://localhost:9000   -Dsonar.login=bb21b4d50008ec9aba401d2de85db36e1cf8a802``

Pour visualiser les analyses Sonar, se rendre dans le dossin /bin de sonarqube : 
``./sonar.sh console``

### Application front

Il faut avoir installé : 
- node.js
- ionic

Pour lancer l'application :
``ionic serve``

### Application back

Il faut :
- avoir installé MySQL (v8.0.18 fonctionne)
- y créer un utilisateur (username = root, mdp = root)
- lancer le script sql ```schema.sql``` pour créer la structure des tables
- une fois la table créée, lancer le script sql ``data.sql`` pour créer un premier jeu de données

Une fois la connexion SQL fonctionnelle, pour lancer l'API il faut exécuter le main de ``Application.java``.  
Pour tester que tout fonctionne, la requête suivante en GET devrait retourner un utilisateur :
``http://localhost:8080/user/1``