
import { Product } from '../types/types';
import { apiCall } from './wrapper';

// Récupérer tous les produits
export const fetchProducts = async (lang: string): Promise<Product[]> => {
  return apiCall<Product[]>('get', `/types?lang=${lang}`, {
    params: { lang },
    errorNamespace: 'api.fetch.types' 
  });
   // console.error('Erreur lors de la récupération des produits:', error);
    //throw new Error('Impossible de récupérer les produits');
};
// Recuperer les produits avec leur prix
export const fetchProductsAndPrice = async (lang: string): Promise<Product[]> => {
  return apiCall<Product[]>('get', `/productswithprice?lang=${lang}`, {
    params: { lang },
    errorNamespace: 'api.fetch.types' 
  });

    //console.error('Erreur lors de la récupération des produits:', error);
   // throw new Error('Impossible de récupérer les produits');

};
// Récupérer tous les produits par type
export const fetchProductsByType = async (typeId: number, lang: string): Promise<Product[]> => {
  return apiCall<Product[]>('get', `/productsbytype?id=${typeId}&lang=${lang}`, {
    params: { lang },
    errorNamespace: 'api.fetch.types' 
  });

    //console.error('Erreur lors de la récupération des produits:', error);
    //throw new Error('Impossible de récupérer les produits');
  
};

// Récupérer un produit spécifique par son ID
export const fetchProductById = async (id: number, lang: string): Promise<Product> => {
  return apiCall<Product>('get', `/products/${id}?lang=${lang}`, {
    params: { lang },
    errorNamespace: 'api.fetch.types' 
  });
      //console.error('Erreur lors de la récupération du produit:', error);
     // throw new Error('Impossible de récupérer le produit');
};

