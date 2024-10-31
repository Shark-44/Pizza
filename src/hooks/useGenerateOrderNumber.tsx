import { useState, useEffect } from 'react';
import { fetchOrders } from '../api/orderService';
import { getCurrentDate } from '../utils/dateHelpers';

export const useGenerateOrderNumber = (_prefix: string) => {
    const [orderNumber, setOrderNumber] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchOrders(); // Récupérer toutes les commandes depuis le service
                const today = getCurrentDate();
                
                // Filtrer les commandes "en cours" avec un numéro de commande démarrant par "E"
                const todayOrders = data.filter(order => {
                    const orderDate = order.timestamp.toISOString().split('T')[0];
                    return orderDate === today && order.statusCommande === 'en cours' && order.numeroCommande.startsWith("E");
                });

                if (todayOrders.length === 0) {
                    // Si aucune commande en cours pour aujourd'hui, réinitialise le compteur à "E001"
                    setOrderNumber("E001");
                } else {
                    // Récupère le dernier numéro de commande et incrémente de +1
                    const lastOrderNumber = todayOrders[todayOrders.length - 1].numeroCommande;
                    const lastNumber = parseInt(lastOrderNumber.slice(1), 10);
                    const nextNumber = lastNumber + 1;
                    
                    // Format sur 3 chiffres, par exemple : "E001", "E002", etc.
                    setOrderNumber(`E${String(nextNumber).padStart(3, '0')}`);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
                setError("Failed to fetch orders");
            }
        };

        fetchData();
    }, []);

    return { orderNumber, error };
};
