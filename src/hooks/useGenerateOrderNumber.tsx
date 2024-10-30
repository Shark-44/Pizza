import { getCurrentDate } from '../utils/dateHelpers';
import { useState, useEffect } from 'react';
import { fetchOrders } from "../api/orderService";
import { Order } from '../types/types';

const useGenerateOrderNumber = (type: 'T' | 'E') => {
    const [orderNumber, setOrderNumber] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchOrders();
                const todayOrders = data.filter(order => {
                    const orderDate = order.timestamp.toISOString().split('T')[0];
                    return orderDate === getCurrentDate() && order.numeroCommande.startsWith(type);
                });

                if (todayOrders.length === 0) {
                    setOrderNumber(`${type}1`);
                } else {
                    const lastOrderNumber = todayOrders[todayOrders.length - 1].numeroCommande;
                    const nextNumber = parseInt(lastOrderNumber.slice(1)) + 1;
                    setOrderNumber(`${type}${nextNumber}`);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };

        fetchData();
    }, [type]);

    return orderNumber;
};

export default useGenerateOrderNumber;
