// Statut de commande
enum StatusCommande {
  EN_COURS = 'en cours',
  PAYE = 'payé'
}
// Définition de l'enum pour les filtres
export enum FilterOption {
  TODAY = "Aujourd’hui",
  THIS_WEEK = "Cette semaine",
  THIS_MONTH = "Ce mois-ci",
  THIS_YEAR = "Cette année",
}

// Produit simple
export interface Product {
  id: number;
  nomProduit: string;
  descriptionProduit?: string;
  photoProduit?: string;
  carte?: boolean;
  typeId?: number;
  prixId?: number;
  nouveauPrix: number;
}

// Produit dans une commande
export interface OrderProduct {
  produitId: number;
  nomProduit: string;
  photoProduit: string;
  quantiteCommande: number;
  prixUnitaire: number;
}

// Historique de produit
export interface ProductHistory {
  produitId: number;
  quantiteCommande: number;
  nouveauPrix: number;
  nomProduit: string;
  nomtype: string;
}

// Type de produit
export interface Type {
  id: number;
  nomtype: string;
}

// Détails de commande simple
export interface Order {
  id: number;
  numeroCommande: string;
  prixtotalCommande: number | null;
  timestamp: string;
  statusCommande: StatusCommande;
}

// Commande complète avec produits
export interface FullOrder extends Order {
  produits: OrderProduct[];
}

// Historique de commande avec produits
export interface OrdersHistory extends Order {
  products: ProductHistory[];
}

// Panier d'achat
export interface Basket {
  produitId: number;
  commandeId: number;
  quantiteCommande: number;
}

// Paramètres pour ajouter un produit à la commande
export type AddItemParams = {
  orderId: number;
  productId: number;
};

// Paramètres pour mettre à jour la quantité d'un produit
export type UpdateQuantityParams = AddItemParams & {
  quantity: number;
};

// Bouton générique
export interface AppButton {
  label: string;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
}

// Bouton pour changement de langue
export interface BtnFlag {
  icon: string;
  lang: string;
  onClick: (lang: string) => void;
}

// Élément de commande dans le panier
export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
}

// Propriétés de la barre latérale
export interface SidebarProps {
  orderItems: Basket[];
  setIdType: (type: number | undefined) => void;
  orderId: number;
}

// Utilisateur
export interface User {
  iduser: number;
  name: string;
  password: string;
}

// Traductions de produits
export interface TranslationItem {
  [languageCode: string]: {
    nomProduit?: string;
    descriptionProduit?: string;
  };
}

// Informations de prix
export interface Price {
  id?: number;
  datePrix: string;
  ancienPrix: number;
  nouveauPrix: number;
  produitId: number;
}
export interface PriceUpdateRequest {
  dateprix: Date | string;
  ancienPrix: number;
  nouveauPrix: number;
  produit_id: number;
} 