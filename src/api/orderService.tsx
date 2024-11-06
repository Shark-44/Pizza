import axiosInstance from './axiosInstance';
import { Order, FullOrder } from '../types/types';
import { formatDateForDB } from '../utils/dateHelpers'; 



// Récupérer toutes les commandes
export const fetchOrders = async (lang: string): Promise<Order[]> => {

  try {
    const response = await axiosInstance.get<Order[]>(`/orders?lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    throw new Error('Impossible de récupérer les commandes');
  }
};



// Créer une nouvelle commande
export const createOrder = async (
  orderNumber: string, timestamp: Date

): Promise<Order> => {
  const formattedTimestamp = formatDateForDB(timestamp);
  const orderData = {
    numeroCommande: orderNumber,
    timestamp: formattedTimestamp, 
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



// Supprimer une commande
export const deleteOrder = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/orders/${id}`);
    
  } catch (error) {
    console.error('Erreur lors de la supression de la commande:', error);
    throw new Error('Impossible de de supprimer une commande');
  }
 
};
// Recuperer la commande finale

export const finalOrder = async (id: number, lang: string): Promise<FullOrder> => {

  try {
    const response = await axiosInstance.get<FullOrder>(`/orders/${id}?lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des commandes (ID: ${id}):`, error);
    throw new Error('Impossible de récupérer les commandes');
  }
  
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