
import { Product } from '../types/types';
import { apiCall } from './wrapper';

// Récupérer tous les produits
export const fetchProducts = async (lang: string): Promise<Product[]> => {
  return apiCall<Product[]>('get', `/products?lang=${lang}`, {
    params: { lang },
    errorNamespace: '{lang}.api.fetch.products' 
  });
};

// Recuperer les produits avec leur prix
export const fetchProductsAndPrice = async (lang: string): Promise<Product[]> => {
  return apiCall<Product[]>('get', `/productswithprice?lang=${lang}`, {
    params: { lang },
    errorNamespace: '{lang}.api.fetch.productsprice' 
  });
};

// Récupérer tous les produits par type
export const fetchProductsByType = async (typeId: number, lang: string): Promise<Product[]> => {
  return apiCall<Product[]>('get', `/productsbytype?id=${typeId}&lang=${lang}`, {
    params: { lang },
    errorNamespace: '{lang}.api.fetch.productsbytype' 
  }); 
};

// Récupérer un produit spécifique par son ID
export const fetchProductById = async (id: number, lang: string): Promise<Product> => {
  return apiCall<Product>('get', `/products/${id}?lang=${lang}`, {
    params: { lang },
    errorNamespace: '{lang}.api.fetch.productbyid' 
  });
};
// creer un produit
export const creatproduct = async (
  price: {
      dateprix: Date;
      ancienPrix: number;
      nouveauPrix: number;
  },
  product: {
      photoProduit: string;
      carte: number;
      type_id: number;
  },
  translations: Array<{
      language_code: string;
      nomproduit: string;
      descriptionProduit: string;
  }>
): Promise<Product> => {
  const productData = { price, product, translations };
  
  return apiCall<Product>('post', `/createproduct`, {
      data: productData,
      errorNamespace: 'api.post.createproduct'
  });
};

