# Architecture du Projet

Ce document décrit la structure de l'architecture du projet et le rôle des dossiers principaux situés dans le dossier `src`.

## Structure de `src`

src 
├── api 
├── assets 
├── components 
├── fonts 
├── hooks 
├── pages 
├── types 
└── utils


### Dossiers Principaux

- **api**  
  Ce dossier contient les services de gestion des données et de communication avec l'API. Toutes les fonctions d'appel à l'API sont centralisées ici pour maintenir une logique propre et une abstraction des appels API, facilitant leur maintenance.

  Exemple de fichier : `productService.ts` – Gère les requêtes pour les produits, comme la récupération de détails spécifiques.

- **assets**  
  Ce dossier regroupe toutes les ressources statiques, telles que les images et les icônes. Il permet d'organiser les éléments de design et les assets graphiques pour une accessibilité aisée dans les composants.

- **components**  
  Tous les composants réutilisables sont ici. Ils peuvent être des éléments UI simples ou complexes, réutilisables dans différentes pages du projet. Par exemple, des boutons, des formulaires, ou des éléments d'affichage.

  Exemple de fichier : `Sidebar.tsx` –  Le composant de la barre latérale de navigation.

- **fonts**  
  Ce dossier contient les polices de caractères utilisées dans le projet. Elles sont placées ici pour centraliser la gestion des ressources de typographie.

- **hooks**  
  Le dossier `hooks` héberge les hooks personnalisés. Ces hooks encapsulent des logiques spécifiques pour gérer certains états ou fonctionnalités de manière indépendante, rendant les composants plus lisibles et modulaires.

  Exemple de fichier : `useProductDetails.ts` – Un hook pour charger et gérer les détails des produits dans le panier.

- **pages**  
  Ce dossier organise les différentes pages de l'application. Chaque fichier correspond à une page et inclut les composants et la logique spécifiques à chaque route.

  Exemple de fichier : `Home.tsx` – Une page d'accueil de l'application.

- **types**  
  Ce dossier contient les définitions de types TypeScript pour le projet. En centralisant les types ici, il est plus facile d'assurer la cohérence des structures de données dans toute l'application.

  Exemple de fichier : `Product.ts` – Définit les types pour les objets `Product` et `Basket`.

- **utils**  
  Les fonctions utilitaires communes à plusieurs composants ou pages sont centralisées dans ce dossier. Ces fonctions simplifient le code en permettant de réutiliser des fonctionnalités sans redondance.

  Exemple de fichier : `dateHelpers.ts` – Contient une fonction pour formater la date.

## Résumé

L'architecture de ce projet suit une approche modulaire et organisée, en séparant les fonctionnalités par catégories. Cette structure favorise la maintenabilité, la lisibilité et l'évolutivité du code, permettant à chaque partie de l'application d'être facilement localisée et modifiée si nécessaire.
