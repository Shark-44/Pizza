import { useState, useEffect } from 'react';
import { finalOrder } from "../api/orderService";
import { FullOrder } from '../types/types';

const useFetchFullOrders = (orderId: number) => {
    const [fullOrder, setFullOrder] = useState<FullOrder | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFullData = async () => {
            try {
                setLoading(true);
                const data = await finalOrder(orderId);
                setFullOrder(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        };

        fetchFullData();
    }, [orderId]);

    return { fullOrder, error, loading };
};

export default useFetchFullOrders;