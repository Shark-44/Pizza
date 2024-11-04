import axiosInstance from './axiosInstance';
import { Order, FullOrder } from '../types/types';
import { formatDateForDB } from '../utils/dateHelpers'; 

// Récupérer toutes les commandes
export const fetchOrders = async (): Promise<Order[]> => {
  const response = await axiosInstance.get<Order[]>('/orders');
  return response.data;
};



// Créer une nouvelle commande
export const createOrder = async (
  orderNumber: string, timestamp: Date

): Promise<Order> => {
  const formattedTimestamp = formatDateForDB(timestamp);
  const orderData = {
    numeroCommande: orderNumber,
    timestamp: formattedTimestamp, // Utilise la date formatée
    statusCommande: 'en cours', // Ou ce que vous souhaitez
};

  try {
    const response = await axiosInstance.post<Order>('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    throw new Error('Impossible de créer la commande');
  }
};



// Supprimer une commande
export const deleteOrder = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/orders/${id}`);
};
// Recuperer la commande finale

export const finalOrder = async (id: number): Promise<FullOrder> => {
  const response = await axiosInstance.get<FullOrder>(`/orders/${id}`);
  return response.data;
};

//finaliser commander

export const finishOrder = async (orderId: number, prixtotalCommande: number): Promise<Order> => {
  const orderData = {
    id: orderId,
    prixtotalCommande,
    statusCommande: 'payé',
  };

  try {
      const response = await axiosInstance.put(`/orders/${orderId}`, orderData); 
      return response.data;
  } catch (error) {
      console.error('Erreur lors de la mise à jour de la commande:', error);
      throw new Error('Impossible de mettre à jour la commande');
  }
};