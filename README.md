Pour lancer une analyse avec Sonar Scanner (il faut avoir défini la variable d'environnement qui pointe vers le dossier /bin de sonar-scanner dans le path) :
``sonar-scanner   -Dsonar.projectKey=Woozer   -Dsonar.sources=.   -Dsonar.host.url=http://localhost:9000   -Dsonar.login=bb21b4d50008ec9aba401d2de85db36e1cf8a802``

Pour visualiser les analyses Sonar, se rendre dans le dossin /bin de sonarqube : 
``./sonar.sh console``

Pour lancer l'application :
``ionic serve``