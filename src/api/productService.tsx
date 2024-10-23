import axiosInstance from './axiosInstance';
import { Product } from '../types/types';



  
// Récupérer tous les produits
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get<Product[]>('/products');
  return response.data;
};

// Récupérer tous les produits par type
export const fetchProductsByType = async (typeId: number): Promise<Product[]> => {
  const response = await axiosInstance.get<Product[]>(`/products/bytype?id=${typeId}`);
  return response.data;
};






// Récupérer un produit spécifique par son ID
export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axiosInstance.get<Product>(`/products/${id}`);
  return response.data;
};

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
