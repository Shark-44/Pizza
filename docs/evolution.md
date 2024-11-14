## Documentation du Projet de Tableau de Bord des Ventes

### Objectif
Créer un tableau de bord interactif permettant de visualiser les ventes sur des périodes spécifiques pour aider à l’analyse et la prise de décision.

### Analyse des Besoins
Après avoir analysé les besoins des utilisateurs, quatre filtres de date ont été identifiés comme pertinents : Aujourd’hui, Cette semaine, Ce mois-ci, et Cette année.

### Choix Techniques
#### Utilisation de l’Enum pour le Filtrage
L’`enum FilterOption` est utilisé pour gérer les filtres de date dans le frontend. Cette structure permet de centraliser les options, réduisant ainsi les erreurs et facilitant les modifications.

#### Logique de Filtrage déléguée au Backend
Le filtrage par date est géré par le backend pour minimiser la charge sur le frontend et permettre une scalabilité optimale.

### Plan d’Évolution
- **Filtres Avancés** : Ajouter des options de plage de dates personnalisées.
- **Optimisation Backend** : Mise en place d’index et de cache pour des réponses plus rapides.
