import { apiCall } from './wrapper';
import { Order, FullOrder, OrdersHistory } from '../types/types';
import { formatDateForDB } from '../utils/dateHelpers';

// Récupérer toutes les commandes
export const fetchOrders = async (lang: string): Promise<Order[]> => {
  return apiCall<Order[]>('get', `/orders?lang=${lang}`, {
    params: { lang },
    errorNamespace: 'api.fetch.orders',
  });
};
/*Pour evolution avec filter*/
export const fetchOrdershistory = async (
  lang: string,
  filter?: string 
): Promise<OrdersHistory[]> => {
  return apiCall<OrdersHistory[]>('get', `/ordersforhistory?lang=${lang}&filter=${filter}`, {
    
    params: {
      lang,
      ...(filter ? { filter } : {}),
    },
    errorNamespace: 'api.fetch.orders',
  });
  console.log("paramas de filter dans api",filter)
}; 
/*export const fetchOrdershistory = async (lang: string): Promise<OrdersHistory[]> => {
  return apiCall<OrdersHistory[]>('get', `/ordersforhistory?lang=${lang}`, {
    params: { lang },
    errorNamespace: 'api.fetch.orders',
  });
};*/

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
    errorNamespace: '{lang}.api.create.orders',
  });
};

// Supprimer une commande
export const deleteOrder = async (id: number): Promise<void> => {
  return apiCall<void>('delete', `/orders/${id}`, {
    errorNamespace: '{lang}.api.delete.orders',
  });
};

// Récupérer la commande finale
export const finalOrder = async (id: number, lang: string): Promise<FullOrder> => {
  return apiCall<FullOrder>('get', `/orders/${id}?lang=${lang}`, {
    params: { lang },
    errorNamespace: '{lang}.api.fetch.finalorders',
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
    errorNamespace: '{lang}.api.finish.orders',
  });
};
