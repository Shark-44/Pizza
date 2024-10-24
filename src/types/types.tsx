
export interface Product {
    id: number;
    nomproduit: string;
    descriptionProduit?: string;  
    photoProduit?: string;        
    carte?: boolean;              
    type_id?: number;             
    prix_id?: number;             
}

export interface Type {
    id: number;
    nomtype: string;
}

export interface Order {
    id: number;
    numeroCommande: string;
    prixtotalCommande?: number;  
    timestamp: string;           
    statusCommande: 'en cours' | 'payé';
  }

export interface Basket {
    produit_id: number;
    commande_id: number;
    quantiteCommande: number;
}
  
export interface Button {
    label: string;           
    onClick: () => void;     
    className?: string;     
}

export interface OrderItem {
    id: number;
    name: string;
    quantity: number;
  }

