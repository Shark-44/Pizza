import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fetchOrders } from '../api/orderService';
import { Order } from '../types/types';


export const useOrderManagement = () => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [newOrderNumber, setNewOrderNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);
        const orders = await fetchOrders();
        
        // 1. D'abord on cherche si une commande est en cours
        const activeOrder = orders.find(order => order.statusCommande === 'en cours');
        
        if (activeOrder) {
          setCurrentOrder(activeOrder);
          return;
        }

        // 2. Si pas de commande en cours, on gère le nouveau numéro
        const today = format(new Date(), 'yyyy-MM-dd');
        const lastOrder = orders[orders.length - 1]; // Prendre la dernière commande
        
        if (!lastOrder) {
          // Si aucune commande n'existe, on commence à E001
          setNewOrderNumber('E001');
          return;
        }

        const lastOrderDate = format(new Date(lastOrder.timestamp), 'yyyy-MM-dd');

        if (lastOrderDate === today) {
          // Si la dernière commande est d'aujourd'hui, on incrémente
          const lastNumber = parseInt(lastOrder.numeroCommande.slice(1), 10);
          const nextNumber = `E${String(lastNumber + 1).padStart(3, '0')}`;
          setNewOrderNumber(nextNumber);
        } else {
          // Si la dernière commande n'est pas d'aujourd'hui, on recommence à E001
          setNewOrderNumber('E001');
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  return { currentOrder, newOrderNumber, loading, error };
};