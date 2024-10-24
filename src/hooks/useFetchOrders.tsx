import { useState, useEffect } from 'react';
import { fetchOrders } from "../api/orderService";
import { Order } from '../types/types';

const useFetchOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchOrders(); 
                setOrders(data);  
            } catch (error: any) {
                setError(error.message);  
            }
        };

        fetchData();
    }, []);

    return { orders, error };
};

export default useFetchOrders;
