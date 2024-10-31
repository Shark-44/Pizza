import axiosInstance from './axiosInstance';
import { Order, Basket } from '../types/types';

// Récupérer toutes les commandes
export const fetchOrders = async (): Promise<Order[]> => {
  const response = await axiosInstance.get<Order[]>('/orders');
  return response.data;
};

// Récupérer une commande spécifique par son ID
export const fetchOrderById = async (id: number): Promise<Order> => {
  const response = await axiosInstance.get<Order>(`/orders/${id}`);
  return response.data;
};

// Créer une nouvelle commande
export const createOrder = async (
  numeroCommande: string,
  timestamp: string

): Promise<Order> => {
  const orderData = {
    numeroCommande,
    timestamp,
    statusCommande: 'en cours',

  };

  try {
    const response = await axiosInstance.post<Order>('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    throw new Error('Impossible de créer la commande');
  }
};

// Mettre à jour une commande existante
export const updateOrder = async (orderId: number, products: Basket[]): Promise<Order> => {
  const orderData = {
      produits: products.map(product => ({
          produit_id: product.produit_id,
          quantiteCommande: product.quantiteCommande || 1,
      })),
  };

  try {
      const response = await axiosInstance.put(`/orders/${orderId}`, orderData); // Assurez-vous que l'endpoint est correct
      return response.data;
  } catch (error) {
      console.error('Erreur lors de la mise à jour de la commande:', error);
      throw new Error('Impossible de mettre à jour la commande');
  }
};

// Supprimer une commande
export const deleteOrder = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/orders/${id}`);
};
