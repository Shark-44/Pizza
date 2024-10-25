import { useState, useEffect } from 'react';
import { fetchOrders } from "../api/orderService";
import { Order } from '../types/types';
import { getCurrentDate } from '../utils/dateHelpers';

const useFetchOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [orderNumber, setOrderNumber] = useState<string | null>(null); // Numéro de commande

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchOrders(); 
                setOrders(data);

                // Vérifier s'il y a une commande "en cours"
                const ongoingOrder = data.find(order => order.statusCommande === 'en cours');
                
                if (ongoingOrder) {
                    // Si une commande est "en cours", garder son numéro de commande
                    setOrderNumber(ongoingOrder.numeroCommande);
                } else {
                    // Générer un nouveau numéro de commande si aucune commande "en cours"
                    generateOrderNumber(data);
                }

            } catch (error: any) {
                setError(error.message);  
            }
        };

        const generateOrderNumber = (orders: Order[]) => {
            // Filtrer les commandes passées aujourd'hui, en comparant les dates sans tenir compte de l'heure
            const todayOrders = orders.filter(order => {
                const orderDate = formatDateFromTimestamp(order.timestamp);
                return orderDate === getCurrentDate();
            });

            if (todayOrders.length === 0) {
                // Si aucune commande n'a été passée aujourd'hui, commencer à "A1"
                setOrderNumber('A1');
            } else {
                // Incrémenter à partir du dernier numéro de commande du jour
                const lastOrderNumber = todayOrders[todayOrders.length - 1].numeroCommande;
                const newOrderNumber = incrementOrderNumber(lastOrderNumber);
                setOrderNumber(newOrderNumber);
            }
        };

        // Fonction pour formater le timestamp en format YYYY-MM-DD
        const formatDateFromTimestamp = (timestamp: Date): string => {
            const year = timestamp.getFullYear();
            const month = String(timestamp.getMonth() + 1).padStart(2, '0');
            const day = String(timestamp.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        // Fonction pour incrémenter un numéro de commande personnalisé
        const incrementOrderNumber = (lastOrderNumber: string): string => {
            const letterPart = lastOrderNumber.charAt(0); // Première lettre
            const numberPart = parseInt(lastOrderNumber.slice(1), 10); // Partie numérique
            
            // Incrémenter le numéro et gérer le changement de lettre si besoin
            if (numberPart < 99) {
                return `${letterPart}${numberPart + 1}`;
            } else {
                const nextLetter = String.fromCharCode(letterPart.charCodeAt(0) + 1);
                return `${nextLetter}1`;
            }
        };

        fetchData();
    }, []);

    return { orders, error, orderNumber };
};

export default useFetchOrders;
