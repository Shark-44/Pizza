// types.ts
export interface Product {
    id: number;
    nomproduit: string;
    descriptionProduit?: string;  
    photoProduit?: string;        
    carte?: boolean;              
    type_id?: number;             
    prix_id?: number;             
}
