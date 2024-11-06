import axiosInstance from './axiosInstance';
import { Product } from '../types/types';

// Récupérer tous les produits
export const fetchProducts = async (lang: string): Promise<Product[]> => {
  
  try {
    const response = await axiosInstance.get<Product[]>(`/products?lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw new Error('Impossible de récupérer les produits');
  }
};

export const fetchProductsAndPrice = async (lang: string): Promise<Product[]> => {
  
  try {
    const response = await axiosInstance.get<Product[]>(`/productswithprice?lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw new Error('Impossible de récupérer les produits');
  }
};
// Récupérer tous les produits par type
export const fetchProductsByType = async (typeId: number, lang: string): Promise<Product[]> => {
 
  try {
    const response = await axiosInstance.get<Product[]>(`/productsbytype?id=${typeId}&lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw new Error('Impossible de récupérer les produits');
  }
};

// Récupérer un produit spécifique par son ID
export const fetchProductById = async (id: number, lang: string): Promise<Product> => {
  
  try {
    const response = await axiosInstance.get<Product>(`/products/${id}?lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    throw new Error('Impossible de récupérer le produit');
  }
};
// avoir dans la partie admin
// Créer un nouveau produit
export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  const response = await axiosInstance.post<Product>('/products', productData);
  return response.data;
};

// Mettre à jour un produit existant
export const updateProduct = async (id: number, productData: Partial<Omit<Product, 'id'>>): Promise<Product> => {
  const response = await axiosInstance.put<Product>(`/products/${id}`, productData);
  return response.data;
};

// Supprimer un produit
export const deleteProduct = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};