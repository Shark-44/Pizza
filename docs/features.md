# Features

## Hooks Personnalisés

### 1. useProductDetails
**Description**: Ce hook est responsable de la gestion du chargement des détails des produits pour la sidebar. Il permet de récupérer les informations des produits en fonction des éléments du panier, de gérer l'état de chargement et d'éviter les appels répétitifs à l'API pour les produits déjà chargés.

**Fonctionnalités**:
- Récupère les détails des produits non chargés via l'API.
- Maintient un cache local des produits pour éviter les appels redondants.
- Gère l'état de chargement pour chaque produit individuellement.
  
**Utilisation**:
```javascript
const { productDetails, loadingProducts } = useProductDetails(orderItems);
```
productDetails: Contient les informations de chaque produit, incluant les noms à afficher dans la sidebar.
loadingProducts: Indique les produits en cours de chargement, ce qui permet d'afficher un indicateur (ex. : "Chargement...") dans la vue utilisateur. Vidé pour un rendu UX plus fluide.

### 2. useSidebarVisibility

Description: Ce hook détermine si le panneau des filtres doit être visible en fonction du contenu du panier. Il simplifie la logique de gestion de l'état de visibilité des filtres, en fonction du nombre d'articles présents dans orderItems.

**Fonctionnalités**:

    Active ou désactive l'affichage des filtres automatiquement lorsque le panier est vide ou contient des articles.

**Utilisation**:

```javascript
const showFilters = useSidebarVisibility(orderItems);
```
    showFilters: Renvoie un booléen contrôlant la visibilité des filtres.