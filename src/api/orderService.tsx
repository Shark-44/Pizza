import axiosInstance from './axiosInstance';

interface Order {
    id: number;
    numeroCommande: string;
    prixtotalCommande?: number;  
    timestamp: string;           
    statusCommande: 'en cours' | 'payé';
  }
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
export const createOrder = async (orderData: Omit<Order, 'id' | 'timestamp'>): Promise<Order> => {
  const response = await axiosInstance.post<Order>('/orders', orderData);
  return response.data;
};

// Mettre à jour une commande existante
export const updateOrder = async (id: number, orderData: Partial<Omit<Order, 'id' | 'timestamp'>>): Promise<Order> => {
  const response = await axiosInstance.put<Order>(`/orders/${id}`, orderData);
  return response.data;
};

// Supprimer une commande
export const deleteOrder = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/orders/${id}`);
};
