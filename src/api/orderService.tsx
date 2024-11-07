import { apiCall } from './wrapper';
import { Order, FullOrder } from '../types/types';
import { formatDateForDB } from '../utils/dateHelpers';

// Récupérer toutes les commandes
export const fetchOrders = async (lang: string): Promise<Order[]> => {
  return apiCall<Order[]>('get', `/orders?lang=${lang}`, {
    params: { lang },
    errorNamespace: 'api.fetch.orders',
  });
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

  return apiCall<Order>('post', '/orders', {
    data: orderData,
    errorNamespace: 'api.create.orders',
  });
};

// Supprimer une commande
export const deleteOrder = async (id: number): Promise<void> => {
  return apiCall<void>('delete', `/orders/${id}`, {
    errorNamespace: 'api.delete.orders',
  });
};

// Récupérer la commande finale
export const finalOrder = async (id: number, lang: string): Promise<FullOrder> => {
  return apiCall<FullOrder>('get', `/orders/${id}?lang=${lang}`, {
    params: { lang },
    errorNamespace: 'api.fetch.orders',
  });
};

// Finaliser la commande
export const finishOrder = async (orderId: number, prixtotalCommande: number): Promise<Order> => {
  const orderData = {
    id: orderId,
    prixtotalCommande,
    statusCommande: 'payé',
  };

  return apiCall<Order>('put', `/orders/${orderId}`, {
    data: orderData,
    errorNamespace: 'api.finish.orders',
  });
};


// Sauvegarde perso

  //console.error('Erreur lors de la supression de la commande:', error);
  //throw new Error('Impossible de de supprimer une commande');

  //console.error(`Erreur lors de la récupération des commandes (ID: ${id}):`, error);
  //throw new Error('Impossible de récupérer les commandes'

  //console.error('Erreur lors de la mise à jour de la commande:', error);
  //throw new Error('Impossible de mettre à jour la commande');