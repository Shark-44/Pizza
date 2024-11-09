// Interface pour les produits dans la commande (différente de Product générique)
export interface OrderProduct {
  
  produit_id: number;
  nomproduit: string;
  photoProduit: string;
  quantiteCommande: number;
  prixUnitaire: number;
}

// Interface pour un produit générique
export interface Product {
  id: number;
  nomproduit: string;
  descriptionProduit?: string;  
  photoProduit?: string;        
  carte?: boolean;              
  type_id?: number;            
  prix_id?: number;
  nouveauPrix: number;        
}

// Interface pour les types de produits
export interface Type {
  id: number;
  nomtype: string;
}

// Interface pour une commande basique
export interface Order {
  id: number;
  numeroCommande: string;
  prixtotalCommande: number | null;  
  timestamp: Date | string;                  
  statusCommande: 'en cours' | 'payé';
}

// Interface pour une commande complète avec produits
export interface FullOrder {
  numeroCommande: string;
  prixtotalCommande: number | null;  
  timestamp: Date | string;
  statusCommande: string;
  produits: OrderProduct[];         
}

export interface Basket {
  produit_id: number;
  commande_id: number;
  quantiteCommande: number;
}

export type AddItemParams = {
  orderId: number;
  productId: number;
};

export type UpdateQuantityParams = AddItemParams & {
  quantity: number;
};

export interface Button {
  label: string;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
}
export interface BtnFlag {
  icon: string; 
  lang: string; 
  onClick: (lang: string) => void
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
}
export interface SidebarProps {
  orderItems: Basket[];
  setIdType: (type: number | undefined) => void;
  orderId: number; 
}

export interface User {
  iduser: number;
  name: string;
  password: string;
}