# API du Kiosque de Commande Pizza Sorrizo
1. But de l'API

Cette API a pour objectif de servir de backend à un kiosque de commande numérique, similaire à ceux utilisés dans les restaurants. Elle permet de gérer la commande de produits, avec une interface pour afficher les produits, sélectionner les quantités, et valider la commande. Les principales fonctionnalités comprennent :

    Sélection de la langue : L'API permet de gérer l'internationalisation pour plusieurs langues.
    Affichage des produits : Les produits sont filtrables par type et ajoutés à une commande.
    Gestion de la commande : La possibilité de modifier la commande (ajouter, supprimer des produits, ajuster les quantités).
    Validation de la commande : Affichage du récapitulatif de la commande avec le prix total et la possibilité de finaliser (le paiement est laissé de côté dans cette version de l'API).

2. Objectifs de l'API

    Séparation claire des responsabilités : Séparer les appels API de la logique de gestion des états, en utilisant une architecture modulaire (par exemple, en séparant les hooks des services API).
    Internationalisation (i18n) : Fournir une approche flexible pour le support de plusieurs langues.
    Maintenance et évolutivité : Organiser le code pour garantir qu’il soit facile à maintenir et à faire évoluer.
    Simplicité des endpoints : Concentrez-vous sur quatre endpoints essentiels qui couvrent les fonctionnalités critiques de l'application.
    Sécurité et validation : Implémenter des mécanismes de validation de données pour éviter des erreurs d’input et sécuriser les transactions (bien que le paiement ne soit pas encore implémenté).

3. Architecture de l'API

L'API est organisée selon une structure RESTful et utilise les pratiques standards de l'industrie. L'architecture suit une séparation claire des préoccupations entre la gestion des produits, des commandes, et des paniers.

    Dossier api/ : Contient les services qui gèrent les appels vers les données (produits, commandes, panier).
    Dossier hooks/ : Regroupe les hooks personnalisés qui gèrent l’état de l’application et l’appel aux services API.
    Modèles de données : Utilisation de types TypeScript pour garantir la cohérence des objets Produit, Commande, Panier, et Type.

4. Endpoints de l'API

Voici les quatre endpoints principaux, chacun correspondant à une fonctionnalité clé du kiosque :
4.1 GET /api/products

    Description : Récupère la liste de tous les produits disponibles dans le kiosque. Peut inclure des filtres selon le type de produit.
    Paramètres :
        type : Filtre les produits par type (ex: entrée, plat, dessert).
        lang : Permet de récupérer les produits dans la langue sélectionnée.
    Réponse : Liste de produits avec nom, description, prix et type.

4.2 POST /api/basket

    Description : Ajoute un produit au panier avec la quantité spécifiée.
    Corps de la requête :

    {
      "productId": "123",
      "quantity": 2
    }

    Réponse : Le panier mis à jour avec la quantité et le produit ajoutés.

4.3 GET /api/basket

    Description : Récupère l’état actuel du panier, incluant les produits ajoutés et leur quantité.
    Réponse : Liste des produits dans le panier avec leur quantité et leur prix.

4.4 POST /api/order

    Description : Crée une nouvelle commande avec les produits du panier.
    Corps de la requête :

    {
      "userId": "user123",
      "basketId": "basket123",
      "totalAmount": 100.50,
      "orderDate": "2024-11-06T12:00:00"
    }

    Réponse : Détails de la commande créée (ID de la commande, date, total).

5. Structure des Dossiers

L’API est structurée pour être claire et modulaire :

src/
├── api/
│   ├── productService.ts   # Services relatifs aux produits
│   ├── basketService.ts    # Gestion du panier
│   ├── orderService.ts     # Gestion des commandes
│   └── typeService.ts      # Gestion des types de produits
├── hooks/
│   ├── useBasket.ts        # Hook pour gérer le panier
│   ├── useOrder.ts         # Hook pour la gestion des commandes
│   └── useProduct.ts       # Hook pour charger les produits
└── types/
    ├── Product.ts          # Définition des types de produits
    ├── Basket.ts           # Définition du type panier
    └── Order.ts            # Définition du type commande

6. Internationalisation (i18n)

Le projet supporte plusieurs langues grâce à l'internationalisation. L'API permet de récupérer les données des produits dans la langue de l'utilisateur, facilitant ainsi l'adaptation du kiosque pour différents marchés.

    Structure des fichiers : Les chaînes de texte spécifiques à chaque langue sont stockées dans des fichiers séparés (par exemple, en.json, fr.json) et récupérées par l'API en fonction de la langue demandée.

7. Conclusion

Cette API vise à offrir une structure claire et professionnelle pour la gestion des commandes et produits d’un kiosque de commande. Elle est conçue pour être évolutive, maintenable, et flexible, tout en permettant une intégration facile avec l'interface utilisateur en front-end. En séparant la logique d'accès aux données, les hooks personnalisés et les types de données, nous assurons un code propre et facile à faire évoluer à mesure que de nouvelles fonctionnalités sont ajoutées.

Il y aussi une particuliarité que j'ai pensé a la bdd. C'est a la factorisation avec la gestion des langues. Et second point c'est la périnité dans l'historique des données. En effet j'ai une table d'historique des prix qui peuvent évoluer mais a l'instant t sont toujours indexés. Dans ma partie admin je souhaite mettre en evidence ce point. Apporter un objectif congret!

Points clés à développer dans la suite :

    Tests unitaires et d'intégration pour chaque endpoint.
    Sécurisation des endpoints (authentification, validation des données).
    Gestion des erreurs et des réponses API standardisées (par exemple, en cas de produit non trouvé ou de panier vide).